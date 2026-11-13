// Shared hidden interactions for the illustrated and pixel editions.
const retroEdition = document.body.dataset.retro === 'true';
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const invitationTitle = document.querySelector('.title-trigger');
const flyingSanta = document.querySelector('.santa-flight');
const scenery = document.querySelector('.landscape');
const panel = document.querySelector('.hero-copy');
let titleTaps = 0, titleReset, presentExpiry, bootsTimer, catTimer;
let present;

invitationTitle.addEventListener('click', () => {
  clearTimeout(titleReset);
  titleTaps++;
  if (titleTaps === 5) {
    location.assign(retroEdition ? '/' : '/8bit');
    return;
  }
  if (titleTaps >= 3) announce(titleTaps === 3 ? '…？' : 'もう一回。');
  titleReset = setTimeout(() => { titleTaps = 0; }, 2500);
});

const gifts = [
  ['🍗', '七面鳥、焼けました！'], ['🧦', 'くつ下をゲット！'],
  ['🍪', 'サンタのおやつ発見。'], ['☃', '雪だるまが仲間になった！'],
  ['🐈', '箱の中に、ねこ。'], ['⭐', 'レア！クリスマスの星']
];
flyingSanta.addEventListener('click', () => {
  if (present) present.remove();
  clearTimeout(presentExpiry);
  const rect = flyingSanta.getBoundingClientRect();
  present = document.createElement('button');
  present.className = 'dropped-present';
  present.type = 'button';
  present.setAttribute('aria-label', 'プレゼントを開ける');
  present.innerHTML = '<span class="gift-box" aria-hidden="true"></span>';
  const x = Math.max(30, Math.min(innerWidth - 80, rect.left + rect.width * .3));
  present.style.left = x + 'px';
  present.style.setProperty('--fall-from', Math.min(0, rect.top - innerHeight + 110) + 'px');
  document.body.append(present);
  playChimes([88, 84, 79], .12);
  announce('プレゼントが落ちてきた！');
  present.addEventListener('click', () => {
    const [icon, message] = gifts[Math.floor(Math.random() * gifts.length)];
    present.textContent = icon;
    present.classList.add('unwrapped');
    present.setAttribute('aria-label', message);
    present.disabled = true;
    playChimes([79, 84, 88, 96], .12);
    announce(message);
    clearTimeout(presentExpiry);
    presentExpiry = setTimeout(() => { present?.remove(); present = null; }, 3500);
  }, { once: true });
  presentExpiry = setTimeout(() => { present?.remove(); present = null; }, 20000);
});

// Place touch targets over the real artwork, with a small alternate position
// beside the invitation when its panel covers the chimney or window on phones.
const chimney = document.createElement('button');
chimney.className = 'chimney-surprise';
chimney.type = 'button';
chimney.setAttribute('aria-label', '煙突をのぞく');
chimney.innerHTML = '<svg viewBox="0 0 48 64" aria-hidden="true"><g class="santa-boots"><path d="M12 43V19h10v24m5 0V15h10v28" fill="#e45460"/><path d="M12 19V7H3v8h9m15 0V3h17v8H37v4" fill="#172531"/><path d="M12 18h10v5H12m15-9h10v5H27" fill="#fff0d2"/></g><path class="chimney-bricks" d="M8 43h32v21H8Z" fill="#b74d4f"/><path d="M4 40h40v7H4Z" fill="#f4e6c9"/></svg>';
document.body.append(chimney);
chimney.addEventListener('click', () => {
  clearTimeout(bootsTimer);
  chimney.classList.add('boots-out');
  playChimes([67, 64, 60], .16);
  announce('🎅 …ちょっと、つまった。');
  bootsTimer = setTimeout(() => chimney.classList.remove('boots-out'), 3000);
});

const cat = document.createElement('button');
cat.type = 'button';
cat.className = 'window-cat';
cat.setAttribute('aria-label', '窓のねこにタップ');
cat.innerHTML = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M4 4h40v40H4Z" fill="#ffd371"/><g class="cat-face"><path d="M10 35V12l11 8h7l10-8v23Z" fill="#263c4a"/><path d="M15 27h5v3h-5m13-3h5v3h-5" fill="#c8f48a"/><path d="M23 33h3v2h-3" fill="#f79d9d"/></g><path d="M1 42h46v5H1Z" fill="#f4e6c9"/></svg>';
document.body.append(cat);
cat.addEventListener('click', () => {
  cat.classList.add('cat-hiding');
  playChimes([88, 79], .1);
  announce('…にゃ。');
  clearTimeout(catTimer);
  catTimer = setTimeout(() => cat.classList.remove('cat-hiding'), 4500);
});
function positionHouseSecrets() {
  const art = scenery.getBoundingClientRect(), card = panel.getBoundingClientRect();
  const scale = art.width / 700;
  const positions = [
    [chimney, 413, 193, 48, 64],
    [cat, 270, 375, 48, 48]
  ];
  for (const [element, ax, ay, w, h] of positions) {
    let x = art.left + ax * scale - w / 2;
    let y = art.top + ay * scale - h / 2;
    const covered = x < card.right && x + w > card.left && y < card.bottom && y + h > card.top;
    if (covered) {
      // Two tiny house details sit just below the card, over the house scene.
      x = element === chimney ? innerWidth * .62 : innerWidth * .34 - w;
      y = card.bottom + 12;
    }
    element.style.left = Math.max(4, Math.min(innerWidth - w - 4, x)) + 'px';
    element.style.top = Math.max(4, Math.min(innerHeight - h - 40, y)) + 'px';
    element.classList.toggle('repositioned', covered);
  }
}
window.addEventListener('resize', positionHouseSecrets);
document.fonts.ready.then(positionHouseSecrets);
positionHouseSecrets();
