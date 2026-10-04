import { CommonEngine } from '@angular/ssr/node';
import { render } from '@netlify/angular-runtime/common-engine.mjs';

const commonEngine = new CommonEngine();

// Relais vers l'API du VPS IONOS. La fonction SSR de Netlify reçoit toutes les requêtes
// avant les [[redirects]] de netlify.toml : c'est donc ici que /api et /uploads sont transmis.
// Le navigateur ne contacte que immo-abidjan.netlify.app : pas de CORS,
// et les pare-feux qui bloquent sslip.io ne gênent plus.
const API_VPS = 'https://217-160-69-180.sslip.io';
const CHEMINS_RELAYES = ['/api/', '/uploads/'];

export async function netlifyCommonEngineHandler(
  request: Request,
  context: any,
): Promise<Response> {
  const url = new URL(request.url);
  if (CHEMINS_RELAYES.some((chemin) => url.pathname.startsWith(chemin))) {
    return relayer(request, url);
  }
  return await render(commonEngine);
}

async function relayer(request: Request, url: URL): Promise<Response> {
  const entetes = new Headers(request.headers);
  entetes.delete('host');

  const reponse = await fetch(API_VPS + url.pathname + url.search, {
    method: request.method,
    headers: entetes,
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.arrayBuffer(),
    redirect: 'manual',
  });

  // fetch a déjà décompressé le corps : ces en-têtes ne correspondent plus
  const entetesReponse = new Headers(reponse.headers);
  entetesReponse.delete('content-encoding');
  entetesReponse.delete('content-length');

  return new Response(reponse.body, {
    status: reponse.status,
    statusText: reponse.statusText,
    headers: entetesReponse,
  });
}
