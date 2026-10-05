English 丨 [Español](README_es-ES.md) 丨 [简体中文](README.md)丨[繁体中文](README_zh-Hant.md)

<div align="center">

<img src="source/img/logo.png" width="120" height="120" alt="Solitude paper airplane logo" />

# Hexo Solitude

An elegant Hexo theme that supports lazy loading, PWA, Latex, and multiple comment systems.

Theme design fully authorized by [@Zhang Hong Heo](https://github.com/zhheo)

![npm package](https://img.shields.io/npm/v/hexo-theme-solitude)
![license](https://img.shields.io/github/license/everfu/hexo-theme-solitude?color=FF5531)
[![Stars](https://img.shields.io/github/stars/everfu/hexo-theme-solitude)](https://github.com/everfu/hexo-theme-solitude/stargazers)
[![NPM all downloads](https://img.shields.io/npm/d18m/hexo-theme-solitude)](https://www.npmjs.com/package/hexo-theme-solitude)

![hexo version](https://img.shields.io/badge/hexo-7.0.0+-blue?logo=hexo&logoColor=white)
![node version](https://img.shields.io/badge/node-14.0.0+-white?logo=node.js&logoColor=white)
![JetBrains](https://img.shields.io/badge/jetbrains-support-white?logo=jetbrains)

![page view](https://komarev.com/ghpvc/?username=hexo-theme-solitude&color=blue)
![jsdelivr](https://img.shields.io/jsdelivr/npm/hd/hexo-theme-solitude)
![npm publish](https://img.shields.io/github/actions/workflow/status/everfu/hexo-theme-solitude/npm-publish.yml)

</div>

<p align="center">
  <img src="source/img/brand/solitude-banner.webp" width="960" height="540" alt="Solitude paper airplane over a layered paper landscape" />
</p>

## Features

- Page lazy loading (Pjax), image lazy loading (LazyLoad), offline application (PWA)
- Comments (Twikoo, Waline, Valine, Artalk, Giscus), supports dual comments
- Day and night switch (ColorMode)
- Lightbox (medium-zoom, fancybox)
- Mathematical formulas (Latex)
- Featured pages: Instant articles, My gear, Online tools, Music hall, Friend links, Album page, Douban page, Bullet screen message page
- Article features: AI summary, code highlighting

> If you have any questions, please raise an [issue](https://github.com/everfu/hexo-theme-solitude/issues)

## Application

1. Install using the NPM package

   ```bash
   npm i hexo-theme-solitude
   ```

2. Apply the theme

   ```yaml
   theme: solitude
   ```

Visit [Documentation](https://solitude.js.org/) for more information.

## Browser Extension API

The browser runtime uses native ES modules and exposes one stable extension entry point through `window.Solitude`:

- `navigate(url)`, `refresh()`, `copy(text)`, and `toggleTheme()`
- `loadScript(url, options)` and `loadStyle(url, options)`
- `on(event, handler)` for `ready`, `beforeNavigate`, `afterNavigate`, and `themeChange`

`on` returns an unsubscribe function. The legacy `sco`, `utils`, `pjax`, `GLOBAL_CONFIG`, and `PAGE_CONFIG` globals are no longer public APIs; custom scripts should migrate to `window.Solitude`.

## Community

[![Discord](https://img.shields.io/discord/1266610921942548553?logo=discord&label=discord&logoColor=white)](https://discord.gg/HZXAnK4Sut)
[![QQ Group](https://img.shields.io/badge/QQ%20Group-948375336-FFD700?logo=Tencent-QQ&logoColor=white)](https://qm.qq.com/q/mxfomMvJPG)

## Sponsors

[The CDN acceleration and security protection of this project are sponsored by Tencent EdgeOne](https://edgeone.ai/zh?from=github)

## License

> Please retain the theme copyright information

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fvalor-x%2Fhexo-theme-solitude.svg?type=small)](https://app.fossa.com/projects/git%2Bgithub.com%2Fvalor-x%2Fhexo-theme-solitude?ref=badge_large)

[Apache-2.0](./LICENSE) License &copy; 2025-present [everfu](https://github.com/everfu)
