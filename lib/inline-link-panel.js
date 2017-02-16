/** @babel */

import {dasherize} from './helpers'

export default class InlineLinkPanel {
  constructor (editor) {
    this._editor = editor
    this._focusedElement = null
    this._title = ''
    this._target = ''
  }

  get commandRegistry () {
    return atom.commands
  }

  get focusedElement () {
    return this._focusedElement
  }

  set focusedElement (element) {
    this._focusedElement = element
  }

  get linkName () {
    return dasherize(this._title)
  }

  get target () {
    return this._target
  }

  set target (value) {
    this._target = value
  }

  get title () {
    return this._title
  }

  set title (value) {
    this._title = value
  }

  cancel () {
    this.destroy()
  }

  destroy () {
    return this.panel.destroy()
  }

  insertLink () {
    this._editor.transact(() => {
      this._editor.insertText(`[${this.title}][${this.linkName}]`)
      this._editor.setTextInBufferRange([[Infinity, Infinity], [Infinity, Infinity]], `[${this.linkName}]: ${this.target}\n`)
    })

    this.destroy()
  }

  setPanel (panel) {
    this.panel = panel
  }
}
