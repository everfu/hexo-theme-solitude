/**
 * Chart.js tag for Solitude theme
 */

'use strict'

const chart = (args, content) => {
  const id = Math.random().toString(36).substr(2, 9);
  return `
  <div class="chart">
    <canvas id="chart-${id}"></canvas>
    <script>
    !function() {
      const chart = () => {
        const canvas = document.getElementById("chart-${id}");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        new Chart(ctx, {${content}});
      };
      document.addEventListener("DOMContentLoaded", chart);
      utils.addEventListenerPjax(document, "pjax:complete", chart);
    }()
    </script>
  </div>`;
}

hexo.extend.tag.register('chart', chart, {ends: true})
