# Mellow

Mellow - convert path from web to windows.

## Install
For use as module you could install mellow with:

```
npm i mellow
```

## API

### read
Read content of directory.

```js
var flop = require('mellow');

mellow.read('.', function(error, data) {
    console.log(error, data);
});

```

### convertPath

```js
var mellow  = require('mellow');
    path    = mellow.convertPath('/c/windows');
    //c:/windows
```

## License

MIT
