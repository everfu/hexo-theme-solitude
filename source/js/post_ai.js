import { Solitude } from "./core/api.js";

class AIPostRenderer {
  static AI_EXPLANATION_SELECTOR = ".ai-explanation";
  static AI_TAG_SELECTOR = ".ai-tag";

  constructor() {
    this.initialize = this.initialize.bind(this);
    this.animationFrame = null;
  }

  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", this.initialize, { once: true });
    } else {
      this.initialize();
    }
  }

  initialize() {
    this.cacheElements();
    this.validateContent() && this.renderAIContent();
  }

  cacheElements() {
    this.refs = new WeakMap();
    this.refs.set(document, {
      explanationElement: document.querySelector(
        AIPostRenderer.AI_EXPLANATION_SELECTOR
      ),
      tagElement: document.querySelector(AIPostRenderer.AI_TAG_SELECTOR),
    });

    const { explanationElement, tagElement } = this.refs.get(document) || {};
    this.explanationElement = explanationElement;
    this.tagElement = tagElement;
  }

  validateContent() {
    return !!(
      this.explanationElement &&
      this.tagElement &&
      this.aiContent.length &&
      !this.isAnimating
    );
  }

  renderAIContent() {
    this.prepareAnimation();
    this.charSequence = this.parseContent(this.aiContent);
    this.animationFrame = requestAnimationFrame(() =>
      this.startTextAnimation(0)
    );
  }

  prepareAnimation() {
    this.isAnimating = true;
    this.tagElement.classList.add("loadingAI");
    this.explanationElement.textContent = "";
    this.currentBoldElement = null;
  }

  parseContent(content) {
    const sequence = [];
    const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
    for (const [index, part] of content.split(/(\*\*[^*]+\*\*)/u).entries()) {
      const bold = index % 2 === 1;
      const text = bold ? part.slice(2, -2) : part;
      for (const { segment: char } of segmenter.segment(text)) {
        sequence.push({ char, bold });
      }
    }
    return sequence;
  }

  startTextAnimation(index) {
    if (index >= this.charSequence.length) {
      this.completeAnimation();
      return;
    }

    this.appendCharacter(this.charSequence[index]);
    this.animationFrame = requestAnimationFrame(() =>
      this.startTextAnimation(index + 1)
    );
  }

  appendCharacter({ char, bold }) {
    const charElement = document.createElement("span");
    charElement.className = "char";
    charElement.textContent = char;
    if (bold) {
      if (!this.currentBoldElement) {
        this.currentBoldElement = document.createElement("strong");
        this.explanationElement.appendChild(this.currentBoldElement);
      }
      this.currentBoldElement.appendChild(charElement);
    } else {
      this.currentBoldElement = null;
      this.explanationElement.appendChild(charElement);
    }
  }

  completeAnimation() {
    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
    this.isAnimating = false;
    this.tagElement.classList.remove("loadingAI");

    const event = new CustomEvent("aiRenderComplete", {
      detail: { element: this.explanationElement },
    });
    document.dispatchEvent(event);
  }

  cancel() {
    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
    this.charSequence = [];
    this.currentBoldElement = null;
    document.removeEventListener("DOMContentLoaded", this.initialize);
    this.isAnimating = false;
    this.tagElement?.classList.remove("loadingAI");
  }

  get aiContent() {
    const content = Solitude.page?.ai_text;
    return typeof content === "string" ? content : "";
  }
}

// The page refresh lifecycle owns initialization and cancellation.
export const ai = new AIPostRenderer();
export default ai;
