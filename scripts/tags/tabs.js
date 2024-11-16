/**
 * Tabs
 * from solitude
 */

'use strict'

function postTabs([name, active], content) {
  const tabBlock = /<!--\s*tab (.*?)\s*-->\n([\w\W\s\S]*?)<!--\s*endtab\s*-->/g;
  const matches = [...content.matchAll(tabBlock)];
  
  active = Number(active) || 0;

  const generateTabItems = (matches, name, active) => {
    return matches.map((match, tabId) => {
      const [tabCaption = '', tabIcon = ''] = match[1].split('@');
      const postContent = hexo.render.renderSync({ text: match[2], engine: 'markdown' }).trim();
      const tabHref = `${name.toLowerCase().replace(/\s+/g, '-')}-${tabId}`;
      
      const iconHtml = tabIcon ? `<i class="${tabIcon.trim()} tab solitude"></i>` : '';
      const isActive = active === tabId ? ' active' : '';
      const toTopButton = '<button type="button" class="tab-to-top" aria-label="scroll to top"><i class="solitude fas fa-arrow-up"></i></button>';
      
      return {
        nav: `<li class="tab${isActive}"><button type="button" data-href="#${tabHref}">${iconHtml}${tabCaption.trim() || `${name} ${tabId}`}</button></li>`,
        content: `<div class="tab-item-content${isActive}" id="${tabHref}">${postContent}${toTopButton}</div>`
      };
    });
  };

  const tabItems = generateTabItems(matches, name, active);

  const createTabStructure = (tabItems) => {
    const tabNav = `<ul class="nav-tabs">${tabItems.map(item => item.nav).join('')}</ul>`;
    const tabContent = `<div class="tab-contents">${tabItems.map(item => item.content).join('')}</div>`;
    return { tabNav, tabContent };
  };

  const { tabNav, tabContent } = createTabStructure(tabItems);

  return `<div class="tabs" id="${name.toLowerCase().replace(/\s+/g, '-')}">${tabNav}${tabContent}</div>`;
}

hexo.extend.tag.register('tabs', postTabs, { ends: true });
hexo.extend.tag.register('subtabs', postTabs, { ends: true });
hexo.extend.tag.register('subsubtabs', postTabs, { ends: true });
