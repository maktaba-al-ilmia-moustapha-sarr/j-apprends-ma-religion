/* AK Dreams Book — Service Worker (PWA, offline-first)
   Stratégie :
   - Precache au 1er visite : coquille (HTML/CSS/JS/données/manifest/icônes).
   - Runtime cache : même origine (stale-while-revalidate) + polices Google (transparent).
   - Navigation hors ligne : index.html depuis le cache, puis pages/setup.html en dernier recours.
   - Mise à jour : nouvelle version → suppression propre des anciens caches ; telescope via BUILD.
*/
const BUILD = "akdreams-v23";
const CORE_CACHE = BUILD + "-core";
const RUNTIME_CACHE = BUILD + "-runtime";
const FONT_CACHE = "akdreams-fonts";

/* Noyau applicatif (URLs exactes utilisées par index.html) */
const CORE = [
  "./", "./index.html", "./manifest.json", "./offline.html",
  "./styles.css?v=23", "./data.js?v=23", "./app.js?v=23",
  "./assets/icons/icon-192.png", "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png", "./assets/icons/apple-touch-icon.png", "./assets/icons/favicon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CORE_CACHE).then(c => c.addAll(CORE).catch(err => {
      /* on n'échoue jamais l'installation pour un fichier secondaire manquant */
      return Promise.allSettled(CORE.map(u => c.add(u)));
    })).then(() => self.skipWaiting())
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

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req, { ignoreSearch: false });
  const net = fetch(req).then(res => {
    if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
    return res;
  }).catch(() => null);
  if (cached) return cached;
  const fresh = await net;
  if (fresh) return fresh;
  throw new Error("offline & uncached");
}

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(req, { ignoreVary: true, ignoreSearch: false });
  if (hit) {
    /* rafraîchit en arrière-plan */
    fetch(req).then(res => { if (res && res.ok) cache.put(req, res.clone()).catch(() => {}); }).catch(() => {});
    return hit;
  }
  const res = await fetch(req);
  if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
  return res;
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  /* 1) navigations (pages) : réseau d'abord, cache ensuite, offline.html en dernier recours */
  if (req.mode === "navigate") {
    e.respondWith((async () => {
      try {
        const res = await fetch(req);
        const cache = await caches.open(RUNTIME_CACHE);
        cache.put("./index.html", res.clone()).catch(() => {});
        return res;
      } catch (err) {
        const c = await caches.open(CORE_CACHE);
        const hit = await c.match("./index.html") || await c.match("./");
        return hit || await c.match("./offline.html") || new Response("<h1>Hors ligne</h1>", { headers: { "Content-Type": "text/html; charset=utf-8" } });
      }
    })());
    return;
  }

  /* 2) polices Google : cacheFirst opportuniste, jamais bloquant hors ligne */
  if (!sameOrigin(url) && /(fonts\.(googleapis|gstatic)\.com)/.test(url.hostname)) {
    e.respondWith(cacheFirst(req, FONT_CACHE).catch(() => fetch(req).catch(() => new Response("", { status: 504 }))));
    return;
  }

  /* 3) même origine : stale-while-revalidate */
  if (sameOrigin(url)) {
    e.respondWith(staleWhileRevalidate(req, RUNTIME_CACHE).catch(async () => {
      const c = await caches.open(CORE_CACHE);
      const hit = await c.match(req) || await c.match("./index.html");
      return hit || new Response("Contenu indisponible hors ligne.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
    }));
  }
});
