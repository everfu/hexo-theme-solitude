/**
 * note.js
 * transplant from hexo-theme-next
 * modified by @efu
 */

hexo.extend.tag.register('note', function (types, content) {
    let type = ""
    for (let i = 0; i < types.length; i++) {
        type += " " + types[i]
    }
    return `<div class="note ${type}">${hexo.render.renderSync({text: content, engine: 'markdown'})}</div>`
}, {ends: true});