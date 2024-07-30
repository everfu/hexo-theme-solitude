'use strict';

const {escapeHTML} = require('hexo-util')

function postMermaid(args, content) {
    return `<div class="mermaid">${escapeHTML(content)}</div>`;
}

hexo.extend.tag.register('mermaid', postMermaid, {ends: true});
