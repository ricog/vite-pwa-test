import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'
import type { expect } from 'vitest'

type CustomMatchers<R = unknown> = TestingLibraryMatchers<
  typeof expect.stringContaining,
  R
>

declare module 'vitest' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any
  interface Assertion<T = any> extends CustomMatchers<T> {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
