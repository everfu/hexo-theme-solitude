'use strict'

hexo.extend.filter.register('before_post_render', data => {
  const imgTestReg = /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/i
  let { cover: coverVal } = data

  if (hexo.config.post_asset_folder) {
    if (coverVal && coverVal.indexOf('/') === -1 && imgTestReg.test(coverVal)) data.cover = `${data.path}${coverVal}`
  }
  
  return data
})