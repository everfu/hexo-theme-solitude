const urlFor = require("hexo-util").url_for.bind(hexo);
function link(args) {
    const themeConfig = hexo.theme.config;
    args = args.join(" ").split(",");
    let title = args[0];
    let sitename = args[1];
    let link = args[2];
    let imgUrl = args[3] || "";
    let favicon = themeConfig.site.siteIcon;

    link = link.trim();
    imgUrl = imgUrl.trim();
    favicon = favicon.trim();

    try {
        new URL(link);
        InsideStation = false;
    } catch (err) {
        InsideStation = true;
    }

    if ((imgUrl == "") && (InsideStation == false)) {
        let domain = new URL(link).hostname
        if (domain) {
            imgUrl_online = "https://api.iowen.cn/favicon/" + domain + ".png";
        }
    }

    return `<a class="tag-link" target="_blank" href="${urlFor(link)}">
    <div class="tag-link-tips">${InsideStation ? "站内链接" : "引用站外链接"
        }</div>
    <div class="tag-link-bottom">
        <div class="tag-link-left" style="${InsideStation
            ? `background-image: url(${imgUrl ? imgUrl : favicon})`
            : `background-image: url(${imgUrl ? imgUrl : imgUrl_online})`
        }">
            <i class="solitude st-link-m-line" style="${`(imgUrl) || (imgUrl_online)` ? "display: none" : ""
        }"></i>
        </div>
        <div class="tag-link-right">
            <div class="tag-link-title">${title}</div>
            <div class="tag-link-sitename">${sitename}</div>
        </div>
        <i class="solitude st-arrow-right-bold"></i>
    </div>
    </a>`;
}

hexo.extend.tag.register("link", link, { ends: false });