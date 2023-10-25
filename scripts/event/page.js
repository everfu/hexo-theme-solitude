hexo.extend.generator.register('404', function (locals) {
  if(!this.theme.config.page.error)return
  return {
    path: '404.html',
    layout: ['404'],
    data: {
      title: '404',
      type: '404',
      comment: false
    }
  }
})

// generate tags Page
hexo.extend.generator.register('tags', function(locals) {
  if(!this.theme.config.page.tags)return
  return {
    path: 'tags/index.html',
    layout: ['page'],
    data: {
      title: 'tags',
      type: 'tags',
      comment: false
    }
  };
});

// generate categories Page
hexo.extend.generator.register('categories', function(locals) {
  if(!this.theme.config.page.categories)return
  return {
    path: 'categories/index.html',
    layout: ['page'],
    data: {
      title: 'categories',
      type: 'categories',
      comment: false
    }
  };
});
