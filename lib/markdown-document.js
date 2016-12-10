/** @babel */

import LinkCollection from './link-collection'

export default class MarkdownDocument {
  constructor (editor) {
    this.editor = editor
  }

  convertToReferenceLinks () {
    collection = new LinkCollection()

    this.editor.scan(collection.inlineLinkPattern, ({matchText: matchText, replace: replace}) => {
      newLink = collection.convert(matchText)
      replace(newLink)
    })

    this.editor.moveToBottom()
    this.editor.insertNewline()
    this.editor.insertText(collection.getReferences().join('\n'))
    this.editor.insertNewline()
  }
}
