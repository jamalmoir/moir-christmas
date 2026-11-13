// Share invitation copy with the main page; replace only its presentation.
export function renderRetro(html) {
  return html
    .replace('<body>', '<body class="retro" data-retro="true">')
    .replace('</head>', '<meta name="robots" content="noindex, nofollow" /><link rel="stylesheet" href="/retro.css" /></head>')
    .replace('<title>Christmas @ Casa Jamal — 2026.12.19</title>', '<title>Christmas @ Casa Jamal — 8 BIT</title>')
    .replace(/<svg\s+class="landscape"[\s\S]*?<\/svg>/, pixelLandscape)
    .replace(/(<button class="santa-flight"[^>]*>)\s*<svg[\s\S]*?<\/svg>/, '$1' + pixelSanta);
}

const pixelLandscape = `<svg class="landscape" viewBox="0 0 700 590" role="group" tabindex="0" aria-label="家や木をタップして色を変える" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
<defs>
  <g id="pixel-tree">
    <path d="M-5-45h10v10h5v10h5v10h5v10h5v10h5v10H-30V5h5V-5h5v-10h5v-10h5v-10h5Z" fill="#155d49"/>
    <path d="M-5-45h10v10h5v5H-10v-5h5ZM-15-20h30v5h5v5H-20v-5h5ZM-25 0h50v5h5v5H-30V5h5Z" fill="#c2f4dc"/>
    <path d="M-5 15h10v10H-5Z" fill="#543449"/>
  </g>
</defs>
<g transform="scale(5)">
  <path d="M0 85h15v-5h20v4h20v-6h25v3h25v-5h20v7h15v35H0Z" fill="#164b57"/>
  <use href="#pixel-tree" transform="translate(15 84) scale(.65)"/>
  <use href="#pixel-tree" transform="translate(126 83) scale(.7)"/>
  <path d="M0 100h12v-4h20v-5h26v4h20v-7h28v4h20v4h14v22H0Z" fill="#8bd8cf"/>
  <path d="M0 107h18v-3h24v-4h27v3h25v-4h30v4h16v15H0Z" fill="#bdf4e2"/>
  <path d="M67 96h10v7h8v7h10v8H67v-8h-6v-7h6Z" fill="#64adb8"/>
  <g class="chimney-smoke" fill="#a3c5d2" opacity=".5"><path d="M79 41v-6h4v-5h-4v-5h4v-6h3v8h-3v5h4v6h-4v3Z"/></g>
  <path d="M79 50V38h8v16Z" fill="#cf5260"/><path d="M78 37h10v3H78Z" fill="#edffe9"/>
  <path d="M44 65h52v29H44Z" fill="#c83f60"/>
  <path d="M70 65h26v29H70Z" fill="#9a3455"/>
  <path d="M44 71h52v1H44Zm0 8h52v1H44Zm0 8h52v1H44Z" fill="#ec6f73"/>
  <path d="M40 65v-5h5v-5h6v-5h6v-5h6v-5h7v-5h5v5h6v5h6v5h6v5h6v5h5v5H93v-5h-6v-5h-6v-5h-6v-5h-5v5h-6v5h-6v5h-6v5Z" fill="#f2ffe9"/>
  <path d="M52 65v-5h6v-5h6v-5h6v-5h5v5h6v5h6v5h6v5Z" fill="#a93355"/>
  <path d="M49 70h10v12H49Zm30 0h11v12H79Z" fill="#ffc85b"/>
  <path d="M53 70h2v12h-2Zm30 0h2v12h-2ZM49 75h10v2H49Zm30 0h11v2H79Z" fill="#a15c47"/>
  <path d="M48 82h12v2H48Zm30 0h13v2H78Z" fill="#f2ffe9"/>
  <path d="M62 94V73h2v-2h8v2h2v21Z" fill="#183f48"/>
  <path d="M65 74h6v8h-6Z" fill="#ffd877"/><path d="M71 87h1v1h-1Z" fill="#fff2ac"/>
  <path d="M60 94h16v3H60Z" fill="#f2ffe9"/>
  <path d="M68 54h7v2h2v6h-2v2h-7v-2h-2v-6h2Z" fill="#167a50"/>
  <path d="M70 62h4v4h-4Z" fill="#ffcc68"/>
  <g class="house-lights" fill="#ffe787"><path d="M46 66h2v2h-2Zm8 1h2v2h-2Zm8-1h2v2h-2Zm17 0h2v2h-2Zm8 1h2v2h-2Zm6-1h2v2h-2Z"/></g>
  <use href="#pixel-tree" transform="translate(29 91)"/>
  <use href="#pixel-tree" transform="translate(133 96) scale(.75)"/>
  <g id="show-tree" role="button" tabindex="0" aria-label="右のツリーのライトショーを再生">
    <use href="#pixel-tree" transform="translate(108 92) scale(1.1)"/>
    <path class="tree-star" d="M106 41h4v4h4v3h-4v4h-4v-4h-4v-3h4Z" fill="#ffe56b"/>
    <g fill="#ff7186"><circle cx="107" cy="58" r="1.2"/><circle cx="101" cy="70" r="1.2"/><circle cx="114" cy="81" r="1.2"/><circle cx="103" cy="92" r="1.2"/></g>
    <g fill="#ffe56b"><circle cx="111" cy="64" r="1.2"/><circle cx="107" cy="77" r="1.2"/><circle cx="96" cy="84" r="1.2"/><circle cx="119" cy="93" r="1.2"/></g>
    <g class="show-bulbs"><circle cx="108" cy="54" r="1"/><circle cx="104" cy="65" r="1"/><circle cx="114" cy="72" r="1"/><circle cx="100" cy="78" r="1"/><circle cx="111" cy="87" r="1"/><circle cx="94" cy="94" r="1"/><circle cx="121" cy="97" r="1"/></g>
    <path class="tree-hit" d="M104 40h8v10h8v15h9v18h13v27H74V83h13V65h9V50h8Z" fill="transparent"/>
  </g>
  <path d="M48 91h7v6h-7Z" fill="#ffce62"/><path d="M51 91h1v6h-1Z" fill="#f7536e"/>
  <path d="M56 93h5v4h-5Z" fill="#7b83f2"/><path d="M58 93h1v4h-1Z" fill="#e1faff"/>
  <path d="M5 111h9v1H5Zm24-6h8v1h-8Zm73 9h12v1h-12Zm20-7h9v1h-9Z" fill="#edffe9"/>
</g></svg>`;

const pixelSanta = `<svg viewBox="0 0 80 26" shape-rendering="crispEdges" aria-hidden="true">
<path d="M10 11h9v8H10Z" fill="#96704e"/><path d="M18 4h7v3h3v3H17V7h1Z" fill="#f7536e"/>
<path d="M18 10h8v5h-8Z" fill="#ffe0ae"/><path d="M20 13h6v4h-6Z" fill="#f7ffe8"/>
<path d="M18 17h10v3H18ZM9 19h23v4H13Z" fill="#f7536e"/>
<path d="M11 24h24v-2h2v4H11Z" fill="#ffe56b"/>
<g fill="#d7af78"><path d="M44 12h9V9h3V6h2v8h-3v3h-8v4h-2v-5h-3v-2h2Zm9-5V2h2v3h3v2Zm-7 10h2v4h-2Z"/><path d="M64 9h9V6h3V3h2v8h-3v3h-8v4h-2v-5h-3v-2h2Zm9-5V0h2v2h3v2Zm-7 10h2v4h-2Z"/></g>
<path d="M30 17h14v1H30Zm26-5h8v1h-8Z" fill="#ffe56b"/>
</svg>`;
