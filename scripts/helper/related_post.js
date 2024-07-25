/**
 * related post
 * from solitude
 */

'use strict'

hexo.extend.helper.register('related_posts', function (currentPost, allPosts) {
    const relatedPosts = []
    const config = hexo.theme.config
    const limitNum = config.related_post.limit || 6
    const dateType = config.related_post.date_type || 'created'
    const headlineLang = this._p('star')

    currentPost.tags.forEach(function (tag) {
        allPosts.forEach(function (post) {
            if (isTagRelated(tag.name, post.tags) && currentPost.path !== post.path) {
                const relatedPost = {
                    title: post.title,
                    path: post.path,
                    cover: post.cover,
                    cover_type: post.cover_type,
                    weight: 1,
                    updated: post.updated,
                    created: post.date
                }
                const index = findItem(relatedPosts, 'path', post.path)
                if (index !== -1) {
                    relatedPosts[index].weight += 1
                } else {
                    relatedPosts.push(relatedPost)
                }
            }
        })
    })

    if (relatedPosts.length === 0) {
        return ''
    }

    relatedPosts.sort(compare('weight', dateType))

    let result = '<div class="relatedPosts">'
    result += `<div class="headline"><i class="solitude fa-solid fa-star"></i><span>${headlineLang}</span><div class="relatedPosts-link"><a onclick="event.preventDefault(); toRandomPost();" href="javascript:void(0);" rel="external nofollow" data-pjax-state="">${this._p('random')}</a></div></div>`
    result += '<div class="relatedPosts-list">'

    for (let i = 0; i < Math.min(relatedPosts.length, limitNum); i++) {
        const cover = relatedPosts[i].cover || 'var(--default-bg-color)'
        const title = this.escape_html(relatedPosts[i].title)
        result += `<div><a href="${this.url_for(relatedPosts[i].path)}" title="${title}">`
        result += `<img class="cover" src="${this.url_for(cover)}" alt="cover">`
        result += `<div class="content is-center"><div class="title">${title}</div></div>`
        result += '</a></div>'
    }

    result += '</div></div>'
    return result
})

function isTagRelated(tagName, TBDtags) {
    return TBDtags.some(function (tag) {
        return tagName === tag.name
    })
}

function findItem(arrayToSearch, attr, val) {
    return arrayToSearch.findIndex(function (item) {
        return item[attr] === val
    })
}

function compare(attr, dateType) {
    return function (a, b) {
        const val1 = a[attr]
        const val2 = b[attr]
        if (val1 === val2) {
            if (dateType === 'created') {
                return b.created - a.created
            } else if (dateType === 'updated') {
                return b.updated - a.updated
            }
        }
        return val2 - val1
    }
}