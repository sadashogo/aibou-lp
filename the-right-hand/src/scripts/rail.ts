const rail = document.getElementById('rail');

if (rail) {
  let ticking = false;

  const update = () => {
    ticking = false;
    const denom = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = denom > 0 ? window.scrollY / denom : 0;
    const clamped = Math.min(1, Math.max(0, ratio));
    rail.style.transform = `scaleX(${clamped})`;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  update();
}
