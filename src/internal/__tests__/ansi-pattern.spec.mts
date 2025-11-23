/**
 * @file Unit Tests - ANSI_PATTERN
 * @module ansi-regex/internal/tests/unit/ANSI_PATTERN
 */

import TEST_SUBJECT from '#internal/ansi-pattern'

describe('unit:internal/ANSI_PATTERN', () => {
  it('should be regular expression pattern', () => {
    expect(TEST_SUBJECT).toMatchSnapshot()
  })
})
