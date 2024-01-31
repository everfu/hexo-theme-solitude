hexo.extend.filter.register('stylus:renderer', function (style) {
    const {config, theme} = this
    const data = hexo.locals.get('data');

    if (theme.config.aside.tags.highlight) {
        let array = theme.config.aside.tags.list.map(item => encodeURIComponent(item));
        style.define('highlightTags', array);
    }

    let aside = [
        theme.config.aside.home.noSticky,
        theme.config.aside.home.Sticky,
        theme.config.aside.post.noSticky,
        theme.config.aside.post.Sticky,
        theme.config.aside.page.Sticky,
        theme.config.aside.page.noSticky
    ].join(',').split(',');
    let uniqueArr = [...new Set(aside)]; // 去重
    if (uniqueArr.length > 0) {
        style.define('aside', uniqueArr);
    }

    if (data && data.about) {
        style.define('about', Object.keys(data.about));
    } else {
        style.define('about', []);
    }
});