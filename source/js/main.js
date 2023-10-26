function set_fest() {
    let date = new Date();
    switch ((date.getMonth() + 1).toString() + '.' + date.getDate()){
        case '1.8': // 周总理逝世
        case '9.9': // 毛主席逝世
        case '7.7': // 七七事变
        case '9.18': // 九一八事变
        case '12.13': // 南京大屠杀国家公祭日
             {
            // 创建一个<style>元素
            const styleElement = document.createElement('style');
            // 定义要添加的CSS样式
            const css = `
              html {
                -webkit-filter: grayscale(100%);
                -moz-filter: grayscale(100%);
                -ms-filter: grayscale(100%);
                -o-filter: grayscale(100%);
                filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
                _filter: none;
              }
            `;
            // 将CSS样式添加到<style>元素中
            styleElement.appendChild(document.createTextNode(css));
            // 将<style>元素添加到<head>标签中
            document.head.appendChild(styleElement);
        }break;
    }
}

function setFixed(el) {
    if (!el) return
    const currentTop = window.scrollY || document.documentElement.scrollTop
    if (currentTop > 0) {
        el.classList.add('nav-fixed')
    } else {
        el.classList.remove('nav-fixed')
    }
}

function getTimeState() {
    var e = (new Date).getHours()
        , t = "";
    e >= 0 && e <= 5 ? t = "睡个好觉，保证精力充沛" : e > 5 && e <= 10 ? t = "一日之计在于晨" : e > 10 && e <= 14 ? t = "吃饱了才有力气干活" : e > 14 && e <= 18 ? t = "集中精力，攻克难关" : e > 18 && e <= 24 && (t = "不要太劳累了，早睡更健康")
    return t;
}

const scrollFn = function () {
    const innerHeight = window.innerHeight + 0
    const $header = document.getElementById('page-header')
    setFixed($header)
    if (document.body.scrollHeight <= innerHeight) {
        return
    }
    let initTop = 0
    window.addEventListener('scroll', utils.throttle(function (e) {
        const currentTop = window.scrollY || document.documentElement.scrollTop
        const isDown = scrollDirection(currentTop)
        if (currentTop > 0) {
            if (isDown) {
                if ($header.classList.contains('nav-visible')) $header.classList.remove(
                    'nav-visible')
            } else {
                if (!$header.classList.contains('nav-visible')) $header.classList.add(
                    'nav-visible')
            }
            $header.classList.add('nav-fixed')
        } else {
            if (currentTop === 0) {
                $header.classList.remove('nav-fixed', 'nav-visible')
            }
        }
        percent()
    }, 200))

    function scrollDirection(currentTop) {
        const result = currentTop > initTop
        initTop = currentTop
        return result
    }
}

/**
 * 滾動處理
 */

const sidebarFn = () => {
    const $toggleMenu = document.getElementById('toggle-menu')
    const $mobileSidebarMenus = document.getElementById('sidebar-menus')
    const $menuMask = document.getElementById('menu-mask')
    const $cookies_window = document.getElementById('cookies-window')
    const $header = document.getElementById('page-header')
    const $body = document.body

    if (!$toggleMenu) return

    let initTop = 0
    const isChatBtnHide = typeof chatBtnHide === 'function'
    const isChatBtnShow = typeof chatBtnShow === 'function'

    function openMobileSidebar() {
        utils.sidebarPaddingR()
        $body.style.overflow = 'hidden'
        utils.fadeIn($menuMask, 0.5)
        $mobileSidebarMenus.classList.add('open')
    }

    function closeMobileSidebar() {
        $body.style.overflow = ''
        $body.style.paddingRight = ''
        utils.fadeOut($menuMask, 0.5)
        $mobileSidebarMenus.classList.remove('open')
    }

    $toggleMenu.addEventListener('click', openMobileSidebar)

    $menuMask.addEventListener('click', e => {
        if ($mobileSidebarMenus.classList.contains('open')) {
            closeMobileSidebar()
        }
    })

    window.addEventListener('resize', e => {
        if ($mobileSidebarMenus.classList.contains('open')) closeMobileSidebar()
    })
    window.addEventListener('scroll', e => {
        const currentTop = window.scrollY || document.documentElement.scrollTop
        const isDown = scrollDirection(currentTop)
        if (currentTop > 0) {
            if (isDown) {
                if ($header.classList.contains('nav-visible')) $header.classList.remove('nav-visible')
                if (isChatBtnShow && isChatShow === true) {
                    chatBtnHide()
                    isChatShow = false
                }
            } else {
                if (!$header.classList.contains('nav-visible')) $header.classList.add('nav-visible')
                if (isChatBtnHide && isChatShow === false) {
                    chatBtnShow()
                    isChatShow = true
                }
            }
            $header.classList.add('nav-fixed')
            $cookies_window.classList.add('cw-hide')
        } else {
            if (currentTop === 0) {
                $header.classList.remove('nav-fixed', 'nav-visible')
            }
        }
    }, 200)

    // find the scroll direction
    function scrollDirection(currentTop) {
        const result = currentTop > initTop // true is down & false is up
        initTop = currentTop
        return result
    }
}

