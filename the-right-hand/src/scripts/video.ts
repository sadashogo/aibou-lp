const frame = document.querySelector<HTMLElement>('[data-video-frame]');
const video = frame?.querySelector<HTMLVideoElement>('video') ?? null;

if (video) {
  video.muted = true;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    video.removeAttribute('autoplay');
    video.autoplay = false;
    video.controls = true;
  } else if (frame) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(frame);
  }
}
