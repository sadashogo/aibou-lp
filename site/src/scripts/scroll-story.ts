// スクロール量に合わせて場面を切り替える（制作サンプル用）。
// スーツデモ（webdemo の sequence.ts）の考え方を流用：粗いコマから先に読み、残りはページの読み込み後に読む。
// ライブラリは使わず、requestAnimationFrame で1フレームに1回だけ描く。

type StoryData =
  | { mode: 'frames'; count: number; ext: string; desktop: string; mobile: string }
  | { mode: 'stills' }
  | { mode: 'placeholder' };

const FADE = 0.18; // 場面の範囲のうち、前後それぞれこの割合でフェード

export function initScrollStory(root: HTMLElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const data = JSON.parse(root.dataset.story ?? '{}') as StoryData;
  const scenes = [...root.querySelectorAll<HTMLElement>('[data-scene]')];
  const stills = [...root.querySelectorAll<HTMLElement>('[data-still]')];
  const dots = [...root.querySelectorAll<HTMLElement>('[data-dot]')];
  const hint = root.querySelector<HTMLElement>('.story-hint');
  const n = scenes.length;

  // ---- 連番画像（動画）モード ----
  let drawFrame: ((p: number) => void) | null = null;
  if (data.mode === 'frames') {
    const canvas = root.querySelector('canvas')!;
    const ctx = canvas.getContext('2d')!;
    const portrait = window.matchMedia('(max-aspect-ratio: 1/1)').matches;
    const dir = portrait ? data.mobile : data.desktop;
    const frames: (HTMLImageElement | undefined)[] = new Array(data.count);
    let current = -1;

    const nearest = (i: number) => {
      for (let d = 0; d < data.count; d++) {
        if (frames[i - d]) return frames[i - d];
        if (frames[i + d]) return frames[i + d];
      }
    };
    const paint = (i: number) => {
      const img = nearest(i);
      if (!img) return;
      const { width: cw, height: ch } = canvas;
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      paint(Math.max(current, 0));
    };
    const load = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = `${dir}/${String(i + 1).padStart(4, '0')}.${data.ext}`;
        img.onload = () => {
          frames[i] = img;
          if (Math.abs(i - current) < 3 || i === 0) paint(Math.max(current, 0));
          resolve();
        };
        img.onerror = () => resolve();
      });
    const order: number[] = [];
    const seen = new Set<number>();
    for (const step of [data.count, 16, 8, 4, 2, 1]) {
      for (let i = 0; i < data.count; i += step) if (!seen.has(i)) (seen.add(i), order.push(i));
    }
    const run = (q: number[]) =>
      Promise.all(Array.from({ length: 6 }, async () => { while (q.length) await load(q.shift()!); }));
    run(order.filter((i) => i % 8 === 0)).then(() => {
      const fine = () => run(order.filter((i) => i % 8 !== 0));
      if (document.readyState === 'complete') fine();
      else window.addEventListener('load', fine, { once: true });
    });
    // 画面固定（is-live）に切り替わったあとの大きさで描き直すため、サイズの変化を見張る
    new ResizeObserver(resize).observe(canvas);
    drawFrame = (p) => {
      const next = Math.min(data.count - 1, Math.round(p * (data.count - 1)));
      if (next !== current) (current = next), paint(current);
    };
  }

  // ---- 場面ごとの重なり具合（0〜1）----
  const alphaAt = (p: number, i: number) => {
    const from = i / n;
    const to = (i + 1) / n;
    const t = (p - from) / (to - from);
    if (t < 0 || t > 1) return 0;
    const fadeIn = i === 0 ? 1 : Math.min(1, t / FADE);
    const fadeOut = i === n - 1 ? 1 : Math.min(1, (1 - t) / FADE);
    return Math.min(fadeIn, fadeOut);
  };

  const update = (p: number) => {
    drawFrame?.(p);
    scenes.forEach((el, i) => {
      const a = alphaAt(p, i);
      el.style.opacity = String(a);
      el.style.visibility = a > 0 ? 'visible' : 'hidden';
      el.style.transform = `translateY(${(1 - a) * 20}px)`;
    });
    // 静止画は、次の場面の画像を下に先に出しておき、切り替わりで重ねる。表示中はゆっくり拡大する
    stills.forEach((el, i) => {
      const from = i / n;
      const local = Math.min(1, Math.max(0, (p - from) * n));
      const a = Math.max(alphaAt(p, i), i === 0 && p <= 0 ? 1 : 0);
      el.style.opacity = String(a);
      el.style.transform = `scale(${1.02 + local * 0.08})`;
    });
    const on = Math.min(n - 1, Math.floor(p * n));
    dots.forEach((d, i) => d.classList.toggle('is-on', i === on));
    if (hint) hint.style.opacity = String(Math.max(0, 0.8 - p * 12));
  };

  let queued = false;
  const progress = () => {
    const r = root.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    return total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
  };
  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; update(progress()); });
  };

  root.classList.add('is-live');
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update(progress());
}
