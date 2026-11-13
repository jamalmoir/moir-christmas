const canvas = document.querySelector('#snow');
const isRetro = document.body.dataset.retro === 'true';
// UTC timestamps correspond to 14:00–20:00 in Japan (UTC+09:00).
const calendarLines = [
  'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Casa Jamal//Christmas 2026//JA',
  'CALSCALE:GREGORIAN', 'BEGIN:VEVENT', 'UID:christmas-2026@casa-jamal',
  'DTSTAMP:20261113T000000Z', 'DTSTART:20261219T050000Z', 'DTEND:20261219T110000Z',
  'SUMMARY:Christmas @ Casa Jamal', 'LOCATION:ジャマルの家',
  'DESCRIPTION:服装：ダサいクリスマスセーター。各自、手料理を一品持参。シークレットサンタ用に500円のプレゼント。',
  'END:VEVENT', 'END:VCALENDAR'
];
function foldCalendarLine(line) {
  let folded = '', count = 0;
  for (const char of line) {
    const bytes = new TextEncoder().encode(char).length;
    if (count + bytes > 75) { folded += '\r\n '; count = 1; }
    folded += char; count += bytes;
  }
  return folded;
}
const calendarFile = new Blob([calendarLines.map(foldCalendarLine).join('\r\n') + '\r\n'], {
  type: 'text/calendar;charset=utf-8'
});
const calendarLink = document.querySelector('#calendar');
calendarLink.href = URL.createObjectURL(calendarFile);
calendarLink.download = 'christmas-casa-jamal-2026.ics';
const ctx = canvas.getContext('2d');
const media = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = media.matches;
let width = 0,
	height = 0,
	flakes = [],
	frame = 0,
	previous = 0;
function resize() {
	width = innerWidth;
	height = innerHeight;
	const scale = Math.min(devicePixelRatio || 1, 2);
	canvas.width = width * scale;
	canvas.height = height * scale;
	ctx.setTransform(scale, 0, 0, scale, 0, 0);
	flakes = Array.from({ length: Math.min(100, Math.floor(width / 13)) }, () => ({
		x: Math.random() * width,
		y: Math.random() * height,
		r: 0.6 + Math.random() * 1.7,
		speed: 9 + Math.random() * 20,
		drift: Math.random() * Math.PI * 2,
		opacity: 0.2 + Math.random() * 0.55
	}));
	draw(0);
}
function draw(delta) {
	ctx.clearRect(0, 0, width, height);
	for (const f of flakes) {
		f.y += f.speed * delta;
		f.drift += delta * 0.35;
		f.x += Math.sin(f.drift) * 7 * delta;
		if (f.y > height + 4) {
			f.y = -4;
			f.x = Math.random() * width;
		}
		if (f.x < -4) f.x = width + 4;
		if (f.x > width + 4) f.x = -4;
		ctx.fillStyle = 'rgba(246,242,224,' + f.opacity + ')';
		if (isRetro) {
			ctx.fillRect(Math.round(f.x / 3) * 3, Math.round(f.y / 3) * 3, 3, 3);
		} else {
			ctx.beginPath();
			ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
			ctx.fill();
		}
	}
}
function animate(now) {
	draw(previous ? Math.min((now - previous) / 1000, 0.05) : 0);
	previous = now;
	frame = requestAnimationFrame(animate);
}
function syncMotion() {
	cancelAnimationFrame(frame);
	previous = 0;
	document.documentElement.classList.toggle('motion-paused', paused);
	if (!paused && !document.hidden) frame = requestAnimationFrame(animate);
}
media.addEventListener('change', (e) => {
	paused = e.matches;
	syncMotion();
});
document.addEventListener('visibilitychange', syncMotion);
window.addEventListener('resize', resize);
resize();
syncMotion();

