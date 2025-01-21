function decorateLinks() {
  const postContainer = document.querySelector('.post-content');
  if (!postContainer) return;

  const links = postContainer.querySelectorAll('a[href]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    const title = link.innerText.trim();

    if (href.startsWith('http') && !href.includes(window.location.hostname)) {
      const card = document.createElement('div');
      card.classList.add('efu-link');
      card.style.cursor = 'pointer';

      const url = new URL(href);
      const domain = url.hostname.replace(/^www\./, '');

      card.innerHTML = `
        <div class="efu-link-img">
          <img src="https://s1.imagehub.cc/images/2024/12/02/632726f0a6dadcc20df6371b774148db.png" alt="Link Thumbnail">
        </div>
        <div class="efu-link-tip">这是一个外部链接，不能保证安全性。</div>
        <div class="efu-link-title">${title}</div>
        <div class="efu-link-subtitle">${domain}</div>
      `;

      card.addEventListener('click', () => {
        window.open(href, '_blank');
      });

      link.replaceWith(card);
    }
  });
}

setTimeout(() => {
  document.addEventListener('pjax:complete', decorateLinks);
}, 1000);

document.addEventListener('DOMContentLoaded', function () {
  decorateLinks();
  document.addEventListener('pjax:complete', decorateLinks);
});