const showTodayCard = () => {
    const el = document.getElementById('todayCard')
    if (el) {
        document.getElementsByClassName('topGroup')[0].addEventListener('mouseleave', () => {
            if (el.classList.contains('hide')) {
                el.classList.remove('hide')
            }
        })
    }
}

const setTimeState = () => {
    const el = document.getElementById('author-info__sayhi')
    if (el) {
        const timeNow = new Date(), hours = timeNow.getHours(), lang = GLOBALCONFIG.lang.sayhello;
        let text = '';
        if (hours >= 0 && hours <= 5) {
            text = lang.goodnight;
        } else if (hours > 5 && hours <= 10) {
            text = lang.morning;
        } else if (hours > 10 && hours <= 14) {
            text = lang.noon;
        } else if (hours > 14 && hours <= 18) {
            text = lang.afternoon;
        } else if (hours > 18 && hours <= 24) {
            text = lang.night;
        }
        el.innerText = text + lang.iam;
    }
};

const chageTimeFormate = () => {
    const timeElements = document.getElementsByTagName("time"), lang = GLOBALCONFIG.lang.time
    for (var i = 0; i < timeElements.length; i++) {
        const datetime = timeElements[i].getAttribute("datetime"), timeObj = new Date(datetime),
            daysDiff = utils.timeDiff(timeObj, new Date())
        var timeString;
        if (daysDiff === 0) {
            timeString = lang.recent;
        } else if (daysDiff === 1) {
            timeString = lang.yesterday;
        } else if (daysDiff === 2) {
            timeString = lang.berforeyesterday;
        } else if (daysDiff <= 7) {
            timeString = daysDiff + lang.daybefore;
        } else {
            if (timeObj.getFullYear() !== new Date().getFullYear()) {
                timeString = timeObj.getFullYear() + "/" + (timeObj.getMonth() + 1) + "/" + timeObj.getDate();
            } else {
                timeString = (timeObj.getMonth() + 1) + "/" + timeObj.getDate();
            }
        }
        timeElements[i].textContent = timeString;
    }
}

/*
 * 文章页右下角下一篇
 */
const initObserver = () => {
    let e = document.getElementById("post-comment");
    let t = document.getElementById("pagination");

    function handleIntersection(entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                t.classList.add("show-window");
                document.querySelector(".comment-barrage").style.bottom = "-200px";
            } else {
                t.classList.remove("show-window");
                document.querySelector(".comment-barrage").style.bottom = "0px";
            }
        });
    }

    if (e && t) {
        let observer = new IntersectionObserver(handleIntersection);
        observer.observe(e);
    }
}

