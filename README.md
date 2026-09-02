# 🍜 能量补给站 · 美食地图攻略

> 工作能量补充 · 团队美食地图攻略

把腾讯云文档《工作能量补充》优化成的一个**响应式美食地图网站**（纯前端，GitHub Pages 免费部署）。

## ✨ 功能

- 🗺️ **地图视图**：OpenStreetMap 免费地图，按店标注位置，点标记看详情
- 📋 **网格视图**：卡片式浏览，手机/电脑自适应
- 🔍 **筛选/搜索**：按城市、餐饮类别筛选，关键词搜索
- ⭐ **评价体系**：评分（1-5星）+ 结论等级（👑人上人 / 👍夯 / 🤷NPC）
- ➕ **填写表单**：随时新增/编辑美食（店铺、城市、区、地点、类别、几人食、评分、结论、推荐菜、吐槽、地图选点）
- 💾 **本地持久化**：数据自动保存到浏览器 localStorage
- 📤 **导入/导出**：JSON 备份与恢复
- 🔗 **一键分享**：生成带数据快照的链接，任何人都可只读查看

## 🚀 快速使用

### 本地运行

```bash
# 任意静态服务器均可
python -m http.server 8080
# 或
npx serve .
```

浏览器打开 `http://localhost:8080`

### 发布到 GitHub Pages

推荐使用一键发布脚本（纯 GitHub API，无需 gh CLI / git push）：

1. 创建 GitHub **Personal Access Token**（Settings → Developer settings → Personal access tokens → Fine-grained tokens，勾选仓库 Contents 读写权限）
2. 运行（推荐，发布后自动验证公网可访问）：

```bash
node publish-and-verify.mjs <你的TOKEN> [仓库名，默认 food-map]
```

3. 或只发布不验证：

```bash
node publish.mjs <你的TOKEN> [仓库名，默认 food-map]
```

脚本会自动：创建公开仓库 → 上传全部网站文件 → 开启 GitHub Pages。完成后约 1-2 分钟即可访问：

```
https://<你的用户名>.github.io/<仓库名>/
```

## 🏗️ 技术栈

- 纯原生 HTML + CSS + JavaScript（无框架、无构建）
- [Leaflet](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/)（免费，无需 API Key）
- [lz-string](https://github.com/pieroxy/lz-string) 压缩分享链接（16KB → 3.4KB，微信等 IM 不会截断）
- 数据存储：浏览器 `localStorage`
- 分享机制：URL 携带 lz-string 压缩的 JSON 快照（`?data=` 参数）

## 📁 文件结构

```
├── index.html          页面结构
├── styles.css          样式（响应式）
├── app.js              应用逻辑（数据、渲染、地图、表单）
├── lz-string.min.js    分享链接压缩库
├── publish.mjs         一键发布到 GitHub Pages 脚本（纯 API）
├── publish-and-verify.mjs  发布 + 公网访问验证原子脚本（推荐）
├── README.md           说明
```

## 📝 数据字段

| 字段 | 说明 |
|------|------|
| shop | 店铺名称 |
| city / district | 城市 / 区 |
| place | 地点 / 位置描述 |
| type | 营业形态（实体店 / 小地摊）|
| cat | 餐饮类别（火锅 / 烧烤 / 麻辣烫 / 大排档 / 茶楼 / 甜品 / 川菜 / 烤肉等）|
| party | 几人食（单人 / 多人 / 单人多人都可）|
| rating | 评分（1-5）|
| verdict | 结论（👑人上人 / 👍夯 / 🤷NPC）|
| dish | 推荐菜 / 点评 |
| tucao | 吐槽 / 注意事项 |
| img | 图片 URL（选填）|
| geo | 地图坐标（纬度,经度）|

## 👥 团队协作建议

团队成员可在自己的设备上打开网站 → 添加美食 → 导出 JSON 发给团长 → 团长导入合并。或者直接通过「分享」按钮生成最新链接发给同事查看。

---

数据来源于团队云文档《工作能量补充》，共 21 家美食记录（深圳 + 惠州）。