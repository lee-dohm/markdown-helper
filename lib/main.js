/** @babel */

import MarkdownDocument from './markdown-document'

let subscriptions

export function activate () {
  subscriptions = atom.commands.add('atom-text-editor', {
    'markdown-helper:convert-to-reference-links': () => {
      const editor = atom.workspace.getActiveTextEditor()
      const doc = new MarkdownDocument(editor)
      doc.convertToReferenceLinks()
    },
    'markdown-helper:tidy': () => {
      const editor = atom.workspace.getActiveTextEditor()
      const doc = new MarkdownDocument(editor)
      doc.tidy()
    }
  })
}

export function deactivate () {
  subscriptions.dispose()
  subscriptions = null
}
