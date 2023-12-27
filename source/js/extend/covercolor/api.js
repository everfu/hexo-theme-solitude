function coverColor() {
    var path = document.getElementById("post-cover")?.src;
    
    if (path !== undefined) {
        const cacheGroup = JSON.parse(localStorage.getItem('CACHE_POST_COVER')) || {};

        if (cacheGroup[path] && cacheGroup[path].expiration >= Date.now()) {
            const color = cacheGroup[path].color;
            const [r, g, b] = color.match(/\w\w/g).map(x => parseInt(x, 16));
            setThemeColors(color,r,g,b);
        } else {
            img2color(path);
        }
    } else {
        setThemeColors();
    }
}

function img2color(src) {
    const apiUrl = GLOBAL_CONFIG.covercolor.api + encodeURIComponent(src);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const color = data.RGB;
            const [r, g, b] = color.match(/\w\w/g).map(x => parseInt(x, 16));
            setThemeColors(color,r,g,b);

            const expirationTime = Date.now() + GLOBAL_CONFIG.covercolor.time;
            const cacheGroup = JSON.parse(localStorage.getItem('CACHE_POST_COVER')) || {};
            cacheGroup[src] = { color, expiration: expirationTime };
            localStorage.setItem('CACHE_POST_COVER', JSON.stringify(cacheGroup));
        })
        .catch(error => {
            console.error('请检查是否为本地图片，或者检测API是否正常！\n' + error);
        });
}

function setThemeColors(value, r = null, g = null, b = null) {
    if (value) {
        document.documentElement.style.setProperty('--sco-main', value);
        document.documentElement.style.setProperty('--sco-main-op', value + '23');
        document.documentElement.style.setProperty('--sco-main-op-deep', value + 'dd');
        document.documentElement.style.setProperty('--sco-main-none', value + '00');

        if (r && g && b) {
            var brightness = Math.round(((parseInt(r) * 299) + (parseInt(g) * 587) + (parseInt(b) * 114)) / 1000);
            if (brightness < 125) {
                var cardContents = document.getElementsByClassName('card-content');
                for (var i = 0; i < cardContents.length; i++) {
                    cardContents[i].style.setProperty('--sco-card-bg', 'var(--sco-white)');
                }

                var authorInfo = document.getElementsByClassName('author-info__sayhi');
                for (var i = 0; i < authorInfo.length; i++) {
                    authorInfo[i].style.setProperty('background', 'var(--sco-white-op)');
                    authorInfo[i].style.setProperty('color', 'var(--sco-white)');
                }
            }
        }

        document.getElementById("coverdiv").classList.add("loaded");
        initThemeColor();
    } else {
        document.documentElement.style.setProperty('--sco-main', 'var(--sco-theme)');
        document.documentElement.style.setProperty('--sco-main-op', 'var(--sco-theme-op)');
        document.documentElement.style.setProperty('--sco-main-op-deep', 'var(--sco-theme-op-deep)');
        document.documentElement.style.setProperty('--sco-main-none', 'var(--sco-theme-none)');
        initThemeColor();
    }
}

function initThemeColor() {
    const currentTop = window.scrollY || document.documentElement.scrollTop;
    let themeColor;
    if (currentTop > 0) {
        themeColor = getComputedStyle(document.documentElement).getPropertyValue('--sco-card-bg');
    } else if (PAGE_CONFIG.is_post) {
        themeColor = getComputedStyle(document.documentElement).getPropertyValue('--sco-main');
    } else {
        themeColor = getComputedStyle(document.documentElement).getPropertyValue('--sco-background');
    }
    changeThemeColor(themeColor);
}

function changeThemeColor(color) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
        meta.setAttribute('content', color);
    }
}