const scene = document.querySelector('.scene');
const moon = document.querySelector('.moon');
const landscape = document.querySelector('.landscape');
const santa = document.querySelector('.santa-flight');
const status = document.querySelector('#surprise-status');
let messageTimer, santaTimer, lightMode = 0, moonVisits = 0;
function announce(message) {
  clearTimeout(messageTimer);
  status.textContent = message;
  messageTimer = setTimeout(() => { status.textContent = ''; }, 3000);
}
moon.addEventListener('click', () => {
  playChimes([84, 88, 91, 96], .14);
  moonVisits++;
  if (paused || media.matches) {
    announce('🎅 メリークリスマス！');
    return;
  }
  clearTimeout(santaTimer);
  santa.classList.remove('summoned');
  // Restart the flight on each deliberate tap, including while Santa is passing.
  void santa.offsetWidth;
  santa.classList.add('summoned');
  announce(moonVisits % 3 === 0 ? '🎅 また呼んだ？' : '🎅 サンタが来た！');
  santaTimer = setTimeout(() => santa.classList.remove('summoned'), 6100);
});
function changeLights() {
  playChimes([76, 83], .12);
  lightMode = (lightMode + 1) % 3;
  scene.dataset.lights = String(lightMode);
  announce(['🎄 いつものクリスマス', '🎄 ピンクのイルミネーション', '🎄 アイスブルーのイルミネーション'][lightMode]);
}
landscape.addEventListener('click', changeLights);
landscape.addEventListener('keydown', (event) => {
  if (event.target === landscape && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    changeLights();
  }
});
const showTree = document.querySelector('#show-tree');
let treeTimer;
showTree.querySelectorAll('circle').forEach((bulb, index) => {
  bulb.style.setProperty('--delay', (-index * .18) + 's');
});
function treeLightShow(event) {
  event.stopPropagation();
  playChimes([79, 83, 86, 91, 86, 83, 91, 95], .18);
  clearTimeout(treeTimer);
  showTree.classList.remove('light-show');
  void showTree.getBoundingClientRect();
  showTree.classList.add('light-show');
  announce('🎄 ライトショー！');
  treeTimer = setTimeout(() => showTree.classList.remove('light-show'), 8000);
}
showTree.addEventListener('click', treeLightShow);
showTree.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    treeLightShow(event);
  }
});
let lastSpark = 0;
document.addEventListener('pointerup', (event) => {
  if (paused || media.matches || !event.isPrimary || event.button !== 0 ||
      event.target.closest('.hero-copy, #sound-toggle') || performance.now() - lastSpark < 150) return;
  lastSpark = performance.now();
  for (let i = 0; i < 9; i++) {
    const spark = document.createElement('span');
    spark.className = 'tap-spark';
    spark.setAttribute('aria-hidden', 'true');
    spark.textContent = i % 2 ? '✦' : '❄';
    const angle = Math.PI * 2 * i / 9;
    spark.style.setProperty('--x', event.clientX + 'px');
    spark.style.setProperty('--y', event.clientY + 'px');
    spark.style.setProperty('--dx', Math.cos(angle) * 55 + 'px');
    spark.style.setProperty('--dy', Math.sin(angle) * 55 + 'px');
    spark.style.setProperty('--spark-color', ['#f0e8ce', '#e9ba64', '#f39c88'][i % 3]);
    document.body.append(spark);
    setTimeout(() => spark.remove(), 900);
  }
});

