(function() {
    'use strict';
    
    var isWin       = process.platform === 'win32',
        assert      = require('assert'),
        
        path        = require('path'),
        win         = require('win32'),
        flop        = require('flop');
    
    exports.read        = read;
    exports.pathToWin   = pathToWin;
    exports.pathFromWin = pathFromWin;
    
    function read(path, callback) {
        if (isWin && path === '/')
            getRoot(callback);
        else
            flop.read(path, callback);
    }
    
    function getRoot(callback) {
        win.getVolumes(function(error, volumes) {
            var data = {
                path    : '/',
                files   : []
            };
            
            if (!error)
                data.files = volumes.map(function(volume) {
                    return {
                        name: volume,
                        size: 'dir',
                        mode: '--- --- ---',
                        owner: 0
                    };
                });
            
            callback(error, data);
        });
    }
    
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
            
            current    = volume + ':' + (current || '\\');
        }
        
        return current;
    }
    
    function pathFromWin(current, root) {
        if (isWin && !root) {
            current = '/' + current.replace(':', '');
        } else {
            current = path.join(root, current);
        }
        
        return path;
    }
    
})();
