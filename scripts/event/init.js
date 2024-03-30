hexo.extend.filter.register('before_generate', () => {
    const hexoVer = hexo.version.replace(/(^.*\..*)\..*/, '$1');
    const nodeVer = process.version.replace(/^v/, '');
    const [majorVer] = nodeVer.split('.');
    const logger = hexo.log;
    const config = hexo.config;

    if (hexoVer < 7.0) {
        logger.error('请把 Hexo 升级到 V7.0.0 或更高的版本！');
        logger.error('Please upgrade your Hexo to V7.0.0 or higher!');
        process.exit(-1);
    }

    if (Number(majorVer) < 14) {
        logger.error('请将 Node.js 升级到 v14.0.0 或更高的版本！');
        logger.error('Please upgrade Node.js to v14.0.0 or later!');
        process.exit(-1);
    }
});