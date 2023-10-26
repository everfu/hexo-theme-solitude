var commentBarrageConfig = {
    maxBarrage: 1,
    barrageTime: 8e3,
    twikooUrl: "https://twikoo.sondy.top",
    pageUrl: window.location.pathname,
    barrageTimer: [],
    barrageList: [],
    barrageIndex: 0,
    dom: document.querySelector(".comment-barrage")
}
    , commentInterval = null
    , hoverOnCommentBarrage = !1
    , isFirstTime = !0;
document.querySelector(".comment-barrage").addEventListener("mouseenter", (function () {
        hoverOnCommentBarrage = !0
    }
)),
    document.querySelector(".comment-barrage").addEventListener("mouseleave", (function () {
            hoverOnCommentBarrage = !1
        }
    ));
var fetchComments = async function () {
    try {
        var e = await fetch(commentBarrageConfig.twikooUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                event: "COMMENT_GET",
                accessToken: commentBarrageConfig.accessToken,
                url: commentBarrageConfig.pageUrl
            })
        });
        if (!e.ok)
            throw new Error("HTTP error! status: " + e.status);
        return (await e.json()).data
    } catch (e) {
        console.error("An error occurred while fetching comments: ", e)
    }
}
    , initCommentBarrage = function () {
    "false" !== localStorage.getItem("commentBarrageSwitch") ? (commentBarrageConfig.dom.style.display = "none",
        document.querySelector(".menu-commentBarrage-text").textContent = "显示热评",
        document.querySelector("#consoleCommentBarrage").classList.remove("on")) : (commentBarrageConfig.dom.style.display = "flex",
        document.querySelector(".menu-commentBarrage-text").textContent = "关闭热评",
        document.querySelector("#consoleCommentBarrage").classList.add("on")),
        fetchComments().then((function (e) {
                commentBarrageConfig.barrageList = commentLinkFilter(e),
                    commentBarrageConfig.dom.innerHTML = "",
                    clearInterval(commentInterval),
                    commentInterval = null;
                var r = function () {
                    if (commentBarrageConfig.barrageList.length && !hoverOnCommentBarrage) {
                        if (!popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]))
                            return commentBarrageConfig.barrageIndex += 1,
                                commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length,
                                r();
                        commentBarrageConfig.barrageIndex += 1,
                            commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length
                    }
                    commentBarrageConfig.barrageTimer.length > (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage ? commentBarrageConfig.maxBarrage : commentBarrageConfig.barrageList.length) && !hoverOnCommentBarrage && removeCommentBarrage(commentBarrageConfig.barrageTimer.shift())
                };
                setTimeout((function () {
                        r(),
                            commentInterval = setInterval(r, commentBarrageConfig.barrageTime)
                    }
                ), 3e3)
            }
        ))
};

function commentLinkFilter(e) {
    e.sort((function (e, r) {
            return e.created - r.created
        }
    ));
    var r = [];
    return e.forEach((function (e) {
            r.push(...getCommentReplies(e))
        }
    )),
        r
}

function getCommentReplies(e) {
    if (e.replies) {
        var r = [e];
        return e.replies.forEach((function (e) {
                r.push(...getCommentReplies(e))
            }
        )),
            r
    }
    return []
}

function processCommentContent(e) {
    var r = document.createElement("div");
    r.innerHTML = e;
    for (var a = r.getElementsByTagName("img"), n = a.length - 1; n >= 0; n--) {
        var t = a[n];
        t.parentNode.removeChild(t)
    }
    var o = r.getElementsByTagName("blockquote");
    for (n = o.length - 1; n >= 0; n--) {
        var m = o[n];
        m.parentNode.removeChild(m)
    }
    var c = r.getElementsByTagName("a");
    for (n = c.length - 1; n >= 0; n--) {
        var i = c[n]
            , g = document.createTextNode(i.textContent);
        i.parentNode.replaceChild(g, i)
    }
    var s = r.getElementsByTagName("p");
    for (n = s.length - 1; n >= 0; n--) {
        var l = s[n];
        "" === l.textContent.trim() && l.parentNode.removeChild(l)
    }
    return r.innerHTML
}

function popCommentBarrage(e) {
    var r = processCommentContent(e.comment);
    if (!r.trim())
        return !1;
    var a = document.createElement("div");
    return a.className = "comment-barrage-item",
        a.innerHTML = `\n        <div class="barrageHead">\n            <a class="barrageTitle" href="javascript:sco.scrollTo('post-comment')">热评</a>\n            <div class="barrageNick">${e.nick}</div>\n            <img class="barrageAvatar" src="https://cravatar.cn/avatar/${e.mailMd5}"/>\n            <a class="comment-barrage-close" href="javascript:sco.switchCommentBarrage();"><i class="scofont icon-close-fill"></i></a>\n        </div>\n        <a class="barrageContent" href="javascript:sco.scrollTo('${e.id}');">${r}</a>\n    `,
        commentBarrageConfig.barrageTimer.push(a),
        commentBarrageConfig.dom.appendChild(a),
        !0
}

function removeCommentBarrage(e) {
    e.className = "comment-barrage-item out",
        setTimeout((function () {
                commentBarrageConfig.dom.removeChild(e)
            }
        ), 1e3)
}

initCommentBarrage(),
    document.addEventListener("pjax:send", (function () {
            clearInterval(commentInterval)
        }
    ));