/** @babel */

import LinkCollection from './link-collection'

export default class MarkdownDocument {
  constructor (editor) {
    this.editor = editor
    this.referencePattern = /^\[(\S+)\]:\s+(\S+)$/
  }

  convertToReferenceLinks () {
    let refs = this.extractReferences()
    collection = new LinkCollection(refs)
    this.replaceLinks(collection)
    this.insertReferences(collection)
    this.tidy()
  }

  tidy () {
    this.editor.scan(/\n{3,}/, ({replace: replace}) => {
      replace('\n\n')
    })
  }

  extractReferences () {
    let [refs, linesWithRefs] = this.getReferences()

    for (let line of linesWithRefs) {
      this.deleteLine(line)
    }

    return refs
  }

  deleteLine (line) {
    this.editor.setTextInBufferRange([[line, 0], [line + 1, 0]], '')
  }

  getReferences () {
    let refs = []
    let linesWithRefs = []

    this.editor.scan(this.referencePattern, ({match: match, range: range}) => {
      refs.push([match[1], match[2]])
      linesWithRefs.push(range.start.row)
    })

    return [refs, linesWithRefs]
  }

  insertReferences (collection) {
    this.editor.moveToBottom()
    this.editor.insertNewline()
    this.editor.insertText(collection.getReferences().join('\n'))
    this.editor.insertNewline()
  }

  replaceLinks (collection) {
    this.editor.scan(collection.inlineLinkPattern, ({matchText: matchText, replace: replace}) => {
      newLink = collection.convert(matchText)
      replace(newLink)
    })
  }
}
