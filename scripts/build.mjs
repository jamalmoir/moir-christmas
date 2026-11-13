import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import { renderRetro } from './retro.mjs';
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'styles.css', 'retro.css', 'app.js', 'favicon.svg']) {
	await copyFile('public/' + file, 'dist/' + file);
}
await writeFile('dist/8bit.html', renderRetro(await readFile('public/index.html', 'utf8')));
console.log('Built Christmas invitation → dist/');
