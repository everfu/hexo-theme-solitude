hexo.extend.tag.register('note', function(type, content){
    return `<div class="note ${type}">${hexo.render.renderSync({ text: content, engine: 'markdown' })}</div>`
}, {ends: true});