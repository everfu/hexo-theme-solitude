hexo.on('ready', () => {
    const {version} = require('../../package.json')
    hexo.log.info(`
  =====================[ Hexo Theme - Solitude ]=====================
       #####  ####  #     #####  ###### #     # ######   ######
      #      #    # #       #      #    #     # #      # #
       ##### #    # #       #      #    #     # #      # ######
           # #    # #       #      #    #     # #      # #
      ######  ####  ##### #####    #      ###   ######   ######
                            ${version}
  ===================================================================
  GitHub: https://github.com/everfu/hexo-theme-solitude
  `)
})
