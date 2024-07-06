/**
 * Solitude
 * inject is to head
 */

'use strict';

hexo.extend.helper.register('inject_head_js', function () {
    const createJS = () => `
        const saveToLocal = {
            set: function setWithExpiry(key, value, ttl) {
                if (ttl === 0)
                    return
                const now = new Date()
                const expiryDay = ttl * 86400000
                const item = {
                    value: value,
                    expiry: now.getTime() + expiryDay
                }
                localStorage.setItem(key, JSON.stringify(item))
            },
            get: function getWithExpiry(key) {
                const itemStr = localStorage.getItem(key)
    
                if (!itemStr) {
                    return undefined
                }
                const item = JSON.parse(itemStr)
                const now = new Date()
    
                if (now.getTime() > item.expiry) {
                    localStorage.removeItem(key)
                    return undefined
                }
                return item.value
            }
        };
        window.utils = {
            saveToLocal: saveToLocal,
            getCSS: (url, id = false) => new Promise((resolve, reject) => {
              const link = document.createElement('link')
              link.rel = 'stylesheet'
              link.href = url
              if (id) link.id = id
              link.onerror = reject
              link.onload = link.onreadystatechange = function() {
                const loadState = this.readyState
                if (loadState && loadState !== 'loaded' && loadState !== 'complete') return
                link.onload = link.onreadystatechange = null
                resolve()
              }
              document.head.appendChild(link)
            }),
            getScript: (url, attr = {}) => new Promise((resolve, reject) => {
              const script = document.createElement('script')
              script.src = url
              script.async = true
              script.onerror = reject
              script.onload = script.onreadystatechange = function() {
                const loadState = this.readyState
                if (loadState && loadState !== 'loaded' && loadState !== 'complete') return
                script.onload = script.onreadystatechange = null
                resolve()
              }
    
              Object.keys(attr).forEach(key => {
                script.setAttribute(key, attr[key])
              })
    
              document.head.appendChild(script)
            }),
            addGlobalFn: (key, fn, name = false, parent = window) => {
                const globalFn = parent.globalFn || {}
                const keyObj = globalFn[key] || {}
        
                if (name && keyObj[name]) return
        
                name = name || Object.keys(keyObj).length
                keyObj[name] = fn
                globalFn[key] = keyObj
                parent.globalFn = globalFn
            },
        }
    `
    return `<script>(()=>{${createJS()}})()</script>`
})

hexo.extend.helper.register('packageVersion', function () {
    const {version} = require('../../package.json')
    return version
})