'use strict';

hexo.extend.filter.register('before_post_render', () => {
        const data = hexo.locals.get('data');
        const logger = hexo.log;
        const theme = hexo.theme.config;
        if (theme.says.enable && !data.essay) {
            logger.error('\n 启用说说的情况下，必须提供 essay 数据文件！\n 请新建 essay.yaml。');
            logger.error('\n If says is enabled, essay data must be supplied! \n Please create essay.yaml.');
            process.exit(-1);
        }
        if (theme.footer.randomlink && !data.links){
            logger.error('\n 启用随机链接的情况下，必须提供 links 数据！\n 请新建 links.yaml。');
            logger.error('\n If randomlink is enabled, links data must be supplied! \n Please create links.yaml.');
            process.exit(-1);
        }
        if (theme.lightbox && !theme.fancybox && !theme.mediumZoom){
            logger.error('\n 启用 lightbox 的情况下，必须提供 fancybox 或 mediumZoom 选项！\n 请在主题配置文件中设置 fancybox 或 mediumZoom 选项。');
            logger.error('\n If lightbox is enabled, fancybox or mediumZoom option must be supplied! \n Please set the fancybox or mediumZoom option in the theme configuration file.');
            process.exit(-1);
        }
    }
);