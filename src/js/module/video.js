export function video() {
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(".js-video-trager");
    if (!trigger) return;

    const wrapper = trigger.closest(".js-video-wrapp");
    const videoBox = wrapper?.querySelector(".js-video-box");
    const videoSrc = trigger.dataset.video;

    if (!wrapper || !videoBox || !videoSrc) return;

    // если видео уже существует — не создаём повторно
    if (videoBox.querySelector("video")) return;

    const videoEl = document.createElement("video");
    videoEl.src = videoSrc;
    videoEl.controls = true;
    videoEl.autoplay = true;
    videoEl.playsInline = true;
    videoEl.muted = false;

    videoEl.style.width = "100%";
    videoEl.style.height = "100%";

    videoBox.appendChild(videoEl);

    // скрываем кнопку
    trigger.style.display = "none";

    videoEl.play().catch((err) => {
      console.warn("Видео не удалось воспроизвести автоматически:", err);
    });
  });
}