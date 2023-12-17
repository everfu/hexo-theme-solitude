"use strict"

function u(args, content) {
    return `<u>${hexo.render.renderSync({text: text, engine: 'markdown'}).split('\n').join('')}</u>`;
}

hexo.extend.tag.register("u", u, { ends: false });