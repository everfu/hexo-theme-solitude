"use strict";

const urlFor = require("hexo-util").url_for.bind(hexo);

function btn(args) {
    args = args.join(" ").split(",");
    let url = args[0] || "";
    let text = args[1] || "";
    let icon = args[2] || "";
    let option = args[3] || "";

    url = url.trim();
    text = text.trim();
    icon = icon.trim();
    option = option.trim();

    return `<button class="btn-sco ${option}" onclick="${url.startsWith("http") ? `window.open('${url}')` : `pjax.loadUrl('${urlFor(url)}')`}" 
  title="${text}">${icon.length ? `<i class="solitude ${icon}"></i>` : ""}${text.length ? `<span>${text}</span>` : ""}</button>`;
}

hexo.extend.tag.register("btn", btn, { ends: false });