import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import AppServerModule from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  const recopeRoutes = new Set([
    '/precio-internacional',
    '/ventas/precio/consumidor',
    '/ventas/precio/plantel',
  ]);

  server.get('/api/recope/*', async (req, res) => {
    const apiPath = req.path.replace('/api/recope', '');
    if (!recopeRoutes.has(apiPath)) {
      res.status(404).json({ message: 'Recurso no disponible' });
      return;
    }

    const target = new URL(`https://api.recope.go.cr${apiPath}`);
    if (apiPath === '/precio-internacional') {
      for (const key of ['inicio', 'fin']) {
        const value = req.query[key];
        if (typeof value === 'string' && /^\d{8}$/.test(value)) target.searchParams.set(key, value);
      }
    }

    try {
      const upstream = await fetch(target, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(12_000),
      });
      const body = await upstream.text();
      res.status(upstream.status);
      res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/json');
      res.setHeader('Cache-Control', 'public, max-age=300');
      res.send(body);
    } catch {
      res.status(502).json({ message: 'El servicio de RECOPE no respondió a tiempo' });
    }
  });

  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap: AppServerModule,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
