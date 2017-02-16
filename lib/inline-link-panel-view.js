/** @babel */
/** @jsx etch.dom */

import {CompositeDisposable} from 'atom'
import etch from 'etch'

export default class InlineLinkPanelView {
  constructor (model) {
    this.model = model

    etch.initialize(this)

    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(this.model.commandRegistry.add(this.element, {
      'core:cancel': () => this.model.cancel(),
      'core:confirm': () => this.insertLink(),
      'core:focus-next': () => this.focusNext(),
      'core:focus-previous': () => this.focusPrevious()
    }))

    setTimeout(() => this.focusNext())
  }

  render () {
    return (
      <div className='inline-link-panel-view native-key-bindings'>
        <div className='block'>
          <input
            className='input-text inline-block'
            type='text'
            placeholder='Title'
            ref='titleInput'
            />
        </div>
        <div className='block'>
          <input
            className='input-text inline-block'
            type='text'
            placeholder='Link Target'
            ref='targetInput'
            />
        </div>
      </div>
    )
  }

  update (model) {
    this.model = model

    return etch.update(this)
  }

  destroy () {
    this.subscriptions.dispose()

    return etch.destroy(this)
  }

  // -------

  focus (element) {
    element.focus()
    this.model.focusedElement = element
  }

  focusNext () {
    if (this.model.focusedElement === this.refs.titleInput) {
      this.focus(this.refs.targetInput)
    } else {
      this.focus(this.refs.titleInput)
    }
  }

  focusPrevious () {
    this.focusNext()
  }

  insertLink () {
    this.model.title = this.refs.titleInput.value
    this.model.target = this.refs.targetInput.value
    this.model.insertLink()
  }
}
