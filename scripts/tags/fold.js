'use strict'

function postTabs(args, content) {
    const title = args[0] ? args[0] : ""
    const open = args[1] ? args[1] : ""

    return `<details ${open}><summary>${title}</summary><div class="content">${hexo.render.renderSync({
        text: content,
        engine: 'markdown'
    })}</div></details>`
}

hexo.extend.tag.register('fold', postTabs, {ends: true})