const percent = () => {
    let a = document.documentElement.scrollTop || window.pageYOffset,
        b = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight, // 整个网页高度
        result = Math.round(a / b * 100),
        btn = document.querySelector("#percent");
    const visibleBottom = window.scrollY + document.documentElement.clientHeight;
    const eventlistner = document.getElementById('post-tools') || document.getElementById('footer');
    const centerY = eventlistner.offsetTop + (eventlistner.offsetHeight / 2);
    if ((centerY > visibleBottom) || (result > 90)) {
        document.querySelector("#nav-totop").classList.add("long");
        btn.innerHTML = GLOBALCONFIG.lang.backtop;
        document.querySelectorAll(".needEndHide").forEach(item => {
            item.classList.add("hide")
        })
    } else {
        document.querySelector("#nav-totop").classList.remove("long");
        if (result >= 0) {
            btn.innerHTML = result;
            document.querySelectorAll(".needEndHide").forEach(item => {
                item.classList.remove("hide")
            })
        }
    }
}

class toc {
    static init() {
        const tocContainer = document.getElementById('card-toc')
        if (!tocContainer || !tocContainer.querySelector('.toc a')) {
            tocContainer.style.display = 'none'
            return
        }
        const el = document.querySelectorAll('.toc a')
        el.forEach((e) => {
            e.addEventListener('click', (event) => {
                event.preventDefault()
                utils.scrollToDest(utils.getEleTop(document.getElementById(decodeURI((event.target.className === 'toc-text' ? event.target.parentNode.hash : event.target.hash).replace('#', '')))), 300)
            })
        })
        this.active(el)
    }

    static active(toc) {
        const $article = document.getElementById('article-container')
        const $tocContent = document.getElementById('toc-content')
        const list = $article.querySelectorAll('h1,h2,h3,h4,h5,h6')
        let detectItem = ''

        function autoScroll(el) {
            const activePosition = el.getBoundingClientRect().top
            const sidebarScrollTop = $tocContent.scrollTop
            if (activePosition > (document.documentElement.clientHeight - 100)) {
                $tocContent.scrollTop = sidebarScrollTop + 150
            }
            if (activePosition < 100) {
                $tocContent.scrollTop = sidebarScrollTop - 150
            }
        }

        function findHeadPosition(top) {
            if (top === 0) {
                return false
            }

            let currentIndex = ''

            list.forEach(function (ele, index) {
                if (top > utils.getEleTop(ele) - 80) {
                    currentIndex = index
                }
            })

            if (detectItem === currentIndex) return
            detectItem = currentIndex
            document.querySelectorAll('.toc .active').forEach((i) => {
                i.classList.remove('active')
            })
            const activeitem = toc[detectItem]
            if (activeitem) {
                let parent = toc[detectItem].parentNode
                activeitem.classList.add('active')
                autoScroll(activeitem)
                for (; !parent.matches('.toc'); parent = parent.parentNode) {
                    if (parent.matches('li')) parent.classList.add('active')
                }
            }
        }

        window.tocScrollFn = utils.throttle(function () {
            const currentTop = window.scrollY || document.documentElement.scrollTop
            findHeadPosition(currentTop)
        }, 100)

        window.addEventListener('scroll', tocScrollFn)
    }
}

let lastSayHello = "";

class sco {
    /*
     * 隐藏协议提醒助手
     */
    static hideCookie() {
        setTimeout(() => {
            const cookiesWindow = document.getElementById("cookies-window");
            if (cookiesWindow) {
                cookiesWindow.classList.add("cw-hide");
                setTimeout(() => {
                    cookiesWindow.style.display = "none";
                }, 1000);
            }
        }, 3000);
    }

    static scrollTo(e) {
        const t = document.getElementById(e);
        if (t) {
            const e = t.getBoundingClientRect().top + window.pageYOffset - 80
                , o = window.pageYOffset
                , n = e - o;
            let a = null;
            window.requestAnimationFrame((function e(t) {
                    a || (a = t);
                    const l = t - a
                        , i = (c = Math.min(l / 0, 1)) < .5 ? 2 * c * c : (4 - 2 * c) * c - 1;
                    var c;
                    window.scrollTo(0, o + n * i),
                    l < 600 && window.requestAnimationFrame(e)
                }
            ))
        }
    }

