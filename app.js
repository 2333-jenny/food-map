/* ============================================================
 * 能量补给站 · 美食地图攻略
 * 纯前端应用：数据存 localStorage，可导入导出，可分享快照
 * ============================================================ */
'use strict';

/* ---------------- 预置数据（来自《工作能量补充.xlsx》） ---------------- */
const DEFAULT_DATA = [
  { id: "d1", city: "惠州", district: "惠阳", place: "大亚湾万达", shop: "龍歌自助小火锅", type: "实体店", cat: "火锅", party: "单人", rating: 3.5, verdict: "NPC", dish: "粉色小汉堡，红薯干", tucao: "很多水果和主食，尝试一下没问题，不能深究", img: "", geo: "" },
  { id: "d2", city: "惠州", district: "惠阳", place: "富康锦绣壹号与宝来广场中间（晚上会有个牌牌挂放到他家门口）", shop: "小杨东北鲜肉摊", type: "小地摊", cat: "烧烤", party: "单人多人都可", rating: 4.5, verdict: "人上人", dish: "整个摊上的东西都好吃", tucao: "", img: "", geo: "" },
  { id: "d3", city: "惠州", district: "惠阳", place: "大亚湾西区德州城", shop: "东北老式麻辣烫", type: "实体店", cat: "麻辣烫", party: "单人", rating: 4, verdict: "人上人", dish: "素菜好吃，玉米面好吃，选择比较少，酱很香，我教练的东北学员推荐的", tucao: "", img: "", geo: "" },
  { id: "d4", city: "惠州", district: "惠州", place: "龙光城", shop: "北步园火锅", type: "实体店", cat: "火锅", party: "单人多人都可", rating: 0, verdict: "", dish: "", tucao: "", img: "", geo: "" },
  { id: "d5", city: "深圳", district: "坪山", place: "龙田街道龙兴北路", shop: "雄威牛肉火锅", type: "实体店", cat: "火锅", party: "单人多人都可", rating: 5, verdict: "人上人", dish: "清汤牛肉火锅，点鲜牛肉，吊龙，雪花（每次必点，其他的没试）", tucao: "", img: "", geo: "" },
  { id: "d6", city: "深圳", district: "坪山", place: "坪山坑梓", shop: "新潮味砂锅粥", type: "实体店", cat: "大排档", party: "单人多人都可", rating: 0, verdict: "夯", dish: "砂锅粥，炒菜", tucao: "", img: "", geo: "" },
  { id: "d7", city: "深圳", district: "坪山", place: "坪山坑梓", shop: "庄记大排档", type: "实体店", cat: "大排档", party: "单人多人都可", rating: 0, verdict: "人上人", dish: "只吃腌面跟八刀汤", tucao: "", img: "", geo: "" },
  { id: "d8", city: "深圳", district: "坪山", place: "坪山坑梓", shop: "圆圆中西餐厅", type: "实体店", cat: "", party: "单人多人都可", rating: 0, verdict: "人上人", dish: "", tucao: "", img: "", geo: "" },
  { id: "d9", city: "深圳", district: "坪山", place: "坪山坑梓", shop: "中龙兴泰", type: "实体店", cat: "火锅", party: "单人多人都可", rating: 0, verdict: "人上人", dish: "", tucao: "开在屠宰场旁边，绝对新鲜", img: "", geo: "" },
  { id: "d10", city: "深圳", district: "坪山", place: "坪山坑梓", shop: "大新陕西面馆", type: "实体店", cat: "小餐馆", party: "单人多人都可", rating: 0, verdict: "人上人", dish: "凉皮+肉夹馍", tucao: "", img: "", geo: "" },
  { id: "d11", city: "深圳", district: "坪山", place: "坪山益田", shop: "肉祭", type: "实体店", cat: "烤肉", party: "单人多人都可", rating: 0, verdict: "夯", dish: "", tucao: "", img: "", geo: "" },
  { id: "d12", city: "深圳", district: "坪山", place: "坪山益田", shop: "渝月（仅限坪山益田，深圳其他区的不好吃）", type: "实体店", cat: "川菜", party: "单人多人都可", rating: 0, verdict: "夯", dish: "", tucao: "之前在塘朗吃的不好吃，齁咸", img: "", geo: "" },
  { id: "d13", city: "深圳", district: "坪山", place: "坪山书城", shop: "Gebake", type: "实体店", cat: "简餐漂亮饭", party: "单人多人都可", rating: 0, verdict: "夯", dish: "所有甜点都冲，其他菜品也冲", tucao: "", img: "", geo: "" },
  { id: "d14", city: "深圳", district: "坪山", place: "坪山锦龙", shop: "超牛牛肉火锅", type: "实体店", cat: "火锅", party: "单人多人都可", rating: 0, verdict: "夯", dish: "", tucao: "超牛性价比比中龙兴泰高，肉质各方面很新鲜", img: "", geo: "" },
  { id: "d15", city: "深圳", district: "坪山", place: "坪山锦龙", shop: "好天地大酒楼", type: "实体店", cat: "茶楼", party: "单人多人都可", rating: 0, verdict: "人上人", dish: "", tucao: "茶点都是现做的，不是预制品，很好吃，但不要去吃晚上的场", img: "", geo: "" },
  { id: "d16", city: "深圳", district: "坪山", place: "文化聚落", shop: "野拾食堂", type: "实体店", cat: "简餐漂亮饭", party: "单人多人都可", rating: 3.5, verdict: "NPC", dish: "芝士拉面，雪糕", tucao: "薄荷黑巧拿铁不好喝，不能调整甜度，很甜", img: "", geo: "" },
  { id: "d17", city: "惠州", district: "惠阳", place: "万达还有其他地方都有", shop: "安德利酒楼", type: "实体店", cat: "茶楼", party: "单人多人都可", rating: 4, verdict: "夯", dish: "", tucao: "羊肉类的还是不吃了", img: "", geo: "" },
  { id: "d18", city: "深圳", district: "南山", place: "茶光", shop: "潮汕楚兴海鲜大排档", type: "实体店", cat: "大排档", party: "多人", rating: 4.5, verdict: "夯", dish: "海鲜很新鲜，价格比较亲民，环境一般（不是问题），皮皮虾，花螺，鱼面，都很好吃，适合部门团建", tucao: "", img: "", geo: "" },
  { id: "d19", city: "深圳", district: "南山", place: "南山地铁站", shop: "水牛奶皇后", type: "实体店", cat: "甜品", party: "单人多人都可", rating: 4, verdict: "人上人", dish: "好吃，分量大，便宜，真材实料的糖水。但是太难排队了，多的时候要排1000桌，只能选择外带然后去别的地方吃", tucao: "", img: "", geo: "" },
  { id: "d20", city: "深圳", district: "宝安", place: "上川", shop: "川胖子美蛙鱼头", type: "实体店", cat: "火锅", party: "多人", rating: 4, verdict: "人上人", dish: "要排队，然后点好菜之后要煮40分钟，饿鬼别来。分量其实挺大的，吃不完，很香，麻麻的", tucao: "有点怀疑是饿太久了所以特别香", img: "", geo: "" },
  { id: "d21", city: "深圳", district: "南山", place: "丽康路", shop: "续缘小院", type: "实体店", cat: "私房/农庄", party: "多人", rating: 4.5, verdict: "夯", dish: "每个菜都很好吃！！！从未吃过那么大那么嫩的芦笋，鸡有鸡味，小河鲜鱼也很新鲜", tucao: "唯一美中不足的，有点贵", img: "", geo: "" }
];

