// ==========================================
// GEO-DOMINATOR: 100種類のやり込み実績システム & コアロジック
// ==========================================

const badgeDefinitions = [
    // 📊 市区町村解放ステップ（全15段階）
    { id: "first_step", name: "第一歩", icon: "👟", desc: "初めて市区町村を解放した" },
    { id: "step_1", name: "初陣の旅人", icon: "🌱", desc: "10個の市区町村を解放した" },
    { id: "step_2", name: "新進気鋭", icon: "🌿", desc: "30個の市区町村を解放した" },
    { id: "step_3", name: "数多の街を超えて", icon: "🍀", desc: "50個の市区町村を解放した" },
    { id: "step_4", name: "熟練の探索者", icon: "🌲", desc: "100個の市区町村を解放した" },
    { id: "step_5", name: "街道の主", icon: "🛣️", desc: "200個の市区町村を解放した" },
    { id: "step_6", name: "国内トラベラー", icon: "🚗", desc: "300個の市区町村を解放した" },
    { id: "step_7", name: "弾丸ハイカー", icon: "🚅", desc: "400個の市区町村を解放した" },
    { id: "step_8", name: "千の土地を知る者", icon: "🌋", desc: "500個の市区町村を解放した" },
    { id: "step_9", name: "全土の観測者", icon: "🛰️", desc: "700個の市区町村を解放した" },
    { id: "step_10", name: "巨匠の足跡", icon: "🔮", desc: "900個の市区町村を解放した" },
    { id: "step_11", name: "偉大なる先駆者", icon: "🔱", desc: "1100個の市区町村を解放した" },
    { id: "step_12", name: "地図を書き換える者", icon: "🌍", desc: "1300個の市区町村を解放した" },
    { id: "step_13", name: "未踏の領域ゼロ", icon: "🌌", desc: "1500個の市区町村を解放した" },
    { id: "japan_complete", name: "天下統一・完全制覇", icon: "👑", desc: "日本のすべての市区町村を完全に解放した" },

    // 🗺️ 都道府県制覇・広域探索系
    { id: "prefecture_master", name: "県内通", icon: "🗺️", desc: "同じ都道府県内で3つ以上解放した" },
    { id: "perfect_local", name: "地域のエキスパート", icon: "🔍", desc: "同じ都道府県内で10個以上解放した" },
    { id: "local_god", name: "郷土の神様", icon: "🦊", desc: "同じ都道府県内で25個以上解放した" },
    { id: "pref_step_1", name: "広域エージェント", icon: "🚲", desc: "5つ以上の都道府県を探索した" },
    { id: "pref_step_2", name: "日本半周", icon: "🚂", desc: "15つ以上の都道府県を探索した" },
    { id: "pref_step_3", name: "日本大周航", icon: "✈️", desc: "30つ以上の都道府県を探索した" },

    // 🗾 日本の東西南北・極地・霊峰（ロマン枠）
    { id: "extreme_north", name: "最北の探求者", icon: "❄️", desc: "日本最北端の地・宗谷岬（北海道稚内市）を解放した" },
    { id: "extreme_east", name: "最東の夜明け", icon: "🌅", desc: "日本最東端（北海道根室市）を解放した" },
    { id: "extreme_south", name: "最南の境界線", icon: "🌴", desc: "日本最南端の有人島（沖縄県八重山郡）を解放した" },
    { id: "extreme_west", name: "最西の果て", icon: "🌊", desc: "日本最西端の国境の島（沖縄県八重山郡）を解放した" },
    { id: "fuji_summit", name: "霊峰の頂き", icon: "🗻", desc: "富士山周辺（静岡県富士宮市または山梨県富士吉田市）を解放した" },

    // 🏙️ 特定エリア・テーマ巡り
    { id: "three_major_cities", name: "三大都市圏ネットワーク", icon: "🏙️", desc: "東京都23区・大阪市・名古屋市をすべて解放した" },
    { id: "koto_breeze", name: "古都の風情", icon: "🏯", desc: "京都府京都市と奈良県奈良市を両方解放した" },
    { id: "udon_patrol", name: "うどん県パトロール", icon: "🥢", desc: "香川県高松市を解放した" },
    { id: "michinoku", name: "みちのく紀行", icon: "🍎", desc: "東北地方（青森・岩手・秋田・宮城・山形・福島）のいずれかを解放した" },
    { id: "ryukyu_breeze", name: "琉球の風", icon: "🌺", desc: "沖縄県那覇市を解放した" },

    // ⚡ プレイスタイル・時間帯・シチュエーション
    { id: "early_bird", name: "アーリーバード", icon: "🐔", desc: "早朝（朝5時〜8時）にチェックインした" },
    { id: "night_walker", name: "ナイトウォーカー", icon: "🌙", desc: "夜間（20時〜朝5時）にチェックインした" },
    { id: "weekend_traveler", name: "週末の旅人", icon: "📅", desc: "土曜日または日曜日にチェックインした" },
    { id: "speed_star", name: "スピードスター", icon: "⚡", desc: "1日のうちに3つ以上の都市を解放した" },
    { id: "bullet_traveler", name: "弾丸トラベラー", icon: "🚀", desc: "1日のうちに5つ以上の都市を解放した" }
];

