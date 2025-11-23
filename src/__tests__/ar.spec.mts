/**
 * @file Unit Tests - ar
 * @module ansi-regex/tests/unit/ar
 */

import testSubject from '#ar'

describe('unit:ar', () => {
  type Match = NonNullable<RegExpExecArray['groups']>

  let groups: string[]
  let matches: (result: readonly RegExpExecArray[]) => Match[]

  beforeAll(() => {
    groups = [
      'ansi',
      'csi',
      'csi_final',
      'csi_intermediate',
      'csi_introducer',
      'csi_params',
      'esc',
      'esc_final',
      'osc',
      'osc_command',
      'osc_data',
      'osc_introducer',
      'osc_sep',
      'osc_terminator'
    ]

    /**
     * @this {void}
     *
     * @param {ReadonlyArray<RegExpExecArray>} result
     *  `matchAll` result
     * @return {Match[]}
     *  List of match snapshot objects
     */
    matches = function matches(
      this: void,
      result: readonly RegExpExecArray[]
    ): Match[] {
      return [...result].map(match => {
        return Object.entries(match.groups ?? {}).reduce((acc, [k, value]) => {
          if (typeof value === 'string') value = hrc(value)
          return Object.assign(acc, { [k]: value }), acc
        }, {})
      })

      /**
       * @this {void}
       *
       * @param {string} string
       *  The string containing control characters
       * @return {string}
       *  `value` with human-readable control characters
       */
      function hrc(this: void, string: string): string {
        /**
         * Regular expression matching control characters.
         *
         * @const {RegExp} controls
         */
        const controls: RegExp = /[\u0000-\u001F\u007F-\u009F]/g

        return string.replace(controls, hr)
      }

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
      function hr(this: void, character: string): string {
        return `\\u${character.codePointAt(0)!.toString(16).padStart(4, '0')}`
      }
    }
  })

  beforeEach(() => {
    testSubject.lastIndex = 0
  })

  it.each<[string]>([
    ['\x1b[1mbold text\x1b[22m'],
    ['\x1b[34m\x1b[1mbold blue text\x1b[22m\x1b[39m'],
    ['\x1b[104m\x1b[1mbold text with bright blue background\x1b[22m\x1b[49m'],
    ['\x1b[4m\x1b[34m\x1b[1mbold blue underlined text\x1b[22m\x1b[39m\x1b[24m'],
    ['\x1b[35m✨ purple text with emojis ✨\x1b[0m'],
    ['✅ \x1b[1mbold text with emoji prefix\x1b[22m'],

    // nested csi sequences
    ['\x1b[31mred \x1b[1mbold red\x1b[22m normal red\x1b[0m'],

    // osc with bel terminator
    ['\x1b]0;terminal title\x07some text'],

    // csi sequences that are not sgr (cursor movement, etc.)
    ['\x1b[2jclear screen\x1b[hhome'],

    // reset-only sequences
    ['\x1b[0mreset only\x1b[0m'],

    // random control characters mixed in
    ['\x1b[31mred\x07text\x1b[0m'],

    // ansi hyperlinks (osc 8)
    ['\x1b]8;;https://example.com\x1b\\click here\x1b]8;;\x1b\\'],

    // color + hyperlink
    ['\x1b[32m\x1b]8;;https://example.com\x1b\\green link\x1b]8;;\x1b\\\x1b[0m'],

    // multiple hyperlinks
    ['\x1b]8;;https://a.com\x1b\\a\x1b]8;;\x1b\\ and \x1b]8;;https://b.com\x1b\\b\x1b]8;;\x1b\\'],

    // additional edge / malformed sequences
    ['\x1b[1;2;3;4;5;6;7;8;9;10mmany params\x1b[0m'],
    ['\x1b[99999mtoo big parameter\x1b[0m'],
    ['\x1b[;mempty param\x1b[0m'],
    ['\x1b[not csi'], // malformed
    ['\x1bPq'], // dcs (unsupported)
    ['\x1b]8;;https://example.com\x1b\\click'], // missing closing osc
    ['\x1b]8;;https://example.comclick\x1b]8;;\x1b\\'], // missing esc term
    ['normal text \x1b[1mbold \x1b]8;;https://x\x1b\\link\x1b[0m']
  ])('should match ansi sequences (%j)', string => {
    // Act
    const result = [...string.matchAll(testSubject)]

    // Expect
    expect(result).to.be.not.empty
    expect(result).to.each.have.property('groups').with.keys(groups)
    expect(matches(result)).toMatchSnapshot()
  })

  it.each<[string]>([
    // malformed / invalid esc sequences
    ['\x1b'], // bare esc
    ['\x1b\x00null byte after esc'],
    ['\x1bzunknown esc byte'], // invalid esc final byte

    // malformed csi
    ['\x1b['], // incomplete
    ['\x1b'], // bare esc
    ['\x1b[;'], // missing final byte
    ['\x1b[999'], // missing final

    // malformed osc
    ['\x1b]0;incomplete'], // no terminator

    // unsupported sequences (depending on regex)
    ['\x1b^'], // pm
    ['\x1b_'], // apc

    // lookalikes but invalid
    ['[0m'],
    ['[31m'],
    ['[[[['],
    ['[]'],

    // plain text
    ['hello world 🌎'],
    ['no ansi here'],
    ['string'],
    ['🦄🦾🚀'],
    ['3.13']
  ])('should not match malformed or non-ansi (%j)', string => {
    expect([...string.matchAll(testSubject)]).to.be.empty
  })
})
