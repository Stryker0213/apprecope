const apiRoutes = new Set([
  '/precio-internacional',
  '/ventas/precio/consumidor',
  '/ventas/precio/plantel',
]);

async function recopeResponse(request, pathname) {
  const apiPath = pathname.replace('/api/recope', '');
  if (!apiRoutes.has(apiPath)) {
    return Response.json({ message: 'Recurso no disponible' }, { status: 404 });
  }

  const incoming = new URL(request.url);
  const target = new URL(`https://api.recope.go.cr${apiPath}`);
  if (apiPath === '/precio-internacional') {
    for (const key of ['inicio', 'fin']) {
      const value = incoming.searchParams.get(key);
      if (value && /^\d{8}$/.test(value)) target.searchParams.set(key, value);
    }
  }

  try {
    const upstream = await fetch(target, { headers: { Accept: 'application/json' } });
    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        'Content-Type': upstream.headers.get('content-type') || 'application/json',
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch {
    return Response.json({ message: 'El servicio de RECOPE no respondió a tiempo' }, { status: 502 });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'GET' && url.pathname.startsWith('/api/recope/')) {
      return recopeResponse(request, url.pathname);
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405 });
    }

    const assetUrl = new URL(request.url);
    if (!assetUrl.pathname.split('/').at(-1)?.includes('.')) assetUrl.pathname = '/index.html';
    return env.ASSETS.fetch(new Request(assetUrl, request));
  },
};
