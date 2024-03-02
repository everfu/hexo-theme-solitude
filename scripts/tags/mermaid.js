'use strict';

function postMermaid(args, content) {
    return `<div class="mermaid">${content}</div>`;
}

hexo.extend.tag.register('mermaid', postMermaid, {ends: true});