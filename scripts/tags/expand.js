hexo.extend.tag.register('expand', function(summary, content){
    return '<details><summary>' + summary + '</summary>' + hexo.render.renderSync({ text: content, engine: 'markdown' }) +
    '</details>';
  }, {ends: true});