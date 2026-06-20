/* Dad Camp web app — renders a week from data/week.js (current) or an archived week,
   using the library + profile. No build step: globals come from the data/*.js files. */
(function () {
  "use strict";

  var WEEK = window.DADCAMP_WEEK;                 // the current/live week
  var LIB = window.DADCAMP_LIBRARY || [];
  var PROFILE = window.DADCAMP_PROFILE || {};
  var PREFS = window.DADCAMP_PREFERENCES || { loved: [], disliked: [] };
  var WEEKS_INDEX = window.DADCAMP_WEEKS_INDEX || null;
  var libById = {};
  LIB.forEach(function (a) { libById[a.id] = a; });

  var SLOT_NAMES = {
    learning: "Learning", main: "Main Activity", quiet: "Quiet Time",
    afternoon: "Afternoon", outdoor: "Outdoor", free: "Free / Family", gym: "Gymnastics", piano: "Piano"
  };
  var DONE_KEY = "dadcamp-done", FAV_KEY = "dadcamp-favs";
  var done = loadJSON(DONE_KEY), favs = loadJSON(FAV_KEY);

  var app = document.getElementById("app");
  var dayNav = document.getElementById("dayNav");
  var weekLabel = document.getElementById("weekLabel");
  var controls = document.getElementById("controls");
  var backdrop = document.getElementById("sheetBackdrop");
  var sheetBody = document.getElementById("sheetBody");

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

      var blocksHtml = '<div class="blocks">' +
        (day.blocks || []).map(function (blk, j) { return renderBlock(day, i, blk, j, isToday); }).join("") +
        "</div>";

      sec.innerHTML = head + banner + blocksHtml;
      app.appendChild(sec);
    });
  }

  function renderBlock(day, di, blk, bi, isToday) {
    // per-kid filter
    if (filterKid !== "both" && blk.kid && blk.kid !== filterKid) return "";

    var det = resolve(blk);
    var slot = blk.slot || "fixed";
    var isFixed = !!blk.fixed || (!det && !blk.title);
    var key = doneKey(day.date, blk.time, slot);
    var clickable = !isFixed;
    var loved = isLoved(blk);

    var sub;
    if (blk.options) {
      sub = "Pick one: " + blk.options.map(function (id) { return (libById[id] || {}).title || id; }).join(" · ");
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
      '<span class="b-title">' + tag + (blk.title || (det && det.title) || "Activity") + " " + heart + "</span>" +
      (sub ? '<span class="b-sub">' + sub + "</span>" : "") +
      "</span>" +
      (clickable ? '<span class="chev">›</span>' : "") +
      "</" + tagName + ">";
  }

  /* ───────────── detail sheet ───────────── */
  function wireSheet() {
    app.addEventListener("click", function (e) {
      var wx = e.target.closest(".wx");
      if (wx) { openWeather(ACTIVE.days[+wx.getAttribute("data-wx")]); return; }
      var b = e.target.closest(".block[data-di]");
      if (!b) return;
      var day = ACTIVE.days[+b.getAttribute("data-di")];
      var blk = day.blocks[+b.getAttribute("data-bi")];
      openDetail(day, blk);
    });
    document.getElementById("sheetClose").addEventListener("click", closeSheet);
    backdrop.addEventListener("click", function (e) { if (e.target === backdrop) closeSheet(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeSheet(); });
  }

  function openDetail(day, blk) {
    var slot = blk.slot || "main";
    if (blk.options) { openChoice(blk, slot); return; }
    var det = resolve(blk) || {};
    var title = blk.title || det.title || "Activity";
    var key = doneKey(day.date, blk.time, slot);

    var html = '<span class="tag slot-' + slot + '">' + (SLOT_NAMES[slot] || slot) + "</span>";
    html += "<h3>" + title + "</h3>";
    var metaBits = [blk.time];
    if (det.duration) metaBits.push(det.duration);
    if (det.location) metaBits.push(capitalize(det.location));
    if (det.energy) metaBits.push(det.energy + " energy");
    html += '<div class="meta">' + metaBits.join(" · ") + "</div>";

    if (blk.note) html += "<p>" + blk.note + "</p>";
    if (blk.weatherNote) html += '<div class="rain">🌤️ ' + blk.weatherNote + "</div>";

    html += activityBodyHtml(det);
    html += ratingHtml(blk.activityId);

    html += '<button class="done-toggle' + (done[key] ? " is-done" : "") +
      '" data-key="' + key + '">' + (done[key] ? "✓ Done!" : "Mark as done") + "</button>";

    sheetBody.innerHTML = html;
    wireRating(sheetBody, blk.activityId);
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
      html += activityBodyHtml(a) + ratingHtml(id) + "</div>";
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

  function closeSheet() { backdrop.classList.remove("open"); }

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
