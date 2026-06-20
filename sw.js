/* Dad Camp service worker — offline support via stale-while-revalidate.
   Bump CACHE when you want clients to refresh the precache. */
var CACHE = "dadcamp-v3";
var CORE = [
  "./", "./index.html", "./styles.css", "./app.js",
  "./data/profile.js", "./data/library.js", "./data/preferences.js",
  "./data/events.js", "./data/weeks-index.js", "./data/week.js", "./camp.ics",
  "./manifest.webmanifest", "./icon.svg"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) { if (k !== CACHE) return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.match(req).then(function (cached) {
      var network = fetch(req).then(function (res) {
        if (res && res.status === 200) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return cached; });
      return cached || network;
    })
  );
});
