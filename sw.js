const C="cal-v2-gojo";
self.addEventListener("install",e=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.filter(k=>k.startsWith("cal-")&&k!==C).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener("fetch",e=>{const r=e.request;
 if(r.mode!=="navigate")return;
 e.respondWith(fetch(r.url.split("?")[0],{cache:"no-store"}).then(res=>{const c=res.clone();caches.open(C).then(x=>x.put("index",c));return res}).catch(()=>caches.open(C).then(x=>x.match("index")).then(m=>m||Response.error())));
});
