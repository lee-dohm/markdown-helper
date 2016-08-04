/** @babel */

import {convertLinks, getPattern} from '../lib/markdown-utilities'

describe('Link Conversion', function () {
  it('supplies the inline link regular expression', function () {
    expect(getPattern()).to.eql(/\[([^\]]*)\]\(([^\)]*)\)/)
  })

  describe('converting a single link', function () {
    it('converts an inline link to a reference link and reference', function () {
      let [link, reference] = convertLinks('[foo](bar)')

      expect(link).to.equal('[foo][foo]')
      expect(reference).to.equal('[foo]: bar')
    })

    it('dasherizes the link text to create the link reference', function () {
      let [link, reference] = convertLinks('[foo bar baz](bar)')

      expect(link).to.equal('[foo bar baz][foo-bar-baz]')
      expect(reference).to.equal('[foo-bar-baz]: bar')
    })

    it('returns undefined when the supplied text does not contain a link', function () {
      expect(convertLinks('test')).to.be.undefined
    })
  })

  describe('converting a list of links', function () {
    it('converts a list of inline links to a list of reference links and references', function () {
      let [links, references] = convertLinks('[foo](bar)', '[bar](baz)')

      expect(links[0]).to.equal('[foo][foo]')
      expect(references[1]).to.equal('[foo]: bar')
      expect(links[1]).to.equal('[bar][bar]')
      expect(references[0]).to.equal('[bar]: baz')
    })

    it('sorts the references', function () {
      let [links, references] = convertLinks('[foo](bar)', '[bar](baz)')

      expect(links[0]).to.equal('[foo][foo]')
      expect(links[1]).to.equal('[bar][bar]')
      expect(references[0]).to.equal('[bar]: baz')
      expect(references[1]).to.equal('[foo]: bar')
    })

    xit('coalesces duplicate references', function () {
      let [links, references] = convertLinks('[foo](bar)', '[bar](bar)')

      expect(links[0]).to.equal('[foo][foo]')
      expect(links[1]).to.equal('[bar][foo]')
      expect(references[0]).to.equal('[foo]: bar')
      expect(references.length).to.equal(1)
    })
  })
})
