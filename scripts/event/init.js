hexo.extend.filter.register('before_generate', () => {
    // Get first two digits of the Hexo version number
    const hexoVer = hexo.version.replace(/(^.*\..*)\..*/, '$1')
    const nodeVer = process.version.replace(/^v/, '');
    const [majorVer] = nodeVer.split('.');
    const logger = hexo.log, config = hexo.config
  
    if (hexoVer < 5.3) {
      logger.error('请把 Hexo 升级到 V5.3.0 或更高的版本！')
      process.exit(-1)
    }

    if(config.prismjs.enable){
      logger.error('主题尚未支持 prismjs 请使用 highlightjs ！')
      process.exit(-1)
    }
    if (Number(majorVer) < 14) {
      logger.error('请将 Node.js 升级到 v14.0.0 或更高的版本！');
      process.exit(-1);
  }
  }
  )