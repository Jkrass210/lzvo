export function initVideoIframeLoader() {
  const buttons = document.querySelectorAll('.js-open-video-iframe');
  const iframeBoxes = document.querySelectorAll('.js-box-video-iframe');

  // Если нет нужных элементов — просто выходим
  if (!buttons.length || !iframeBoxes.length) return;

  function clearIframe(modal) {
    if (!modal) return;

    const iframe = modal.querySelector('.js-box-video-iframe iframe');
    if (!iframe) return;

    iframe.src = '';
  }

  document.addEventListener('click', function (e) {

    // ЗАГРУЗКА ВИДЕО

    const btn = e.target.closest('.js-open-video-iframe');
    if (btn) {
      const videoSrc = btn.dataset.iframeVideo;
      const modalId = btn.dataset.modal;

      if (!videoSrc || !modalId) return;

      const modal = document.getElementById(modalId);
      if (!modal) return;

      const iframe = modal.querySelector('.js-box-video-iframe iframe');
      if (!iframe) return;

      iframe.src = videoSrc;
      return;
    }


    // ОЧИСТКА ПО КРЕСТИКУ

    const closeBtn = e.target.closest('.js-close-modal');
    if (closeBtn) {
      const modal = closeBtn.closest('.modal');
      clearIframe(modal);
      return;
    }


    // ОЧИСТКА ПО КЛИКУ ВНЕ iframe

    const modal = e.target.closest('.modal');
    if (!modal) return;

    const hasVideo = modal.querySelector('.js-box-video-iframe');
    if (!hasVideo) return;

    const clickedInsideVideo = e.target.closest('.js-box-video-iframe');
    if (!clickedInsideVideo) {
      clearIframe(modal);
    }
  });


  //ОЧИСТКА ПО ESC

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;

    document.querySelectorAll('.modal').forEach(modal => {
      if (!modal.querySelector('.js-box-video-iframe')) return;
      clearIframe(modal);
    });
  });
}