/* ---------------- 常量 ---------------- */
const STORE_KEY = "food_map_data_v1";
const CATS = ["火锅", "烧烤", "麻辣烫", "大排档", "茶楼", "甜品", "川菜", "烤肉", "简餐漂亮饭", "小餐馆", "私房/农庄", "其他"];
const VERDICTS = [
  { v: "人上人", emo: "👑", desc: "强推 / 必须去" },
  { v: "夯", emo: "👍", desc: "不错 / 可冲" },
  { v: "NPC", emo: "🤷", desc: "一般 / 路过" }
];
/* 城市预设中心点（OSM 坐标系，用于地图初始位置与无坐标条目） */
const CITY_CENTERS = {
  "深圳": [22.5431, 114.0579],
  "惠州": [23.1115, 114.4162]
};
const CITY_VIEWS = {
  "深圳": [22.65, 114.15],
  "惠州": [23.30, 114.60]
};

/* ---------------- State ---------------- */
let data = [];
let filter = { q: "", city: "", cat: "" };
let currentView = "map";
let editingId = null;
let geoPicked = null;   // 选点弹窗临时坐标
let map = null, geoPickerMap = null, markerLayer = null;
let isReadonly = false;
let shareData = null;

/* ---------------- DOM refs ---------------- */
const $ = id => document.getElementById(id);

