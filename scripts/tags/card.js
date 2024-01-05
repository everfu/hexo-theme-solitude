'use strict';

hexo.extend.tag.register('card', function (args, content) {
    args = args.join(' ').split(',');
    let icon = args[0] || 'no-icon';
    let color = args[1] || 'info';
    let title = args[2] || '';
    return `<div class="card card-${color}"><div class="card-title"><i class="scoicon ${icon}"></i>${title}</div>${hexo.render.renderSync({text: content, engine: 'markdown'})}</div>`
}, {ends: true});