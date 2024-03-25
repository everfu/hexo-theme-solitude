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

    initGroupColor(theme.config.hometop.group,style);

    // highlight
    const { syntax_highlighter: syntaxHighlighter, highlight, prismjs } = hexo.config
    let { enable: highlightEnable, line_number: highlightLineNumber } = highlight
    let { enable: prismjsEnable, line_number: prismjsLineNumber } = prismjs

    // for hexo > 7.0
    if (syntaxHighlighter) {
        highlightEnable = syntaxHighlighter === 'highlight.js'
        prismjsEnable = syntaxHighlighter === 'prismjs'
    }

    style.define('$highlight_enable', highlightEnable)
    style.define('$highlight_line_number', highlightLineNumber)
    style.define('$prismjs_enable', prismjsEnable)
    style.define('$prismjs_line_number', prismjsLineNumber)
});

function initGroupColor(gg,style) {
    if(gg === null || gg === undefined) {
        style.define('banner_group', [])
        return;
    }
    let group = Object.keys(gg).map(key => {
        return {
            [key]: (gg[key]).split('||')[2]
        }
    });

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
}