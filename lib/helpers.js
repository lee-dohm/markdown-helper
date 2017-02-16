/** @babel */

export function dasherize (text) {
  return text.toLowerCase()
             .trim()
             .replace(/[^a-z0-9]/g, '-')
             .replace(/-{2,}/g, '-')
}
