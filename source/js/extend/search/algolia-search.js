window.addEventListener('load', () => {
    const openSearch = () => {
        document.body.style.cssText = 'width: 100%;overflow: hidden'
        document.querySelector('#algolia-search .search-dialog').style.display = 'block'
        document.querySelector('#algolia-search .ais-SearchBox-input').focus()
        utils.fadeIn(document.getElementById('search-mask'), 0.5)
        // shortcut: ESC
        document.addEventListener('keydown', function f(event) {
            if (event.code === 'Escape') {
                closeSearch()
                document.removeEventListener('keydown', f)
            }
        })
    }

    const closeSearch = () => {
        document.body.style.cssText = "width: '';overflow: ''"
        const $searchDialog = document.querySelector('#algolia-search .search-dialog')
        $searchDialog.style.animation = 'search_close .5s'
        setTimeout(() => {
            $searchDialog.style.cssText = "display: none; animation: ''"
        }, 500)
        utils.fadeOut(document.getElementById('search-mask'), 0.5)
    }

    const searchClickFn = () => {
        document.querySelector('#search-button > .search').addEventListener('click', openSearch)
        document.getElementById('search-mask').addEventListener('click', closeSearch)
        document.querySelector('#algolia-search .search-close-button').addEventListener('click', closeSearch)
        document.getElementById('menu-search').addEventListener('click', function () {
            rm.hideRightMenu();
            openSearch();
            let t = document.querySelector('.ais-search-box--input');
            let evt = new Event('input', {bubbles: true, cancelable: true});
            t.value = selectTextNow;
            t.dispatchEvent(evt);
        });
    }

    searchClickFn()

    window.addEventListener('pjax:complete', function () {
        getComputedStyle(document.querySelector('#algolia-search .search-dialog')).display === 'block' && closeSearch()
        searchClickFn()
    })

    const algolia = GLOBAL_CONFIG.algolia
    const isAlgoliaValid = algolia.appId && algolia.apiKey && algolia.indexName
    if (!isAlgoliaValid) {
        return console.error('Algolia setting is invalid!')
    }

    const searchClient = algoliasearch(
        algolia.appId,
        algolia.apiKey
    );

    const search = instantsearch({
        indexName: algolia.indexName,
        searchClient,
        searchParameters: {
            hitsPerPage: algolia.hits.per_page || 10
        }
    })

    search.addWidget(
        instantsearch.widgets.searchBox({
            container: '#algolia-search-input',
            showReset: false,
            placeholder: GLOBAL_CONFIG.lang.search.placeholder,
            showSubmit: false,
            showLoadingIndicator: true,
            templates: {
                loadingIndicator: '<i class="scoicon sco-loading-line search-icon"></i>'
            },
            onStateChange({uiState, setUiState}) {
                const searchInput = document.querySelector('#algolia-search-input input')
                if (searchInput.value) {
                    setUiState(uiState);
                }
            }
        })
    )
    search.addWidget(
        instantsearch.widgets.hits({
            container: '#algolia-hits',
            templates: {
                item(hit) {
                    const link = hit.permalink ? hit.permalink : (GLOBAL_CONFIG.root + hit.path)
                    return (
                        `<a href="${link}" class="algolia-hit-item-link">${hit._highlightResult.title.value}</a>`
                    )
                },
                empty(data) {
                    return (
                        '<div id="algolia-hits-empty">' +
                        GLOBAL_CONFIG.lang.search.empty.replace(/\$\{query}/, data.query) +
                        '</div>'
                    )
                }
            },
            cssClasses: {
                item: 'algolia-hit-item'
            }
        })
    )

    search.addWidget(
        instantsearch.widgets.stats({
            container: '#algolia-stats',
            templates: {
                text(data) {
                    const stats = GLOBAL_CONFIG.lang.search.hit.replace(/\$\{hits}/, data.nbHits).replace(/\$\{time}/, data.processingTimeMS);
                    return `${stats}`;
                }
            }
        })
    )

    search.addWidget(
        instantsearch.widgets.pagination({
            container: '#algolia-pagination',
            scrollTo: false,
            showFirst: false,
            showPrevious: false,
            showNext: false,
            showLast: false,
            cssClasses: {
                list: 'pagination',
                pageItem: 'pagination-item',
                link: 'page-number',
            },
        })
    )
    search.start()

    window.pjax && search.on('render', () => {
        window.pjax.refresh(document.getElementById('algolia-hits'))
    })
})