// 100個に満たない分を動的に自動生成（バリエーション追加）
for (let i = 1; i <= 65; i++) {
    badgeDefinitions.push({
        id: `custom_badge_${i}`,
        name: `隠された開拓称号 No.${i}`,
        icon: "🏅",
        desc: `未踏の土地を巡ることで解放される、第${i}のシークレットアーカイブ。`
    });
}

let appState = {
    unlockedCities: [],
    unlockedBadges: []
};

let nihonData = null;
let map;
let markersGroup;
let polylineGroup;

let currentCalendarDate = new Date();
let selectedDateStr = "";

window.addEventListener('DOMContentLoaded', () => {
    initMap();
    setDefaultSimulatorDate();
    runBootAnimation();
});

function setDefaultSimulatorDate() {
    const today = new Date();
    document.getElementById('simulator-date-input').value = today.toISOString().split('T')[0];
    selectedDateStr = formatDateKey(today);
}

function runBootAnimation() {
    const overlay = document.getElementById('boot-overlay');
    const progress = document.getElementById('boot-progress');
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.style.display = 'none', 500);
            }, 300);
        } else {
            width += 4;
            progress.style.width = width + '%';
        }
    }, 40);
}

function initMap() {
    map = L.map('map', { attributionControl: false }).setView([36.5, 137.5], 5);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);
    markersGroup = L.layerGroup().addTo(map);
    polylineGroup = L.layerGroup().addTo(map);

    fetch('Nihon.json')
        .then(res => res.json())
        .then(data => {
            nihonData = data;
            document.getElementById('location-status').innerText = "GPS READY / MAP INITIALIZED";
            loadData();
            updateUI();
            renderMapForSelectedDate();
            renderCalendar();
            updateHistoryDetails();
        })
        .catch(err => {
            console.error("データの読み込みエラー:", err);
            document.getElementById('location-status').innerText = "DATA LOAD ERROR";
        });
}

function switchTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    document.getElementById(`tab-${tabId}`).classList.add('active');
    element.classList.add('active');
}

function triggerSimulatedCheckIn() {
    if (!nihonData) return;
    
    const targetDateInput = document.getElementById('simulator-date-input').value;
    const targetDateStr = targetDateInput ? targetDateInput.replace(/-/g, '') : formatDateKey(new Date());

    const keys = Object.keys(nihonData[0]);
    const randomPrefKey = keys[Math.floor(Math.random() * keys.length)];
    const pref = nihonData[0][randomPrefKey];
    const cities = pref.city;
    const randomCity = cities[Math.floor(Math.random() * cities.length)];

    const baseLat = 30 + Math.random() * 13;
    const baseLng = 128 + Math.random() * 17;

    unlockCity(pref.id, randomCity.city, randomCity.citycode, baseLat, baseLng, targetDateStr);
}

function unlockCity(prefId, cityName, code, lat, lng, targetedDate = null) {
    const dateStr = targetedDate ? targetedDate : formatDateKey(new Date());
    const alreadyUnlocked = appState.unlockedCities.some(c => c.code === code);
    
    if (!alreadyUnlocked) {
        appState.unlockedCities.push({ prefId, cityName, code, lat, lng, date: dateStr });
        showToast(`🎉 UNLOCKED: ${cityName}`);
    } else {
        showToast(`📍 再訪問: ${cityName}`);
    }

    checkAchievements(dateStr);
    saveData();
    updateUI();

    selectedDateStr = dateStr;
    renderMapForSelectedDate();
    renderCalendar();
    updateHistoryDetails();
}

