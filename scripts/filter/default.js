'use strict';

hexo.extend.filter.register('after_post_render', function (data) {
    data.title = data.title || 'Untitled';
    const {config} = hexo.theme;
    if (data.layout === 'post') {
        let {copyright, locate, cover} = hexo.theme.config.post.default
        cover = cover !== null ? cover : ['/img/default.avif']
        data.locate = data.locate || locate
        data.cc = data.cc || copyright
        data.cover = data.cover || cover[getRandomInt(0, cover?.length)]
        data.excerpt = data.description || data.excerpt
        data.toc = !!(config.aside.toc.post && data.toc !== false)
        data.ai = data.ai !== false
    }
    if (data.layout === 'page') {
        let {cover} = hexo.theme.config.page.default
        cover = cover !== null ? cover : ['/img/default.avif']
        data.cover = data.cover || cover[getRandomInt(0, cover?.length)]
        data.excerpt = data.title
        data.toc = !!(config.aside.toc.page && data.toc !== false && data.aside);
    }
    data.comment = !!(config.comment.use && data.comment !== false);
    return data;
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}