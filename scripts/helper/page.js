"use strict";
const { stripHTML, escapeHTML, prettyUrls } = require("hexo-util");
hexo.extend.helper.register('page_description', function () {
    const { config, page } = this
    let description =  page.description || page.content || page.title || config.description

    if (description) {
        description = escapeHTML(stripHTML(description).substring(0, 150)
            .trim()
        ).replace(/\n/g, ' ').replace(/\s+/g, ' ');
        return description
    }
})

hexo.extend.helper.register("urlNoIndex", function (url = null) {
    return prettyUrls(url || this.url, { trailing_index: false, trailing_html: true });
});