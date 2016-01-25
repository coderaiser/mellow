(function() {
    'use strict';
    
    var isWin       = process.platform === 'win32',
        assert      = require('assert'),
        
        path        = require('path');
    
    exports.pathToWin   = pathToWin;
    exports.pathFromWin = pathFromWin;
    
    function pathToWin(current, root) {
        var volume;
        
        assert(current, 'could not be empty!');
        
        if (root && root !== '/') {
            current = path.join(root, current);
        } else if (isWin && current !== '/') {
            volume  = current[1];
            current = current
                .split('')
                .slice(2)
                .join('');
            
            current = volume + ':' + (current || '\\');
            current = path.normalize(current);
        }
        
        return current;
    }
    
    function pathFromWin(current, root) {
        if (isWin && (!root || root === '/')) {
            current = '/' + current
                .replace(':', '')
                .replace(/\\/g, '/');
        } else {
            current = path.join(root, current);
        }
        
        return current;
    }
    
})();
