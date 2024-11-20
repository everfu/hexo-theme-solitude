'use strict';

const article = ([path]) => {
  const post = hexo.locals.get("posts").data.find(post => post.path === path);
  if (!post) return '';

  const createTagLinks = tags => tags.map(tag => 
    `<a class="article-meta__tags fancybox" href="${tag.path}" onclick="event.stopPropagation();">
      <span class="tags-punctuation">
        <i class="solitude fa-solid fa-hashtag"></i>${tag.name}
      </span>
    </a>`
  ).join('');

  const createCategory = categories => categories.length > 0 
    ? `<span class="article-meta sticky-warp">
         <span class="original">${categories[0].name}</span>
       </span>` 
    : '';

  const createPostCover = post => 
    `<div class="post_cover">
       <a href="/${post.path}" class="fancybox" title="${post.title}">
         <img class="post_bg" src="${post.cover}" alt="${post.title}">
       </a>
     </div>`;

  const createRecentPostInfoTop = (category, post) => 
    `<div class="recent-post-info-top">
       <div class="recent-post-info-top-tips">${category}</div>
       <a class="article-title fancybox" href="/${post.path}" title="${post.title}">${post.title}</a>
     </div>`;

  const createContent = description => 
    `<div class="content">${description || ''}</div>`;

  const createArticleMetaWrap = (tags, date) => 
    `<div class="article-meta-wrap">
       <span class="article-meta tags">${tags}</span>
       <span class="post-meta-date">
         <time datetime="${date}" style="display: inline;"></time>
       </span>
     </div>`;

  const tags = createTagLinks(post.tags);
  const category = createCategory(post.categories.data);
  const postCover = createPostCover(post);
  const recentPostInfoTop = createRecentPostInfoTop(category, post);
  const content = createContent(post.description);
  const articleMetaWrap = createArticleMetaWrap(tags, post.date);
  const recentPostInfo = `<div class="recent-post-info">${recentPostInfoTop + content + articleMetaWrap}</div>`;

  return `<div class="recent-post-item" onclick="pjax.loadUrl('/${post.path}')">${postCover + recentPostInfo}</div>`;
};

hexo.extend.tag.register('article', article);