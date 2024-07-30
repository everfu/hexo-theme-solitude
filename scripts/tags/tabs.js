/**
 * Tabs
 * from solitude
 */

'use strict'

function postTabs ([name, active], content) {
  const tabBlock = /<!--\s*tab (.*?)\s*-->\n([\w\W\s\S]*?)<!--\s*endtab\s*-->/g

  const matches = []
  let match
  let tabId = 0
  let tabNav = ''
  let tabContent = ''

  if (typeof active === 'undefined') {
    active = 0
  }

  while ((match = tabBlock.exec(content)) !== null) {
    matches.push(match[1])
    matches.push(match[2])
  }

  for (let i = 0; i < matches.length; i += 2) {
    const tabParameters = matches[i].split('@')
    let postContent = matches[i + 1]
    let tabCaption = tabParameters[0] || ''
    let tabIcon = tabParameters[1] || ''
    let tabHref = ''

    postContent = hexo.render.renderSync({ text: postContent, engine: 'markdown' }).trim()
    tabHref = (name + ' ' + tabId).toLowerCase().split(' ').join('-');

    ((tabCaption.length === 0) && (tabIcon.length === 0)) && (tabCaption = name + ' ' + tabId)

    const isOnlyicon = tabIcon.length > 0 && tabCaption.length === 0 ? ' style="text-align: center;"' : ''
    const icon = tabIcon.trim()
    tabIcon.length > 0 && (tabIcon = `<i ${isOnlyicon} class="tab solitude ${icon}"></i>`)

    const toTop = '<button type="button" class="tab-to-top" aria-label="scroll to top"><i class="solitude fas fa-arrow-up"></i></button>'
    const isActive = active === tabId ? ' active' : ''
    tabNav += `<li class="tab${isActive}"><button type="button" data-href="#${tabHref}">${tabIcon + tabCaption.trim()}</button></li>`
    tabContent += `<div class="tab-item-content${isActive}" id="${tabHref}">${postContent + toTop}</div>`
    tabId += 1
  }

  tabNav = `<ul class="nav-tabs">${tabNav}</ul>`
  tabContent = `<div class="tab-contents">${tabContent}</div>`

  return `<div class="tabs" id="${name.toLowerCase().split(' ').join('-')}">${tabNav + tabContent}</div>`
}

hexo.extend.tag.register('tabs', postTabs, { ends: true })
hexo.extend.tag.register('subtabs', postTabs, { ends: true })
hexo.extend.tag.register('subsubtabs', postTabs, { ends: true })
