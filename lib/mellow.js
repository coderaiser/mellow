'use strict';

const assert = require('assert');
const {
    join,
    normalize,
} = require('path');

const isWin = () => process.platform === 'win32';

exports.webToWin = (current, root) => {
    let volume;
    
    assert(current, 'could not be empty!');
    
    if (root && root !== '/') {
        current = join(root, current);
    } else if (isWin() && current !== '/') {
        [, volume] = current;
        current = current
            .split('')
            .slice(2)
            .join('');
        
        current = `${volume}:${current}`;
        current = normalize(current);
    }
    
    return current;
};

exports.winToWeb = (current, root = '') => {
    if (isWin() && (!root || root === '/')) {
        current = '/' + current
            .replace(':', '')
            .replace(/\\/g, '/');
    } else {
        current = join(root, current);
    }
    
    return current;
};

