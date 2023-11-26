const urlFor = require('hexo-util').url_for.bind(hexo)

hexo.extend.filter.register('after_render:html', function (data) {
    const config = hexo.theme.config.lazyload
    if (!config.enable) return
    const bg = config.placeholder ? urlFor(config.placeholder) : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    return data.replace(
        /(<img(?!.*?class[\t]*=[\t]*['"].*?nolazyload.*?['"]).*? src=)/gi,
        `$1 "${bg}" data-lazy-src=`
    )
})