    static switchCommentBarrage() {
        var commentBarrageElement = document.querySelector(".comment-barrage");
        if (commentBarrageElement) {
            if (window.getComputedStyle(commentBarrageElement).display === "flex") {
                commentBarrageElement.style.display = "none";
                document.querySelector(".menu-commentBarrage-text").textContent = "显示热评";
                document.querySelector("#consoleCommentBarrage").classList.remove("on");
                localStorage.removeItem("commentBarrageSwitch");
            } else {
                commentBarrageElement.style.display = "flex";
                document.querySelector(".menu-commentBarrage-text").textContent = "关闭热评";
                document.querySelector("#consoleCommentBarrage").classList.add("on");
                localStorage.setItem("commentBarrageSwitch", "false");
            }
        }
    }

    static sayhi() {
        document.querySelector("#author-info__sayhi") && (document.getElementById("author-info__sayhi").innerHTML = getTimeState())
    }

    static changeSayHelloText() {
        const e = ["🤖️ 数码科技爱好者", "🔍 分享与热心帮助", "🏠 智能家居小能手", "🔨 设计开发一条龙", "🤝 专修交互与设计", "🏃 脚踏实地行动派", "🧱 团队小组发动机", "💢 壮汉人狠话不多"]
            , t = document.getElementById("author-info__sayhi");
        let o = e[Math.floor(Math.random() * e.length)];
        for (; o === lastSayHello;)
            o = e[Math.floor(Math.random() * e.length)];
        t.textContent = o,
            lastSayHello = o
    }

    static switchDarkMode() {
        const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' :
            'light'
        if (nowMode === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark')
            localStorage.setItem('theme', 'dark')
            utils.snackbarShow(GLOBALCONFIG.lang.theme.dark, false, 2000)
        } else {
            document.documentElement.setAttribute('data-theme', 'light')
            localStorage.setItem('theme', 'light')
            utils.snackbarShow(GLOBALCONFIG.lang.theme.light, false, 2000)
        }
    }

    static hideTodayCard() {
        document.getElementById('todayCard').classList.add('hide')
    }

    static toTop() {
        utils.scrollToDest(0)
    }

    static showConsole() {
        const el = document.getElementById('console')
        if (!el.classList.contains('show')) {
            el.classList.add('show')
        }
    }

    static hideConsole() {
        const el = document.getElementById('console')
        if (el.classList.contains('show')) {
            el.classList.remove('show')
        }
    }

    static copyPageUrl() {
        utils.copy(window.location.href)
    }

    static lightbox(el) {
        window.ViewImage && window.ViewImage.init("#article-container img:not(.flink-avatar), .bber-content-img img, #album_detail img, #equipment img, #twikoo .tk-content img:not(.tk-owo-emotion)");
    }

    static initTheme() {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const cachedMode = localStorage.getItem('theme');
        const isLightMode = !isDarkMode;

        const nowMode =
            cachedMode && (cachedMode === 'dark' || cachedMode === 'light')
                ? cachedMode === 'dark' && isLightMode ? 'light'
                    : cachedMode === 'light' && isDarkMode ? 'dark'
                        : cachedMode
                : isDarkMode ? 'dark'
                    : 'light';

        document.documentElement.setAttribute('data-theme', nowMode);
        localStorage.setItem('theme', nowMode);
    }

    static reflashEssayWaterFall() {
        if (document.getElementById('waterfall')) {
            setTimeout(function () {
                waterfall('#waterfall');
                document.getElementById("waterfall").classList.add('show');
            }, 500);
        }
    }

    static addRuntime() {
        const el = document.getElementById('runtimeshow')
        if (el && GLOBALCONFIG.runtime) {
            el.innerText = utils.timeDiff(new Date(GLOBALCONFIG.runtime), new Date()) + GLOBALCONFIG.lang.time.runtime
        }
    }