/* ---------------- Init ---------------- */
function init() {
  bindEvents();
  loadFromURL();
  if (!shareData) {
    const stored = loadFromStorage();
    // 统一 normalizeItem：旧数据缺 id/字段时自动补齐（幂等）
    data = (stored && stored.length ? stored : DEFAULT_DATA).map(normalizeItem);
    saveToStorage();
  } else {
    data = shareData;
    isReadonly = true;
    document.body.classList.add("readonly");
  }
  populateCatOptions();
  renderAll();
}

function clone(o) { return JSON.parse(JSON.stringify(o)); }

/* ---------------- Storage ---------------- */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) { console.warn("load storage failed", e); return null; }
}
function saveToStorage() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) { console.warn("save failed", e); }
}
function exportJSON() {
  const blob = new Blob([JSON.stringify({ app: "food-map", version: 1, exportedAt: new Date().toISOString(), data })], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "美食地图数据-" + new Date().toISOString().slice(0, 10) + ".json";
  a.click();
  URL.revokeObjectURL(a.href);
}
function parseImport(text) {
  try {
    const obj = JSON.parse(text);
    let arr = Array.isArray(obj) ? obj : obj.data;
    if (!Array.isArray(arr)) return null;
    return arr.filter(x => x && x.shop).map(normalizeItem);
  } catch (e) { return null; }
}

/* ---------------- Normalize ---------------- */
function normalizeItem(it) {
  return {
    id: it.id || uid(),
    city: it.city || "",
    district: it.district || "",
    place: it.place || "",
    shop: String(it.shop || "").trim(),
    type: it.type || "实体店",
    cat: it.cat || "",
    party: it.party || "单人多人都可",
    rating: Math.max(0, Math.min(5, Number(it.rating) || 0)),
    verdict: it.verdict || "",
    dish: it.dish || "",
    tucao: it.tucao || "",
    img: it.img || "",
    geo: it.geo || ""
  };
}
function uid() { return "f" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

/* ---------------- Share / URL ---------------- */
function loadFromURL() {
  try {
    // 注意：不能用 URLSearchParams（会把 + 解码为空格，损坏 lz-string 压缩数据）。
    // 手动解析保留原始字符。
    const m = /[?&]data=([^&]*)/.exec(location.search);
    const raw = m ? m[1] : null;
    if (raw) {
      // 优先 lz-string 压缩格式（分享新链接）
      let decoded = null;
      if (typeof LZString !== "undefined") {
        try { decoded = LZString.decompressFromEncodedURIComponent(raw); } catch (e) { decoded = null; }
      }
      // 兼容旧格式（纯 encodeURIComponent JSON）
      if (!decoded) { try { decoded = decodeURIComponent(raw); } catch (e) { decoded = null; } }
      if (decoded) {
        const arr = parseImport(decoded);
        if (arr && arr.length) { shareData = arr; return; }
      }
    }
  } catch (e) { /* ignore */ }
}
function buildShareURL() {
  const json = JSON.stringify({ app: "food-map", version: 1, data });
  let payload = null;
  // 优先 lz-string 压缩（URL 短 78%，微信等 IM 不会截断）
  if (typeof LZString !== "undefined") {
    try { payload = LZString.compressToEncodedURIComponent(json); } catch (e) { payload = null; }
  }
  if (!payload) payload = encodeURIComponent(json);
  return location.origin + location.pathname + "?data=" + payload;
}
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      return true;
    } catch (e2) { return false; }
  }
}

