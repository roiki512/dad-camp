/* Dad Camp week validator — common-sense guardrails.
   Run:  node validate.js            (checks data/week.js)
         node validate.js weeks/X.js (checks an archived week)
   Exits 1 if there are ERRORS. The weekly routine runs this and self-corrects. */
var path = require("path");
global.window = {};
require("./data/library.js");
require("./data/profile.js");
try { require("./data/preferences.js"); } catch (e) {}
var PREFS = window.DADCAMP_PREFERENCES || { loved: [], disliked: [] };
var target = process.argv[2] || "./data/week.js";
if (target.indexOf("/") === -1 && target.indexOf("\\") === -1) target = "./" + target;
require(path.resolve(target));

var LIB = window.DADCAMP_LIBRARY, WEEK = window.DADCAMP_WEEK || window.__archive;
var byId = {}; LIB.forEach(function (a) { byId[a.id] = a; });

// explicit categories so we never false-positive (e.g. salt-dough is "craft", not "painting")
var CAT = {
  "out-pool": "water", "out-waterplay": "water",
  "aft-bigbake": "cooking", "free-cookdinner": "cooking", "main-bakecookies": "cooking", "main-minipizzas": "cooking",
  "main-rockpainting": "painting", "aft-pottery-studio": "painting", "main-pottery-paint": "painting", "main-handprintart": "painting",
  "quiet-boardgame-quiet": "boardgame", "free-boardgame": "boardgame"
};
var DRIVE = ["aft-urbanair", "aft-pottery-studio", "aft-museum"];

var errors = [], warns = [];
function err(s) { errors.push(s); }
function warn(s) { warns.push(s); }
function idsOf(b) { return b.activityId ? [b.activityId] : (b.options || []); }
function toMin(t) { var p = (t || "0:0").split("-")[0].split(":"); return (+p[0]) * 60 + (+p[1] || 0); }

if (!WEEK || !WEEK.days) { console.log("ERROR: no week object found in " + target); process.exit(1); }

var days = WEEK.days;
var libDayIdx = [], soloDayIdx = [], mainCrafts = [], fixedWaterDays = [];

days.forEach(function (d, i) {
  var seenCat = {};
  var hasWorkbook = false, hasOutdoorWater = false;
  d.blocks.forEach(function (b) {
    // dangling ids
    idsOf(b).forEach(function (id) { if (!byId[id]) err(d.weekday + ": unknown activity id '" + id + "'"); });
    if (b.activityId === "learn-workbooks") hasWorkbook = true;
    if (b.activityId === "aft-library") libDayIdx.push(i);
    if (b.activityId === "quiet-soloreading") soloDayIdx.push(i);
    if (b.slot === "main" && b.activityId) mainCrafts.push(b.activityId);
    if (b.slot === "dinner" || b.slot === "bedtime") err(d.weekday + ": dinner/bedtime should be removed");

    // same-category stacking (skip choice blocks — kid picks one)
    if (!b.options && b.activityId) {
      var c = CAT[b.activityId];
      if (c) { if (seenCat[c]) err(d.weekday + ": two " + c + " activities same day (" + seenCat[c] + " + " + b.activityId + ")"); seenCat[c] = b.activityId; }
      if (c === "water") hasOutdoorWater = true;
    }
    // outdoor needs a rain backup
    if (b.slot === "outdoor") {
      if (b.options) { b.options.forEach(function (id) { if (byId[id] && !byId[id].rainBackup) warn(d.weekday + ": outdoor option '" + id + "' has no rainBackup"); }); }
      else if (b.activityId && byId[b.activityId] && !byId[b.activityId].rainBackup) warn(d.weekday + ": outdoor '" + b.activityId + "' has no rainBackup");
      if (b.options && b.options.some(function (id) { return CAT[id] === "water"; })) hasOutdoorWater = true;
    }
    // Thursday no-car: no drive-required activities
    if (d.weekday === "Thursday" && DRIVE.indexOf(b.activityId) !== -1) err("Thursday (no-car): drive-required activity '" + b.activityId + "'");
  });
  if (!hasWorkbook) warn(d.weekday + ": no Workbook Time");
  if (hasOutdoorWater && !d.blocks.some(function (b) { return b.options; })) fixedWaterDays.push(d.weekday);
});

