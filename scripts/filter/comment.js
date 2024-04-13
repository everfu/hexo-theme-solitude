/**
 * 将 use 分拆并将首字大写
 */

hexo.extend.filter.register('before_generate', () => {
    const themeConfig = hexo.theme.config
    let { use } = themeConfig.comment
    if (!use) return
    if (typeof use === 'string') {
        use = use.split(',')
    }
    themeConfig.comment.use = use.map(item => item.toLowerCase().replace(/\b[a-z]/g, s => s.toUpperCase()))
})