hexo.extend.filter.register('stylus:renderer', function (style) {
    const {config, theme} = this

    // 侧边栏标签高亮
    if (theme.config.aside.tags.highlight) {
        let array = theme.config.aside.tags.list.map(item => encodeURIComponent(item));
        style.define('highlightTags', array);
    }

    // 侧边栏加载样式控制
    let aside = [
        theme.config.aside.home.noSticky,
        theme.config.aside.home.Sticky,
        theme.config.aside.post.noSticky,
        theme.config.aside.post.Sticky,
        theme.config.aside.page.Sticky,
        theme.config.aside.page.noSticky
    ].join(',').split(',');
    let uniqueArr = [...new Set(aside)]; // 去重
    if (uniqueArr.length > 0) { // 是否为空
        style.define('aside', uniqueArr);
    }
});