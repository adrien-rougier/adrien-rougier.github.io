document.addEventListener("DOMContentLoaded", function () {
  var openBtn = document.getElementById("poster-thumb-btn");
  var closeBtn = document.getElementById("poster-lightbox-close");
  var lightbox = document.getElementById("poster-lightbox");
  if (!openBtn || !lightbox) return;

  function open() {
    lightbox.hidden = false;
  }
  function close() {
    lightbox.hidden = true;
  }

  openBtn.addEventListener("click", open);
  if (closeBtn) closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
});
