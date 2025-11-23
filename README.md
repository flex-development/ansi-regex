# ansi-regex

[![ci](https://github.com/flex-development/ansi-regex/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/flex-development/ansi-regex/actions/workflows/ci.yml)
[![github release](https://img.shields.io/github/v/release/flex-development/ansi-regex.svg?include_prereleases\&sort=semver)](https://github.com/flex-development/ansi-regex/releases/latest)
[![npm](https://img.shields.io/npm/v/@flex-development/ansi-regex.svg)](https://npmjs.com/package/@flex-development/ansi-regex)
[![npm downloads](https://img.shields.io/npm/dm/@flex-development/ansi-regex.svg)](https://www.npmcharts.com/compare/@flex-development/ansi-regex?interval=30)
[![install size](https://packagephobia.now.sh/badge?p=@flex-development/ansi-regex)](https://packagephobia.now.sh/result?p=@flex-development/ansi-regex)
[![codecov](https://codecov.io/github/flex-development/ansi-regex/graph/badge.svg?token=zIs5SMtGLp)](https://codecov.io/github/flex-development/ansi-regex)
[![module type: esm](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![license](https://img.shields.io/github/license/flex-development/ansi-regex.svg)](LICENSE.md)
[![conventional commits](https://img.shields.io/badge/-conventional%20commits-fe5196?logo=conventional-commits\&logoColor=ffffff)](https://conventionalcommits.org)
[![typescript](https://img.shields.io/badge/-typescript-3178c6?logo=typescript\&logoColor=ffffff)](https://typescriptlang.org)
[![vitest](https://img.shields.io/badge/-vitest-6e9f18?style=flat\&logo=vitest\&logoColor=ffffff)](https://vitest.dev)
[![yarn](https://img.shields.io/badge/-yarn-2c8ebb?style=flat\&logo=yarn\&logoColor=ffffff)](https://yarnpkg.com)

Regular expression for matching [ANSI escape codes][ansi-escape-code]

## Contents

- [What is this?](#what-is-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
  - [`ansiRegex([flags])`](#ansiregexflags)
  - [`ar`](#ar)
- [Types](#types)
  - [`Flags`](#flags)
- [Contribute](#contribute)

## What is this?

This is a tiny, but useful package for matching [ANSI escape codes][ansi-escape-code] in strings.

## Install

This package is [ESM only][esm].

In Node.js with [yarn][]:

```sh
yarn add @flex-development/ansi-regex
```

<blockquote>
  <small>
    See <a href='https://yarnpkg.com/protocol/git'>Git - Protocols | Yarn</a>
    &nbsp;for details regarding installing from Git.
  </small>
</blockquote>

In Deno with [`esm.sh`][esmsh]:

```ts
import { ansiRegex } from 'https://esm.sh/@flex-development/ansi-regex'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import { ar } from 'https://esm.sh/@flex-development/ansi-regex'
</script>
```

With [bun][]:

```sh
bun add @flex-development/ansi-regex
```

<blockquote>
  <small>
    See <a href='https://bun.com/docs/cli/add'><code>bun add</code></a> for more details.
  </small>
</blockquote>

## Use

[`example.mjs`](./example.mjs):

```js
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
```

...yields

```sh
"🦄🦾🚀": false
"\u001b[44m\u001b[1mhello world 🌎\u001b[22m\u001b[49m": true
{
  group: {
    ansi: '\\u001b[44m',
    csi: '\\u001b[44m',
    csi_final: 'm',
    csi_intermediate: '',
    csi_introducer: '\\u001b',
    csi_params: '44',
    esc: undefined,
    esc_final: undefined,
    osc: undefined,
    osc_command: undefined,
    osc_data: undefined,
    osc_introducer: undefined,
    osc_sep: undefined,
    osc_terminator: undefined
  },
  index: 0,
  indices: [
    [ 0, 5 ],
    [ 0, 5 ],
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    [ 0, 5 ],
    [ 0, 1 ],
    [ 2, 4 ],
    [ 4, 4 ],
    [ 4, 5 ],
    undefined,
    undefined
  ]
}
{
  group: {
    ansi: '\\u001b[1m',
    csi: '\\u001b[1m',
    csi_final: 'm',
    csi_intermediate: '',
    csi_introducer: '\\u001b',
    csi_params: '1',
    esc: undefined,
    esc_final: undefined,
    osc: undefined,
    osc_command: undefined,
    osc_data: undefined,
    osc_introducer: undefined,
    osc_sep: undefined,
    osc_terminator: undefined
  },
  index: 5,
  indices: [
    [ 5, 9 ],
    [ 5, 9 ],
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    [ 5, 9 ],
    [ 5, 6 ],
    [ 7, 8 ],
    [ 8, 8 ],
    [ 8, 9 ],
    undefined,
    undefined
  ]
}
{
  group: {
    ansi: '\\u001b[22m',
    csi: '\\u001b[22m',
    csi_final: 'm',
    csi_intermediate: '',
    csi_introducer: '\\u001b',
    csi_params: '22',
    esc: undefined,
    esc_final: undefined,
    osc: undefined,
    osc_command: undefined,
    osc_data: undefined,
    osc_introducer: undefined,
    osc_sep: undefined,
    osc_terminator: undefined
  },
  index: 23,
  indices: [
    [ 23, 28 ],
    [ 23, 28 ],
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    [ 23, 28 ],
    [ 23, 24 ],
    [ 25, 27 ],
    [ 27, 27 ],
    [ 27, 28 ],
    undefined,
    undefined
  ]
}
{
  group: {
    ansi: '\\u001b[49m',
    csi: '\\u001b[49m',
    csi_final: 'm',
    csi_intermediate: '',
    csi_introducer: '\\u001b',
    csi_params: '49',
    esc: undefined,
    esc_final: undefined,
    osc: undefined,
    osc_command: undefined,
    osc_data: undefined,
    osc_introducer: undefined,
    osc_sep: undefined,
    osc_terminator: undefined
  },
  index: 28,
  indices: [
    [ 28, 33 ],
    [ 28, 33 ],
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    [ 28, 33 ],
    [ 28, 29 ],
    [ 30, 32 ],
    [ 32, 32 ],
    [ 32, 33 ],
    undefined,
    undefined
  ]
}
```

## API

This package exports the following identifiers:

- [`ansiRegex`](#ansiregexflags)
- [`ar`](#ar)

The default export is [`ar`](#ar).

### `ansiRegex([flags])`

Create a regular expression matching ANSI escape codes.

#### Parameters

- `flags` ([`Flags`](#flags) | `null` | `undefined`)
  — an object representing the regular expression flags to apply

#### Returns

(`RegExp`) New regular expression matching ANSI escape codes

### `ar`

(`RegExp`)

The default regular expression matching ANSI escape codes.

## Types

This package is fully typed with [TypeScript][].

### `Flags`

Record, where each key is a regular expression flag
and each truthy value indicates if the flag should be applied to the regular expression (`interface`).

```ts
interface Flags {/* see code */}
```

When developing extensions that use additional flags, augment `Flags` to register custom flags:

```ts
declare module '@flex-development/ansi-regex' {
  interface Flags {
    i?: boolean | null | undefined
  }
}
```

#### Properties

- `d?` (`boolean` | `null` | `undefined`)
  — whether to generate indices for substring matches
  > 👀 [`RegExp#hasIndices`][regexp-d]
- `g?` (`boolean` | `null` | `undefined`)
  — whether to perform global search
  > 👀 [`RegExp#global`][regexp-g]
- `u?` (`boolean` | `null` | `undefined`)
  — whether to treat a pattern as a sequence of unicode code points
  > 👀 [`RegExp#unicode`][regexp-u]
- `v?` (`boolean` | `null` | `undefined`)
  — whether to treat a pattern as a sequence of unicode code points.\\
  > 👉 the `v` flag is an "upgrade" to the `u` flag that enables additional unicode-related features.
  > because `u` and `v` interpret the same regex in incompatible ways,
  > enabling both flags at once results in a `SyntaxError`\
  > 👀 [`RegExp#unicodeSets`][regexp-v]
- `y?` (`boolean` | `null` | `undefined`)
  — whether to start matches at the current position in the target string
  > 👀 [`RegExp#sticky`][regexp-y]

## Contribute

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

This project has a [code of conduct](./CODE_OF_CONDUCT.md). By interacting with this repository, organization, or
community you agree to abide by its terms.

[ansi-escape-code]: https://en.wikipedia.org/wiki/ANSI_escape_code

[bun]: https://bun.sh

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[regexp-d]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp/hasIndices

[regexp-g]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp/global

[regexp-u]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode

[regexp-v]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets

[regexp-y]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky

[typescript]: https://www.typescriptlang.org

[yarn]: https://yarnpkg.com
