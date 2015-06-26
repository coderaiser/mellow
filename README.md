# Mellow

Mellow - convert path from web to windows.

## Install
For use as module you could install mellow with:

```
npm i mellow --save
```

## API

### pathToWin

```js
var mellow  = require('mellow');
    path    = mellow.pathToWin('/c/windows');
    // returns
    'c:\windows'
```

### pathFromWin

```js
var mellow  = require('mellow');
    path    = mellow.pathFromWin('c:\windows');
    // returns
    '/c/windows'
```

## License

MIT
