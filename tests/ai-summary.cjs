// Run with: node tests/ai-summary.cjs (after npm ci).
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const pug = require('pug')
const root = path.resolve(__dirname, '..')
const pageConfig = pug.compileFile(path.join(root, 'layout/includes/head/page_config.pug'))
const getSummary = (page, enable = true, post = true) => {
  const html = pageConfig({
    page,
    theme: { post: { ai: { enable } } },
    is_post: () => post,
    is_home: () => false,
    is_archive: () => false,
    is_category: () => false,
    is_tag: () => false
  })
  return JSON.parse(html.replace(/^<template[^>]*>|<\/template>$/g, '')).ai_text
}
assert.equal(getSummary({ ai_text: 'Old', description: 'Fallback' }), 'Old')
assert.equal(getSummary({ description: 'Fallback' }), 'Fallback')
assert.equal(getSummary({ ai_text: '', description: 'Fallback' }), 'Fallback')
assert.equal(getSummary({}), false)
assert.equal(getSummary({ description: 'Disabled' }, false), false)
assert.equal(getSummary({ description: 'Page' }, true, false), false)
assert.equal(getSummary({ description: '</template><script>unsafe</script>' }), '</template><script>unsafe</script>')

const node = (tag = '') => {
  const classes = new Set()
  return {
    tag,
    children: [],
    classes,
    classList: { add: (value) => classes.add(value), remove: (value) => classes.delete(value) },
    appendChild(child) {
      this.children.push(child)
    },
    set textContent(value) {
      this.children = []
      this.text = value
    },
    get textContent() {
      return (this.text || '') + this.children.map((child) => child.textContent).join('')
    }
  }
}
let explanation = node(),
  label = node()
const frames = new Map(),
  listeners = new Map(),
  events = []
let frameId = 0
const document = {
  readyState: 'complete',
  createElement: node,
  querySelector: (selector) => (selector === '.ai-explanation' ? explanation : label),
  addEventListener: (name, callback) => listeners.set(name, callback),
  removeEventListener: (name) => listeners.delete(name),
  dispatchEvent: (event) => events.push(event)
}
const Solitude = { page: {} }
const source = fs
  .readFileSync(path.join(root, 'source/js/post_ai.js'), 'utf8')
  .replace(/^import .*\n/, '')
  .replace('export const ai', 'const ai')
  .replace('export default ai;', 'globalThis.ai = ai;')
const context = vm.createContext({
  Solitude,
  document,
  Intl,
  requestAnimationFrame: (callback) => {
    frames.set(++frameId, callback)
    return frameId
  },
  cancelAnimationFrame: (id) => frames.delete(id),
  CustomEvent: class {
    constructor(type, options) {
      this.type = type
      this.detail = options.detail
    }
  }
})
vm.runInContext(source, context)
const ai = context.ai
const tick = () => {
  const [id, callback] = frames.entries().next().value
  frames.delete(id)
  callback()
}
const drain = () => {
  while (frames.size) tick()
}
assert.equal(frames.size, 0, 'import must not start an unowned animation')
for (const value of ['', false, 42, {}]) {
  Solitude.page.ai_text = value
  ai.init()
  assert.equal(frames.size, 0)
}
Solitude.page.ai_text = getSummary({ description: 'Hello  **bold world** 中文 👨‍👩‍👧‍👦 👍🏽 <script>x</script> **unclosed' })
ai.init()
ai.init()
assert.equal(frames.size, 1)
assert.ok(label.classes.has('loadingAI'))
drain()
assert.equal(label.classes.has('loadingAI'), false)
assert.equal(explanation.textContent, 'Hello  bold world 中文 👨‍👩‍👧‍👦 👍🏽 <script>x</script> **unclosed')
assert.equal(explanation.children.find((child) => child.tag === 'strong').textContent, 'bold world')
assert.ok(explanation.children.some((child) => child.textContent === '👨‍👩‍👧‍👦'))
assert.ok(explanation.children.some((child) => child.textContent === '👍🏽'))
assert.ok(explanation.children.every((child) => child.tag === 'span' || child.tag === 'strong'))
assert.equal(events.filter((event) => event.type === 'aiRenderComplete').length, 1)
Solitude.page.ai_text = '**cancel this animation**'
ai.init()
tick()
ai.cancel()
assert.equal(frames.size, 0)
assert.equal(ai.isAnimating, false)
assert.equal(label.classes.has('loadingAI'), false)
const previous = explanation
explanation = node()
Solitude.page.ai_text = 'Next **page**'
ai.init()
drain()
assert.equal(explanation.textContent, 'Next page')
assert.equal(previous.textContent, 'c')
document.readyState = 'loading'
ai.init()
assert.ok(listeners.has('DOMContentLoaded'))
ai.cancel()
assert.equal(listeners.size, 0)
document.readyState = 'complete'
explanation = null
ai.init()
assert.equal(frames.size, 0)
console.log('AI summary regression checks passed')