    static lazyloadImg() {
        window.lazyLoadInstance = new LazyLoad({
            elements_selector: 'img',
            threshold: 0,
            data_src: 'lazy-src',
            callback_error: (img) => {
                img.setAttribute("src", GLOBALCONFIG.lazyload.error);
            }
        })
    }

    static toTalk(txt) {
        const input = document.querySelector('.el-textarea__inner');
        const evt = new Event('input', {bubbles: true, cancelable: true});
        const inputValue = txt.replace(/\n/g, '\n> ');
        input.value = '> ' + inputValue + '\n\n';
        input.dispatchEvent(evt);
        utils.scrollToDest(utils.getEleTop(document.getElementById('post-comment')), 300)
        input.focus();
        input.setSelectionRange(-1, -1);
        const commentTips = document.querySelector("#comment-tips");
        if (commentTips) {
            commentTips.classList.add("show");
        }
    }

    static initbbtalk() {
        if (document.querySelector('#bber-talk')) {
            var swiper = new Swiper('.swiper-container', {
                direction: 'vertical',
                loop: true,
                autoplay: {
                    delay: 3000,
                    pauseOnMouseEnter: true
                },
            });
        }
    }

    static addPhotoFigcaption() {
        const images = document.querySelectorAll('#article-container img');
        images.forEach((image) => {
            const imageParent = image.parentNode;
            const captionText = image.getAttribute('alt');

            if (captionText) {
                const captionElement = document.createElement('div');
                captionElement.className = 'img-alt is-center';
                captionElement.textContent = captionText;

                imageParent.insertBefore(captionElement, image.nextSibling);
            }
        });
    }

    static musicToggle() {
        const $music = document.querySelector('#nav-music'),
            $meting = document.querySelector('meting-js'),
            $console = document.getElementById('consoleMusic')
        if (wleelw_musicPlaying) {
            $music.classList.remove("playing")
            $console.classList.remove("on")
            wleelw_musicPlaying = false;
            $meting.aplayer.pause();
        } else {
            $music.classList.add("playing")
            $console.classList.add("on")
            wleelw_musicPlaying = true;
            $meting.aplayer.play();
        }
    }

    static scrollToComment() {
        utils.scrollToDest(utils.getEleTop(document.getElementById('post-comment')), 300)
    }
}

class hightlight {
    static createEle(langEl, item) {
        const fragment = document.createDocumentFragment()
        const highlightCopyEle = '<i class="ri-file-copy-fill"></i>'
        const highlightExpandEle = '<i class="ri-arrow-down-s-line expand" style="font-size: 16px"></i>'

        const hlTools = document.createElement('div')
        hlTools.className = `highlight-tools`
        hlTools.innerHTML = highlightExpandEle + langEl + highlightCopyEle
        let expand = true
        hlTools.children[0].addEventListener('click', (e) => {
            if (expand) {
                hlTools.children[0].classList.add('closed')
                $table.setAttribute('style', 'display:none')
                if ($expand.length !== 0) {
                    $expand[0].setAttribute('style', 'display:none')
                }
            } else {
                hlTools.children[0].classList.remove('closed')
                $table.setAttribute('style', 'display:block')
                if ($expand.length !== 0) {
                    $expand[0].setAttribute('style', 'display:block')
                }
                if (itemHeight < 200) {
                    $table.setAttribute('style', 'height:' + itemHeight + "px")
                } else {
                    $table.setAttribute('style', 'height:200px')
                    ele.classList.remove("expand-done")
                }
            }
            expand = !expand
        })
        hlTools.children[2].addEventListener('click', (e) => {
            utils.copy($table.querySelector('.code').innerText)
        })
        const ele = document.createElement('div')
        fragment.appendChild(hlTools)
        const itemHeight = item.clientHeight, $table = item.querySelector('table'),
            $expand = item.getElementsByClassName('code-expand-btn')
        if (GLOBALCONFIG.hightlight.limit && itemHeight > GLOBALCONFIG.hightlight.limit + 30) {
            $table.setAttribute('style', `height: ${GLOBALCONFIG.hightlight.limit}px`)
            ele.className = 'code-expand-btn'
            ele.innerHTML = '<i class="ri-arrow-down-double-fill" style="font-size: 1.2rem"></i>'
            ele.addEventListener('click', (e) => {
                $table.setAttribute('style', `height: ${itemHeight}px`)
                e.target.className !== 'code-expand-btn' ? e.target.parentNode.classList.add('expand-done') : e.target.classList.add('expand-done')
            })
            fragment.appendChild(ele)
        }
        item.insertBefore(fragment, item.firstChild)
    }

