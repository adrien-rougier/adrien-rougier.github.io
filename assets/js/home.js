document.addEventListener("DOMContentLoaded", function () {
  var openBtn = document.getElementById("poster-thumb-btn");
  var closeBtn = document.getElementById("poster-lightbox-close");
  var lightbox = document.getElementById("poster-lightbox");
  var img = document.getElementById("poster-lightbox-img");
  if (!openBtn || !lightbox || !img) return;

  var MIN_SCALE = 1;
  var MAX_SCALE = 4;
  var CLICK_ZOOM = 2.5;
  var scale = 1;
  var tx = 0;
  var ty = 0;
  var dragging = false;
  var dragMoved = false;
  var lastX = 0;
  var lastY = 0;

  function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }

  function updateTransform() {
    img.style.transform = "translate(" + tx + "px, " + ty + "px) scale(" + scale + ")";
    img.classList.toggle("is-zoomed", scale > 1);
  }

  function resetZoom() {
    scale = 1;
    tx = 0;
    ty = 0;
    updateTransform();
  }

  function setScale(next) {
    scale = clamp(next, MIN_SCALE, MAX_SCALE);
    if (scale === 1) {
      tx = 0;
      ty = 0;
    }
    updateTransform();
  }

  function open() {
    lightbox.hidden = false;
    resetZoom();
  }
  function close() {
    lightbox.hidden = true;
    resetZoom();
  }

  openBtn.addEventListener("click", open);
  if (closeBtn) closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });

  // Scroll wheel to zoom in/out
  img.addEventListener(
    "wheel",
    function (e) {
      e.preventDefault();
      setScale(scale + (e.deltaY < 0 ? 0.3 : -0.3));
    },
    { passive: false }
  );

  // Click to toggle zoom (ignored right after a drag)
  img.addEventListener("click", function (e) {
    e.stopPropagation();
    if (dragMoved) {
      dragMoved = false;
      return;
    }
    setScale(scale > 1 ? 1 : CLICK_ZOOM);
  });

  // Mouse drag to pan when zoomed
  img.addEventListener("mousedown", function (e) {
    if (scale <= 1) return;
    dragging = true;
    dragMoved = false;
    lastX = e.clientX;
    lastY = e.clientY;
    img.classList.add("is-dragging");
    e.preventDefault();
  });
  window.addEventListener("mousemove", function (e) {
    if (!dragging) return;
    var dx = e.clientX - lastX;
    var dy = e.clientY - lastY;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) dragMoved = true;
    tx += dx;
    ty += dy;
    lastX = e.clientX;
    lastY = e.clientY;
    updateTransform();
  });
  window.addEventListener("mouseup", function () {
    if (!dragging) return;
    dragging = false;
    img.classList.remove("is-dragging");
  });

  // Touch: pinch to zoom, single-finger pan when zoomed
  var touch = null;
  function touchDistance(touches) {
    var dx = touches[0].clientX - touches[1].clientX;
    var dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }
  img.addEventListener(
    "touchstart",
    function (e) {
      if (e.touches.length === 2) {
        touch = { type: "pinch", dist: touchDistance(e.touches), startScale: scale };
      } else if (e.touches.length === 1 && scale > 1) {
        touch = { type: "pan", x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    },
    { passive: true }
  );
  img.addEventListener(
    "touchmove",
    function (e) {
      if (!touch) return;
      if (touch.type === "pinch" && e.touches.length === 2) {
        var d = touchDistance(e.touches);
        setScale(touch.startScale * (d / touch.dist));
        e.preventDefault();
      } else if (touch.type === "pan" && e.touches.length === 1) {
        var dx = e.touches[0].clientX - touch.x;
        var dy = e.touches[0].clientY - touch.y;
        tx += dx;
        ty += dy;
        touch.x = e.touches[0].clientX;
        touch.y = e.touches[0].clientY;
        updateTransform();
        e.preventDefault();
      }
    },
    { passive: false }
  );
  img.addEventListener("touchend", function () {
    touch = null;
  });
});
