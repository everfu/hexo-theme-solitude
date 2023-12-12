var vh = window.innerHeight * 1;
var volume = 0.8;
var scoMusic = {
    // 获取地址栏参数
    // 创建URLSearchParams对象并传入URL中的查询字符串
    params: new URLSearchParams(window.location.search),
    extractValue: function (input) {
        var valueRegex = /\("([^\s]+)"\)/g;
        var match = valueRegex.exec(input);
        return match[1];
    },
    changeMusicBg: function (isChangeBg = true) {
        const MusicBg = document.getElementById("Music-bg")
        const MusicLoading = document.getElementsByClassName("Music-loading")

        if (isChangeBg) {
            const musiccover = document.querySelector("#Music-page .aplayer-pic");
            var img = new Image();
            img.src = scoMusic.extractValue(musiccover.style.backgroundImage);
            img.onload = function () {
                MusicBg.style.backgroundImage = musiccover.style.backgroundImage;
            };
        } else {
            let timer = setInterval(() => {
                const musiccover = document.querySelector("#Music-page .aplayer-pic");
                // 确保player加载完成
                if (musiccover) {
                    MusicLoading[0].style.display = "none";
                    clearInterval(timer)
                    document.querySelector('meting-js')
                        .aplayer.volume(0.8, true);

                    scoMusic.addEventListenerChangeMusicBg();
                    MusicBg.style.display = "block";
                }
            }, 100)
        }
    },
    lrcupdate: function () {
        var aplayerLrcContents = document.querySelector('.aplayer-lrc-contents');
        var currentLrc = aplayerLrcContents.querySelector('p.aplayer-lrc-current');

        if (currentLrc) {
            var currentIndex = Array.from(aplayerLrcContents.children)
                .indexOf(currentLrc);
            var translateYValue = -currentIndex * 80;

            aplayerLrcContents.style.transform = 'translateY(' + translateYValue + 'px)';
        }
    },
    buttonlist: function () {
        document.querySelector(".aplayer-lrc")
            .addEventListener("click", function () {
                const aplayerList = document.querySelector(".aplayer-list");

                if (aplayerList.classList.contains("aplayer-list-hide")) {
                    aplayerList.classList.remove("aplayer-list-hide");
                } else {
                    aplayerList.classList.add("aplayer-list-hide");
                }
            });
    },
    addEventListenerChangeMusicBg: function () {
        const MusicPage = document.getElementById("Music-page");

        MusicPage.querySelector("meting-js")
            .aplayer.on('loadeddata', function () {
            scoMusic.changeMusicBg();
        });
        MusicPage.querySelector("meting-js")
            .aplayer.on('timeupdate', function () {
            scoMusic.lrcupdate();
        });
        scoMusic.buttonlist();
    },
    getCustomPlayList: function () {
        const MusicPage = document.getElementById("Music-page");
        const playlistType = scoMusic.params.get("type") || "playlist";

        if (scoMusic.params.get("id") && params.get("server")) {
            var id = scoMusic.params.get("id")
            var server = scoMusic.params.get("server")
            MusicPage.innerHTML = `<meting-js id="${id}" server="${server}" type="${playlistType}" preload="auto" order="random"></meting-js>`;
        } else {
            MusicPage.innerHTML = `<meting-js id="${userId}" server="${userServer}" type="${userType}" preload="auto" order="random"></meting-js>`;
        }
        scoMusic.changeMusicBg(false);
    },

    init: function () {
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        // 初始化
        this.getCustomPlayList();

        //热键控制音乐
        document.addEventListener("keydown", function (event) {
            const aplayer = document.querySelector('meting-js').aplayer
            if (event.code === "Space") {
                event.preventDefault();
                aplayer.toggle();
            }
            if (event.keyCode === 39) {
                event.preventDefault();
                document.querySelector('meting-js')
                aplayer.skipForward();
            }
            if (event.keyCode === 37) {
                event.preventDefault();
                document.querySelector('meting-js')
                aplayer.skipBack();
            }
            if (event.keyCode === 38) {
                if (volume <= 1) {
                    volume += 0.1;
                    document.querySelector('meting-js')
                    aplayer.volume(volume, true);
                }
            }
            if (event.keyCode === 40) {
                if (volume >= 0) {
                    volume += -0.1;
                    document.querySelector('meting-js')
                    aplayer.volume(volume, true);
                }
            }
        });
    }
}

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 1;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});