/* ---------------- Filtering ---------------- */
function getFiltered() {
  return data.filter(it => {
    if (filter.q) {
      const q = filter.q.toLowerCase();
      const hay = [it.shop, it.place, it.district, it.city, it.cat, it.dish, it.tucao, it.verdict].join(" ").toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (filter.city && it.city !== filter.city) return false;
    if (filter.cat && it.cat !== filter.cat) return false;
    return true;
  });
}
function uniqueList(arr, key) {
  const set = new Set();
  arr.forEach(x => { const v = x[key]; if (v) set.add(v); });
  return [...set];
}

/* ---------------- Render ---------------- */
function renderAll() {
  renderChips();
  renderGrid();
  renderMap();
  renderStats();
  populateCityList();
}

function renderStats() {
  $("stat-count").textContent = data.length + " 家美食";
  const cities = uniqueList(data, "city");
  $("stat-city").textContent = cities.length ? cities.join(" / ") : "";
  $("manage-count").textContent = data.length;
}

function populateCatOptions() {
  const sel = $("field-cat");
  sel.innerHTML = '<option value="">选择类别...</option>' + CATS.map(c => `<option value="${c}">${c}</option>`).join("");
}
function populateCityList() {
  const dl = $("city-list");
  dl.innerHTML = uniqueList(data, "city").map(c => `<option value="${c}">`).join("");
}

function renderChips() {
  const cities = uniqueList(data, "city");
  const cats = uniqueList(data, "cat");
  $("city-chips").innerHTML =
    '<button class="chip' + (filter.city === "" ? " active" : "") + '" data-kind="city" data-val="">全部城市</button>' +
    cities.map(c => `<button class="chip${filter.city === c ? " active" : ""}" data-kind="city" data-val="${c}">${c}</button>`).join("");
  $("cat-chips").innerHTML =
    '<button class="chip' + (filter.cat === "" ? " active" : "") + '" data-kind="cat" data-val="">全部类别</button>' +
    cats.map(c => `<button class="chip${filter.cat === c ? " active" : ""}" data-kind="cat" data-val="${c}">${c}</button>`).join("");
}

function verdictBadge(v) {
  if (!v) return "";
  return `<span class="verdict-badge v-${v}">${VERDICT_EMO(v)} ${v}</span>`;
}
function VERDICT_EMO(v) {
  const f = VERDICTS.find(x => x.v === v);
  return f ? f.emo : "";
}
function starsHtml(r) {
  if (!r) return "";
  const full = Math.floor(r);
  const half = r - full >= 0.5;
  let s = "";
  for (let i = 0; i < full; i++) s += '<span class="star-s">★</span>';
  if (half) s += '<span class="star-s half">★</span>';
  const gray = 5 - full - (half ? 1 : 0);
  for (let i = 0; i < gray; i++) s += '<span class="star-s off">★</span>';
  return s;
}

function renderGrid() {
  const list = getFiltered();
  const grid = $("food-grid");
  $("grid-empty").hidden = list.length > 0;
  if (!list.length) { grid.innerHTML = ""; return; }
  grid.innerHTML = list.map(it => {
    const img = it.img
      ? `<div class="food-card-img" style="background-image:url('${esc(it.img)}')">${verdictBadge(it.verdict)}<span class="food-card-cat">${esc(it.cat || it.type || "美食")}</span>${it.rating ? `<span class="food-card-rating">★ ${it.rating}</span>` : ""}</div>`
      : `<div class="food-card-img"><div class="placeholder">${CAT_EMO(it.cat)}</div>${verdictBadge(it.verdict)}<span class="food-card-cat">${esc(it.cat || it.type || "美食")}</span>${it.rating ? `<span class="food-card-rating">★ ${it.rating}</span>` : ""}</div>`;
    const loc = [it.city, it.district, it.place].filter(Boolean).join(" · ");
    return `<div class="food-card" data-id="${it.id}">
      ${img}
      <div class="food-card-body">
        <div class="food-card-name">${esc(it.shop)}</div>
        <div class="food-card-reason">${esc(it.dish || it.tucao || "")}</div>
        <div class="food-card-meta">
          <span class="loc">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-5.1-7-11a7 7 0 0 1 14 0c0 5.9-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
            ${esc(loc || "未标注位置")}
          </span>
          ${it.party ? `<span class="party">${esc(it.party)}</span>` : ""}
        </div>
      </div>
    </div>`;
  }).join("");
}

function CAT_EMO(cat) {
  const map = {
    "火锅": "🍲", "烧烤": "🍖", "麻辣烫": "🍜", "大排档": "🦐", "茶楼": "🍵",
    "甜品": "🍮", "川菜": "🌶️", "烤肉": "🥩", "简餐漂亮饭": "🍱", "小餐馆": "🍚",
    "私房/农庄": "🥘"
  };
  return map[cat] || "🍽️";
}

/* ---------------- Map ---------------- */
function initMap() {
  if (map) return;
  map = L.map("map", { zoomControl: true }).setView([22.9, 114.3], 9);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  const v = currentView;
}
function fitAllMarkers() {
  if (!markerLayer) return;
  const items = getFiltered().filter(x => x.geo);
  if (items.length) {
    const bounds = L.latLngBounds(items.map(x => {
      const [la, lo] = geoToArr(x.geo);
      return [la, lo];
    }));
    if (currentView === "map") map.fitBounds(bounds, { padding: [30, 30], maxZoom: 14 });
  }
}
function geoToArr(geo) {
  const parts = String(geo).split(",").map(x => parseFloat(x.trim()));
  if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) return null;
  return parts;
}
function makeMarker(it) {
  const c = geoToArr(it.geo);
  if (!c) return null;
  const emo = VERDICT_EMO(it.verdict) || CAT_EMO(it.cat);
  const icon = L.divIcon({
    className: "mm-icon",
    html: `<div class="mm-pin${it.verdict ? " mm-" + it.verdict : ""}"><span>${emo || "🍽️"}</span></div>`,
    iconSize: [30, 34],
    iconAnchor: [15, 32],
    popupAnchor: [0, -30]
  });
  const m = L.marker(c, { icon }).addTo(markerLayer);
  m.bindPopup(
    `<div class="popup-name">${esc(it.shop)}</div>
     ${it.rating ? `<div class="popup-sub">★ ${it.rating}${it.verdict ? " · " + it.verdict : ""}</div>` : (it.verdict ? `<div class="popup-sub">${it.verdict}</div>` : "")}
     <div class="popup-sub">${esc([it.city, it.district, it.place].filter(Boolean).join(" · "))}</div>
     ${it.dish ? `<div class="popup-dish">${esc(it.dish)}</div>` : ""}`
  );
  return m;
}
function renderMap() {
  if (!map) { initMap(); }
  if (!markerLayer) {
    markerLayer = L.layerGroup().addTo(map);
  } else {
    markerLayer.clearLayers();
  }
  const list = getFiltered();
  list.forEach(it => makeMarker(it));
  const withGeo = list.filter(x => x.geo);
  if (withGeo.length) {
    fitAllMarkers();
  } else {
    // 没有坐标时显示城市视图
    const cities = uniqueList(list, "city");
    if (cities.length === 1 && CITY_VIEWS[cities[0]]) {
      map.setView(CITY_VIEWS[cities[0]], 10);
    } else if (cities.length > 1) {
      map.setView([22.9, 114.3], 9);
    }
  }
  renderLegend(list);
}
function renderLegend(list) {
  const legend = $("map-legend");
  const withV = [...new Set(list.filter(x => x.verdict).map(x => x.verdict))].map(v => VERDICTS.find(x => x.v === v)).filter(Boolean);
  const withLoc = list.filter(x => x.geo).length;
  const noLoc = list.length - withLoc;
  let html = "";
  withV.forEach(x => {
    html += `<span class="legend-item"><span class="lg-dot" style="background:${VERDICT_COLOR(x.v)}"></span>${x.v} ${x.emo}</span>`;
  });
  if (list.length === 0) html = '<span class="legend-item">暂无记录</span>';
  else if (noLoc > 0) html += `<span class="legend-item" style="color:#f59e0b">⚠ ${noLoc} 条未标注地图位置</span>`;
  legend.innerHTML = html;
}
function VERDICT_COLOR(v) {
  if (v === "人上人") return "#e6b800";
  if (v === "夯") return "#ff6b35";
  if (v === "NPC") return "#9ca3af";
  return "#999";
}

