hexo.extend.filter.register('stylus:renderer', function (style) {
    const {config, theme} = this

    // 侧边栏标签高亮
    if (theme.config.aside.tags.highlight) {
        let array = theme.config.aside.tags.list.map(item => encodeURIComponent(item));
        style.define('highlightTags',array);
    }
});