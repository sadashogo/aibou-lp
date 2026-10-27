// Rebuild the free-stock / AI-photo edit. Requires curl and FFmpeg on PATH.
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
const site = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const assets = JSON.parse(readFileSync(join(site, 'src/data/samples/seitai-assets.json'), 'utf8'));
const work = process.env.SEITAI_MEDIA_CACHE || '/tmp/seitai-hybrid-build';
const out = join(site, 'public/samples/seitai/film-hybrid');
mkdirSync(work, { recursive: true }); mkdirSync(out, { recursive: true });
const ff = args => execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' });
const encode = ['-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-pix_fmt', 'yuv420p', '-g', '6', '-keyint_min', '6', '-sc_threshold', '0', '-movflags', '+faststart'];
const files = [];
for (const asset of assets) {
  const stock = asset.motionStock || asset;
  const raw = join(work, `${stock.sourceAssetId}.mp4`);
  // Download only publicly licensed files linked by the source's own metadata.
  if (!existsSync(raw)) execFileSync('curl', ['--fail', '--silent', '--show-error', '--location', '--retry', '2', stock.downloadUrl, '-o', raw]);
  const shot = join(work, `scene-${asset.scene}.mp4`);
  const finish = 'scale=960:540,setsar=1,format=yuv420p,settb=AVTB,setpts=PTS-STARTPTS,fps=24';
  if (asset.motionStock) {
    const grade = 'eq=saturation=0.82:contrast=0.98:gamma=1.025,colorbalance=rs=0.025:bs=-0.015:rm=0.015:bm=-0.01';
    ff(['-loop', '1', '-framerate', '24', '-t', '1', '-i', join(site, 'public'+asset.poster),
      '-ss', String(stock.sourceStartSeconds), '-t', '3.25', '-i', raw,
      '-filter_complex', `[0:v]${finish}[photo];[1:v]scale=${stock.inputSize.join(':')},${stock.crop},${grade},${finish}[motion];[photo][motion]xfade=transition=fade:duration=0.25:offset=0.75,format=yuv420p[v]`,
      '-map', '[v]', '-frames:v', '96', ...encode, shot]);
  } else {
    ff(['-ss', String(asset.sourceSeconds[0]), '-i', raw, '-t', '4', '-vf', `eq=saturation=0.80:contrast=0.96:brightness=-0.015,${finish}`, '-frames:v', '96', ...encode, shot]);
  }
  files.push(shot);
  console.log(`Rendered scene ${asset.scene}: ${asset.purpose}`);
}
const list = join(work, 'concat.txt');
writeFileSync(list, files.map(file => `file '${file.replaceAll("'", "'\\''")}'`).join('\n')+'\n');
ff(['-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', '-movflags', '+faststart', join(out, 'journey.mp4')]);
console.log('Rendered 24 seconds: six scenes, four distinct live-action inserts.');
