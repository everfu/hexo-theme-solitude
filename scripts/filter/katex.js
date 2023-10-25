const katex = require('katex');

hexo.extend.filter.register('marked:extensions', function(extensions) {
    // Info: `extensions` is an array.
    extensions.push({
        name: 'blockMath',
        level: 'block',
        tokenizer(src) {
            const cap = /^\s{0,3}\$\$((?:[^\n]|\n[^\n])+?)\n{0,1}\$\$/.exec(src);

            if (cap !== null) {
                return {
                    type: 'blockMath',
                    raw: cap[0],
                    math: cap[1]
                };
            }

            return undefined;
        },
        renderer(token) {
            return `<p>${katex.renderToString(token.math, {displayMode: true})}</p>\n`;
        }
    });
});