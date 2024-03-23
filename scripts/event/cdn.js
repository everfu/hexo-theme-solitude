/**
 * Solitude
 * Merge CDN
 */

'use strict'

const { version } = require('../../package.json')
const path = require('path')

hexo.extend.filter.register('before_generate', () => {
    const themeConfig = hexo.theme.config
    const { CDN } = themeConfig

    const thirdPartySrc = hexo.render.renderSync({ path: path.join(hexo.theme_dir, '/plugins.yml'), engine: 'yaml' })
    const internalSrc = {
        main: {
            name: 'hexo-theme-solitude',
            file: 'js/main.js',
            version
        },
        utils: {
            name: 'hexo-theme-solitude',
            file: 'js/utils.js',
            version
        },
        local_search: {
            name: 'hexo-theme-solitude',
            file: 'js/search/local.js',
            version
        },
        algolia_js: {
            name: 'hexo-theme-solitude',
            file: 'js/search/algolia.js',
            version
        },
        cover_local: {
            name: 'hexo-theme-solitude',
            file: 'js/covercolor/local.js',
            version
        },
        cover_api: {
            name: 'hexo-theme-solitude',
            file: 'js/covercolor/api.js',
            version
        },
        rightside_js: {
            name: 'hexo-theme-solitude',
            file: 'js/rightside.js',
            version
        },
        music_js: {
            name: 'hexo-theme-solitude',
            file: 'js/music.js',
            version
        },
        translate:{
            name: 'hexo-theme-solitude',
            file: 'js/tw_cn.js',
            version
        },
        sco_ai_js: {
            name: 'hexo-theme-solitude',
            file: 'js/sco-ai.min.js',
            version
        },
        twikoo_commentBarrage: {
            name: 'hexo-theme-solitude',
            file: 'js/comment/twikoo_commentBarrage.js',
            version
        },
        waline_commentBarrage: {
            name: 'hexo-theme-solitude',
            file: 'js/comment/waline_commentBarrage.js',
            version
        },
        waterfall: {
            name: 'hexo-theme-solitude',
            file: 'js/waterfall.min.js',
            version
        },
        universe_js: {
            name: 'hexo-theme-solitude',
            file: 'js/universe.min.js',
            version
        },
        lately_js: {
            name: 'hexo-theme-solitude',
            file: 'js/lately.min.js',
            version
        },
    }

    const minFile = file => {
        return file.replace(/(?<!\.min)\.(js|css)$/g, ext => '.min' + ext)
    }

    const createCDNLink = (data, type, cond = '') => {
        Object.keys(data).forEach(key => {
            let { name, version, file, other_name } = data[key]
            const cdnjs_name = other_name || name
            const cdnjs_file = file.replace(/^[lib|dist]*\/|browser\//g, '')
            const min_cdnjs_file = minFile(cdnjs_file)
            if (cond === 'internal') file = `source/${file}`
            const min_file = minFile(file)
            const verType = CDN.version ? (type === 'local' ? `?v=${version}` : `@${version}`) : ''

            const value = {
                version,
                name,
                file,
                cdnjs_file,
                min_file,
                min_cdnjs_file,
                cdnjs_name
            }

            const cdnSource = {
                local: cond === 'internal' ? `${cdnjs_file + verType}` : `/pluginsSrc/${name}/${file + verType}`,
                jsdelivr: `https://cdn.jsdelivr.net/npm/${name}${verType}/${min_file}`,
                unpkg: `https://unpkg.com/${name}${verType}/${file}`,
                cdnjs: `https://cdnjs.cloudflare.com/ajax/libs/${cdnjs_name}/${version}/${min_cdnjs_file}`,
                custom: (CDN.custom_format || '').replace(/\$\{(.+?)}/g, (match, $1) => value[$1]),
            }

            data[key] = cdnSource[type]
        })

        if (cond === 'internal') data.main_css = 'css/index.css' + (CDN.version ? `?v=${version}` : '')
        return data
    }

    // delete null value
    const deleteNullValue = obj => {
        if (!obj) return
        for (const i in obj) {
            obj[i] === null && delete obj[i]
        }
        return obj
    }

    themeConfig.cdn = Object.assign(
        createCDNLink(internalSrc, CDN.internal, 'internal'),
        createCDNLink(thirdPartySrc, CDN.third_party),
        deleteNullValue(CDN.option)
    )
})