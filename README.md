# Mellow [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]: https://img.shields.io/npm/v/mellow.svg?style=flat
[BuildStatusIMGURL]: https://img.shields.io/travis/coderaiser/mellow/master.svg?style=flat
[DependencyStatusIMGURL]: https://img.shields.io/david/coderaiser/mellow.svg?style=flat
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]: https://npmjs.org/package/mellow "npm"
[BuildStatusURL]: https://travis-ci.org/coderaiser/mellow "Build Status"
[DependencyStatusURL]: https://david-dm.org/coderaiser/mellow "Dependency Status"
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[CoverageURL]: https://coveralls.io/github/coderaiser/mellow?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/mellow/badge.svg?branch=master&service=github

Mellow - convert path from web to windows.

## Install

```
npm i mellow
```

## API

### pathToWin

```js
const mellow  = require('mellow');
mellow.webToWin('/c/windows');
// returns
'c:\\windows';
```

### pathFromWin

```js
const mellow  = require('mellow');
mellow.winToWeb('c:\\windows');
// returns
'/c/windows';
```

## License

MIT