/* ---------------- Modal helpers ---------------- */
function openModal(id) { $(id).hidden = false; document.body.style.overflow = "hidden"; }
function closeModal(id) { $(id).hidden = true; document.body.style.overflow = ""; }
function allModalClose() {
  ["modal-backdrop", "geo-backdrop", "detail-backdrop", "share-backdrop", "manage-backdrop"].forEach(closeModal);
}

/* ---------------- Form ---------------- */
function openForm(it) {
  editingId = it ? it.id : null;
  $("modal-title").textContent = it ? "编辑美食" : "添加美食";
  $("field-id").value = it ? it.id : "";
  $("field-shop").value = it ? it.shop : "";
  $("field-city").value = it ? it.city : "";
  $("field-district").value = it ? it.district : "";
  $("field-place").value = it ? it.place : "";
  $("field-type").value = (it && it.type) ? it.type : "实体店";
  $("field-party").value = (it && it.party) ? it.party : "单人多人都可";
  $("field-cat").value = it ? it.cat : "";
  $("field-rating").value = it ? it.rating : 0;
  $("field-verdict").value = it ? it.verdict : "";
  $("field-dish").value = it ? it.dish : "";
  $("field-tucao").value = it ? it.tucao : "";
  $("field-image").value = it ? it.img : "";
  $("field-geo").value = it && it.geo ? it.geo : "";
  renderStars($("field-rating").value);
  renderVerdict($("field-verdict").value);
  openModal("modal-backdrop");
  setTimeout(() => $("field-shop").focus(), 60);
}
function renderStars(val) {
  document.querySelectorAll("#star-input .star").forEach(s => {
    s.classList.toggle("on", Number(s.dataset.val) <= Number(val));
  });
}
function renderVerdict(v) {
  document.querySelectorAll(".verdict-opt").forEach(o => {
    o.classList.toggle("active", o.dataset.v === v);
  });
  $("field-verdict").value = v || "";
}
function submitForm(e) {
  e.preventDefault();
  const it = {
    id: editingId || uid(),
    city: $("field-city").value.trim(),
    district: $("field-district").value.trim(),
    place: $("field-place").value.trim(),
    shop: $("field-shop").value.trim(),
    type: $("field-type").value,
    cat: $("field-cat").value,
    party: $("field-party").value,
    rating: Number($("field-rating").value) || 0,
    verdict: $("field-verdict").value,
    dish: $("field-dish").value.trim(),
    tucao: $("field-tucao").value.trim(),
    img: $("field-image").value.trim(),
    geo: $("field-geo").value.trim()
  };
  const idx = data.findIndex(x => x.id === it.id);
  if (idx >= 0) data[idx] = it; else data.push(it);
  saveToStorage();
  closeModal("modal-backdrop");
  renderAll();
  toast("已保存 ✓");
}

