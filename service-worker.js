// このService Workerは「オフラインでも起動できる」「ホーム画面に追加できる」ための
// 最低限のキャッシュ機構のみを提供します。
//
// 重要な注意:
// Service Workerはブラウザ／OSの制約上、アプリが完全に閉じられた状態やバックグラウンドで
// 継続的にGPS位置情報を取得し続けることはできません（iOS Safari・Androidのブラウザ双方とも）。
// 「アプリを閉じても位置が更新され続ける」ような常時バックグラウンド追跡を実現したい場合は、
// Capacitor等でネイティブアプリ化し、ネイティブのバックグラウンド位置情報プラグインを
// 利用する必要があります。

const CACHE_NAME = 'tabi-app-cache-v1';
const APP_SHELL = [
  './',
  './index.html',
  './Nihon.json',
  './badges.json',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 基本方針: まずネットワークを試し、失敗したらキャッシュを返す（オフライン時のフォールバック）
// Firebase/Firestore/Nominatim等の外部APIリクエストはキャッシュ対象から除外する
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  const isExternalApi = url.includes('firestore.googleapis.com') ||
                         url.includes('googleapis.com') ||
                         url.includes('nominatim.openstreetmap.org') ||
                         url.includes('gstatic.com') ||
                         url.includes('unpkg.com') ||
                         url.includes('jsdelivr.net');

  if (isExternalApi || event.request.method !== 'GET') {
    return; // これらはService Workerを介さず通常通り処理する
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
