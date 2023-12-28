'use strict';

hexo.extend.helper.register('cdn_url_for', function(path) {
    const {config, theme} = this
    const cdnPrefix = theme.cdn.prefix;
    const urlFor = hexo.extend.helper.get('url_for').bind(this);
    if (cdnPrefix) {
        return cdnPrefix + urlFor(path);
    } else {
        return urlFor(path);
    }
});