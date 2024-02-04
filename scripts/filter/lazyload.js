const urlFor = require('hexo-util').url_for.bind(hexo)

hexo.extend.filter.register('after_render:html', function (data) {
    const config = hexo.theme.config.lazyload
    if (!config.enable) return
    return data.replace(
        /(<img(?!.*?class[\t]*=[\t]*['"].*?nolazyload.*?['"]).*?)( src=)/gi,
        `$1 data-lazy-src=`
    )
})