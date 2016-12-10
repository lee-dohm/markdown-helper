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

  describe('getReferences', function () {
    beforeEach(function (done) {
      atom.workspace.open(fixturePath('already-has-links-before.md')).then((e) => {
        editor = e
        doc = new MarkdownDocument(editor)
        done()
      })
    })

    it('finds all of the reference definitions', function () {
      let [refs, _] = doc.getReferences()

      expect(refs.length).to.equal(1)
      expect(refs[0][0]).to.equal('with-inline-link')
      expect(refs[0][1]).to.equal('http://example.com')
    })
  })

  describe('converting inline links to reference links', function () {
    describe('in a simple document', function () {
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

  describe('in a document that already has links', function () {
    beforeEach(function (done) {
      atom.workspace.open(fixturePath('already-has-links-before.md')).then((e) => {
        editor = e
        doc = new MarkdownDocument(editor)
        done()
      })
    })

    it('works', function () {
      doc.convertToReferenceLinks()

      expect(editor.getText()).to.equal(fixture('already-has-links-after.md'))
    })
  })
})
