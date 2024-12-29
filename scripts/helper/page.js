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
    const { config } = this
    return prettyUrls(url || this.url, config.pretty_urls);
});