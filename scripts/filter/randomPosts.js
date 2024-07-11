hexo.extend.filter.register('after_render:html', function (data) {
    const posts = hexo.locals.get('posts').filter(post => post.random !== false).map(post => post.path);
    data += `<script>const posts=${JSON.stringify(posts)};function toRandomPost(){ pjax.loadUrl(GLOBAL_CONFIG.root+posts[Math.floor(Math.random()*posts.length)]); }</script>`;
    return data;
});