'use strict';

function galleryGroup(args, content) {
    const title = args[0];
    const description = args[1];
    const link = args[2];
    const image = args[3];

    return `<div class="gallery-item" onclick="pjax.loadUrl('/${link}/')">
                <img class="cover" src="${image}" />
                <span class="title">${title}</span>
                <span class="desc">${description}</span>
                </div>`;
}

const urlFor = require('hexo-util').url_for.bind(hexo)

const gallery = (args, content) => {
    args = args.join(' ').split(',')
    let button = false
    let type = 'data'
    let dataStr = ''

    if (args[0] === 'url') {
        [type, dataStr, button] = args // url,[link],[lazyload]
    } else {
        [button] = args // [lazyload]
        const regex = /!\[(.*?)\]\(([^\s]*)\s*(?:["'](.*?)["']?)?\s*\)/g
        let m
        const arr = []
        while ((m = regex.exec(content)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++
            }
            arr.push({
                url: m[2],
                alt: m[1],
                title: m[3]
            })
        }

        dataStr = JSON.stringify(arr)
    }

    return `<div class="gallery-container" data-type="${type}" data-button="${button}">
      <div class="gallery-data">${dataStr}</div>
      <div class="gallery-items">
      </div>
    </div>`
}

hexo.extend.tag.register('gallery', gallery, {ends: true});

hexo.extend.tag.register('galleryGroup',galleryGroup, {ends: false});