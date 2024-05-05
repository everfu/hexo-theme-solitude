const urlFor = require("hexo-util").url_for.bind(hexo);
function link(args) {
    const themeConfig = hexo.theme.config;
    args = args.join(" ").split(",");
    let title = args[0];
    let sitename = args[1];
    let link = args[2];
    let imgUrl = args[3] || "";
    let favicon = themeConfig.site.siteIcon;
    let insideStation = false;

    link = link.trim();
    imgUrl = imgUrl.trim();
    favicon = favicon.trim();

    try {
        new URL(link);
        insideStation = false;
    } catch (err) {
        insideStation = true;
    }

    if ((imgUrl === "") && (insideStation === false)) {
        let domain = new URL(link).hostname
        if (domain) {
            imgUrl_online = "https://api.iowen.cn/favicon/" + domain + ".png";
        }
    }

    return `<a class="tag-link" target="_blank" href="${urlFor(link)}">
    <div class="tag-link-tips">${insideStation ? "站内链接" : "引用站外链接"
        }</div>
    <div class="tag-link-bottom">
        <div class="tag-link-left" style="${insideStation
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