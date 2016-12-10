/** @babel */

import MarkdownDocument from '../lib/markdown-document'

import {fixture, fixturePath} from './helpers'

describe('MarkdownDocument', function () {
  let doc, editor

  describe('construction', function () {
    beforeEach(function (done) {
      atom.workspace.open().then((e) => {
        editor = e
        doc = new MarkdownDocument(editor)
        done()
      })
    })

    it('has a reference to an editor', function () {
      expect(doc.editor).to.equal(editor)
    })
  })

  describe('converting inline links to reference links', function () {
    beforeEach(function (done) {
      atom.workspace.open(fixturePath('simple-before.md')).then((e) => {
        editor = e
        doc = new MarkdownDocument(editor)
        done()
      })
    })

    it('works', function () {
      doc.convertToReferenceLinks()

      expect(editor.getText()).to.equal(fixture('simple-after.md'))
    })
  })
})
