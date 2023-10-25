'use strict';

hexo.extend.filter.register('before_post_render', () => {

    const logger = hexo.log;
    const theme = hexo.theme.config;
    const config = hexo.config;
    if (theme.hometop.banner.enable && !theme.hometop.banner.icon) {
        logger.error('\n 启用banner的情况下，必须提供 icon 图片！\n 请在主题配置文件中设置 hometop.banner.icon 选项。');
        logger.error('\n If banner is enabled, icon image must be supplied! \n Please set the hometop.banner.icon option in the theme configuration file.');
        process.exit(-1);
    }
    if (config.language !== 'zh-CN' && config.language !== 'en-US') {
        logger.error('\n 请在站点配置文件中设置 language 选项为 zh-CN 或 en-US。');
        process.exit(-1);
    }
}
);