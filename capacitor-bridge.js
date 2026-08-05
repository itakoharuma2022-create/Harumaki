(function () {
  'use strict';
  var isCapacitor = window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform();
  if (!isCapacitor) return;

  async function startBg() {
    try {
      // import() を使わず、Capacitorが自動注入するグローバルオブジェクトから取得
      var BackgroundGeolocation = window.Capacitor.Plugins.BackgroundGeolocation;
      
      if (!BackgroundGeolocation) {
        console.warn('[CapacitorBridge] BackgroundGeolocation プラグインが見つかりません');
        return;
      }

      await BackgroundGeolocation.addWatcher(
        {
          backgroundMessage: '位置情報を取得中...',
          backgroundTitle: '旅アプリ',
          distanceFilter: 10,
          desiredAccuracy: 10,
          stale: false,
          requestPermissions: true,
          stationary: false
        },
        function (loc, err) {
          if (err || !loc) return;
          var pos = {
            coords: {
              latitude: loc.latitude,
              longitude: loc.longitude,
              accuracy: loc.accuracy,
              altitude: loc.altitude,
              speed: loc.speed,
              heading: loc.heading
            },
            timestamp: loc.time || Date.now()
          };
          window.dispatchEvent(new CustomEvent('capacitor-location-update', { detail: pos }));
        }
      );
    } catch (e) {
      console.warn('[CapacitorBridge] 位置情報の監視開始エラー:', e);
    }
  }

  async function stopBg() {
    try {
      var BackgroundGeolocation = window.Capacitor.Plugins.BackgroundGeolocation;
      if (BackgroundGeolocation) {
        await BackgroundGeolocation.removeAllWatchers();
      }
    } catch (e) {
      console.warn('[CapacitorBridge] 位置情報の監視停止エラー:', e);
    }
  }

  var orig = window.toggleLocationSharing;
  window.toggleLocationSharing = function (on) {
    if (orig) orig(on);
    if (on) startBg(); else stopBg();
  };

  window.CapacitorBridge = { startBg: startBg, stopBg: stopBg };
})();
