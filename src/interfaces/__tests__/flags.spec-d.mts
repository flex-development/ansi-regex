/**
 * @file Type Tests - Flags
 * @module ansi-regex/interfaces/tests/unit-d/Flags
 */

import type TestSubject from '#interfaces/flags'
import type { Nilable } from '@flex-development/tutils'

describe('unit-d:interfaces/Flags', () => {
  it('should match [d?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('d')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [g?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('g')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [u?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('u')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [v?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('v')
      .toEqualTypeOf<Nilable<boolean>>()
  })

  it('should match [y?: boolean | null | undefined]', () => {
    expectTypeOf<TestSubject>()
      .toHaveProperty('y')
      .toEqualTypeOf<Nilable<boolean>>()
  })
})
