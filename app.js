/* Dad Camp web app — renders a week from data/week.js (current) or an archived week,
   using the library + profile. No build step: globals come from the data/*.js files. */
(function () {
  "use strict";

  var WEEK = window.DADCAMP_WEEK;                 // the current/live week
  var LIB = window.DADCAMP_LIBRARY || [];
  var PROFILE = window.DADCAMP_PROFILE || {};
  var PREFS = window.DADCAMP_PREFERENCES || { loved: [], disliked: [] };
  var WEEKS_INDEX = window.DADCAMP_WEEKS_INDEX || null;
  var EVENTS = window.DADCAMP_EVENTS || [];
  var libById = {};
  LIB.forEach(function (a) { libById[a.id] = a; });

  var SLOT_NAMES = {
    learning: "Learning", main: "Main Activity", quiet: "Quiet Time",
    afternoon: "Afternoon", outdoor: "Outdoor", free: "Free / Family", gym: "Gymnastics", piano: "Piano"
  };
  var DONE_KEY = "dadcamp-done", FAV_KEY = "dadcamp-favs", OVR_KEY = "dadcamp-overrides";
  var done = loadJSON(DONE_KEY), favs = loadJSON(FAV_KEY), overrides = loadJSON(OVR_KEY);
  var DRIVE_IDS = ["aft-urbanair", "aft-pottery-studio", "aft-museum"];

  var app = document.getElementById("app");
  var dayNav = document.getElementById("dayNav");
  var weekLabel = document.getElementById("weekLabel");
  var controls = document.getElementById("controls");
  var backdrop = document.getElementById("sheetBackdrop");
  var sheetBody = document.getElementById("sheetBody");
  var doit = document.getElementById("doit");
  var doitReg = [], activeDoitClose = null;
  var mem = document.getElementById("mem");

  if (!WEEK || !WEEK.days) {
    app.innerHTML = '<p class="loading">No week is scheduled yet. Ask Claude to generate one!</p>';
    return;
  }

  var ACTIVE = WEEK;                 // currently displayed week (current or archived)
  var filterKid = "both";           // "both" | "Yuval" | "Ariel"
  var archiveCache = {};
  var todayISO = localISODate(new Date());
  var nowMin = new Date().getHours() * 60 + new Date().getMinutes();

  buildControls();
  setActiveWeek(WEEK, true);
  wireSheet();
  document.getElementById("shopBtn").addEventListener("click", openShoppingList);
  var printBtn = document.getElementById("printBtn");
  if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

  /* ───────────── controls: kid filter + week picker ───────────── */
  function buildControls() {
    if (!controls) return;
    var kids = (PROFILE.kids || []).map(function (k) { return k.name; });
    var html = '<div class="seg" id="kidSeg">';
    html += '<button data-kid="both" class="active">👧👧 Both</button>';
    kids.forEach(function (n) { html += '<button data-kid="' + n + '">' + n + "</button>"; });
    html += "</div>";
    html += '<button class="picks-btn" id="picksBtn">❤️ Picks</button>';
    html += '<button class="picks-btn" id="memBtn">📸 Memories</button>';

    if (WEEKS_INDEX && WEEKS_INDEX.length > 1) {
      html += '<select id="weekPick" class="weekpick">';
      WEEKS_INDEX.forEach(function (w) {
        html += '<option value="' + (w.current ? "__current__" : w.file) + '">' + w.label + "</option>";
      });
      html += "</select>";
    }
    controls.innerHTML = html;

    controls.querySelectorAll("#kidSeg button").forEach(function (b) {
      b.addEventListener("click", function () {
        filterKid = b.getAttribute("data-kid");
        controls.querySelectorAll("#kidSeg button").forEach(function (c) { c.classList.remove("active"); });
        b.classList.add("active");
        renderDays();
      });
    });
    document.getElementById("picksBtn").addEventListener("click", openPicks);
    document.getElementById("memBtn").addEventListener("click", openMemories);
    var pick = document.getElementById("weekPick");
    if (pick) pick.addEventListener("change", function () {
      var v = pick.value;
      if (v === "__current__") { setActiveWeek(WEEK, true); return; }
      loadArchiveWeek(v, function (wk) { if (wk) setActiveWeek(wk, false); });
    });
  }

  function loadArchiveWeek(file, cb) {
    if (archiveCache[file]) { cb(archiveCache[file]); return; }
    window.DADCAMP_SET_ARCHIVE = function (obj) { archiveCache[file] = obj; cb(obj); };
    var s = document.createElement("script");
    s.src = file; s.onerror = function () { cb(null); };
    document.body.appendChild(s);
  }

  function setActiveWeek(weekObj, isCurrent) {
    ACTIVE = weekObj;
    ACTIVE.__current = !!isCurrent;
    weekLabel.textContent = ACTIVE.label || ("Week of " + ACTIVE.weekOf);
    renderDayNav();
    renderDays();
    if (isCurrent) scrollToToday();
  }

  /* ───────────── rendering ───────────── */
  function renderDayNav() {
    dayNav.innerHTML = "";
    ACTIVE.days.forEach(function (day, i) {
      var b = document.createElement("button");
      b.innerHTML = day.weekday + '<span class="dn-date">' + shortDate(day.date) + "</span>";
      if (ACTIVE.__current && day.date === todayISO) b.classList.add("active");
      b.addEventListener("click", function () {
        var el = document.getElementById("day-" + i);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        Array.prototype.forEach.call(dayNav.children, function (c) { c.classList.remove("active"); });
        b.classList.add("active");
      });
      dayNav.appendChild(b);
    });
  }

  function renderDays() {
    app.innerHTML = "";
    ACTIVE.days.forEach(function (day, i) {
      var isToday = ACTIVE.__current && day.date === todayISO;
      var sec = document.createElement("section");
      sec.className = "day" + (isToday ? " is-today" : "");
      sec.id = "day-" + i;

      var wx = day.weather
        ? '<button class="wx" data-wx="' + i + '" title="Tap for the hourly forecast">' +
            day.weather.icon + " " + day.weather.high + "°</button>"
        : "";
      var head = '<div class="day-head"><h2>' + day.weekday +
        (isToday ? '<span class="today-pill">TODAY</span>' : "") +
        '</h2><span class="day-head-right"><span class="date">' + longDate(day.date) + "</span>" + wx + "</span></div>";

      var banner = "";
      if (day.dayType && day.dayType !== "standard") {
        banner = '<div class="daytype-banner">' + (day.dayTypeLabel || prettyDayType(day.dayType)) + "</div>";
      }

      // special-date events overlaid for this day
      var dayEvents = EVENTS.filter(function (e) { return e.date === day.date; });
      dayEvents.filter(function (e) { return !e.time; }).forEach(function (e) {
        banner += '<div class="event-banner ev-' + (e.type || "event") + '">' + evIcon(e.type) + " <strong>" +
          e.title + "</strong>" + (e.note ? " — " + e.note : "") + "</div>";
      });

      var items = (day.blocks || []).map(function (blk, j) {
        return { start: toMin((blk.time || "0:0").split("-")[0]), html: renderBlock(day, i, blk, j, isToday) };
      });
      dayEvents.filter(function (e) { return e.time; }).forEach(function (e) {
        items.push({ start: toMin(e.time.split("-")[0]), html: renderEventBlock(e) });
      });
      items.sort(function (a, b) { return a.start - b.start; });
      var blocksHtml = '<div class="blocks">' + items.map(function (it) { return it.html; }).join("") + "</div>";

      sec.innerHTML = head + banner + blocksHtml;
      app.appendChild(sec);
    });
  }

  function renderBlock(day, di, blk, bi, isToday) {
    // per-kid filter
    if (filterKid !== "both" && blk.kid && blk.kid !== filterKid) return "";

    var det = effDet(day, blk);
    var overridden = isOverridden(day, blk);
    var slot = blk.slot || "fixed";
    var isFixed = !!blk.fixed || (!det && !blk.title);
    var key = doneKey(day.date, blk.time, slot);
    var clickable = !isFixed;
    var loved = isLovedId(effId(day, blk)) || (blk.options || []).some(isLovedId);
    var titleText = overridden ? (det.title || "Activity") : (blk.title || (det && det.title) || "Activity");

    var sub;
    if (blk.options) {
      sub = "Pick one: " + blk.options.map(function (id) { return (libById[id] || {}).title || id; }).join(" · ");
    } else if (overridden) {
      sub = (det && det.location ? capitalize(det.location) + (det.duration ? " · " + det.duration : "") : "") + " · swapped 🔄";
    } else {
      sub = blk.note || (det && det.location ? capitalize(det.location) + (det.duration ? " · " + det.duration : "") : "");
    }
    if (blk.kid) sub = blk.kid + " · " + (sub || "");
    if (blk.weatherNote && !blk.options) sub = blk.weatherNote + (sub ? " · " + sub : "");

    var nowMark = isToday && inNow(blk.time);
    var classes = "block slot-" + slot + (isFixed ? " fixed" : "") + (blk.big ? " big-block" : "") +
      (done[key] ? " done" : "") + (nowMark ? " now" : "");
    var tag = clickable ? '<span class="tag slot-' + slot + '">' + (SLOT_NAMES[slot] || slot) + "</span>" : "";
    var heart = loved ? '<span class="fav-badge" title="A favorite">❤️</span>' : "";

    var attrs = clickable ? ' data-di="' + di + '" data-bi="' + bi + '"' : "";
    var tagName = clickable ? "button" : "div";

    return "<" + tagName + ' class="' + classes + '"' + attrs + ">" +
      '<span class="stripe"></span>' +
      '<span class="time">' + (nowMark ? '<span class="now-dot">● now</span>' : "") + blk.time + "</span>" +
      '<span class="body">' +
      '<span class="b-title">' + tag + titleText + " " + heart + "</span>" +
      (sub ? '<span class="b-sub">' + sub + "</span>" : "") +
      "</span>" +
      (clickable ? '<span class="chev">›</span>' : "") +
      "</" + tagName + ">";
  }

  function renderEventBlock(ev) {
    var evi = EVENTS.indexOf(ev);
    return '<button class="block slot-event" data-evi="' + evi + '">' +
      '<span class="stripe"></span>' +
      '<span class="time">' + ev.time + "</span>" +
      '<span class="body"><span class="b-title"><span class="tag slot-event">' + (ev.type || "Event") + "</span>" +
      evIcon(ev.type) + " " + ev.title + "</span>" +
      (ev.note ? '<span class="b-sub">' + ev.note + "</span>" : "") +
      '</span><span class="chev">›</span></button>';
  }

  /* ───────────── detail sheet ───────────── */
  function wireSheet() {
    app.addEventListener("click", function (e) {
      var wx = e.target.closest(".wx");
      if (wx) { openWeather(ACTIVE.days[+wx.getAttribute("data-wx")]); return; }
      var evb = e.target.closest(".slot-event[data-evi]");
      if (evb) { openEventDetail(EVENTS[+evb.getAttribute("data-evi")]); return; }
      var b = e.target.closest(".block[data-di]");
      if (!b) return;
      var day = ACTIVE.days[+b.getAttribute("data-di")];
      var blk = day.blocks[+b.getAttribute("data-bi")];
      openDetail(day, blk);
    });
    document.getElementById("sheetClose").addEventListener("click", closeSheet);
    backdrop.addEventListener("click", function (e) { if (e.target === backdrop) closeSheet(); });
    sheetBody.addEventListener("click", function (e) {
      var s = e.target.closest(".doit-start");
      if (s) openDoIt(doitReg[+s.getAttribute("data-doit")]);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (activeDoitClose) activeDoitClose(); else closeSheet();
    });
  }

  function openDetail(day, blk) {
    var slot = blk.slot || "main";
    if (blk.options) { openChoice(blk, slot); return; }
    var det = effDet(day, blk) || {};
    var eid = effId(day, blk);
    var overridden = isOverridden(day, blk);
    var title = overridden ? (det.title || "Activity") : (blk.title || det.title || "Activity");
    var key = doneKey(day.date, blk.time, slot);

    var html = '<span class="tag slot-' + slot + '">' + (SLOT_NAMES[slot] || slot) +
      (overridden ? " · swapped 🔄" : "") + "</span>";
    html += "<h3>" + title + "</h3>";
    var metaBits = [blk.time];
    if (det.duration) metaBits.push(det.duration);
    if (det.location) metaBits.push(capitalize(det.location));
    if (det.energy) metaBits.push(det.energy + " energy");
    html += '<div class="meta">' + metaBits.join(" · ") + "</div>";

    if (blk.note && !overridden) html += "<p>" + blk.note + "</p>";
    if (blk.weatherNote) html += '<div class="rain">🌤️ ' + blk.weatherNote + "</div>";

    html += activityBodyHtml(det);
    if (det.steps && det.steps.length) html += startBtn(regDoit(det, title));
    if (canSwap(blk)) {
      html += '<div class="swap-row"><button class="swap-btn" id="swapBtn">🔄 Swap for another</button>' +
        (overridden ? '<button class="swap-reset" id="swapReset">↩ Original</button>' : "") + "</div>";
    }
    html += ratingHtml(eid);

    html += '<button class="done-toggle' + (done[key] ? " is-done" : "") +
      '" data-key="' + key + '">' + (done[key] ? "✓ Done!" : "Mark as done") + "</button>";

    sheetBody.innerHTML = html;
    wireRating(sheetBody, eid);
    var sb = document.getElementById("swapBtn");
    if (sb) sb.addEventListener("click", function () { swapActivity(day, blk); renderDays(); openDetail(day, blk); });
    var sr = document.getElementById("swapReset");
    if (sr) sr.addEventListener("click", function () { resetBlock(day, blk); renderDays(); openDetail(day, blk); });
    var btn = sheetBody.querySelector(".done-toggle");
    btn.addEventListener("click", function () {
      done[key] = !done[key];
      saveJSON(DONE_KEY, done);
      btn.classList.toggle("is-done", done[key]);
      btn.textContent = done[key] ? "✓ Done!" : "Mark as done";
      renderDays();
    });
    backdrop.classList.add("open");
  }

  function openChoice(blk, slot) {
    var html = '<span class="tag slot-' + slot + '">' + (SLOT_NAMES[slot] || slot) + "</span>";
    html += "<h3>" + (blk.title || "Choose one") + "</h3>";
    html += '<div class="meta">' + blk.time + " · the girls pick one</div>";
    if (blk.note) html += "<p>" + blk.note + "</p>";
    if (blk.weatherNote) html += '<div class="rain">🌤️ ' + blk.weatherNote + "</div>";
    (blk.options || []).forEach(function (id) {
      var a = libById[id];
      if (!a) return;
      html += '<div class="opt"><div class="opt-h">' + a.title + (isLovedId(id) ? " ❤️" : "") + "</div>";
      html += '<div class="meta">' + [a.duration, a.energy ? a.energy + " energy" : ""].filter(Boolean).join(" · ") + "</div>";
      html += activityBodyHtml(a) + (a.steps && a.steps.length ? startBtn(regDoit(a, a.title)) : "") + ratingHtml(id) + "</div>";
    });
    sheetBody.innerHTML = html;
    (blk.options || []).forEach(function (id) { wireRating(sheetBody, id); });
    backdrop.classList.add("open");
  }

  function openShoppingList() {
    var shop = ACTIVE.shoppingList || {};
    var html = '<span class="tag slot-main">Shopping</span><h3>' +
      (ACTIVE.__current ? "This week's" : ACTIVE.label + " ") + " shopping list</h3>";
    html += '<div class="meta">Buy these ahead of ' + (ACTIVE.label || ACTIVE.weekOf) + "</div>";
    if (shop.buy && shop.buy.length) {
      html += "<h4>To buy 🛒</h4><ul class='check'>" + shop.buy.map(checkLi).join("") + "</ul>";
    } else {
      html += "<p>Nothing to buy — everything's likely at home this week. 🎉</p>";
    }
    if (shop.have && shop.have.length) {
      html += "<h4>Gather from home</h4><ul class='check'>" + shop.have.map(checkLi).join("") + "</ul>";
    }
    sheetBody.innerHTML = html;
    // checkable items (persist per week)
    var sk = "dadcamp-shop-" + ACTIVE.weekOf, checked = loadJSON(sk);
    sheetBody.querySelectorAll(".check li").forEach(function (item, idx) {
      if (checked[idx]) item.classList.add("checked");
      item.addEventListener("click", function () {
        checked[idx] = !checked[idx];
        item.classList.toggle("checked", checked[idx]);
        saveJSON(sk, checked);
      });
    });
    backdrop.classList.add("open");
  }

  function openWeather(day) {
    var w = day.weather;
    if (!w) return;
    var html = '<span class="tag" style="background:var(--c-afternoon)">Weather</span>';
    html += "<h3>" + w.icon + " " + day.weekday + "</h3>";
    html += '<div class="meta">' + w.label + " · High " + w.high + "° / Low " + w.low +
      "° · " + w.pop + "% chance of rain</div>";
    if (w.hourly && w.hourly.length) {
      html += "<h4>Through the day</h4><ul class='wx-hours'>";
      html += w.hourly.map(function (h) {
        return "<li><span class='wh-t'>" + h.t + "</span><span class='wh-i'>" + h.ic +
          "</span><span class='wh-temp'>" + h.temp + "°</span><span class='wh-pop'>" +
          (h.pop > 0 ? "💧" + h.pop + "%" : "—") + "</span></li>";
      }).join("");
      html += "</ul>";
    }
    sheetBody.innerHTML = html;
    backdrop.classList.add("open");
  }

  function openEventDetail(ev) {
    if (!ev) return;
    var html = '<span class="tag slot-event">' + (ev.type || "Event") + "</span>";
    html += "<h3>" + evIcon(ev.type) + " " + ev.title + "</h3>";
    html += '<div class="meta">' + longDate(ev.date) + (ev.time ? " · " + ev.time : " · all day") + "</div>";
    if (ev.note) html += "<p>" + ev.note + "</p>";
    sheetBody.innerHTML = html;
    backdrop.classList.add("open");
  }

  function openPicks() {
    var loved = {}, disliked = {};
    (PREFS.loved || []).forEach(function (id) { loved[id] = 1; });
    (PREFS.disliked || []).forEach(function (id) { disliked[id] = 1; });
    Object.keys(favs).forEach(function (id) {
      if (favs[id] === 1) { loved[id] = 1; delete disliked[id]; }
      if (favs[id] === -1) { disliked[id] = 1; delete loved[id]; }
    });
    var title = function (id) { return (libById[id] || {}).title || id; };
    var html = '<span class="tag" style="background:#e8589b">Our picks</span><h3>What the girls love</h3>';
    html += '<div class="meta">Tap ❤️ / 👎 on any activity to update these.</div>';
    html += "<h4>❤️ Loved</h4><ul>" + (Object.keys(loved).length ? Object.keys(loved).map(function (id) { return li(title(id)); }).join("") : "<li>—</li>") + "</ul>";
    if (Object.keys(disliked).length) html += "<h4>👎 Not their thing</h4><ul>" + Object.keys(disliked).map(function (id) { return li(title(id)); }).join("") + "</ul>";
    var text = "Dad Camp ratings — loved: [" + Object.keys(loved).join(", ") + "]" +
      (Object.keys(disliked).length ? "; disliked: [" + Object.keys(disliked).join(", ") + "]" : "") +
      ". Please update data/preferences.js.";
    html += '<button class="done-toggle" id="copyPicks">📋 Copy to send Claude (locks them into planning)</button>';
    sheetBody.innerHTML = html;
    document.getElementById("copyPicks").addEventListener("click", function () {
      var btn = this;
      function ok() { btn.textContent = "✓ Copied — paste it to Claude"; btn.classList.add("is-done"); }
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(ok, function () { fallbackCopy(text); ok(); });
      else { fallbackCopy(text); ok(); }
    });
    backdrop.classList.add("open");
  }
  function fallbackCopy(t) {
    var ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta);
    ta.select(); try { document.execCommand("copy"); } catch (e) {} document.body.removeChild(ta);
  }

  function closeSheet() { backdrop.classList.remove("open"); }

  /* ───────────── Memories journal (photo + note per day, stored in IndexedDB) ───────────── */
  function idb(cb) {
    try {
      var req = indexedDB.open("dadcamp-mem", 1);
      req.onupgradeneeded = function (e) { var db = e.target.result; if (!db.objectStoreNames.contains("mem")) db.createObjectStore("mem", { keyPath: "id" }); };
      req.onsuccess = function (e) { cb(e.target.result); };
      req.onerror = function () { cb(null); };
    } catch (e) { cb(null); }
  }
  function memAll(cb) { idb(function (db) { if (!db) return cb([]); var r = db.transaction("mem", "readonly").objectStore("mem").getAll(); r.onsuccess = function () { cb(r.result || []); }; r.onerror = function () { cb([]); }; }); }
  function memPut(rec, cb) { idb(function (db) { if (!db) return cb && cb(); var t = db.transaction("mem", "readwrite"); t.objectStore("mem").put(rec); t.oncomplete = function () { cb && cb(); }; }); }
  function memDel(id, cb) { idb(function (db) { if (!db) return cb && cb(); var t = db.transaction("mem", "readwrite"); t.objectStore("mem").delete(id); t.oncomplete = function () { cb && cb(); }; }); }

  function openMemories() {
    mem.classList.add("open");
    activeDoitClose = function () { mem.classList.remove("open"); activeDoitClose = null; };
    renderMemories();
  }
  function renderMemories() {
    var head = '<div class="mem-top"><span class="mem-h">📸 Camp Memories</span>' +
      '<button class="doit-close" id="memClose" aria-label="Close">✕</button></div>';
    var form = '<div class="mem-form">' +
      '<input type="date" id="memDate" value="' + todayISO + '" />' +
      '<label class="mem-photo">📷 Add photo<input type="file" id="memFile" accept="image/*" capture="environment" hidden /></label>' +
      '<input type="text" id="memNote" placeholder="One line about today…" maxlength="140" />' +
      '<button class="mem-save" id="memSave">Save memory</button>' +
      '<span class="mem-filename" id="memFn"></span></div>';
    mem.innerHTML = head + form + '<div class="mem-actions"><button class="mem-export" id="memExport">⬇ Back up all (save to Drive)</button></div><div class="mem-gallery" id="memGallery">Loading…</div>';

    document.getElementById("memClose").onclick = function () { mem.classList.remove("open"); activeDoitClose = null; };
    var fileInput = document.getElementById("memFile"), chosen = null;
    var fnEl = document.getElementById("memFn");
    fileInput.onchange = function () { chosen = fileInput.files[0] || null; fnEl.textContent = chosen ? "✓ photo ready" : ""; };
    document.getElementById("memSave").onclick = function () {
      var note = document.getElementById("memNote").value.trim();
      var date = document.getElementById("memDate").value || todayISO;
      if (!chosen && !note) return;
      memPut({ id: Date.now() + "-" + Math.random().toString(36).slice(2, 6), date: date, note: note, blob: chosen, type: chosen ? chosen.type : "" }, function () {
        renderMemories();
      });
    };
    document.getElementById("memExport").onclick = exportMemories;

    memAll(function (list) {
      list.sort(function (a, b) { return (b.date || "").localeCompare(a.date || "") || (b.id > a.id ? 1 : -1); });
      var g = document.getElementById("memGallery");
      if (!list.length) { g.innerHTML = '<p class="mem-empty">No memories yet — snap a photo from today and add a line. 📷</p>'; return; }
      g.innerHTML = list.map(function (m) {
        var img = m.blob ? '<img src="' + URL.createObjectURL(m.blob) + '" alt="" />' : "";
        return '<div class="mem-card">' + img + '<div class="mem-meta"><strong>' + longDate(m.date) + "</strong>" +
          (m.note ? "<p>" + escapeHtml(m.note) + "</p>" : "") +
          '<button class="mem-del" data-id="' + m.id + '">🗑 Remove</button></div></div>';
      }).join("");
      g.querySelectorAll(".mem-del").forEach(function (b) {
        b.onclick = function () { memDel(b.getAttribute("data-id"), renderMemories); };
      });
    });
  }
  function exportMemories() {
    memAll(function (list) {
      if (!list.length) return;
      list.sort(function (a, b) { return (a.date || "").localeCompare(b.date || ""); });
      var done = 0, out = [];
      list.forEach(function (m, i) {
        if (!m.blob) { out[i] = { date: m.date, note: m.note, url: "" }; if (++done === list.length) build(); return; }
        var fr = new FileReader();
        fr.onload = function () { out[i] = { date: m.date, note: m.note, url: fr.result }; if (++done === list.length) build(); };
        fr.onerror = function () { out[i] = { date: m.date, note: m.note, url: "" }; if (++done === list.length) build(); };
        fr.readAsDataURL(m.blob);
      });
      function build() {
        var html = '<!doctype html><html><head><meta charset="utf-8"><title>Dad Camp Memories</title>' +
          '<style>body{font-family:-apple-system,Segoe UI,sans-serif;max-width:680px;margin:0 auto;padding:18px;background:#fdf8ec}' +
          'h1{color:#2c4a8a}img{max-width:100%;border-radius:14px}.m{margin:22px 0;padding-bottom:18px;border-bottom:2px solid #efe7d2}h3{margin:6px 0;color:#2c4a8a}</style></head><body>' +
          "<h1>🏕️ Dad Camp 2026 — Memories</h1>" +
          out.map(function (x) { return '<div class="m"><h3>' + longDate(x.date) + "</h3>" + (x.url ? '<img src="' + x.url + '">' : "") + (x.note ? "<p>" + escapeHtml(x.note) + "</p>" : "") + "</div>"; }).join("") +
          "</body></html>";
        var a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([html], { type: "text/html" }));
        a.download = "dad-camp-memories.html";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
      }
    });
  }
  function escapeHtml(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ───────────── "Do-it" mode — full-screen step-by-step ───────────── */
  function regDoit(det, title) { doitReg.push({ det: det, title: title }); return doitReg.length - 1; }
  function startBtn(k) { return '<button class="doit-start" data-doit="' + k + '">▶ Do it — step by step</button>'; }

  function openDoIt(target) {
    if (!target) return;
    var steps = (target.det && target.det.steps) || [];
    if (!steps.length) return;
    var idx = 0, checked = [], sx = 0;

    function render() {
      var html = '<div class="doit-top"><span class="doit-title">' + target.title +
        '</span><button class="doit-close" id="doitClose" aria-label="Close">✕</button></div>';
      if (idx >= steps.length) {
        html += '<div class="doit-body doit-done"><div class="doit-big">🎉 All done!</div>' +
          "<p>Great job — high fives, then clean-up time.</p>" +
          '<button class="doit-finish" id="doitFinish">Finish</button></div>';
      } else {
        html += '<div class="doit-dots">';
        for (var i = 0; i < steps.length; i++) html += '<span class="dot' + (i === idx ? " cur" : "") + (checked[i] ? " ok" : "") + '"></span>';
        html += "</div>";
        html += '<div class="doit-count">Step ' + (idx + 1) + " of " + steps.length + "</div>";
        html += '<div class="doit-body"><p class="doit-big">' + steps[idx] + "</p>" +
          '<label class="doit-check' + (checked[idx] ? " on" : "") + '" id="doitCheck"><span class="box"></span> Mark this step done</label>' +
          '<button class="doit-read" id="doitRead">🔊 Read aloud</button></div>';
        html += '<div class="doit-nav">' +
          '<button class="doit-btn back" id="doitBack"' + (idx === 0 ? " disabled" : "") + ">← Back</button>" +
          '<button class="doit-btn next" id="doitNext">' + (idx === steps.length - 1 ? "Finish →" : "Next →") + "</button></div>";
      }
      doit.innerHTML = html;
      wire();
    }
    function wire() {
      bind("doitClose", close); bind("doitFinish", close);
      bind("doitBack", function () { if (idx > 0) { idx--; render(); } });
      bind("doitNext", function () { idx++; render(); });
      bind("doitCheck", function () { checked[idx] = !checked[idx]; render(); });
      bind("doitRead", function () { speak(steps[idx]); });
    }
    function bind(id, fn) { var el = document.getElementById(id); if (el) el.onclick = fn; }
    function onStart(e) { sx = e.changedTouches[0].clientX; }
    function onEnd(e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) { if (dx < 0 && idx < steps.length) { idx++; render(); } else if (dx > 0 && idx > 0) { idx--; render(); } }
    }
    function close() {
      doit.classList.remove("open");
      try { window.speechSynthesis.cancel(); } catch (e) {}
      doit.removeEventListener("touchstart", onStart);
      doit.removeEventListener("touchend", onEnd);
      activeDoitClose = null;
    }
    doit.addEventListener("touchstart", onStart);
    doit.addEventListener("touchend", onEnd);
    activeDoitClose = close;
    render();
    doit.classList.add("open");
  }
  function speak(t) { try { window.speechSynthesis.cancel(); window.speechSynthesis.speak(new SpeechSynthesisUtterance(t)); } catch (e) {} }

  /* ───────────── favorites / rating ───────────── */
  function ratingHtml(id) {
    if (!id) return "";
    var v = favs[id] || 0;
    return '<div class="rate" data-id="' + id + '">' +
      '<span class="rate-label">The girls think…</span>' +
      '<button class="rate-btn love' + (v === 1 ? " on" : "") + '" data-v="1">❤️ Love it</button>' +
      '<button class="rate-btn meh' + (v === -1 ? " on" : "") + '" data-v="-1">👎 Meh</button>' +
      "</div>";
  }
  function wireRating(root, id) {
    if (!id) return;
    var box = root.querySelector('.rate[data-id="' + id + '"]');
    if (!box) return;
    box.querySelectorAll(".rate-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var v = +btn.getAttribute("data-v");
        favs[id] = (favs[id] === v) ? 0 : v;
        saveJSON(FAV_KEY, favs);
        box.querySelectorAll(".rate-btn").forEach(function (b) { b.classList.remove("on"); });
        if (favs[id] === 1) box.querySelector(".love").classList.add("on");
        if (favs[id] === -1) box.querySelector(".meh").classList.add("on");
        renderDays();
      });
    });
  }
  function isLovedId(id) { return id && (favs[id] === 1 || (PREFS.loved || []).indexOf(id) !== -1); }
  function isLoved(blk) {
    if (isLovedId(blk.activityId)) return true;
    return (blk.options || []).some(isLovedId);
  }

  function activityBodyHtml(det) {
    var html = "";
    var mats = det.materials;
    if (mats) {
      if (mats.have && mats.have.length) html += "<h4>Have at home</h4><ul>" + mats.have.map(li).join("") + "</ul>";
      if (mats.buy && mats.buy.length) html += "<h4>To buy 🛒</h4><ul class='mat-buy'>" + mats.buy.map(li).join("") + "</ul>";
    }
    if (det.steps && det.steps.length) html += "<h4>Steps</h4><ol>" + det.steps.map(li).join("") + "</ol>";
    if (det.youtube) html += '<a class="yt" href="' + det.youtube + '" target="_blank" rel="noopener">▶ Watch how-to on YouTube</a>';
    if (det.rainBackup) html += '<div class="rain">☔ <strong>Rain backup:</strong> ' + det.rainBackup + "</div>";
    return html;
  }

  /* ───────────── helpers ───────────── */
  function resolve(blk) {
    if (blk.activityId && libById[blk.activityId]) return libById[blk.activityId];
    if (blk.custom) return blk.custom;
    return null;
  }
  // effective activity id for a block (honors a user "swap" override)
  function blockKey(day, blk) { return day.date + "|" + blk.time + "|" + (blk.slot || ""); }
  function effId(day, blk) {
    var k = blockKey(day, blk);
    return (overrides[k] && libById[overrides[k]]) ? overrides[k] : blk.activityId;
  }
  function effDet(day, blk) {
    var id = effId(day, blk);
    return (id && libById[id]) ? libById[id] : resolve(blk);
  }
  function isOverridden(day, blk) { var k = blockKey(day, blk); return overrides[k] && overrides[k] !== blk.activityId; }
  function canSwap(blk) { return !!blk.activityId && !blk.options && !blk.fixed; }

  function swapActivity(day, blk) {
    var curId = effId(day, blk), cur = libById[curId];
    if (!cur) return;
    var slot = cur.slot, noCar = day.dayType === "no-car";
    var used = {};
    ACTIVE.days.forEach(function (d) { d.blocks.forEach(function (b) { var id = effId(d, b); if (id) used[id] = 1; }); });
    var cands = LIB.filter(function (a) {
      if (a.slot !== slot || a.id === curId) return false;
      if ((PREFS.disliked || []).indexOf(a.id) !== -1) return false;
      if (noCar && DRIVE_IDS.indexOf(a.id) !== -1) return false;
      return true;
    });
    var fresh = cands.filter(function (a) { return !used[a.id]; });
    var pool = fresh.length ? fresh : cands;
    if (!pool.length) return;
    var lovedPool = pool.filter(function (a) { return isLovedId(a.id); });
    var pick = (lovedPool.length && Math.random() < 0.5) ? rand(lovedPool) : rand(pool);
    overrides[blockKey(day, blk)] = pick.id;
    saveJSON(OVR_KEY, overrides);
  }
  function resetBlock(day, blk) { delete overrides[blockKey(day, blk)]; saveJSON(OVR_KEY, overrides); }
  function rand(a) { return a[Math.floor(Math.random() * a.length)]; }
  function li(s) { return "<li>" + s + "</li>"; }
  function checkLi(s) { return '<li><span class="box"></span>' + s + "</li>"; }
  function doneKey(date, time, slot) { return date + "|" + time + "|" + slot; }
  function loadJSON(k) { try { return JSON.parse(localStorage.getItem(k)) || {}; } catch (e) { return {}; } }
  function saveJSON(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function prettyDayType(t) {
    return { "full-day-outing": "🌄 Full-Day Outing", "half-day-outing": "🚲 Half-Day Outing",
      "low-key": "🛋️ Low-Key Day", "gym-day": "🤸 Gymnastics Day",
      "no-car": "🚗 No-Car Day — staying local" }[t] || t;
  }
  function evIcon(t) { return { holiday: "🎆", birthday: "🎂", trip: "✈️", appointment: "🩺", event: "🎉" }[t] || "🎉"; }
  function toMin(hm) { var p = hm.split(":"); return (+p[0]) * 60 + (+p[1] || 0); }
  function inNow(t) {
    var m = t.split("-"); var s = toMin(m[0]); var e = m[1] ? toMin(m[1]) : s + 30;
    return nowMin >= s && nowMin < e;
  }
  function scrollToToday() {
    var idx = -1;
    ACTIVE.days.forEach(function (d, i) { if (d.date === todayISO) idx = i; });
    if (idx >= 0) { var el = document.getElementById("day-" + idx); if (el) setTimeout(function () { el.scrollIntoView({ block: "start" }); }, 60); }
  }
  function localISODate(d) {
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function shortDate(iso) { var d = new Date(iso + "T00:00:00"); return (d.getMonth() + 1) + "/" + d.getDate(); }
  function longDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(undefined, { month: "long", day: "numeric" });
  }
})();