function checkAchievements(dateStr) {
    const uniqueCount = new Set(appState.unlockedCities.map(c => c.code)).size;
    
    const checkAndUnlock = (badgeId, conditionTrue) => {
        const alreadyHas = appState.unlockedBadges.some(b => b.id === badgeId);
        if (conditionTrue && !alreadyHas) {
            appState.unlockedBadges.push({ id: badgeId, date: dateStr });
            const b = badgeDefinitions.find(badge => badge.id === badgeId);
            if (b) {
                setTimeout(() => showToast(`🏆 UNLOCKED: 【${b.name}】`), 1000);
            }
        }
    };

    // 解放数判定
    checkAndUnlock("first_step", uniqueCount >= 1);
    checkAndUnlock("step_1", uniqueCount >= 10);
    checkAndUnlock("step_2", uniqueCount >= 30);
    checkAndUnlock("step_3", uniqueCount >= 50);
    checkAndUnlock("step_4", uniqueCount >= 100);
    checkAndUnlock("step_5", uniqueCount >= 200);
    checkAndUnlock("step_6", uniqueCount >= 300);
    checkAndUnlock("step_7", uniqueCount >= 400);
    checkAndUnlock("step_8", uniqueCount >= 500);
    checkAndUnlock("step_9", uniqueCount >= 700);
    checkAndUnlock("step_10", uniqueCount >= 900);
    checkAndUnlock("step_11", uniqueCount >= 1100);
    checkAndUnlock("step_12", uniqueCount >= 1300);
    checkAndUnlock("step_13", uniqueCount >= 1500);

    // 都道府県・地域判定
    const prefCounts = {};
    const seenCodes = new Set();
    appState.unlockedCities.forEach(c => {
        if (!seenCodes.has(c.code)) {
            seenCodes.add(c.code);
            prefCounts[c.prefId] = (prefCounts[c.prefId] || 0) + 1;
        }
    });

    const uniquePrefsCount = Object.keys(prefCounts).length;
    checkAndUnlock("prefecture_master", Object.values(prefCounts).some(v => v >= 3));
    checkAndUnlock("perfect_local", Object.values(prefCounts).some(v => v >= 10));
    checkAndUnlock("local_god", Object.values(prefCounts).some(v => v >= 25));
    checkAndUnlock("pref_step_1", uniquePrefsCount >= 5);
    checkAndUnlock("pref_step_2", uniquePrefsCount >= 15);
    checkAndUnlock("pref_step_3", uniquePrefsCount >= 30);

    // ロマン枠極地判定
    const cityNames = appState.unlockedCities.map(c => c.cityName);
    checkAndUnlock("extreme_north", cityNames.some(n => n.includes("稚内市")));
    checkAndUnlock("extreme_east", cityNames.some(n => n.includes("根室市")));
    checkAndUnlock("extreme_south", cityNames.some(n => n.includes("八重山郡"))); 
    checkAndUnlock("fuji_summit", cityNames.some(n => n.includes("富士宮市") || n.includes("富士吉田市")));

    // 時間・カレンダー条件
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay();
    checkAndUnlock("early_bird", currentHour >= 5 && currentHour < 8);
    checkAndUnlock("night_walker", currentHour >= 20 || currentHour < 5);
    checkAndUnlock("weekend_traveler", currentDay === 0 || currentDay === 6);

    const todayCount = new Set(appState.unlockedCities.filter(c => c.date === dateStr).map(c => c.code)).size;
    checkAndUnlock("speed_star", todayCount >= 3);
    checkAndUnlock("bullet_traveler", todayCount >= 5);

    // 残りの隠し称号枠もランダム開拓進捗に応じて解放判定
    for (let i = 1; i <= 65; i++) {
        checkAndUnlock(`custom_badge_${i}`, uniqueCount >= (15 + i * 8));
    }
}

function updateUI() {
    const uniqueCount = new Set(appState.unlockedCities.map(c => c.code)).size;
    document.getElementById('stats-count').innerText = uniqueCount;
    document.getElementById('stats-badges').innerText = appState.unlockedBadges.length;

    const level = Math.floor(uniqueCount / 4) + 1;
    document.getElementById('profile-level').innerText = level;

    // バッジグリッド生成
    const grid = document.getElementById('badges-grid-container');
    if (grid) {
        grid.innerHTML = "";
        badgeDefinitions.forEach(b => {
            const isUnlocked = appState.unlockedBadges.some(has => has.id === b.id);
            const badgeEl = document.createElement('div');
            badgeEl.className = `badge-card ${isUnlocked ? 'unlocked' : 'locked'}`;
            badgeEl.innerHTML = `
                <div class="badge-icon">${isUnlocked ? b.icon : "🔒"}</div>
                <div class="badge-name">${b.name}</div>
                <div class="badge-desc">${b.desc}</div>
            `;
            grid.appendChild(badgeEl);
        });
    }

    // アーカイブ一覧の更新
    const listEl = document.getElementById('unlocked-cities-list');
    if (listEl) {
        listEl.innerHTML = "";
        if (appState.unlockedCities.length === 0) {
            listEl.innerHTML = `<li>No data. Start your adventure!</li>`;
        } else {
            [...appState.unlockedCities].reverse().forEach(c => {
                const li = document.createElement('li');
                li.innerHTML = `<span>📍 ${c.cityName}</span> <small>${formatDisplayDate(c.date)}</small>`;
                listEl.appendChild(li);
            });
        }
    }
}

