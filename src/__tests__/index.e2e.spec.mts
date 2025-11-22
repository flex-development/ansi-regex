/**
 * @file E2E Tests - api
 * @module ansi-regex/tests/e2e/api
 */

import * as testSubject from '@flex-development/ansi-regex'
import { alphabetize, identity } from '@flex-development/tutils'

describe('e2e:ansi-regex', () => {
  it('should expose public api', () => {
    expect(alphabetize(Object.keys(testSubject), identity)).toMatchSnapshot()
  })
})
