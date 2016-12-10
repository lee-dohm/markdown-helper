/** @babel */

import MarkdownDocument from './markdown-document'

let subscriptions

export function activate () {
  subscriptions = atom.commands.add('atom-text-editor', {
    'markdown-utilities:convert-to-reference-links': () => {
      const editor = atom.workspace.getActiveTextEditor()
      const doc = new MarkdownDocument(editor)
      doc.convertToReferenceLinks()
    }
  })
}

export function deactivate () {
  subscriptions.dispose()
  subscriptions = null
}
