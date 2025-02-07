class POST_AI {
  constructor() {
    this.aiTalkMode = false;
    this.aiPostExplanation = "";
    this.scoGPTIsRunning = false;
    this.aiPostExplanation = PAGE_CONFIG.ai_text || "";
  }

  init() {
    this.aiShowAnimation(this.aiPostExplanation);
    this.AIEngine();
  }

  aiShowAnimation(text, delay = 0) {
    const explanationElement = document.querySelector(".ai-explanation");
    const tagElement = document.querySelector(".ai-tag");

    if (!explanationElement || this.scoGPTIsRunning) return;

    this.scoGPTIsRunning = true;
    tagElement.classList.add("loadingAI");
    explanationElement.style.display = "block";
    explanationElement.innerHTML =
      '生成中...<span class="blinking-cursor"></span>';

    setTimeout(() => {
      explanationElement.innerHTML = "";
      this.showCharByChar(explanationElement, text, 0);
    }, delay);
  }

  showCharByChar(element, text, index) {
    if (index >= text.length) {
      this.scoGPTIsRunning = false;
      return;
    }

    const char = text[index];
    const item = document.createElement("span");
    item.classList.add("char");
    item.textContent = char;
    element.appendChild(item);
    const animationDelay = 80;

    if (text.length == index + 1) {
      document.querySelector(".ai-tag").classList.remove("loadingAI");
    } else {
      setTimeout(() => {
        this.showCharByChar(element, text, index + 1);
      }, animationDelay);
    }
  }

  AIEngine() {
    const tagElement = document.querySelector(".ai-tag");
    tagElement.addEventListener("click", () => {
      if (!this.scoGPTIsRunning) {
        this.aiTalkMode = true;
        this.aiShowAnimation(this.config.talk);
      }
    });
  }
}

const ai = new POST_AI();
