/** @babel */

import InlineLinkPanel from './inline-link-panel'
import InlineLinkPanelView from './inline-link-panel-view'
import MarkdownDocument from './markdown-document'

let subscriptions

export function activate () {
  subscriptions = atom.commands.add('atom-text-editor', {
    'markdown-helper:convert-to-reference-links': () => {
      const editor = atom.workspace.getActiveTextEditor()
      const doc = new MarkdownDocument(editor)
      doc.convertToReferenceLinks()
    },
    'markdown-helper:insert-link': () => {
      const linkPanel = new InlineLinkPanel(atom.workspace.getActiveTextEditor())
      const modalPanel = atom.workspace.addModalPanel({item: linkPanel})
      linkPanel.setPanel(modalPanel)
    },
    'markdown-helper:tidy': () => {
      const editor = atom.workspace.getActiveTextEditor()
      const doc = new MarkdownDocument(editor)
      doc.tidy()
    }
  })

  atom.views.addViewProvider(InlineLinkPanel, (panel) => {
    const view = new InlineLinkPanelView(panel)
    return view.element
  })
}

export function deactivate () {
  subscriptions.dispose()
  subscriptions = null
}
