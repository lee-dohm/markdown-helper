/** @babel */

import LinkCollection from '../lib/link-collection'

describe('LinkCollection', function () {
  let collection

  beforeEach(function () {
    collection = new LinkCollection()
  })

  it('converts a link', function () {
    expect(collection.convert('[foo](bar)')).to.equal('[foo][foo]')
    expect(collection.getReferences()).to.eql(['[foo]: bar'])
  })

  it('converts multiple links and collects their references', function () {
    expect(collection.convert('[bar](bar)')).to.equal('[bar][bar]')
    expect(collection.convert('[baz](baz)')).to.equal('[baz][baz]')
    expect(collection.getReferences()).to.eql(['[bar]: bar', '[baz]: baz'])
  })

  it('converts multiple links and sorts their references', function () {
    expect(collection.convert('[foo](bar)')).to.equal('[foo][foo]')
    expect(collection.convert('[bar](baz)')).to.equal('[bar][bar]')
    expect(collection.getReferences()).to.eql(['[bar]: baz', '[foo]: bar'])
  })

  it('converts multiple links and coalesces duplicate URLs', function () {
    expect(collection.convert('[foo](bar)')).to.equal('[foo][foo]')
    expect(collection.convert('[bar](bar)')).to.equal('[bar][foo]')
    expect(collection.getReferences()).to.eql(['[foo]: bar'])
  })

  it('dasherizes the link text to get the ID', function () {
    expect(collection.convert('[foo bar baz](bar)')).to.equal('[foo bar baz][foo-bar-baz]')
  })

  it('does not add invalid links to the list of references', function () {
    expect(() => { collection.convert('') }).to.throw(Error)
    expect(collection.getReferences()).to.eql([])
  })

  it('allows references to be added to the database on construction', function () {
    collection = new LinkCollection([['baz', 'bar']])

    expect(collection.convert('[foo](bar)')).to.equal('[foo][baz]')
    expect(collection.convert('[bar](bar)')).to.equal('[bar][baz]')
    expect(collection.getReferences()).to.eql(['[baz]: bar'])
  })
})
