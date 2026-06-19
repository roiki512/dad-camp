/* Dad Camp web app — renders the week from data/week.js using the library + profile.
   No build step, no framework: globals are set by the data/*.js files. */
(function () {
  "use strict";

  var WEEK = window.DADCAMP_WEEK;
  var LIB = window.DADCAMP_LIBRARY || [];
  var PROFILE = window.DADCAMP_PROFILE || {};
  var libById = {};
  LIB.forEach(function (a) { libById[a.id] = a; });

  var SLOT_NAMES = {
    learning: "Learning", main: "Main Activity", quiet: "Quiet Time",
    afternoon: "Afternoon", outdoor: "Outdoor", free: "Free / Family", gym: "Gymnastics"
  };
  var DONE_KEY = "dadcamp-done";
  var done = loadDone();

  var app = document.getElementById("app");
  var dayNav = document.getElementById("dayNav");
  var weekLabel = document.getElementById("weekLabel");
  var backdrop = document.getElementById("sheetBackdrop");
  var sheetBody = document.getElementById("sheetBody");

  if (!WEEK || !WEEK.days) {
    app.innerHTML = '<p class="loading">No week is scheduled yet. Ask Claude to generate one!</p>';
    return;
  }

  weekLabel.textContent = WEEK.label || ("Week of " + WEEK.weekOf);
  var todayISO = new Date().toISOString().slice(0, 10);

  renderDayNav();
  renderDays();
  wireSheet();
  document.getElementById("shopBtn").addEventListener("click", openShoppingList);

  /* ───────────── rendering ───────────── */
  function renderDayNav() {
    dayNav.innerHTML = "";
    WEEK.days.forEach(function (day, i) {
      var b = document.createElement("button");
      b.innerHTML = day.weekday + '<span class="dn-date">' + shortDate(day.date) + "</span>";
      if (day.date === todayISO) b.classList.add("active");
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
    WEEK.days.forEach(function (day, i) {
      var sec = document.createElement("section");
      sec.className = "day" + (day.date === todayISO ? " is-today" : "");
      sec.id = "day-" + i;

      var head = '<div class="day-head"><h2>' + day.weekday +
        (day.date === todayISO ? '<span class="today-pill">TODAY</span>' : "") +
        '</h2><span class="date">' + longDate(day.date) + "</span></div>";

      var banner = "";
      if (day.dayType && day.dayType !== "standard") {
        banner = '<div class="daytype-banner">' + (day.dayTypeLabel || prettyDayType(day.dayType)) + "</div>";
      }

      var blocksHtml = '<div class="blocks">' +
        (day.blocks || []).map(function (blk, j) { return renderBlock(day, i, blk, j); }).join("") +
        "</div>";

      sec.innerHTML = head + banner + blocksHtml;
      app.appendChild(sec);
    });
  }

  function renderBlock(day, di, blk, bi) {
    var det = resolve(blk);
    var slot = blk.slot || "fixed";
    var isFixed = !!blk.fixed || !det && !blk.title;
    var key = doneKey(day.date, blk.time, slot);
    var clickable = !isFixed;

    var sub = blk.note || (det && det.location ? capitalize(det.location) + (det.duration ? " · " + det.duration : "") : "");
    if (blk.kid) sub = (blk.kid ? blk.kid + " · " : "") + (sub || "");
    if (blk.weatherNote) sub = blk.weatherNote + (sub ? " · " + sub : "");

    var classes = "block slot-" + slot + (isFixed ? " fixed" : "") + (blk.big ? " big-block" : "") + (done[key] ? " done" : "");
    var tag = clickable ? '<span class="tag slot-' + slot + '">' + (SLOT_NAMES[slot] || slot) + "</span>" : "";

    var attrs = clickable ? ' data-di="' + di + '" data-bi="' + bi + '"' : "";
    var tagName = clickable ? "button" : "div";

    return "<" + tagName + ' class="' + classes + '"' + attrs + ">" +
      '<span class="stripe"></span>' +
      '<span class="time">' + blk.time + "</span>" +
      '<span class="body">' +
      '<span class="b-title">' + tag + (blk.title || (det && det.title) || "Activity") + "</span>" +
      (sub ? '<span class="b-sub">' + sub + "</span>" : "") +
      "</span>" +
      (clickable ? '<span class="chev">›</span>' : "") +
      "</" + tagName + ">";
  }

  /* ───────────── detail sheet ───────────── */
  function wireSheet() {
    app.addEventListener("click", function (e) {
      var b = e.target.closest(".block[data-di]");
      if (!b) return;
      var day = WEEK.days[+b.getAttribute("data-di")];
      var blk = day.blocks[+b.getAttribute("data-bi")];
      openDetail(day, blk);
    });
    document.getElementById("sheetClose").addEventListener("click", closeSheet);
    backdrop.addEventListener("click", function (e) { if (e.target === backdrop) closeSheet(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeSheet(); });
  }

  function openDetail(day, blk) {
    var det = resolve(blk) || {};
    var slot = blk.slot || "main";
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

    var mats = det.materials || (blk.custom && blk.custom.materials);
    if (mats) {
      if (mats.have && mats.have.length) {
        html += "<h4>Have at home</h4><ul>" + mats.have.map(li).join("") + "</ul>";
      }
      if (mats.buy && mats.buy.length) {
        html += "<h4>To buy 🛒</h4><ul class='mat-buy'>" + mats.buy.map(li).join("") + "</ul>";
      }
    }

    var steps = det.steps || (blk.custom && blk.custom.steps);
    if (steps && steps.length) {
      html += "<h4>Steps</h4><ol>" + steps.map(li).join("") + "</ol>";
    }

    var yt = det.youtube || (blk.custom && blk.custom.youtube);
    if (yt) html += '<a class="yt" href="' + yt + '" target="_blank" rel="noopener">▶ Watch how-to on YouTube</a>';

    if (det.rainBackup) html += '<div class="rain">☔ <strong>Rain backup:</strong> ' + det.rainBackup + "</div>";

    html += '<button class="done-toggle' + (done[key] ? " is-done" : "") +
      '" data-key="' + key + '">' + (done[key] ? "✓ Done!" : "Mark as done") + "</button>";

    sheetBody.innerHTML = html;
    var btn = sheetBody.querySelector(".done-toggle");
    btn.addEventListener("click", function () {
      done[key] = !done[key];
      saveDone();
      btn.classList.toggle("is-done", done[key]);
      btn.textContent = done[key] ? "✓ Done!" : "Mark as done";
      renderDays();
    });
    backdrop.classList.add("open");
  }

  function openShoppingList() {
    var shop = WEEK.shoppingList || {};
    var html = '<span class="tag slot-main">Shopping</span><h3>This week\'s shopping list</h3>';
    html += '<div class="meta">Buy these ahead of ' + (WEEK.label || WEEK.weekOf) + "</div>";
    if (shop.buy && shop.buy.length) {
      html += "<h4>To buy 🛒</h4><ul class='mat-buy'>" + shop.buy.map(li).join("") + "</ul>";
    } else {
      html += "<p>Nothing to buy — everything's likely at home this week. 🎉</p>";
    }
    if (shop.have && shop.have.length) {
      html += "<h4>Gather from home</h4><ul>" + shop.have.map(li).join("") + "</ul>";
    }
    sheetBody.innerHTML = html;
    backdrop.classList.add("open");
  }

  function closeSheet() { backdrop.classList.remove("open"); }

  /* ───────────── helpers ───────────── */
  function resolve(blk) {
    if (blk.activityId && libById[blk.activityId]) return libById[blk.activityId];
    if (blk.custom) return blk.custom;
    return null;
  }
  function li(s) { return "<li>" + s + "</li>"; }
  function doneKey(date, time, slot) { return date + "|" + time + "|" + slot; }
  function loadDone() { try { return JSON.parse(localStorage.getItem(DONE_KEY)) || {}; } catch (e) { return {}; } }
  function saveDone() { try { localStorage.setItem(DONE_KEY, JSON.stringify(done)); } catch (e) {} }
  function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function prettyDayType(t) {
    return { "full-day-outing": "🌄 Full-Day Outing", "half-day-outing": "🚲 Half-Day Outing",
      "low-key": "🛋️ Low-Key Day", "gym-day": "🤸 Gymnastics Day" }[t] || t;
  }
  function shortDate(iso) { var d = new Date(iso + "T00:00:00"); return (d.getMonth() + 1) + "/" + d.getDate(); }
  function longDate(iso) {
    var d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(undefined, { month: "long", day: "numeric" });
  }
})();
