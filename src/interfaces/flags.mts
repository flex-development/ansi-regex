/**
 * @file Interfaces - Flags
 * @module ansi-regex/interfaces/Flags
 */

/**
 * Record, where each key is a regular expression flag and each truthy value
 * indicates if the flag should be applied to the regular expression.
 *
 * This interface can be augmented to register custom flags.
 *
 * @example
 *  declare module '@flex-development/ansi-regex' {
 *    interface Flags {
 *      i?: boolean | null | undefined
 *    }
 *  }
 */
interface Flags {
  /**
   * Whether to generate indices for substring matches.
   *
   * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp/hasIndices
   */
  d?: boolean | null | undefined

  /**
   * Whether to perform global search.
   *
   * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global
   *
   * @default true
   */
  g?: boolean | null | undefined

  /**
   * Whether to treat a pattern as a sequence of Unicode code points.
   *
   * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode
   *
   * @default true
   */
  u?: boolean | null | undefined

  /**
   * Whether to treat a pattern as a sequence of Unicode code points.
   *
   * > 👉 **Note**: The `v` flag is an "upgrade" to the {@linkcode u} flag that
   * > enables additional Unicode-related features.
   * > Because {@linkcode u} and `v` interpret the same regex in incompatible
   * > ways, enabling both flags at once results in a `SyntaxError`.
   *
   * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets
   */
  v?: boolean | null | undefined

  /**
   * Whether to start matches at the current position in the target string.
   *
   * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky
   */
  y?: boolean | null | undefined
}

export type { Flags as default }
