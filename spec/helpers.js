/** @babel */

import fs from 'fs'
import path from 'path'

export function fixture (name) {
  return fs.readFileSync(fixturePath(name), 'utf8')
}

export function fixturePath (name) {
  return path.join(__dirname, 'fixtures', name)
}