// fixed commitments present
function hasSlot(weekday, slot) { var d = days.find(function (x) { return x.weekday === weekday; }); return d && d.blocks.some(function (b) { return b.slot === slot; }); }
if (!hasSlot("Tuesday", "gym")) err("Tuesday: gymnastics block missing");
if (!hasSlot("Friday", "gym")) err("Friday: gymnastics block missing");
if (!hasSlot("Wednesday", "piano")) err("Wednesday: Ariel piano block missing");
var thu = days.find(function (d) { return d.weekday === "Thursday"; });
if (thu && thu.dayType !== "no-car") warn("Thursday: dayType should be 'no-car'");

// no repeated main craft
mainCrafts.filter(function (c, i) { return mainCrafts.indexOf(c) !== i; }).forEach(function (c) { err("repeated main-activity within the week: " + c); });

// solo reading must be 1–2 days after a library visit
soloDayIdx.forEach(function (s) {
  if (libDayIdx.length && !libDayIdx.some(function (l) { return s - l >= 1 && s - l <= 2; }))
    err(days[s].weekday + ": solo reading not 1–2 days after a library visit");
});

// NO reading-of-books (read-aloud or solo reading) before the library visit
var READING = ["learn-readaloud", "quiet-soloreading"];
if (libDayIdx.length) {
  var libDay = libDayIdx[0], libStart = 0;
  days[libDay].blocks.forEach(function (b) { if (b.activityId === "aft-library") libStart = toMin(b.time); });
  days.forEach(function (d, i) {
    d.blocks.forEach(function (b) {
      if (READING.indexOf(b.activityId) === -1) return;
      if (i < libDay) err(d.weekday + ": reading ('" + b.activityId + "') is BEFORE the library day (" + days[libDay].weekday + ") — put reading on/after it");
      else if (i === libDay && toMin(b.time) < libStart) err(d.weekday + ": reading ('" + b.activityId + "') is earlier in the day than the library trip — move it after");
    });
  });
}

// 2nd water/pool day should be a choice
if (fixedWaterDays.length >= 2) warn("2+ fixed water days (" + fixedWaterDays.join(", ") + ") — make the 2nd a choice block (options)");

// ── balance scoring (softer warnings; aim for a well-rounded week) ──
var loved = PREFS.loved || [], disliked = PREFS.disliked || [];
var activeDays = 0, outings = 0, screen = 0, lovedUsed = 0, oneOnOne = false;
var typeSet = {};
var OUTING_PREFIX = ["aft-library", "aft-urbanair", "aft-pottery-studio", "aft-museum", "aft-playdate", "aft-bigbake", "aft-bigcraft"];
days.forEach(function (d) {
  var dayActive = d.dayType === "full-day-outing" || d.dayType === "gym-day";
  d.blocks.forEach(function (b) {
    var a = b.activityId && byId[b.activityId];
    if (a && a.energy === "high") dayActive = true;
    if (b.slot === "gym") dayActive = true;
    if (OUTING_PREFIX.indexOf(b.activityId) !== -1 || d.dayType === "full-day-outing") outings++;
    if (a && (a.tags || []).indexOf("screen") !== -1) screen++;
    if (loved.indexOf(b.activityId) !== -1) lovedUsed++;
    (b.options || []).forEach(function (id) { if (loved.indexOf(id) !== -1) lovedUsed++; });
    if (disliked.indexOf(b.activityId) !== -1) warn(d.weekday + ": uses a disliked activity '" + b.activityId + "'");
    if (b.kid === "Ariel" && b.slot === "free") oneOnOne = true; // Dad+Ariel 1-on-1
    if (a && (a.tags || []).length) (a.tags || []).forEach(function (t) { typeSet[t] = 1; });
  });
  if (dayActive) activeDays++;
});
if (activeDays < 2) warn("balance: only " + activeDays + " active day(s) — aim for ≥2 (outdoor/gym/outing)");
if (outings < 1) warn("balance: no outing this week — add at least one (library, pottery, playdate, etc.)");
if (screen > 1) warn("balance: " + screen + " screen activities — keep it to the one Friday movie");
if (lovedUsed === 0 && loved.length) warn("balance: week includes none of the girls' loved activities");
if (!oneOnOne) warn("balance: no Dad + Ariel 1-on-1 block (Friday) found");
if (Object.keys(typeSet).length < 5) warn("balance: low variety of activity types (" + Object.keys(typeSet).length + ")");

console.log("Validating " + target + " — " + days.length + " days\n");
if (errors.length) { console.log("ERRORS (" + errors.length + "):"); errors.forEach(function (e) { console.log("  ✗ " + e); }); }
if (warns.length) { console.log("WARNINGS (" + warns.length + "):"); warns.forEach(function (w) { console.log("  ! " + w); }); }
if (!errors.length && !warns.length) console.log("All checks passed ✓");
process.exit(errors.length ? 1 : 0);
