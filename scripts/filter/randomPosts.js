hexo.extend.filter.register('after_render:html', function (data) {
    const posts = []
    hexo.locals.get('posts').map(function (post) {
      if (post.random !== false) posts.push(post.path)
    })
    data += `<script>const posts=${JSON.stringify(posts)};function toRandomPost(){ pjax.loadUrl('/'+posts[Math.floor(Math.random()*posts.length)]); };</script>`
    return data
})