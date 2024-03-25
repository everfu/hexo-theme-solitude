'use strict';

hexo.extend.filter.register('after_post_render', function (data) {
    data.title = data.title || 'Untitled';
    const {config} = hexo.theme;
    if (data.layout === 'post') {
        const {copyright, locate, cover} = hexo.theme.config.post.default
        data.locate = data.locate || locate
        data.cc = data.cc || copyright
        data.cover = data.cover || cover[getRandomInt(0, cover?.length)]
        data.excerpt = data.description || data.excerpt
        data.toc = !!(config.aside.toc.post && data.toc !== false);
    }
    if (data.layout === 'page') {
        const {cover} = hexo.theme.config.page.default
        data.cover = data.cover || cover[getRandomInt(0, cover?.length)]
        data.excerpt = data.title
        data.toc = !!(config.aside.toc.page && data.toc !== false && data.aside);
    }
    data.comment = !!(config.comment.enable && data.comment !== false);
    return data;
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}