function renderMapForSelectedDate() {
    markersGroup.clearLayers();
    polylineGroup.clearLayers();

    const filtered = appState.unlockedCities.filter(c => c.date === selectedDateStr);
    if (filtered.length === 0) return;

    const latlngs = [];
    filtered.forEach(c => {
        const pt = [c.lat, c.lng];
        latlngs.push(pt);
        L.marker(pt).addTo(markersGroup).bindPopup(`<b>${c.cityName}</b><br>${formatDisplayDate(c.date)}`);
    });

    if (latlngs.length > 1) {
        L.polyline(latlngs, { color: 'var(--neon-pink)', weight: 3, dashArray: '5, 8' }).addTo(polylineGroup);
    }
    map.setView(latlngs[latlngs.length - 1], 6);
}

function renderCalendar() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    document.getElementById('calendar-month-year').innerText = `${year}年 ${String(month + 1).padStart(2, '0')}月`;

    const grid = document.getElementById('calendar-days-grid');
    grid.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        grid.appendChild(empty);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const dateKey = `${year}${String(month + 1).padStart(2, '0')} ${String(d).padStart(2, '0')}`.replace(/ /g, '');
        const dayEl = document.createElement('div');
        dayEl.className = "calendar-day";
        dayEl.innerText = d;

        const hasActivity = appState.unlockedCities.some(c => c.date === dateKey);
        if (hasActivity) dayEl.classList.add('has-activity');
        if (dateKey === selectedDateStr) dayEl.classList.add('selected');

        dayEl.onclick = () => {
            selectedDateStr = dateKey;
            document.querySelectorAll('.calendar-day').forEach(el => el.classList.remove('selected'));
            dayEl.classList.add('selected');
            renderMapForSelectedDate();
            updateHistoryDetails();
        };

        grid.appendChild(dayEl);
    }
}

function moveMonth(offset) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + offset);
    renderCalendar();
}

function updateHistoryDetails() {
    document.getElementById('detail-date-title').innerText = `${formatDisplayDate(selectedDateStr)} の冒険記録`;
    
    const citiesList = document.getElementById('detail-cities-list');
    citiesList.innerHTML = "";
    const filteredCities = appState.unlockedCities.filter(c => c.date === selectedDateStr);
    if (filteredCities.length === 0) {
        citiesList.innerHTML = "<li>この日のチェックインログはありません</li>";
    } else {
        filteredCities.forEach(c => {
            const li = document.createElement('li');
            li.innerText = `📍 ${c.cityName} (${c.code})`;
            citiesList.appendChild(li);
        });
    }

    const badgesList = document.getElementById('detail-badges-list');
    badgesList.innerHTML = "";
    const filteredBadges = appState.unlockedBadges.filter(b => b.date === selectedDateStr);
    if (filteredBadges.length === 0) {
        badgesList.innerHTML = "<li>この日に獲得した実績はありません</li>";
    } else {
        filteredBadges.forEach(b => {
            const def = badgeDefinitions.find(d => d.id === b.id);
            const li = document.createElement('li');
            li.innerText = def ? `🏆 【${def.name}】 ${def.icon}` : `🏆 未知の実績 (${b.id})`;
            badgesList.appendChild(li);
        });
    }
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 2500);
}

function formatDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
}

function formatDisplayDate(key) {
    if (!key || key.length !== 8) return key;
    return `${key.substring(0, 4)}/${key.substring(4, 6)}/${key.substring(6, 8)}`;
}

function saveData() {
    localStorage.setItem('geo_nihon_app_state_v5_calendar', JSON.stringify(appState));
}

function loadData() {
    const saved = localStorage.getItem('geo_nihon_app_state_v5_calendar');
    if (saved) {
        try {
            appState = JSON.parse(saved);
        } catch(e) {
            console.error("データロード失敗:", e);
        }
    }
}

function resetAllData() {
    if (confirm('すべての冒険記録を初期化しますか？')) {
        appState = { unlockedCities: [], unlockedBadges: [] };
        saveData();
        updateUI();
        if (markersGroup) markersGroup.clearLayers();
        if (polylineGroup) polylineGroup.clearLayers();
        if (map) map.setView([36.5, 137.5], 5);
        
        const today = new Date();
        selectedDateStr = formatDateKey(today);
        renderCalendar();
        updateHistoryDetails();
        showToast("RESET COMPLETED");
    }
}