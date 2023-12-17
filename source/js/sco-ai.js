var ScoAI = {
    root: "https://summary.tianli0.top",
    scoGPTIsRunning: false,
    aiTalkMode: false,
    aiPostExplanation: "",

    init() {
        this.config = GLOBAL_CONFIG.ai;
        this.generate();
        this.AIEngine();
    },

    getTitleAndContent() {
        const title = document.title;
        const articleContainer = document.getElementById("article-container");
        const paragraphs = articleContainer.getElementsByTagName("p");
        const headings = articleContainer.querySelectorAll("h1, h2, h3, h4, h5");

        let content = "";
        for (let heading of headings) {
            content += heading.innerText + " ";
        }
        for (let paragraph of paragraphs) {
            content += paragraph.innerText.replace(/https?:\/\/[^\s]+/g, "");
        }

        return (title + " " + content).slice(0, 1000);
    },

    generate() {
        this.aiShowAnimation(this.fetch(this.getTitleAndContent(), this.config.key));
    },

    async fetch(content, key) {
        const url = `${this.root}/?content=${encodeURIComponent(content)}&key=${encodeURIComponent(key)}&url=${encodeURIComponent(window.location.href)}`;
        try {
            const abortController = new AbortController();
            const response = await fetch(url, {signal: abortController.signal});
            if (response.ok) {
                const data = await response.json();
                this.aiPostExplanation = data.summary;
                return data.summary;
            }
            throw Error("Request failed");
        } catch (error) {
            if (error.name === "AbortError") {
                console.error("Request timed out");
            } else {
                console.error("Request failed:", error);
            }
            return "获取文章摘要超时。当你出现这个问题时，可能是因为文章过长导致的AI运算量过大， 您可以稍等一下然后重新尝试。";
        }
    },

    aiShowAnimation(promise, createSuggestions = false) {
        const explanationElement = document.querySelector(".ai-explanation");
        const aiTagElement = document.querySelector(".ai-tag");

        if (!explanationElement || this.scoGPTIsRunning) {
            return;
        }
        this.scoGPTIsRunning = true;
        this.cleanSuggestions();
        aiTagElement.classList.add("loadingAI");
        explanationElement.style.display = "block";
        explanationElement.innerHTML = '生成中...<span class="blinking-cursor"></span>';

        let startTime, animationFrameCallback, isIntersecting = true, index = 0, isFirstRun = true;
        const observer = new IntersectionObserver((entries) => {
            isIntersecting = entries[0].isIntersecting;
            if (isIntersecting) {
                requestAnimationFrame(animationFrameCallback);
            }
        }, {threshold: 0});

        promise.then((text) => {
            startTime = performance.now();
            animationFrameCallback = () => {
                if (index < text.length && isIntersecting) {
                    const currentTime = performance.now();
                    const deltaTime = currentTime - startTime;
                    const currentChar = text.slice(index, index + 1);
                    const isPunctuation = /[，。！、？,.!?]/.test(currentChar);
                    const isAlphanumeric = /[a-zA-Z0-9]/.test(currentChar);
                    const delay = isPunctuation ? 100 * Math.random() + 100 : isAlphanumeric ? 10 : 25;

                    if (deltaTime >= delay) {
                        explanationElement.innerText = text.slice(0, index + 1);
                        startTime = currentTime;
                        index++;

                        if (index < text.length) {
                            explanationElement.innerHTML = text.slice(0, index) + '<span class="blinking-cursor"></span>';
                        } else {
                            explanationElement.innerHTML = text;
                            explanationElement.style.display = "block";
                            this.scoGPTIsRunning = false;
                            aiTagElement.classList.remove("loadingAI");
                            observer.disconnect();

                            if (createSuggestions) {
                                this.createSuggestions();
                            }
                        }
                    }

                    if (isIntersecting) {
                        requestAnimationFrame(animationFrameCallback);
                    }
                }
            };

            if (isIntersecting && isFirstRun) {
                setTimeout(() => {
                    requestAnimationFrame(animationFrameCallback);
                    isFirstRun = false;
                }, 3000);
            }

            observer.observe(explanationElement);
        }).catch((error) => {
            console.error("检索信息失败：", error);
            explanationElement.innerHTML = "检索信息失败";
            explanationElement.style.display = "block";
            this.scoGPTIsRunning = false;
            aiTagElement.classList.remove("loadingAI");
            observer.disconnect();
        });
    },

    AIEngine() {
        const aiTagElement = document.querySelector(".ai-tag");
        if (aiTagElement) {
            aiTagElement.addEventListener("click", () => {
                if (!this.scoGPTIsRunning) {
                    this.aiTalkMode = true;
                    this.aiShowAnimation(Promise.resolve(this.config.talk), true);
                }
            });
        }
    },

    cleanSuggestions() {
        const suggestionsElement = document.querySelector(".ai-suggestions");
        if (suggestionsElement) {
            suggestionsElement.innerHTML = "";
        } else {
            console.error("没有这个元素：'ai-suggestions'");
        }
    },

    createSuggestions() {
        this.aiTalkMode && this.cleanSuggestions()
        this.createSuggestionItemWithAction("这篇文章讲了什么？", (() => {
            this.aiShowAnimation(Promise.resolve(this.aiPostExplanation), !0)
        }))
        this.config.randomPost && this.createSuggestionItemWithAction("带我去看看其他文章", (() => toRandomPost()))
        this.aiTalkMode = !0
    },

    createSuggestionItemWithAction(text, action) {
        const container = document.querySelector(".ai-suggestions");
        if (!container) {
            console.error("无法找到具有class为ai-suggestions的元素");
            return;
        }
        const item = document.createElement("div");
        item.classList.add("ai-suggestions-item");
        item.textContent = text;
        item.addEventListener("click", action);
        container.appendChild(item);
    }
}
console.log("%c🔥 程序：ScoAI | Solitude 主题内置 ｜ 主题地址: https://github.com/DuoSco/Hexo-theme-solitude 🤖️", "color:#fff; background: linear-gradient(270deg, #18d7d3, #68b7dd, #8695e6, #986fee); padding: 8px 15px; border-radius: 8px");