/* ---------------- Detail ---------------- */
function openDetail(id) {
  const it = data.find(x => x.id === id);
  if (!it) return;
  const img = it.img
    ? `<div class="detail-img" style="background-image:url('${esc(it.img)}')">${verdictBadge(it.verdict)}</div>`
    : `<div class="detail-img"><div class="placeholder">${CAT_EMO(it.cat) || "🍽️"}</div>${verdictBadge(it.verdict)}</div>`;
  const loc = [it.city, it.district].filter(Boolean).join(" · ");
  const tags = [];
  if (it.cat) tags.push(`<div class="detail-tag"><span class="lab">类别</span><span class="val cat">${esc(it.cat)}</span></div>`);
  if (it.type) tags.push(`<div class="detail-tag"><span class="lab">形态</span><span class="val">${esc(it.type)}</span></div>`);
  if (it.party) tags.push(`<div class="detail-tag"><span class="lab">几人食</span><span class="val">${esc(it.party)}</span></div>`);
  if (it.rating) tags.push(`<div class="detail-tag"><span class="lab">评分</span><span class="val rating">★ ${it.rating}</span></div>`);
  if (it.verdict) tags.push(`<div class="detail-tag"><span class="lab">结论</span><span class="val verdict-${it.verdict}">${VERDICT_EMO(it.verdict)} ${it.verdict}</span></div>`);

  const html = `
    ${img}
    <div class="detail-head">
      <div class="detail-name-big">${esc(it.shop)}</div>
      ${loc ? `<span class="detail-city">📌 <b>${esc(loc)}</b></span>` : ""}
    </div>
    ${it.dish ? `<div class="detail-reason"><span class="lab">推荐菜 / 点评</span>${esc(it.dish)}</div>` : ""}
    ${it.tucao ? `<div class="detail-reason"><span class="lab">吐槽 / 注意事项</span>${esc(it.tucao)}</div>` : ""}
    ${tags.length ? `<div class="detail-meta">${tags.join("")}</div>` : ""}
    ${it.place ? `<div class="detail-address">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-5.1-7-11a7 7 0 0 1 14 0c0 5.9-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
      ${esc(it.place)}
    </div>` : ""}
    ${it.geo ? `<div class="detail-address">📍 <span style="color:var(--primary);cursor:pointer" id="detail-geo-link">在地图中定位 (${esc(it.geo)})</span></div>` : ""}
  `;
  $("detail-body").innerHTML = html;
  $("btn-detail-address").onclick = () => {
    closeModal("detail-backdrop");
    if (it.geo) focusMapOn(id);
    else {
      filterDelegated(it);
      openForm(data.find(x => x.id === it.id));
      toast("未标注位置，请在表单中选点");
    }
  };
  $("btn-detail-edit").onclick = () => { closeModal("detail-backdrop"); openForm(it); };
  $("btn-detail-delete").onclick = () => {
    if (confirm("确定删除「" + it.shop + "」吗？")) {
      data = data.filter(x => x.id !== it.id);
      saveToStorage();
      closeModal("detail-backdrop");
      renderAll();
      toast("已删除");
    }
  };
  const geolink = $("detail-geo-link");
  if (geolink) geolink.onclick = () => { closeModal("detail-backdrop"); focusMapOn(id); };

  openModal("detail-backdrop");
  $("btn-detail-edit").style.display = isReadonly ? "none" : "";
  $("btn-detail-delete").style.display = isReadonly ? "none" : "";
}
function focusMapOn(id) {
  const it = data.find(x => x.id === id);
  if (!it || !it.geo) return;
  switchView("map");
  const c = geoToArr(it.geo);
  setTimeout(() => { map.setView(c, 15); }, 120);
}
function filterDelegated(it) {
  /* 预填表单里的城市/区/地点 */
  $("field-city").value = it.city;
  $("field-district").value = it.district;
  $("field-place").value = it.place;
}

