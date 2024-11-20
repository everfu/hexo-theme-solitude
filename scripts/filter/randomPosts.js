hexo.extend.filter.register('after_render:html', function (data) {
    const posts = hexo.locals.get('posts')
        .filter(post => post.random !== false)
        .map(post => post.path);
    
    const scriptContent = `
        <script>
            const posts = ${JSON.stringify(posts)};
            function toRandomPost() {
                const randomPost = posts[Math.floor(Math.random() * posts.length)];
                pjax.loadUrl(GLOBAL_CONFIG.root + randomPost);
            }
        </script>`;
    
    return data + scriptContent;
});