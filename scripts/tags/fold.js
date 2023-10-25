/**
 * Fold
 * from acrylic
 */

'use strict'

function postTabs(args, content) {
    const title = args[0] ? args[0] : ""
    const date = args[1] ? args[1] : ""
    const open = args[2] ? args[2] : ""

    return `<details ${open}><summary>${title + " " + date}</summary><div class="content">${hexo.render.renderSync({
        text: content,
        engine: 'markdown'
    })}</div></details>`
}

hexo.extend.tag.register('fold', postTabs, {ends: true})
