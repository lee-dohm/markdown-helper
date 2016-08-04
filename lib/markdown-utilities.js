/** @babel */

const findPattern = /\[([^\]]*)\]\(([^\)]*)\)/
const matchPattern = /^\[([^\]]*)\]\(([^\)]*)\)$/

export function convertLinks (...linkTexts) {
  if (linkTexts.length === 1) {
    return convertLink(linkTexts[0])
  } else {
    let links = []
    let references = []

    linkTexts.forEach((linkText) => {
      let [link, reference] = convertLink(linkText)
      links.push(link)
      references.push(reference)
    })

    references.sort()

    return [links, references]
  }
}

export function getPattern () {
  return findPattern
}

function convertLink (text) {
  const info = text.match(matchPattern)

  if (info) {
    let [_, linkText, link] = info
    let reference = dasherize(linkText)

    return [`[${linkText}][${reference}]`, `[${reference}]: ${link}`]
  }
}

function dasherize (text) {
  return text.toLowerCase()
             .trim()
             .replace(/[^a-z0-9]/g, '-')
             .replace(/-{2,}/g, '-')
}
