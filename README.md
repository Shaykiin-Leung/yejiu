# 夜啾 Yejiu

![夜啾](assets/brand/yejiu-brand-wordmark-current.png)

**陪你每一个夜晚的世界杯。**

夜啾是一个为 2026 美加墨世界杯做的观赛陪伴工具：订阅赛程、生成每日图鉴、测出你的球迷人格，再为每一场熬夜的球准备一份观赛护航方案。它不赌球、不卖数据，只想让你把球看得舒服一点。

🌐 **在线体验**：[yejiu.icu](https://yejiu.icu) · [yejiu.vercel.app](https://yejiu.vercel.app) · [下载 Android 版](https://yejiu.icu/download)

> **项目状态**：2026 年世界杯已落幕，本项目完结并归档，站点保留访问，供回看。赛程数据来自赛事期间的 football-data.org 接口快照语义，实时数据功能随赛事结束自然停摆。

## 功能

- **订阅赛程** — 订阅你关心的比赛，开赛前提醒；订阅后还能打卡记录自己的观赛轨迹，夜啾会统计你的观赛时间分布和高风险（熬夜）场次。
- **每日图鉴** — 每天生成一张图鉴海报，把当天的球队、球员和你的观赛记录收录成册，攒出一本属于自己的世界杯图鉴。
- **球迷人格** — 内置人格判定引擎，根据你的订阅与观赛习惯解锁专属球迷人格。
- **观赛护航** — 针对熬夜场次自动生成护航方案卡：赛前补觉目标、中场补水提醒、观赛装备清单，按比赛的"熬夜生死档"分级给出建议，先护肝，再看球。
- **多端形态** — Web / PWA（可安装、独立窗口运行）/ Android App（仓库根目录 `yejiu.apk`），中英文双语（`en/`）。

## 技术实现

- **前端**：原生 HTML / CSS / JavaScript，零框架。主应用是单文件 `index_worldcup.html`（含全部页面状态与动效），`index.html` 为落地页；PWA 由 `manifest.webmanifest` 驱动。
- **数据层**：赛程数据来自 [football-data.org](https://www.football-data.org/)，通过 Vercel Serverless 函数 `api/matches.js` 代理：
  - API Key 只存在于 Vercel 环境变量 `FOOTBALL_API_KEY`，不进代码、不进前端；
  - 统一处理 CORS，前端同源直调 `/api/matches`；
  - 响应加 `s-maxage=30` 边缘缓存，把对上游 API 的请求频率压到最低。
- **部署**：Vercel 静态托管 + Serverless，`vercel.json` 配置了 `/download` 重写、APK 下载的 MIME/附件头与基础安全响应头。

## 项目结构

```
.
├── index.html            # 落地页（今晚的球，夜啾陪你看）
├── index_worldcup.html   # 主应用（单文件）
├── en/                   # 英文版（落地页 + 主应用）
├── api/matches.js        # 赛程数据代理（Vercel Serverless）
├── assets/               # 品牌图、球队图鉴、猫头鹰插画与动效视频
├── manifest.webmanifest  # PWA 清单
├── download.html         # Android 下载页
├── privacy.html          # 隐私政策
├── terms.html            # 用户协议
├── yejiu.apk             # Android 安装包
└── vercel.json           # 部署配置
```

## 本地运行

页面是纯静态的，任意静态服务器即可预览：

```bash
npx serve .
# 打开 http://localhost:3000
```

完整的赛程数据依赖 `/api/matches`：将仓库导入 Vercel 并在环境变量中配置 `FOOTBALL_API_KEY`（football-data.org 免费申请），或用 `vercel dev` 在本地联调。

## 数据与致谢

- 比赛数据：[football-data.org](https://www.football-data.org/)
- 部署：[Vercel](https://vercel.com)
- 吉祥物与全部视觉素材为本项目原创手绘风插画（见 `assets/brand/` 与 `assets/owl-*`）

隐私与条款见 [privacy.html](privacy.html) 与 [terms.html](terms.html)。

---

## English summary

**Yejiu** is a companion app built for the 2026 FIFA World Cup: subscribe to fixtures with reminders, collect a daily illustrated almanac, unlock your "fan persona", and get a late-night viewing care plan (nap targets, hydration breaks, gear checklists) for every match that keeps you up. Web / PWA / Android, bilingual (Chinese & English). Match data comes from football-data.org through a small Vercel serverless proxy that keeps the API key server-side and edge-caches responses for 30s. The tournament is over and the project is complete and archived; the site stays online as a souvenir.

---

由 [Shaykiin Leung](https://github.com/Shaykiin-Leung) 独立开发 · 2026 年夏
