(function() {
    'use strict';

    var isWin       = process.platform === 'win32',
        Util        = require('util-io'),
        
        win         = require('win32'),
        flop        = require('flop');
    
    exports.read            = read;
    exports.convertPath     = convertPath;
    
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
    
    function convertPath(path) {
        var volume;
        
        Util.checkArgs(arguments, ['path']);
        
        if (isWin && path !== '/') {
            volume  = path[1];
            path    = path.split('')
                          .slice(2)
                          .join('');
            
            path    = volume + ':' + (path || '\\');
        }
        
        return path;
    }
})();
