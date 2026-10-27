import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { chromium } from 'playwright';
const assets=JSON.parse(await readFile(new URL('../src/data/samples/seitai-assets.json',import.meta.url),'utf8'));
const people=assets.filter(a=>a.origin==='ai-generated-still');
assert.equal(people.length,4);
assert.equal(new Set(people.map(a=>a.sourceAssetId)).size,4,'Each people scene has an independent source');
assert.notEqual(assets[2].purpose,assets[4].purpose,'Posture assessment and home care are different scenes');
assert.equal(new Set(people.map(a=>a.motionStock.sourceAssetId)).size,4,'All four live-action inserts use different source videos');
assert.notEqual(assets[2].motionStock.sourceAssetId,assets[4].motionStock.sourceAssetId,'Posture and home care must not reuse one video');
for(const asset of people){
  const bytes=await readFile(new URL('../public'+asset.poster,import.meta.url));
  assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256,'Reviewed asset matches its manifest');
}
const base=process.env.TEST_BASE_URL || 'http://localhost:4321';
const browser=await chromium.launch({headless:true,...(process.env.TEST_BROWSER_PATH?{executablePath:process.env.TEST_BROWSER_PATH}:{})});
try {
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  const errors=[],legacy=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('request',r=>{if(r.url().includes('/samples/seitai/seq/'))legacy.push(r.url())});
  await page.goto(base+'/samples/seitai/');
  await page.waitForSelector('.care-story.has-film');
  assert.equal(await page.locator('h1').innerText(),'からだに、\n余白を。');
  assert.equal(await page.locator('[data-story]').count(),0,'Do not initialize the old story on this page');
  assert.ok(await page.locator('video').evaluate(v=>v.currentSrc.startsWith('blob:')));
  async function go(p){
    await page.evaluate(p=>{const r=document.querySelector('[data-care-story]');scrollTo({top:scrollY+r.getBoundingClientRect().top+(r.offsetHeight-innerHeight)*p,behavior:'instant'})},p);
    await page.waitForTimeout(850);
  }
  const time=()=>page.locator('video').evaluate(v=>v.currentTime);
  for(const [p,lo,hi,label] of [[.24,4,8,'お話を伺う'],[.42,8,12,'姿勢の確認'],[.58,12,16,'からだのケア'],[.76,16,20,'セルフケア'],[.96,20,24,'いつもの日常へ']]){
    await go(p);assert.equal(await page.locator('[aria-current="step"]').getAttribute('aria-label'),label);
    assert.ok((await time())>=lo && (await time())<hi,`Film matches ${label}`);
  }
  await go(.24);const before=await time();await go(.27);assert.ok(await time()>before,'Motion within the same scene');
  await go(.24);assert.ok(await time()<8,'Reverse scroll returns to the conversation');
  await page.locator('[data-care-stop="2"]').click();await page.waitForTimeout(1600);
  assert.equal(await page.locator('[aria-current="step"]').getAttribute('aria-label'),'姿勢の確認');
  assert.match(await page.locator('body').innerText(),/写真の人物は日本人という設定でAI生成した架空のモデル/);
  assert.match(await page.locator('body').innerText(),/別撮影の実写ストック映像/);
  const posters=await page.locator('[data-care-scene]').evaluateAll(els=>els.map(el=>el.dataset.poster));
  assert.deepEqual(posters,assets.map(a=>a.poster));
  await page.locator('.shop-head [data-reserve]').click();
  assert.equal(await page.locator('dialog').evaluate(d=>d.open),true);
  assert.match(await page.locator('dialog').innerText(),/架空のお店/);
  await page.locator('[data-close]').click();
  for(const width of [390,320]){
    await page.setViewportSize({width,height:844});await go(.58);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`No horizontal overflow at ${width}px`);
  }
  await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(200);
  assert.equal(await page.locator('.care-story.is-live').count(),0);
  assert.equal(await page.locator('.care-chapter:visible').count(),6);
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.waitForSelector('.care-story.has-film');
  const staticPage=await browser.newPage({javaScriptEnabled:false});
  await staticPage.goto(base+'/samples/seitai/');
  assert.equal(await staticPage.locator('.care-chapter:visible').count(),6);
  const reducedPage=await browser.newPage({reducedMotion:'reduce'});let filmRequests=0;
  reducedPage.on('request',r=>{if(r.url().endsWith('journey.mp4'))filmRequests++});
  await reducedPage.goto(base+'/samples/seitai/');assert.equal(filmRequests,0);
  const failedPage=await browser.newPage();
  await failedPage.route('**/samples/seitai/film-hybrid/journey.mp4',r=>r.abort());
  await failedPage.goto(base+'/samples/seitai/');await failedPage.waitForSelector('.care-story.is-live');
  assert.equal(await failedPage.locator('.has-film').count(),0);
  assert.equal(await failedPage.locator('[data-care-poster]').evaluate(img=>img.complete&&img.naturalWidth>0),true);
  const salonPage=await browser.newPage();
  await salonPage.goto(base+'/samples/salon/',{waitUntil:'domcontentloaded'});
  assert.equal(await salonPage.locator('[data-care-story]').count(),0);
  assert.equal(await salonPage.locator('.story .scene').count(),5);
  assert.equal(await salonPage.locator('.shop-head--cinematic').count(),0);
  assert.deepEqual(errors,[]);assert.equal(legacy.length,0);
  console.log('PASS: all six scenes, film seeks, reverse, navigation, reservation dialog, 390/320px, reduced motion, no-JS, failed film fallback and salon regression.');
} finally {await browser.close();}
