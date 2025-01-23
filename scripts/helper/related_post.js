/**
 * related post
 * from solitude
 */

'use strict'

hexo.extend.helper.register('related_posts', function (currentPost, allPosts) {
    const config = hexo.theme.config;
    const limitNum = config.related_post.limit || 6;
    const dateType = config.related_post.date_type || 'created';
    const headlineLang = this._p('star');

    const relatedPostsMap = new Map();

    currentPost.tags.forEach(tag => {
        allPosts.forEach(post => {
            if (isTagRelated(tag.name, post.tags) && currentPost.path !== post.path) {
                if (!relatedPostsMap.has(post.path)) {
                    relatedPostsMap.set(post.path, {
                        title: post.title,
                        path: post.path,
                        cover: post.cover || 'var(--default-bg-color)',
                        weight: 1,
                        updated: post.updated,
                        created: post.date
                    });
                } else {
                    relatedPostsMap.get(post.path).weight += 1;
                }
            }
        });
    });

    const relatedPosts = Array.from(relatedPostsMap.values());
    if (relatedPosts.length === 0) {
        return '';
    }

    relatedPosts.sort(compare('weight', dateType));

    let result = `
        <div class="relatedPosts">
            <div class="headline">
                <i class="solitude fas fa-star"></i>
                <span>${headlineLang}</span>
                <div class="relatedPosts-link">
                    <a onclick="event.preventDefault(); toRandomPost();" href="javascript:void(0);" rel="external nofollow" data-pjax-state="">${this._p('random')}</a>
                </div>
            </div>
            <div class="relatedPosts-list">`;

    for (let i = 0; i < Math.min(relatedPosts.length, limitNum); i++) {
        const { cover, title, path } = relatedPosts[i];
        result += `
            <div>
                <a href="${this.url_for(path)}" title="${this.escape_html(title)}">
                    <img class="cover" src="${this.url_for(cover)}" alt="cover">
                    <div class="content is-center">
                        <div class="title">${this.escape_html(title)}</div>
                    </div>
                </a>
            </div>`;
    }

    result += `
            </div>
        </div>`;
    return result;
});

function isTagRelated(tagName, tags) {
    return tags.some(tag => tagName === tag.name);
}

function compare(attr, dateType) {
    return (a, b) => {
        const val1 = a[attr];
        const val2 = b[attr];
        if (val1 === val2) {
            return dateType === 'created' ? b.created - a.created : b.updated - a.updated;
        }
        return val2 - val1;
    };
}