/* ---------------- Geo Picker ---------------- */
function openGeoPicker() {
  geoPicked = null;
  if (!geoPickerMap) {
    geoPickerMap = L.map("geo-picker-map", { zoomControl: true }).setView([22.9, 114.3], 10);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(geoPickerMap);
  }
  // 尝试从现有字段中读取初始坐标
  const cur = $("field-geo").value.trim();
  const c = cur ? geoToArr(cur) : null;
  if (c) {
    geoPickerMap.setView(c, 15);
    if (window._geoMarker) geoPickerMap.removeLayer(window._geoMarker);
    window._geoMarker = L.marker(c, { draggable: true }).addTo(geoPickerMap);
    geoPicked = c;
    window._geoMarker.on("dragend", () => {
      const p = window._geoMarker.getLatLng();
      geoPicked = [p.lat, p.lng];
    });
  } else {
    const city = $("field-city").value.trim();
    const cc = (city && CITY_CENTERS[city]) || [22.9, 114.3];
    geoPickerMap.setView(cc, 11);
  }
  if (window._geoMarker) { /* keep */ }
  openModal("geo-backdrop");
  setTimeout(() => { geoPickerMap.invalidateSize(); }, 120);
  geoPickerMap.once("click", e => {
    if (window._geoMarker) geoPickerMap.removeLayer(window._geoMarker);
    window._geoMarker = L.marker([e.latlng.lat, e.latlng.lng], { draggable: true }).addTo(geoPickerMap);
    geoPicked = [e.latlng.lat, e.latlng.lng];
    window._geoMarker.on("dragend", () => {
      const p = window._geoMarker.getLatLng();
      geoPicked = [p.lat, p.lng];
    });
  });
}
function confirmGeo() {
  if (geoPicked) {
    $("field-geo").value = geoPicked[0].toFixed(6) + "," + geoPicked[1].toFixed(6);
  }
  closeModal("geo-backdrop");
}
function geoSearch() {
  const q = $("geo-search-input").value.trim();
  if (!q) return;
  const qq = "https://nominatim.openstreetmap.org/search?format=json&q=" + encodeURIComponent(q + " 中国");
  fetch(qq, { headers: { "Accept-Language": "zh-CN,zh;q=0.9" } })
    .then(r => r.json())
    .then(res => {
      if (!res || !res.length) { toast("未找到该地址"); return; }
      const first = res[0];
      geoPickerMap.setView([parseFloat(first.lat), parseFloat(first.lon)], 15);
      if (window._geoMarker) geoPickerMap.removeLayer(window._geoMarker);
      window._geoMarker = L.marker([parseFloat(first.lat), parseFloat(first.lon)], { draggable: true }).addTo(geoPickerMap);
      geoPicked = [parseFloat(first.lat), parseFloat(first.lon)];
      window._geoMarker.on("dragend", () => {
        const p = window._geoMarker.getLatLng();
        geoPicked = [p.lat, p.lng];
      });
    })
    .catch(() => toast("搜索失败，请直接在地图上点击选点"));
}

/* ---------------- Share ---------------- */
function openShare() {
  const url = buildShareURL();
  $("share-url").value = url;
  openModal("share-backdrop");
}
async function copyShare() {
  const ok = await copyText($("share-url").value);
  toast(ok ? "链接已复制 ✓" : "复制失败，请手动选择复制");
}

