const CACHE='tankregister-v2-0-0-layout2-'+self.registration.scope;
const FILES=['./','./index.html','./core.js','./stats.js','./extras.js','./ui.js','./v12.css','./manifest.webmanifest','./icon-192.png','./icon-512.png','./vehicle.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
// Normal waiting lifecycle: an update takes effect after all old app tabs close.
// Do not delete other apps' caches on the shared github.io origin.
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>(k.startsWith('tankregister-v12-')||k.startsWith('tankregister-v2-'))&&k.endsWith(self.registration.scope)&&k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;const url=new URL(e.request.url);const known=FILES.some(f=>new URL(f,self.registration.scope).pathname===url.pathname);if(known)e.respondWith(caches.open(CACHE).then(async c=>(await c.match(e.request,{ignoreSearch:true}))||fetch(e.request)));});
