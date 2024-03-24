'use strict'

function bilibili(args) {
  return `<iframe class="bvideo" width="100%" height="600" src="//player.bilibili.com/player.html?autoplay=0&bvid=${args}" border="0" frameBorder="no" framespacing="0" allowFullScreen="true"></iframe>`
}

hexo.extend.tag.register('bvideo', bilibili, {ends: false})
