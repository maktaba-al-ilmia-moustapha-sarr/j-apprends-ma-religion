/* AK Dreams Book — Service Worker (PWA, offline-first, hardened)
   - Precache au 1er visite : coquille (HTML/CSS/JS/données/manifest/icônes/offline).
   - Runtime cache : même origine (stale-while-revalidate) + polices Google.
   - Navigation hors ligne : index.html depuis le cache, puis offline.html.
   - Sécurité : on ne met JAMAIS en cache une réponse non-OK (bug connu des
     portails captifs / proxies qui renvoient 502/HTML), et on ne ressert
     jamais une entrée de cache corrompue ou vide.
   - Mise à jour : BUILD change → nouveaux caches, suppression propre des anciens.
*/
const BUILD = "akdreams-v25";
const CORE_CACHE = BUILD + "-core";
const RUNTIME_CACHE = BUILD + "-runtime";
const FONT_CACHE = "akdreams-fonts";

const CORE = [
  "./", "./index.html", "./manifest.json", "./offline.html",
  "./styles.css?v=23", "./data.js?v=23", "./app.js?v=23",
  "./assets/icons/icon-192.png", "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png", "./assets/icons/apple-touch-icon.png", "./assets/icons/favicon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CORE_CACHE).then(c => c.addAll(CORE)).catch(() => {
      return Promise.allSettled(CORE.map(u => caches.open(CORE_CACHE).then(c2 => c2.add(u))));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CORE_CACHE && k !== RUNTIME_CACHE && k !== FONT_CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

function sameOrigin(url) { return new URL(url).origin === location.origin; }
/* une entrée de cache n'est réutilisable que si elle est complète et saine */
function usable(res) { return res && res.ok && res.status === 200; }

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req).then(m => usable(m) ? m : null);
  const net = fetch(req).then(res => {
    if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
    return res;
  }).catch(() => null);
  if (cached) return cached;
  const fresh = await net;
  if (usable(fresh)) return fresh;
  throw new Error("offline-uncached");
}

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req, { ignoreSearch: false, ignoreVary: true }).then(m => usable(m) ? m : null);
  if (hit) {
    fetch(req).then(res => { if (res && res.ok) cache.put(req, res.clone()).catch(() => {}); }).catch(() => {});
    return hit;
  }
  const res = await fetch(req);
  if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
  return res; /* Resource facile : le navigateur retombe sur la police système si absent */
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  /* 1) navigations : cache-first (coquille SPA) + rafraîchissement arrière-plan silencieux.
        Évite la faille Chrome ERR_FAILED d'une navigation refetchée en cas de réseau mort. */
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      const c = await caches.open(CORE_CACHE);
      const hit = await c.match("./index.html").then(m => usable(m) ? m : null);
      if (hit) {
        fetch(req).then(res => {
          if (res && res.ok) caches.open(RUNTIME_CACHE).then(cc => cc.put(req, res.clone()).catch(() => {}));
        }).catch(() => {});
        return hit;
      }
      let res = null;
      try { res = await fetch(req); } catch (err) { res = null; }
      if (usable(res)) {
        caches.open(RUNTIME_CACHE).then(cc => cc.put("./index.html", res.clone()).catch(() => {}));
        return res;
      }
      const off = await c.match("./offline.html");
      return off || new Response("<h1>Hors ligne</h1>", { headers: { "Content-Type": "text/html; charset=utf-8" } });
    })());
    return;
  }

  /* 2) polices Google : cacheFirst opportuniste, jamais bloquant hors ligne */
  if (!sameOrigin(url) && /(fonts\.(googleapis|gstatic)\.com)/.test(url.hostname)) {
    e.respondWith(cacheFirst(req, FONT_CACHE).catch(async () => {
      await fetch(req).catch(() => {});
      return new Response("", { status: 504 });
    }));
    return;
  }

  /* 3) même origine : stale-while-revalidate, fallback coquille puis offline.html */
  if (sameOrigin(url)) {
    e.respondWith(staleWhileRevalidate(req, RUNTIME_CACHE).catch(async () => {
      const c = await caches.open(CORE_CACHE);
      const hit = await c.match(req).then(usable) || await c.match("./index.html").then(usable);
      if (hit) {
        /* on renvoie le contenu du shell : l'application gère ensuite la route */
        return hit;
      }
      const off = await c.match("./offline.html");
      return off || new Response("Contenu indisponible hors ligne.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
    }));
  }
});
