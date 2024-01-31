'use strict'

hexo.extend.helper.register('related_posts', function (currentPost, allPosts) {
    let relatedPosts = []
    currentPost.tags.forEach(function (tag) {
        allPosts.forEach(function (post) {
            if (isTagRelated(tag.name, post.tags)) {
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
                    if (currentPost.path !== post.path) {
                        relatedPosts.push(relatedPost)
                    }
                }
            }
        })
    })
    if (relatedPosts.length === 0) {
        return ''
    }
    let result = ''
    const config = hexo.theme.config

    const limitNum = config.related_post.limit || 6
    const dateType = config.related_post.date_type || 'created'
    const headlineLang = this._p('喜欢这篇的人也看了')

    relatedPosts = relatedPosts.sort(compare('weight', dateType))

    if (relatedPosts.length > 0) {
        result += '<div class="relatedPosts">'
        result += `<div class="headline"><i class="scoicon sco-star-smile-fill"></i><span>${headlineLang}</span><div class="relatedPosts-link"><a onclick="event.preventDefault(); toRandomPost();" href="javascript:void(0);" rel="external nofollow" data-pjax-state="">随便逛逛</a></div></div>`
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
    }
})

function isTagRelated(tagName, TBDtags) {
    let result = false
    TBDtags.forEach(function (tag) {
        if (tagName === tag.name) {
            result = true
        }
    })
    return result
}

function findItem(arrayToSearch, attr, val) {
    for (let i = 0; i < arrayToSearch.length; i++) {
        if (arrayToSearch[i][attr] === val) {
            return i
        }
    }
    return -1
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