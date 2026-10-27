const clamp = (v: number) => Math.max(0, Math.min(1, v));

export function initSeitaiFilm(root: HTMLElement) {
  const video = root.querySelector<HTMLVideoElement>('[data-care-video]');
  const poster = root.querySelector<HTMLImageElement>('[data-care-poster]');
  const chapters = [...root.querySelectorAll<HTMLElement>('[data-care-scene]')];
  const stops = [...root.querySelectorAll<HTMLAnchorElement>('[data-care-stop]')];
  const bar = root.querySelector<HTMLElement>('[data-care-track]');
  const counter = root.querySelector<HTMLElement>('[data-care-count]');
  const hint = root.querySelector<HTMLElement>('.care-hint');
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const duration = Number(root.dataset.seconds) * chapters.length;
  if (!video || !poster || !chapters.length) return;
  let dispose: (() => void) | undefined;

  function start() {
    dispose?.();
    dispose = undefined;
    if (media.matches) return;
    const controller = new AbortController();
    let disposed = false, blobUrl = '', raf = 0, target = 0, progress = 0, previous = 0, active = -1, wantedTime = 0;
    function seek() {
      if (video!.readyState < 1 || video!.seeking) return;
      if (Math.abs(video!.currentTime - wantedTime) > .035) video!.currentTime = wantedTime;
    }
    function ready() { root.classList.add('has-film'); seek(); }
    function fail() { root.classList.remove('has-film'); }
    video!.addEventListener('loadeddata', ready);
    video!.addEventListener('seeked', seek);
    video!.addEventListener('error', fail);
    async function load() {
      try {
        const response = await fetch(root.dataset.film!, { signal: controller.signal });
        if (!response.ok) return;
        const blob = await response.blob();
        if (disposed) return;
        blobUrl = URL.createObjectURL(blob);
        video!.src = blobUrl;
        video!.load();
      } catch { /* Continue with the chapter posters. */ }
    }
    function paint() {
      const index = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));
      const local = clamp(progress * chapters.length - index);
      // Clamp inside the current shot so the next clip never appears prematurely.
      wantedTime = index * Number(root.dataset.seconds) + local * (Number(root.dataset.seconds) - .045);
      wantedTime = Math.min(duration - .045, wantedTime);
      seek();
      if (index !== active) {
        active = index;
        poster!.src = chapters[index].dataset.poster!;
        root.dataset.layout = index === 0 || index === chapters.length - 1 ? 'full' : 'split';
        root.dataset.side = index === 2 || index === 4 ? 'right' : 'left';
        stops.forEach((stop,i) => i === index ? stop.setAttribute('aria-current','step') : stop.removeAttribute('aria-current'));
        if (counter) counter.textContent = `${String(index).padStart(2,'0')} / ${String(chapters.length-1).padStart(2,'0')}`;
      }
      const frame = root.querySelector<HTMLElement>('.care-media');
      const portraitScale = (index===2 || index===4) && frame ? Math.max(1, frame.clientHeight / (frame.clientWidth * 9/16)) : 1;
      const transform = `translate3d(${(local-.5)*-1.4}%,${(local-.5)*-.6}%,0) scale(${(1.04+local*.025)*portraitScale})`;
      poster!.style.transform = transform;
      video!.style.transform = transform;
      for (const [i,el] of chapters.entries()) {
        const t = progress * chapters.length - i;
        const alpha = t >= 0 && t <= 1 ? Math.min(i === 0 ? 1 : clamp(t/.14), i === chapters.length-1 ? 1 : clamp((1-t)/.14)) : 0;
        el.style.opacity = String(alpha);
        el.style.visibility = alpha > 0 ? 'visible' : 'hidden';
        el.style.transform = `translate3d(0,${(1-alpha)*22 - clamp(t)*10}px,0)`;
        el.inert = i !== index || alpha === 0;
      }
      if (bar) bar.style.transform = `scaleX(${progress})`;
      if (hint) hint.style.opacity = String(clamp(1-progress*22));
    }
    function tick(time: number) {
      raf = 0;
      if (disposed) return;
      const elapsed = Math.min(64, previous ? time-previous : 16);
      previous = time;
      progress += (target-progress)*(1-Math.exp(-elapsed/110));
      if (Math.abs(target-progress) < .000025) progress=target;
      paint();
      if (progress !== target) raf=requestAnimationFrame(tick);
      else previous=0;
    }
    function updateTarget() {
      const rect=root.getBoundingClientRect();
      target=clamp(-rect.top/Math.max(1,rect.height-window.innerHeight));
      if (!raf) raf=requestAnimationFrame(tick);
    }
    const removeClicks=stops.map((stop,index)=>{
      const click=(event:MouseEvent)=>{
        event.preventDefault();
        const rect=root.getBoundingClientRect();
        const point=index===0?0:(index+.3)/chapters.length;
        window.scrollTo({top:window.scrollY+rect.top+(rect.height-innerHeight)*point,behavior:'smooth'});
      };
      stop.addEventListener('click',click);
      return()=>stop.removeEventListener('click',click);
    });
    root.classList.add('is-live');
    window.addEventListener('scroll',updateTarget,{passive:true});
    window.addEventListener('resize',updateTarget);
    updateTarget();
    void load();
    dispose=()=>{
      disposed=true;controller.abort();cancelAnimationFrame(raf);
      window.removeEventListener('scroll',updateTarget);window.removeEventListener('resize',updateTarget);
      removeClicks.forEach(remove=>remove());
      video!.removeEventListener('loadeddata',ready);video!.removeEventListener('seeked',seek);video!.removeEventListener('error',fail);
      video!.pause();video!.removeAttribute('src');video!.load();
      if(blobUrl)URL.revokeObjectURL(blobUrl);
      root.classList.remove('is-live','has-film');
      chapters.forEach(el=>{el.removeAttribute('style');el.inert=false;});
    };
  }
  media.addEventListener('change',start);
  start();
  return()=>{dispose?.();media.removeEventListener('change',start);};
}
