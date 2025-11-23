/**
 * @file example
 * @module example
 */

import { ansiRegex } from '@flex-development/ansi-regex'
import c from '@flex-development/colors'
import { ok } from 'devlop'

const emojis = '🦄🦾🚀'
const hello = c.bgBlue(c.bold('hello world 🌎'))

console.log(`${JSON.stringify(emojis)}:`, ansiRegex().test(emojis))
console.log(`${JSON.stringify(hello)}:`, ansiRegex().test(hello))

for (const match of hello.matchAll(ansiRegex({ d: true }))) {
  const { groups, index, indices } = match

  ok(groups, 'expected `groups`')

  console.dir({
    group: Object.entries(groups).reduce((acc, [key, value]) => {
      if (typeof value === 'string') value = hrc(value)
      return acc[key] = value, acc
    }, {}),
    index,
    indices: [...indices]
  }, { sorted: true })
}

/**
 * Make control characters in `string` human-readable.
 *
 * @this {void}
 *
 * @param {string} string
 *  The string containing control characters
 * @return {string}
 *  `string` with human-readable control characters
 */
function hrc(string) {
  /**
   * Regular expression matching control characters.
   *
   * @const {RegExp} controls
   */
  const controls = /[\u0000-\u001F\u007F-\u009F]/g

  return string.replace(controls, hr)

  /**
   * Convert a control `character` to a human-readable string.
   *
   * @this {void}
   *
   * @param {string} character
   *  The control character
   * @return {string}
   *  The control `character` as a human-readable string
   */
  function hr(character) {
    return `\\u${character.codePointAt(0).toString(16).padStart(4, '0')}`
  }
}
