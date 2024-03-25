hexo.extend.filter.register('before_generate', () => {
    const defaultConfig = {
        site: {
            name: {
                class: 'text', custom: 'Solitude'
            }, siteIcon: '/img/logo.png', icon: 'icon'
        }, nav: {
            group: null, menu: null, right: {
                random: false, console: false, custom: [],
            }
        }, hometop: {
            enable: false, banner: {
                title: 'Solitude', url: 'A simple theme for Hexo', icon: null,
            }, group: null, recommendList: {
                sup: 'Recommend',
                title: 'Solitude Docs',
                url: 'https://solitude-docs.efu.me/',
                img: '/img/default.png',
                color: 'none',
            }
        }, aside: {
            home: {
                noSticky: 'about', Sticky: 'allInfo'
            }, post: {
                noSticky: 'about', Sticky: 'allInfo'
            }, page: {
                noSticky: 'about', Sticky: 'allInfo'
            }, card: {
                author: {
                    img: '/img/logo.png', sticker: '/img/happy-sticker.png',
                },
                url: '/about/',
                content1: 'Solitude',
                content2: 'A simple theme for Hexo',
                sayhello: {
                    morning: 'Good Morning',
                    noon: 'Good Noon',
                    afternoon: 'Good Afternoon',
                    night: 'Good Night',
                    goodnight: 'Good Night',
                },
                sayhello2: ['Welcome to Solitude', 'A simple theme for Hexo', 'Enjoy your time', 'Have a nice day', 'Good luck'],
                information: null,
            }, flip: {
                favicon: '', face: '', backface: '', backcolor: 'var(--efu-blue)'
            }, toc: {
                post: true, page: false, vague: true,
            }, tags: {
                enable: true, limit: 20, highlight: false, list: [],
            }, archive: {
                enable: true, type: 'month'
            }, siteinfo: {
                postcount: true,
                wordcount: false,
                pv: true,
                uv: true,
                updatetime: true,
                runtimeenable: true,
                runtime: "2023-04-20 00:00:00",
            },
        }, page: {
            error: true, tags: true, categories: true, default: {
                cover: ['/img/default.png'],
            }
        }, post: {
            default: {
                cover: ['/img/default.png'], locate: 'China, Changsha', copyright: {
                    enable: true,
                    license: 'CC BY-NC-SA 4.0',
                    licenurl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
                }
            }, meta: {
                date: false,
                updated: false,
                locate: false,
                wordcount: false,
                readtime: false,
                pv: false,
                uv: false,
                comment: false,
            }, award: {
                enable: false,
                wechat: 'https://7.isyangs.cn/34/65f2e5814db1a-34.png',
                alipay: 'https://7.isyangs.cn/34/65f2e5a6d2ef5-34.png',
                url: '/about/',
            }, rss: null, covercolor: {
                enable: false, mode: 'local', api: 'https://api.qjqq.cn/api/Imgcolor?img=', time: 43200000,
            }
        }, theme_color: {
            dark: "#ffc848",
            dark_op: "#f2b94b23",
            dark_op_deep: "#f2b94bdd",
            dark_none: "#f2b94b00",
            light: "#425AEF",
            light_op: "#4259ef23",
            light_op_deep: "#4259efdd",
            light_none: "#4259ef01"
        }, display_mode: {
            type: 'auto', universe: false
        }, related_post: {
            enable: false, limit: 2, date_type: 'created'
        }, footer: {
            information: {
                left: null, right: null,
            }, group: null, randomlink: false, privacy: null, license: null, links: [{
                name: 'Solitude', url: 'https://github.com/valor-x/hexo-theme-solitude',
            }]
        }, errorpage: {
            img: 'https://7.isyangs.cn/34/65f2e65eae32a-34.png', text: '404 Not Found', recommendList: true
        }, says: {
            enable: false, home_mini: false, style: 1, strip: 30
        }, meting_api: "https://meting.qjqq.cn/?server=:server&type=:type&id=:id&auth=:auth&r=:r", music: {
            enable: false, id: '8407304077', server: 'netease', type: 'playlist', volume: 0.8, mutex: true,
        }, capsule: {
            enable: false, id: '8407304077', server: 'netease', type: 'playlist',
        }, moments: {
            enable: false,
            api: '',
            error_img: '/img/logo.png',
            sort_rule: 'created',
            expire_days: 1,
            page_init_number: 10,
            page_turning_number: 5,
            angle: false,
            appjs: 'https://cdn.cbd.int/st-source@1.0.3/js/fcircle.min.js',
            bundlejs: 'https://cdn.cbd.int/st-source/js/moment/bundle.min.js',
            randompostjs: 'https://cdn.cbd.int/st-source/js/moment/random_post.min.js'
        }, keyboard: {
            enable: false, list: []
        }, lazyload: {
            enable: false, placeholder: '/img/loading.gif', errorimg: '/img/error_load.png'
        }, loading: {
            fullpage: false, pace: true,
        }, highlight: {
            enable: true, limit: 200, copy: true, expand: true, theme: 'default', color: 'default',
        }, lightbox: false, fancybox: false, mediumZoom: false, mermaid: false, translate: {
            enable: false, defaultEncoding: 2, translateDelay: 0,
        }, opengraph: {
            enable: false, options: null
        }, wordcount: false, busuanzi: false, search: {
            enable: false, type: 'local', tags: [], algolia: null, local: {
                preload: false, CDN: null,
            }
        }, rightside: {
            enable: false
        }, post_ai: {
            enable: false,
            modelName: 'GPT 3',
            key: 'your key',
            talk: 'I am a AI.',
            randomPost: false,
            tips: 'AI is not perfect, please use it with caution.'
        }, katex: {
            enable: false, per_page: false, copytex: false,
        }, comment: {
            enable: false,
            type: 'twikoo',
            commentBarrage: false,
            newComment: false,
            randomInfoStart: [`baby's`, `little`, `my`,],
            randomInfoEnd: [`home`, `world`, `heart`,],
            twikoo: {
                envId: 'your envId', lang: 'zh-CN', accessToken: null,
            },
            waline: {
                envId: 'your envId', pageview: true, option: null,
            },
            verify_site: [],
            css_prefix: false,
            extends: {
                head: [], body: [],
            },
            pwa: {
                enable: false,
                manifest: '/manifest.json',
                theme_color: "#006a73",
                mask_icon: '/img/logo.png',
                apple_touch_icon: '/img/logo.png',
                bookmark_icon: '/img/logo.png',
                favicon_32_32: '/img/logo.png',
                favicon_16_16: '/img/logo.png'
            },
            google_adsense: {
                enable: false,
                auto_ads: false,
                enable_page_level_ads: true,
                js: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
                client: '',
                slot: '',
            },
            CDN: {
                internal: 'local',
                third_party: 'cdnjs',
                version: true,
                custom_format: 'https://cdn.staticfile.net/${cdnjs_name}/${version}/${min_cdnjs_file}',
                option: {
                    solitude_css: 'https://cdn2.codesign.qq.com/icons/7pOrz0WXB5ZWJPX/latest/iconfont.css',
                }
            }
        }
    }
    hexo.theme.config = Object.assign(defaultConfig, hexo.theme.config)
}, 1)