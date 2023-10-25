const $searchMask = document.getElementById('search-mask'),
    $searchDialog = document.querySelector('#algolia-search .search-dialog')

class search {
    static openSearch() {
        utils.fadeIn($searchMask, '0.5')
        utils.fadeIn($searchDialog, '0.5')
        document.addEventListener('keydown', function f(event) {
            if (event.code === 'Escape') {
                closeSearch()
                document.removeEventListener('keydown', f)
            }
        })
    }

    static closeSearch() {
        utils.fadeOut($searchDialog, '0.5')
        utils.fadeOut($searchMask, '0.5')
    }

    static cutContent(content) {
        if (content === '') return ''

        const firstOccur = content.indexOf('<mark>')

        let start = firstOccur - 30
        let end = firstOccur + 120
        let pre = ''
        let post = ''

        if (start <= 0) {
            start = 0
            end = 140
        } else {
            pre = '...'
        }

        if (end > content.length) {
            end = content.length
        } else {
            post = '...'
        }

        const matchContent = pre + content.substring(start, end) + post
        return matchContent
    }

    static search() {
        const algolia = GLOBALCONFIG.algolia, that = this
        const isAlgoliaValid = algolia.appId && algolia.apiKey && algolia.indexName
        if (!isAlgoliaValid) {
            return console.error('Algolia setting is invalid!')
        }

        const init = instantsearch({
            indexName: algolia.indexName,
            searchClient: algoliasearch(algolia.appId, algolia.apiKey),
            searchFunction(helper) {
                helper.state.query && helper.search()
            }
        })

        const searchBox = instantsearch.widgets.searchBox({
            container: '#search-input',
            showReset: false,
            showSubmit: false,
            autofocus: true,
            placeholder: GLOBALCONFIG.lang.search.placeholder,
            showLoadingIndicator: false
        })

        const hits = instantsearch.widgets.hits({
            container: '#algolia-hits',
            templates: {
                item(data) {
                    const link = '/posts/' + data.permalink.split('/')[4]
                    const result = data._highlightResult
                    const content = result.contentStripTruncate
                        ? that.cutContent(result.contentStripTruncate.value)
                        : result.contentStrip
                            ? that.cutContent(result.contentStrip.value)
                            : result.content
                                ? that.cutContent(result.content.value)
                                : ''
                    return `
                <a href="${link}" class="algolia-hit-item-link">
                ${result.title.value}
                </a>
                <p class="algolia-hit-item-content">${content}</p>`
                },
                empty: function (data) {
                    return (
                        `<div id="algolia-hits-empty">${GLOBALCONFIG.lang.search.empty}</div>`
                    )
                }
            }
        })

        const stats = instantsearch.widgets.stats({
            container: '.algolia-stats',
            templates: {
                text: function (data) {
                    const stats = GLOBALCONFIG.lang.search.hit.replace('${query}', `<mark>${data.nbHits}</mark>`)
                    return (
                        stats
                    )
                }
            }
        })

        init.addWidgets([searchBox, hits, stats]) // add the widgets to the instantsearch instance
        init.start()
        init.on('render', () => {
            pjax.refresh(document.getElementById('algolia-hits'))
        })
    }
}

const searchClickFn = () => {
    document.querySelector('#search-button > .search').addEventListener('click', search.openSearch)
}

const searchClickFnOnce = () => {
    document.querySelector('#algolia-search .search-close-button').addEventListener('click', search.closeSearch)
    $searchMask.addEventListener('click', search.closeSearch)
}

window.addEventListener('load', () => {
    searchClickFn()
    searchClickFnOnce()
    search.search()
})

window.addEventListener('pjax:complete', () => {
    searchClickFn()
})