/**
 * @file Unit Tests - ansiRegex
 * @module ansi-regex/lib/tests/unit/ansiRegex
 */

import ANSI_PATTERN from '#internal/ansi-pattern'
import testSubject from '#lib/ansi-regex'

describe('unit:lib/ansiRegex', () => {
  it.each<Parameters<typeof testSubject>>([
    [],
    [{}],
    [{ g: false, u: false }],
    [{ d: true, g: true, v: true, y: true }]
  ])('should return regular expression (%#)', flags => {
    // Arrange
    const { g, d, u, v, y } = flags ?? {}

    // Act
    const result = testSubject(flags)

    // Expect
    expect(result).to.be.instanceof(RegExp)
    expect(result).to.have.property('dotAll', false)
    expect(result).to.have.property('global', !!(g ?? true))
    expect(result).to.have.property('hasIndices', !!d)
    expect(result).to.have.property('ignoreCase', false)
    expect(result).to.have.property('multiline', false)
    expect(result).to.have.property('source', ANSI_PATTERN)
    expect(result).to.have.property('sticky', !!y)
    expect(result).to.have.property('unicode', !!(u ?? (v ? u : true)))
    expect(result).to.have.property('unicodeSets', !!v)
  })
})
