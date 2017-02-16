/** @babel */

import {dasherize} from './helpers'

export default class LinkCollection {
  constructor (references = []) {
    this.inlineLinkPattern = /\[([^\]]*)\]\(([^\)]*)\)/

    this.idToUrl = {}
    this.urlToId = {}

    references.forEach((reference) => {
      this.insertReference(...reference)
    })
  }

  convert (text) {
    let [linkText, id, url] = this.parseInlineLink(text)

    id = this.insertReference(id, url)

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

  insertReference (id, url) {
    if (this.urlToId[url]) {
      id = this.urlToId[url]
    } else {
      this.idToUrl[id] = url
      this.urlToId[url] = id
    }

    return id
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
