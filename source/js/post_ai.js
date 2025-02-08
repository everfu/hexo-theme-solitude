class POST_AI {
  constructor() {
    this.aiTalkMode = false;
    this.scoGPTIsRunning = false;
  }

  init() {
    this.aiShowAnimation();
    this.AIEngine();
  }

  aiShowAnimation() {
    const explanationElement = document.querySelector(".ai-explanation");
    const tagElement = document.querySelector(".ai-tag");

    if (!explanationElement || this.scoGPTIsRunning) return;

    this.scoGPTIsRunning = true;
    tagElement.classList.add("loadingAI");
    explanationElement.innerHTML = "";
    this.showCharByChar(explanationElement, PAGE_CONFIG.ai_text, 0);
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
    const animationDelay = 30;

    if (text.length == index + 1) {
      document.querySelector(".ai-tag").classList.remove("loadingAI");
    } else {
      setTimeout(() => {
        this.showCharByChar(element, text, index + 1);
      }, animationDelay);
    }
  }

  AIEngine() {}
}

const ai = new POST_AI();
