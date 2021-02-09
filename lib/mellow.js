'use strict';

const assert = require('assert');
const {normalize} = require('path');
const joinWeb = require('path').win32.join;
const joinWin = require('path').posix.join;

const isWin = () => process.platform === 'win32';

exports.webToWin = (current, root) => {
    let volume;
    
    assert(current, 'could not be empty!');
    
    if (root && root !== '/') {
        current = joinWeb(root, current);
    } else if (isWin() && current !== '/') {
        [, volume] = current;
        current = current
            .split('')
            .slice(2)
            .join('');
        
        current = volume + ':' + (current || '\\');
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
        current = joinWin(root, current);
    }
    return current;
};

