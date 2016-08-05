/** @babel */

function dasherize (text) {
  return text.toLowerCase()
             .trim()
             .replace(/[^a-z0-9]/g, '-')
             .replace(/-{2,}/g, '-')
}

export default class LinkCollection {
  constructor () {
    this.inlineLinkPattern = /^\[([^\]]*)\]\(([^\)]*)\)$/

    this.idToUrl = {}
    this.urlToId = {}
  }

  convert (text) {
    let [linkText, id, url] = this.parseInlineLink(text)

    if (this.urlToId[url]) {
      id = this.urlToId[url]
    } else {
      this.idToUrl[id] = url
      this.urlToId[url] = id
    }

    return `[${linkText}][${id}]`
  }

  getReferences () {
    let references = []

    Object.keys(this.idToUrl).forEach((key) => {
      references.push(`[${key}]: ${this.idToUrl[key]}`)
    })

    references.sort()

    return references
  }

  parseInlineLink (text) {
    const info = text.match(this.inlineLinkPattern)

    if (!info) {
      throw new Error(`${text} is not a valid inline link`)
    }

    let [_, linkText, url] = info

    return [linkText, dasherize(linkText), url]
  }
}
