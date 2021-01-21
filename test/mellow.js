'use strict';

const path = require('path');
const test = require('supertape');
const mockRequire = require('mock-require');
const {winToWeb} = require('..');

const {stopAll, reRequire} = mockRequire;

test('mellow: webToWin', (t) => {
    const {platform} = process;
    
    Object.defineProperty(process, 'platform', {
        value: 'win32',
    });
    
    mockRequire('path', path.win32);
    
    const {webToWin} = reRequire('..');
    const result = webToWin('/c/windows', '');
    const expected = 'c:\\windows';
    
    Object.defineProperty(process, 'platform', {
        value: platform,
    });
    
    stopAll();
    
    t.equal(result, expected);
    t.end();
});

test('mellow: webToWin: /', (t) => {
    const {platform} = process;
    
    Object.defineProperty(process, 'platform', {
        value: 'win32',
    });
    
    mockRequire('path', path.win32);
    
    const {webToWin} = reRequire('..');
    const result = webToWin('/', '');
    const expected = '/';
    
    Object.defineProperty(process, 'platform', {
        value: platform,
    });
    
    stopAll();
    
    t.equal(result, expected);
    t.end();
});

test('mellow: winToWeb', (t) => {
    const {platform} = process;
    
    Object.defineProperty(process, 'platform', {
        value: 'win32',
    });
    
    mockRequire('path', path.win32);
    
    const result = winToWeb('c:\\windows', '');
    const expected = '/c/windows';
    
    Object.defineProperty(process, 'platform', {
        value: platform,
    });
    
    stopAll();
    
    t.equal(result, expected);
    t.end();
});

test('mellow: webToWin: linux', (t) => {
    const {platform} = process;
    
    const {webToWin} = reRequire('..');
    const result = webToWin('/c/windows', '');
    const expected = '/c/windows';
    
    t.equal(result, expected);
    t.end();
});

test('mellow: winToWeb: linux', (t) => {
    const result = winToWeb('/home/user', '');
    const expected = '/home/user';
    
    stopAll();
    
    t.equal(result, expected);
    t.end();
});

test('mellow: webToWin: root and root not /', (t) => {
    const {platform} = process;
    
    const {webToWin} = reRequire('..');
    const result = webToWin('/windows', '/c/');
    const expected = '/c/windows';
    
    t.equal(result, expected);
    t.end();
});
