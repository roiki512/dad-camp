/* Dad Camp — Google sign-in + Drive sync (drive.file scope: app-created files only).
   Exposes window.DadCampDrive. Loads Google Identity Services on init. */
window.DadCampDrive = (function () {
  "use strict";
  var SCOPE = "https://www.googleapis.com/auth/drive.file";
  var clientId = null, tokenClient = null, token = null, tokenExp = 0;
  var onChange = null, pending = null;

  function init(cfgClientId, onChangeCb) {
    clientId = cfgClientId; onChange = onChangeCb;
    if (!clientId) return;
    var s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client"; s.async = true; s.defer = true;
    s.onload = function () {
      try {
        tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: clientId, scope: SCOPE,
          callback: function (resp) {
            if (resp && resp.access_token) {
              token = resp.access_token;
              tokenExp = Date.now() + ((resp.expires_in || 3600) * 1000) - 60000;
              try { localStorage.setItem("dadcamp-signed", "1"); } catch (e) {}
              if (pending) { var p = pending; pending = null; p.resolve(token); }
              if (onChange) onChange(true);
            } else if (pending) { var q = pending; pending = null; q.reject(resp); }
          }
        });
        if (onChange) onChange(false);
      } catch (e) { /* GIS unavailable */ }
    };
    s.onerror = function () { /* offline / blocked */ };
    document.head.appendChild(s);
  }

  function signedIn() { return !!token && Date.now() < tokenExp; }
  function wasSignedIn() { try { return localStorage.getItem("dadcamp-signed") === "1"; } catch (e) { return false; } }
  function signIn() { if (tokenClient) tokenClient.requestAccessToken({ prompt: wasSignedIn() ? "" : "consent" }); }
  function signOut() { token = null; tokenExp = 0; try { localStorage.removeItem("dadcamp-signed"); } catch (e) {} if (onChange) onChange(false); }

  function getToken() {
    return new Promise(function (resolve, reject) {
      if (signedIn()) return resolve(token);
      if (!tokenClient) return reject("not-ready");
      pending = { resolve: resolve, reject: reject };
      tokenClient.requestAccessToken({ prompt: wasSignedIn() ? "" : "consent" });
    });
  }

  function api(path, opts) {
    return getToken().then(function (t) {
      opts = opts || {}; opts.headers = opts.headers || {};
      opts.headers.Authorization = "Bearer " + t;
      return fetch("https://www.googleapis.com/" + path, opts).then(function (r) {
        if (!r.ok) throw new Error("drive " + r.status);
        return r.status === 204 ? null : r.json();
      });
    });
  }

  function findId(name, folder) {
    var q = "name='" + name.replace(/'/g, "") + "' and trashed=false";
    if (folder) q += " and mimeType='application/vnd.google-apps.folder'";
    return api("drive/v3/files?spaces=drive&fields=files(id,name)&q=" + encodeURIComponent(q))
      .then(function (j) { return (j.files && j.files[0]) ? j.files[0].id : null; });
  }

  function uploadMedia(id, contentType, body) {
    return getToken().then(function (t) {
      return fetch("https://www.googleapis.com/upload/drive/v3/files/" + id + "?uploadType=media", {
        method: "PATCH", headers: { Authorization: "Bearer " + t, "Content-Type": contentType }, body: body
      }).then(function (r) { if (!r.ok) throw new Error("upload " + r.status); return r.json(); });
    });
  }

  function saveJson(name, obj) {
    var content = JSON.stringify(obj);
    return findId(name).then(function (id) {
      if (id) return uploadMedia(id, "application/json", content);
      return api("drive/v3/files", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name, mimeType: "application/json" }) })
        .then(function (f) { return uploadMedia(f.id, "application/json", content); });
    });
  }

  function readJson(name) {
    return findId(name).then(function (id) {
      if (!id) return null;
      return getToken().then(function (t) {
        return fetch("https://www.googleapis.com/drive/v3/files/" + id + "?alt=media", { headers: { Authorization: "Bearer " + t } })
          .then(function (r) { return r.ok ? r.json() : null; });
      });
    });
  }

  function ensureFolder(name) {
    return findId(name, true).then(function (id) {
      if (id) return id;
      return api("drive/v3/files", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name, mimeType: "application/vnd.google-apps.folder" }) })
        .then(function (f) { return f.id; });
    });
  }

  function uploadImage(folderId, name, blob) {
    return api("drive/v3/files", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: name, parents: [folderId] }) })
      .then(function (f) { return uploadMedia(f.id, blob.type || "image/jpeg", blob); });
  }

  return {
    init: init, signIn: signIn, signOut: signOut, signedIn: signedIn,
    saveJson: saveJson, readJson: readJson, ensureFolder: ensureFolder, uploadImage: uploadImage
  };
})();
