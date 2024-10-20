/**
 * Typeit.js tag for Solitude theme
 */

'use strict'

const typeit = ([tag], content) => {
  const id = Math.random().toString(36).substr(2, 9);
  tag = tag || 'div';
  return `
  <div class="typeit">
    <${tag} id="typeit-${id}"></${tag}>
    <script>
    !function() {
      const typeit = () => {
        const ctx = document.getElementById("typeit-${id}");
        if (!ctx) return;
        new TypeIt("#typeit-${id}", {${content}})
          .go();
      }
      document.addEventListener("DOMContentLoaded", typeit);
      utils.addEventListenerPjax(document, "pjax:complete", typeit);
    }()
    </script>
  </div>`
}

hexo.extend.tag.register('typeit', typeit, {ends: true})
