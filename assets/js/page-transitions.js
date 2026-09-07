(function () {
  "use strict";

  var STORAGE_KEY = "pt-arriving";
  var EXIT_DURATION = 650; // ms, before navigating
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var HACK_LINES = [
    "$ activetigger --annotate --frugal",
    "importing 50000 abstracts...",
    "[ok] tokenizing corpus (fr, en, ja)",
    "training self-organising map... epoch 12/40",
    "resolving co-authorship network (n=214 nodes)",
    "computing field of French economists...",
    "git commit -m 'new results, MASHS 2026'",
    "compiling doctoral thesis chapters -> journals",
    "render(researchMap, {planets: 5, satellites: true})",
    "ssh crest@ip-paris -- 'python train_bert.py'",
    "[warn] jury_agreement < 1.0, arbitrating disagreements",
    "loading Tokyo research stay: Dec 2026 -> Mar 2027",
    "status: 200 OK — page ready",
  ];

  function buildOverlay() {
    var el = document.createElement("div");
    el.id = "pt-overlay";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML =
      '<div class="pt-hack-scene">' +
      '<div class="pt-hack-lines"></div>' +
      '<div class="pt-hack-status">compiling</div>' +
      "</div>";
    document.body.appendChild(el);
    return el;
  }

  function fillHackLines(overlay) {
    var container = overlay.querySelector(".pt-hack-lines");
    if (!container) return;
    var lines = HACK_LINES.slice();
    // shuffle a bit for variety
    lines.sort(function () { return Math.random() - 0.5; });
    container.textContent = lines.join("\n");
  }

  function isInternalNavLink(a) {
    if (!a || !a.href) return false;
    if (a.target && a.target !== "" && a.target !== "_self") return false;
    if (a.hasAttribute("download")) return false;
    var url;
    try {
      url = new URL(a.href, window.location.href);
    } catch (e) {
      return false;
    }
    if (url.origin !== window.location.origin) return false;
    // same-page anchor (e.g. #economists on the research page): let the browser handle it
    if (url.pathname === window.location.pathname && url.hash) return false;
    if (url.href === window.location.href) return false;
    return true;
  }

  function onLoad() {
    var overlay = buildOverlay();
    var arriving = sessionStorage.getItem(STORAGE_KEY);
    if (arriving && !reduceMotion) {
      sessionStorage.removeItem(STORAGE_KEY);
      overlay.classList.add("pt-active");
      fillHackLines(overlay);
      requestAnimationFrame(function () {
        overlay.classList.add("pt-enter");
      });
      setTimeout(function () {
        overlay.classList.remove("pt-active", "pt-enter");
      }, 900);
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }

    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      var a = e.target.closest ? e.target.closest("a") : null;
      if (!a || !isInternalNavLink(a)) return;

      var isNavLink =
        a.closest("#navbarNav") ||
        a.classList.contains("navbar-brand") ||
        a.hasAttribute("data-pt-transition");
      if (!isNavLink) return;

      if (reduceMotion) return; // let the browser navigate normally

      e.preventDefault();
      var href = a.href;
      sessionStorage.setItem(STORAGE_KEY, "1");

      overlay.classList.add("pt-active");
      fillHackLines(overlay);
      requestAnimationFrame(function () {
        overlay.classList.add("pt-exit");
      });

      setTimeout(function () {
        window.location.href = href;
      }, EXIT_DURATION);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onLoad);
  } else {
    onLoad();
  }
})();
