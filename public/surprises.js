// Shared hidden interactions for the illustrated and pixel editions.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const invitationTitle = document.querySelector('.title-trigger');
const flyingSanta = document.querySelector('.santa-flight');
const scenery = document.querySelector('.landscape');
let titleTaps = 0, titleReset, presentExpiry;
let present;
let switchingEdition = false;
const editions = new Map();
function captureEdition(root) {
  return {
    landscape: root.querySelector('.landscape').innerHTML,
    santa: root.querySelector('.santa-flight').innerHTML
  };
}
editions.set(isRetro, captureEdition(document));

async function switchEdition() {
  if (switchingEdition) return;
  switchingEdition = true;
  const nextRetro = !isRetro;
  try {
    if (!editions.has(nextRetro)) {
      const response = await fetch(nextRetro ? '/8bit' : '/');
      if (!response.ok) throw new Error('Edition unavailable');
      const otherPage = new DOMParser().parseFromString(await response.text(), 'text/html');
      editions.set(nextRetro, captureEdition(otherPage));
    }
    const update = () => {
      const artwork = editions.get(nextRetro);
      scenery.innerHTML = artwork.landscape;
      scenery.setAttribute('shape-rendering', nextRetro ? 'crispEdges' : 'auto');
      flyingSanta.innerHTML = artwork.santa;
      isRetro = nextRetro;
      document.body.classList.toggle('retro', isRetro);
      document.body.dataset.retro = String(isRetro);
      bindShowTree();
    };
    if (document.startViewTransition && !reducedMotion.matches) {
      await document.startViewTransition(update).finished;
    } else {
      if (!reducedMotion.matches) await document.body.animate(
        [{ opacity: 1 }, { opacity: 0 }], { duration: 180, fill: 'forwards' }
      ).finished.then(() => document.body.getAnimations().forEach(a => a.cancel()));
      update();
      if (!reducedMotion.matches) await document.body.animate(
        [{ opacity: 0 }, { opacity: 1 }], { duration: 250 }
      ).finished;
    }
    playChimes(isRetro ? [72, 79, 84, 91] : [91, 84, 79, 72], .1);
  } catch (error) {
    announce('もう一度タップしてみてね。');
    console.error('Could not switch edition', error);
  } finally {
    switchingEdition = false;
  }
}

invitationTitle.addEventListener('click', () => {
  clearTimeout(titleReset);
  titleTaps++;
  if (titleTaps === 5) {
    titleTaps = 0;
    announce('');
    switchEdition();
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
flyingSanta.addEventListener('pointerdown', (event) => {
  flyingSanta.style.animationPlayState = 'paused';
  flyingSanta.setPointerCapture(event.pointerId);
});
flyingSanta.addEventListener('lostpointercapture', () => {
  flyingSanta.style.animationPlayState = '';
});
flyingSanta.addEventListener('click', (event) => {
  event.stopPropagation();
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
