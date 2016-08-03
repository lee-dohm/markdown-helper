/** @babel */

const findPattern = /\[([^\]]*)\]\(([^\)]*)\)/
const matchPattern = /^\[([^\]]*)\]\(([^\)]*)\)$/

export function convertLink (text) {
  const info = text.match(matchPattern)

  if (info) {
    let [_, linkText, link] = info
    let reference = dasherize(linkText)

    return [`[${linkText}][${reference}]`, `[${reference}]: ${link}`]
  }
}

export function getPattern () {
  return findPattern
}

function dasherize (text) {
  return text.toLowerCase()
             .trim()
             .replace(/[^a-z0-9]/g, '-')
             .replace(/-{2,}/g, '-')
}
