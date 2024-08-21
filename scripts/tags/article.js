'use strict'

const article = ([path]) => {
  const post = hexo.locals.get("posts").data.find(post => post.path === path);
  if (!post) {
    return '';
  }
  const tags = post.tags.map(tag => `<a class="article-meta__tags fancybox" href="${tag.path}" onclick="event.stopPropagation();"><span class="tags-punctuation"><i class="solitude fa-solid fa-hashtag"></i>${tag.name}</span></a>`).join('');
  const category = post.categories.data.length > 0 ? `<span class="article-meta sticky-warp"><span class="original">${post.categories.data[0].name}</span></span>` : '';
  return `
    <div class="recent-post-item" onclick="pjax.loadUrl('${post.path}')">
      <div class="post_cover">
        <a href="${post.path}" class="fancybox" title="${post.title}">
          <img class="post_bg" src="${post.cover}" alt="${post.title}">
        </a>
      </div>
      <div class="recent-post-info">
        <div class="recent-post-info-top">
          <div class="recent-post-info-top-tips">
            ${category}
          </div>
          <a class="article-title fancybox" href="${post.path}" title="${post.title}">${post.title}</a>
        </div>
        <div class="content">
        ${post.description ? post.description : ''}
        </div>
        <div class="article-meta-wrap">
          <span class="article-meta tags">
            ${tags}
          </span>
          <span class="post-meta-date">
            <time datetime="${post.date}" style="display: inline;"></time>
          </span>
        </div>
      </div>
    </div>`;
}

hexo.extend.tag.register('article', article)
