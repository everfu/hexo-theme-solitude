
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
  const lang = hexo.theme.i18n.get(this.config.language || 'zh-CN')
  return {
    path: 'tags/index.html',
    layout: ['page'],
    data: {
      title: lang["page.tag"],
      type: 'tags',
      comment: false
    }
  };
});

// generate categories Page
hexo.extend.generator.register('categories', function(locals) {
  if(!this.theme.config.page.categories)return
  const lang = hexo.theme.i18n.get(this.config.language || 'zh-CN')
  return {
    path: 'categories/index.html',
    layout: ['page'],
    data: {
      title: lang["page.category"],
      type: 'categories',
      comment: false
    }
  };
});

// generate echarts Page
hexo.extend.generator.register('echarts', function(locals) {
  if(!this.theme.config.about.echarts && !this.theme.config.about.enable)return
  const lang = hexo.theme.i18n.get(this.config.language || 'zh-CN')
  return {
    path: 'echart/index.html',
    layout: ['page'],
    data: {
      title: lang["page.echarts"],
      type: 'echarts',
      comment: false
    }
  };
});