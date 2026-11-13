import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve(process.argv[2] || 'public');
const types = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css',
	'.js': 'text/javascript',
	'.svg': 'image/svg+xml'
};
createServer(async (req, res) => {
	try {
		const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
		const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
		if (!file.startsWith(root + sep)) {
			res.writeHead(403).end();
			return;
		}
		const data = await readFile(file);
		res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
		res.end(data);
	} catch {
		res.writeHead(404).end('Not found');
	}
}).listen(5173, '127.0.0.1', () => console.log('Christmas invitation: http://localhost:5173'));