    static init() {
        const $figureHighlight = document.querySelectorAll('figure.highlight'), that = this
        $figureHighlight.forEach(function (item) {
            let langName = item.getAttribute('class').split(' ')[1]
            if (langName === 'plaintext' || langName === undefined) langName = 'Code'
            const highlightLangEle = `<div class="code-lang">${langName.toUpperCase()}</div>`
            that.createEle(highlightLangEle, item)
        })
    }
}

class tabs {
    static init() {
        this.clickFnOfTabs()
        this.backToTop()
    }

    static clickFnOfTabs() {
        document.querySelectorAll('#article-container .tab > button').forEach(function (item) {
            item.addEventListener('click', function (e) {
                const that = this
                const $tabItem = that.parentNode
                if (!$tabItem.classList.contains('active')) {
                    const $tabContent = $tabItem.parentNode.nextElementSibling
                    const $siblings = utils.siblings($tabItem, '.active')[0]
                    $siblings && $siblings.classList.remove('active')
                    $tabItem.classList.add('active')
                    const tabId = that.getAttribute('data-href').replace('#', '')
                    const childList = [...$tabContent.children]
                    childList.forEach(item => {
                        if (item.id === tabId) item.classList.add('active')
                        else item.classList.remove('active')
                    })
                }
            })
        })
    }

    static backToTop() {
        document.querySelectorAll('#article-container .tabs .tab-to-top').forEach(function (item) {
            item.addEventListener('click', function () {
                utils.scrollToDest(utils.getEleTop(item.parentElement.parentElement.parentNode), 300)
            })
        })
    }
}


window.refreshFn = () => {
    scrollFn()
    sidebarFn()
    setTimeState()
    GLOBALCONFIG.comment.enable && newestCommentInit()
    chageTimeFormate()
    initObserver()
    sco.addRuntime()
    sco.hideCookie()
    sco.addPhotoFigcaption()
    sco.sayhi()
    GLOBALCONFIG.lazyload.enable && sco.lazyloadImg()
    GLOBALCONFIG.lightbox && sco.lightbox('')
    GLOBALCONFIG.randomlinks && randomLinksList()
    PAGECONFIG.toc && toc.init()
    if (PAGECONFIG.is_post || PAGECONFIG.is_page) {
        GLOBALCONFIG.hightlight.enable && hightlight.init()
        tabs.init()
    }
    PAGECONFIG.comment && initComment()
    if (PAGECONFIG.is_home) {
        showTodayCard()
        sco.initbbtalk()
    }
    if (PAGECONFIG.is_page && PAGECONFIG.page === 'says') sco.reflashEssayWaterFall()
    if (PAGECONFIG.is_page) {
        if (document.getElementById('album_detail')) sco.reflashEssayWaterFall()
    }
    GLOBALCONFIG.covercolor && coverColor();
    set_fest()
}

sco.initTheme()

let wleelw_musicPlaying = false
document.addEventListener('DOMContentLoaded', function () {
    window.refreshFn()
})

document.addEventListener('pjax:complete', () => {
    window.refreshFn()
})

window.onkeydown = function (e) {
    123 === e.keyCode && utils.snackbarShow("开发者模式已打开，请遵循GPL协议", !1, 3e3)
}
