'use strict'

const urlFor = require('hexo-util').url_for.bind(hexo)

const lazyload = (content, img) => {
    return content.replace(/(<img(?!.*?class[\t]*=[\t]*['"].*?nolazyload.*?['"]).*? src=)/gi, `$1 "${img}" data-lazy-src=`)
}

hexo.extend.filter.register('after_render:html', function (data) {
    const { enable, placeholder ,field } = hexo.theme.config.lazyload
    if (!enable || field !== 'site') return;
    return lazyload(data, urlFor(placeholder))
})

hexo.extend.filter.register('after_post_render', data => {
    const { enable, placeholder, field } = hexo.theme.config.lazyload
    if (!enable || field !== 'post') return
    data.content = lazyload(data.content, urlFor(placeholder))
    return data
})