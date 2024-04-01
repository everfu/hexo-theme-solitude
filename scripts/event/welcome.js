hexo.on('ready', () => {
    const {version} = require('../../package.json')
    hexo.log.info(`
  ╭─────────────────────────────────────────────────────────────────────────────────────────────╮
  │                                                                                             │
  │      Theme: Solitude                                                                        │
  │      Version: v${version}                                                                        │
  │      Changelog: https://github.com/valor-x/hexo-theme-solitude/releases/tag/v${version}          │
  │                                                                                             │
  ╰─────────────────────────────────────────────────────────────────────────────────────────────╯
  `)
})