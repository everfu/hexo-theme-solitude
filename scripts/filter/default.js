'use strict';

hexo.extend.filter.register('after_post_render', function (data) {
    const config = hexo.theme.config
    data.title = data.title || '无标题';
    if (data.layout === 'post') {
        data.locate = data.locate || config.post.default.locate
        data.cc = data.cc || config.post.default.copyright
        data.cover = data.cover || config.post.default.cover[getRandomInt(0, config.post.default.cover.length)] || '/img/default.png'
        data.excerpt = data.description || data.excerpt
        if (config.aside.toc.post && data.toc !== false) data.toc = true
        else data.toc = false
    }
    if (data.layout === 'page') {
        data.cover = data.cover || config.page.default.cover[getRandomInt(0, config.post.default.cover.length)] || '/img/default.png'
        data.excerpt = data.title
        if (config.aside.toc.page && data.toc !== false && data.aside) data.toc = true
        else data.toc = false
    }
    if (config.comment.enable && data.comment !== false) data.comment = true
    else data.comment = false
    return data;
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}