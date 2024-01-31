hexo.extend.generator.register('404', function (locals) {
  if(!this.theme.config.page.error)return
  return {
    path: '404.html',
    layout: ['404'],
    data: {
      type: '404',
      comment: false
    }
  }
})
hexo.extend.generator.register('tags', function(locals) {
  if(!this.theme.config.page.tags)return
  return {
    path: 'tags/index.html',
    layout: ['page'],
    data: {
      type: 'tags',
      comment: false
    }
  };
});
hexo.extend.generator.register('categories', function(locals) {
  if(!this.theme.config.page.categories)return
  return {
    path: 'categories/index.html',
    layout: ['page'],
    data: {
      type: 'categories',
      comment: false
    }
  };
});