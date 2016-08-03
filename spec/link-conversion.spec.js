/** @babel */

import {convertLink, getPattern} from '../lib/markdown-utilities'

describe('Link Conversion', function () {
  it('supplies the inline link regular expression', function () {
    expect(getPattern()).to.eql(/\[([^\]]*)\]\(([^\)]*)\)/)
  })

  describe('converting a single link', function () {
    it('converts an inline link to a reference link and reference', function () {
      let [link, reference] = convertLink('[foo](bar)')

      expect(link).to.equal('[foo][foo]')
      expect(reference).to.equal('[foo]: bar')
    })

    it('dasherizes the link text to create the link reference', function () {
      let [link, reference] = convertLink('[foo bar baz](bar)')

      expect(link).to.equal('[foo bar baz][foo-bar-baz]')
      expect(reference).to.equal('[foo-bar-baz]: bar')
    })

    it('returns undefined when the supplied text does not contain a link', function () {
      expect(convertLink('test')).to.be.undefined
    })
  })
})
