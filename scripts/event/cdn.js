/**
 * Solitude
 * Merge CDN
 */

"use strict";

const { version } = require("../../package.json");
const path = require("path");

hexo.extend.filter.register("before_generate", () => {
  const themeConfig = hexo.theme.config;
  const { CDN } = themeConfig;
  const name = "hexo-theme-solitude";

  const thirdPartySrc = hexo.render.renderSync({
    path: path.join(hexo.theme_dir, "/plugins.yml"),
    engine: "yaml",
  });
  const internalSrc = {
    main: { name, file: "js/main.js", version },
    utils: { name, file: "js/utils.js", version },
    local_search: { name, file: "js/search/local.js", version },
    algolia_js: { name, file: "js/search/algolia.js", version },
    cover_local: { name, file: "js/covercolor/local.js", version },
    cover_api: { name, file: "js/covercolor/api.js", version },
    cover_ave: { name, file: "js/covercolor/ave.js", version },
    music_js: { name, file: "js/music.js", version },
    right_menu_js: { name, file: "js/right_menu.js", version },
    translate_js: { name, file: "js/tw_cn.js", version },
    commentBarrage: { name, file: "js/third_party/barrage.min.js", version },
    waterfall: { name, file: "js/third_party/waterfall.min.js", version },
    universe_js: { name, file: "js/third_party/universe.min.js", version },
    post_ai: { name, file: "js/post_ai.js", version },
    envelope_js: { name, file: "js/third_party/envelope.min.js", version },
  };

  const minFile = (file) =>
    file.replace(/(?<!\.min)\.(js|css)$/g, (ext) => `.min${ext}`);

  const createCDNLink = (data, type, cond = "") => {
    Object.keys(data).forEach((key) => {
      let { name, version, file, other_name } = data[key];
      const cdnjs_name = other_name || name;
      const cdnjs_file = file.replace(/^[lib|dist]*\/|browser\//g, "");
      const min_cdnjs_file = minFile(cdnjs_file);
      if (cond === "internal") file = `source/${file}`;
      const min_file = minFile(file);
      const verType = CDN.version
        ? type === "local"
          ? `?v=${version}`
          : `@${version}`
        : "";

      const value = {
        version,
        name,
        file,
        cdnjs_file,
        min_file,
        min_cdnjs_file,
        cdnjs_name,
      };

      const cdnSource = {
        local:
          cond === "internal"
            ? `${cdnjs_file + verType}`
            : `/pluginsSrc/${name}/${file + verType}`,
        jsdelivr: `https://cdn.jsdelivr.net/npm/${name}${verType}/${min_file}`,
        unpkg: `https://unpkg.com/${name}${verType}/${file}`,
        cdnjs: `https://cdnjs.cloudflare.com/ajax/libs/${cdnjs_name}/${version}/${min_cdnjs_file}`,
        custom: (CDN.custom_format || "").replace(
          /\$\{(.+?)}/g,
          (match, $1) => value[$1]
        ),
      };

      data[key] = cdnSource[type];
    });

    if (cond === "internal")
      data.main_css = `css/index.css${CDN.version ? `?v=${version}` : ""}`;
    return data;
  };

  const deleteNullValue = (obj) => {
    if (!obj) return;
    for (const key in obj) {
      if (obj[key] === null) delete obj[key];
    }
    return obj;
  };

  themeConfig.cdn = Object.assign(
    createCDNLink(internalSrc, CDN.internal, "internal"),
    createCDNLink(thirdPartySrc, CDN.third_party),
    deleteNullValue(CDN.options)
  );
});
