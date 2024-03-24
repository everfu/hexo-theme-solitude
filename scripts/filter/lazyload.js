hexo.extend.filter.register('after_render:html', function (data) {
    if (!hexo.theme.config.lazyload.enable) return
    return data.replace(
        /(<img(?!.*?class\t*=\t*['"].*?nolazyload.*?['"]).*?)( src=)/gi,
        `$1 data-lazy-src=`
    )
})