'use strict'

function addLabel (args, content) {
    const text = args[0]
    const className = args[1] || 'default'

    return `<label class="hl-label bg-${className}">${text}</label> `
}

hexo.extend.tag.register('label', addLabel, { ends: false })