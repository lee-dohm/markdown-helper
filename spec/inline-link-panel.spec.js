/** @babel */

import InlineLinkPanel from '../lib/inline-link-panel'

describe('InlineLinkPanel', function () {
  let panel

  beforeEach(function () {
    panel = new InlineLinkPanel()
  })

  it('defaults the title to empty', function () {
    expect(panel.title).to.equal('')
  })

  it('defaults the target to empty', function () {
    expect(panel.target).to.equal('')
  })

  it('dasherizes the title to generate the link name', function () {
    panel.title = 'Foo Bar Baz'

    expect(panel.linkName).to.equal('foo-bar-baz')
  })
})
