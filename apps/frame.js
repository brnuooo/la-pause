// Scales each live plug-in interface to the width of its frame, keeping its own window size.
// <div class="app-frame" data-app="apps/kick-vs-bass/index.html" data-size="900x619"></div>
(() => {
  document.querySelectorAll('.app-frame[data-app]').forEach((frame) => {
    const [w, h] = frame.dataset.size.split('x').map(Number);
    const iframe = document.createElement('iframe');
    iframe.src = frame.dataset.app;
    iframe.width = w;
    iframe.height = h;
    iframe.loading = frame.classList.contains('still') ? 'lazy' : 'eager';
    iframe.title = frame.dataset.title || 'Plug-in interface';
    if (frame.classList.contains('still')) {
      iframe.tabIndex = -1;
      iframe.setAttribute('aria-hidden', 'true');
    }
    frame.style.aspectRatio = `${w} / ${h}`;
    frame.append(iframe);
    const fit = () => { iframe.style.transform = `scale(${frame.clientWidth / w})`; };
    new ResizeObserver(fit).observe(frame);
    fit();
  });
})();
