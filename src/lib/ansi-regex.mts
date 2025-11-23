/**
 * @file ansiRegex
 * @module ansi-regex/lib/ansiRegex
 */

import ANSI_PATTERN from '#internal/ansi-pattern'
import type { Flags } from '@flex-development/ansi-regex'

/**
 * Create a regular expression matching ANSI escape codes.
 *
 * @see {@linkcode Flags}
 *
 * @this {void}
 *
 * @param {Flags | null | undefined} [flags]
 *  An object representing the regular expression flags to apply
 * @return {RegExp}
 *  New regular expression matching ANSI escape codes
 */
function ansiRegex(
  this: void,
  flags?: Flags | null | undefined
): RegExp {
  return new RegExp(ANSI_PATTERN, Object.entries({
    ...flags,
    g: flags?.g ?? true,
    u: flags?.u ?? (flags?.v ? flags.u : true)
  }).reduce((flags, flag) => (flag[1] && (flags += flag[0]), flags), ''))
}

export default ansiRegex