/* ---------------- View switch ---------------- */
function switchView(v) {
  currentView = v;
  $("view-map").classList.toggle("active", v === "map");
  $("view-grid").classList.toggle("active", v === "grid");
  $("map-view").classList.toggle("active", v === "map");
  $("grid-view").classList.toggle("active", v === "grid");
  if (v === "map" && map) setTimeout(() => { map.invalidateSize(); fitAllMarkers(); }, 80);
}

/* ---------------- Toast ---------------- */
let toastTimer = null;
function toast(msg) {
  let el = document.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}
function safeHtml(s) { return String(s == null ? "" : s); }
function esc(s) {
  return safeHtml(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* ---------------- Events ---------------- */
function bindEvents() {
  // 视图切换
  $("view-map").onclick = () => switchView("map");
  $("view-grid").onclick = () => switchView("grid");

  // 添加 / 表单
  $("btn-add").onclick = () => openForm(null);
  $("btn-empty-add").onclick = () => openForm(null);
  $("btn-form-cancel").onclick = () => closeModal("modal-backdrop");
  $("modal-close").onclick = () => closeModal("modal-backdrop");
  $("food-form").addEventListener("submit", submitForm);

  // 星级
  document.querySelectorAll("#star-input .star").forEach(s => {
    s.onclick = () => {
      const v = Number(s.dataset.val);
      $("field-rating").value = v;
      renderStars(v);
    };
  });

  // 结论选择
  document.querySelectorAll(".verdict-opt").forEach(o => {
    o.onclick = () => {
      renderVerdict(o.dataset.v);
    };
  });

  // 选点
  $("btn-pick-geo").onclick = openGeoPicker;
  $("geo-close").onclick = () => closeModal("geo-backdrop");
  $("geo-cancel").onclick = () => closeModal("geo-backdrop");
  $("geo-confirm").onclick = confirmGeo;
  $("geo-search-btn").onclick = geoSearch;
  $("geo-search-input").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); geoSearch(); } });
  $("btn-clear-geo").onclick = () => { $("field-geo").value = ""; };

  // 搜索
  let searchTimer = null;
  $("search-input").addEventListener("input", e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      filter.q = e.target.value.trim();
      renderAll();
    }, 180);
  });

  // 筛选 chips
  $("filter-group").addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const kind = chip.dataset.kind;
    const val = chip.dataset.val;
    if (kind === "city") filter.city = filter.city === val ? "" : val;
    if (kind === "cat") filter.cat = filter.cat === val ? "" : val;
    renderAll();
  });

  // 卡片点击 -> 详情
  $("food-grid").addEventListener("click", e => {
    const card = e.target.closest(".food-card");
    if (card) openDetail(card.dataset.id);
  });

  // 导出 / 导入
  $("btn-export").onclick = exportJSON;
  $("btn-import").onclick = () => $("file-import").click();
  $("file-import").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const arr = parseImport(ev.target.result);
      if (!arr) { toast("导入失败：文件格式不正确"); return; }
      if (confirm(`导入 ${arr.length} 条记录？将覆盖当前 ${data.length} 条本地数据。`)) {
        data = arr;
        saveToStorage();
        renderAll();
        toast("导入成功 ✓");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  });

  // 分享
  $("btn-share").onclick = openShare;
  $("share-close").onclick = () => closeModal("share-backdrop");
  $("btn-copy-url").onclick = copyShare;

  // 数据管理
  $("btn-manage").onclick = e => { e.preventDefault(); openModal("manage-backdrop"); $("manage-count").textContent = data.length; };
  $("manage-close").onclick = () => closeModal("manage-backdrop");
  $("btn-mg-export").onclick = () => { exportJSON(); toast("已导出 ✓"); };
  $("btn-mg-import").onclick = () => $("file-import").click();
  $("btn-mg-clear").onclick = () => {
    if (confirm("确定清空全部数据吗？此操作不可恢复，建议先导出备份！")) {
      data = [];
      saveToStorage();
      closeModal("manage-backdrop");
      renderAll();
      toast("已清空");
    }
  };

  // 点击遮罩关闭
  ["modal-backdrop", "geo-backdrop", "detail-backdrop", "share-backdrop", "manage-backdrop"].forEach(id => {
    const el = $(id);
    el.addEventListener("click", e => { if (e.target === el) closeModal(id); });
  });

  // 详情弹窗关闭
  $("detail-close").onclick = () => closeModal("detail-backdrop");

  // 键盘 Esc
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") allModalClose();
  });
}

/* ---------------- Boot ---------------- */
document.addEventListener("DOMContentLoaded", init);