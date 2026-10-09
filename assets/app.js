/*! Stop60 portfolio – © 2026 Stop60. All rights reserved. */
(function () {
  'use strict';
  var T = {}; try { T = JSON.parse(document.body.getAttribute('data-i18n')) || {}; } catch (e) {}
  var url = location.origin + location.pathname;

  // GoatCounter events (cookie-free; same site as the home pages). count.js uses sendBeacon, so the
  // event survives the navigation that follows the click.
  function track(name) {
    try {
      if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: name, title: name, event: true });
    } catch (e) {}
  }
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('[data-gc]');
    if (a && !a.hasAttribute('aria-current')) track(a.getAttribute('data-gc'));
  });

  // QR code (generated in the browser, no external requests)
  var box = document.getElementById('qr');
  function drawQR() {
    if (!box || typeof window.qrcode !== 'function') return;
    var q = window.qrcode(0, 'M'); q.addData(url); q.make();
    var n = q.getModuleCount(), m = 2, d = '';
    for (var r = 0; r < n; r++) for (var c = 0; c < n; c++) if (q.isDark(r, c)) d += 'M' + (c + m) + ' ' + (r + m) + 'h1v1h-1z';
    var s = n + 2 * m;
    box.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + s + ' ' + s + '" shape-rendering="crispEdges" aria-hidden="true"><rect width="100%" height="100%" fill="#fff"/><path fill="#12110f" d="' + d + '"/></svg>';
    box.setAttribute('data-url', url);
  }
  drawQR();
  var u = document.getElementById('purl'); if (u) u.textContent = url;

  // copy / native share
  var cb = document.getElementById('copy');
  if (cb) cb.addEventListener('click', function () {
    var done = function () { cb.textContent = T.copied || 'OK'; track('portfolio-copy-link'); setTimeout(function () { cb.textContent = T.copy || cb.textContent; }, 2200); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done, function () {});
    else { var t = document.createElement('textarea'); t.value = url; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); done(); } catch (e) {} t.remove(); }
  });
  var sb = document.getElementById('nshare');
  if (sb && navigator.share) {
    sb.hidden = false;
    sb.addEventListener('click', function () { navigator.share({ title: document.title, url: url }).then(function () { track('portfolio-share'); }, function () {}); });
  }
})();
