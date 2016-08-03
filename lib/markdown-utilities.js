/** @babel */

export function convertLink(text) {
  const info = text.match(/^\[([^\]]*)\]\(([^\)]*)\)$/)

  if (info) {
    let [_, linkText, link] = info
    let reference = dasherize(linkText)

    return [`[${linkText}][${reference}]`, `[${reference}]: ${link}`]
  }
}

function dasherize(text) {
  return text.toLowerCase()
             .trim()
             .replace(/[^a-z0-9]/g, '-')
             .replace(/-{2,}/g, '-')
}
