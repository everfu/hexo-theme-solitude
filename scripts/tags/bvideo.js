'use strict'

function bilibili(args) {
  return `<iframe class="bvideo" src="${args}"></iframe>`
}

hexo.extend.tag.register('bilibili', bilibili, { ends: false })