// Original music-box phrase, synthesized locally. Never starts without a tap.
const soundToggle = document.querySelector('#sound-toggle');
let audioContext, masterGain, musicTimer, soundEnabled = false, nextNote = 0, noteIndex = 0;
const winterMelody = [
  [79, 1], [84, 1], [88, 2], [86, 1], [84, 1], [91, 2],
  [88, 1], [86, 1], [83, 2], [79, 2], [0, 2],
  [81, 1], [84, 1], [89, 2], [88, 1], [86, 1], [84, 2],
  [83, 1], [86, 1], [79, 2], [84, 3], [0, 7]
];
function updateSoundLabel() {
  soundToggle.setAttribute('aria-pressed', String(soundEnabled));
  soundToggle.setAttribute('aria-label', soundEnabled ? 'クリスマスの音をオフにする' : 'クリスマスの音をオンにする');
  soundToggle.querySelector('.sound-label').textContent = soundEnabled ? '音をオフ' : '音をオン';
}
function bell(note, when, volume = .08) {
  const frequency = 440 * 2 ** ((note - 69) / 12);
  for (const [ratio, level] of (isRetro ? [[1, .45], [.5, .18]] : [[1, 1], [2, .25], [3.01, .08]])) {
    const oscillator = audioContext.createOscillator();
    const envelope = audioContext.createGain();
    oscillator.type = isRetro ? (ratio === 1 ? 'square' : 'triangle') : 'sine';
    oscillator.frequency.value = frequency * ratio;
    envelope.gain.setValueAtTime(0, when);
    envelope.gain.linearRampToValueAtTime(volume * level, when + .008);
    envelope.gain.exponentialRampToValueAtTime(.0001, when + (isRetro ? .24 : 1.6));
    oscillator.connect(envelope);
    envelope.connect(masterGain);
    oscillator.start(when);
    oscillator.stop(when + (isRetro ? .3 : 1.7));
    oscillator.onended = () => { oscillator.disconnect(); envelope.disconnect(); };
  }
}
let lastChime = 0;
function playChimes(notes, spacing) {
  if (!soundEnabled || !audioContext || audioContext.state !== 'running' || document.hidden) return;
  if (audioContext.currentTime - lastChime < .4) return;
  lastChime = audioContext.currentTime;
  notes.forEach((note, index) => bell(note, audioContext.currentTime + index * spacing, .06));
}
function scheduleMusic() {
  if (!soundEnabled || document.hidden || audioContext.state !== 'running') return;
  while (nextNote < audioContext.currentTime + .2) {
    const [note, beats] = winterMelody[noteIndex];
    if (note) bell(note, Math.max(nextNote, audioContext.currentTime), .065);
    nextNote += beats * .45;
    noteIndex = (noteIndex + 1) % winterMelody.length;
  }
}
soundToggle.addEventListener('click', async () => {
  if (soundEnabled) {
    soundEnabled = false;
    clearInterval(musicTimer);
    masterGain.gain.setTargetAtTime(0, audioContext.currentTime, .025);
    updateSoundLabel();
    return;
  }
  soundToggle.disabled = true;
  try {
    const AudioEngine = window.AudioContext || window.webkitAudioContext;
    if (!AudioEngine) throw new Error('Audio unavailable');
    if (!audioContext) {
      audioContext = new AudioEngine();
      masterGain = audioContext.createGain();
      masterGain.gain.value = 0;
      masterGain.connect(audioContext.destination);
    }
    await audioContext.resume();
    if (audioContext.state !== 'running') throw new Error('Audio unavailable');
    soundEnabled = true;
    masterGain.gain.setTargetAtTime(.6, audioContext.currentTime, .05);
    noteIndex = 0;
    nextNote = audioContext.currentTime + .05;
    clearInterval(musicTimer);
    musicTimer = setInterval(scheduleMusic, 100);
    scheduleMusic();
  } catch {
    soundEnabled = false;
    announce('音を再生できませんでした。もう一度タップしてみてください。');
  } finally {
    soundToggle.disabled = false;
    updateSoundLabel();
  }
});
document.addEventListener('visibilitychange', async () => {
  if (!audioContext) return;
  try {
    if (document.hidden) {
      await audioContext.suspend();
    } else if (soundEnabled) {
      await audioContext.resume();
      nextNote = audioContext.currentTime + .1;
      if (audioContext.state !== 'running') throw new Error('Audio interrupted');
    }
  } catch {
    soundEnabled = false;
    clearInterval(musicTimer);
    masterGain.gain.value = 0;
    updateSoundLabel();
  }
});
