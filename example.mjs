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
  console.dir({ groups, index, indices: [...indices] }, { sorted: true })
}
