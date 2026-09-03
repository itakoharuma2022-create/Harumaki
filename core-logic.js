// アプリケーションの状態を保持するオブジェクト
const AppLogic = {
  state: {
    unlockedCities: [],
    unlockedBadges: [],
    coins: 0,
    equippedItems: {}
  },
  data: {
    nihon: null,
    badges: null
  },
  isInitialized: false
};

// データの初期化およびセーブデータの読み込み
async function initializeAppLogic() {
  try {
    const savedData = localStorage.getItem('mapAdventureSaveData');
    if (savedData) {
      AppLogic.state = JSON.parse(savedData);
    }

    const nihonResponse = await fetch('./Nihon.json');
    AppLogic.data.nihon = await nihonResponse.json();

    const badgesResponse = await fetch('./badges.json');
    AppLogic.data.badges = await badgesResponse.json();

    AppLogic.isInitialized = true;
    console.log('アプリケーションロジックの初期化が完了しました。');
  } catch (error) {
    console.error('初期化エラー:', error);
  }
}

// セーブデータの保存
function saveAppState() {
  localStorage.setItem('mapAdventureSaveData', JSON.stringify(AppLogic.state));
}

// 緯度経度から住所を取得し、市区町村を解放するメイン処理
async function processLocationCheckIn(latitude, longitude) {
  if (!AppLogic.isInitialized) return;

  try {
    // OpenStreetMap Nominatim APIを利用した逆ジオコーディング
    const url = 'https://nominatim.openstreetmap.org/reverse?lat=' + latitude + '&lon=' + longitude + '&format=json&accept-language=ja';
    const response = await fetch(url);
    const locationData = await response.json();

    if (locationData && locationData.address) {
      const prefecture = locationData.address.province || locationData.address.state;
      const city = locationData.address.city || locationData.address.town || locationData.address.village || locationData.address.suburb;

      if (prefecture && city) {
        verifyAndUnlockCity(prefecture, city);
      }
    }
  } catch (error) {
    console.error('逆ジオコーディング通信エラー:', error);
  }
}

// Nihon.jsonデータとの照合と解放処理
function verifyAndUnlockCity(detectedPrefecture, detectedCity) {
  let targetCityCode = null;
  let targetPrefectureId = null;

  AppLogic.data.nihon.forEach(prefObj => {
    const prefKey = Object.keys(prefObj)[0];
    const prefData = prefObj[prefKey];

    if (prefData.name === detectedPrefecture) {
      prefData.city.forEach(cityData => {
        if (cityData.city === detectedCity) {
          targetCityCode = cityData.citycode;
          targetPrefectureId = prefData.id;
        }
      });
    }
  });

  if (targetCityCode) {
    if (!AppLogic.state.unlockedCities.includes(targetCityCode)) {
      AppLogic.state.unlockedCities.push(targetCityCode);
      AppLogic.state.coins = AppLogic.state.coins + 10;
      saveAppState();
      checkBadges();
      
      const event = new CustomEvent('city-unlocked', { detail: { prefecture: detectedPrefecture, city: detectedCity } });
      window.dispatchEvent(event);
    }
  }
}

// 実績（バッジ）の解除判定処理
function checkBadges() {
  const unlockedCount = AppLogic.state.unlockedCities.length;
  
  AppLogic.data.badges.forEach(badge => {
    if (!AppLogic.state.unlockedBadges.includes(badge.id)) {
      let conditionsMet = false;

      // 全国制覇バッジの判定ロジック
      if (badge.category === 'national') {
        const requiredCount = parseInt(badge.id.replace('national_', ''), 10);
        if (unlockedCount >= requiredCount) {
          conditionsMet = true;
        }
      }

      // その他の特殊バッジ（第一歩）の判定
      if (badge.id === 'first_step' && unlockedCount >= 1) {
        conditionsMet = true;
      }

      if (conditionsMet) {
        AppLogic.state.unlockedBadges.push(badge.id);
        saveAppState();
        const event = new CustomEvent('badge-unlocked', { detail: badge });
        window.dispatchEvent(event);
      }
    }
  });
}

// Capacitorのバックグラウンド位置情報イベントの購読
window.addEventListener('capacitor-location-update', function(event) {
  const coords = event.detail.coords;
  processLocationCheckIn(coords.latitude, coords.longitude);
});

// 起動時の初期化実行
window.addEventListener('DOMContentLoaded', initializeAppLogic);