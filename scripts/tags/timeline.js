"use strict"

function postTimeline(args, content) {
    if (args.length > 0) {
        return `<div class="timeline"><h1>${args}</h1>${content}</div>`;
    } else {
        return `<div class="timeline">${content}</div>`;
    }
}

function postTimenode(args, content) {
    args = args.join(" ").split(",");
    var time = args[0];
    return `<div class="timenode"><div class="meta"><p>${time}</p></div><div class="body">${hexo.render
        .renderSync({ text: content, engine: "markdown" })
        .split("\n")
        .join("")}</div></div>`;
}

hexo.extend.tag.register("timeline", postTimeline, { ends: true });

hexo.extend.tag.register("timenode", postTimenode, { ends: true });