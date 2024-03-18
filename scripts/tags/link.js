'use strict'

function link(args) {
    let urlNoProtocol = args[2].replace(/^https?\:\/\//i, "");
    let imgUrl = "https://api.iowen.cn/favicon/" + urlNoProtocol + ".png";
    return `<a class="tag-link" target="_blank" href="${args[2]}">
    <div class="tag-link-tips">引用站外地址</div>
    <div class="tag-link-bottom">
        <div class="tag-link-left" style="background-image: url(${imgUrl});">
            <i class="solitude st-link-m-line"></i>
        </div>
        <div class="tag-link-right">
            <div class="tag-link-title">${args[0]}</div>
            <div class="tag-link-sitename">${args[1]}</div>
        </div>
        <i class="solitude st-arrow-right-bold"></i>
    </div>
    </a>`
}

hexo.extend.tag.register('link',link, { ends: false })