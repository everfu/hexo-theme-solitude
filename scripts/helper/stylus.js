hexo.extend.filter.register('stylus:renderer', function (style) {
    const {config, theme} = this;
    const data = hexo.locals.get('data');

    if (theme.config.aside.tags.highlight) {
        const array = theme.config.aside.tags.list.map(item => encodeURIComponent(item));
        style.define('highlightTags', array);
    }

    const aside = [
        theme.config.aside.home.noSticky,
        theme.config.aside.home.Sticky,
        theme.config.aside.post.noSticky,
        theme.config.aside.post.Sticky,
        theme.config.aside.page.Sticky,
        theme.config.aside.page.noSticky
    ].join(',').split(',');
    const uniqueArr = [...new Set(aside)];
    if (uniqueArr.length > 0) {
        style.define('aside', uniqueArr);
    }

    style.define('about', data && data.about ? Object.keys(data.about) : []);

    let group = theme.config.hometop.group?.map(item => ({
        [item.name]: item.color
    })) || [];

    style.define('banner_group', group);

    function getGroupColor(key) {
        let color = '';
        group.forEach(item => {
            if (item[key]) {
                color = item[key];
            }
        });
        return color;
    }
    style.define('getGroupColor', getGroupColor);
});