'use strict';

const path = require('path');
const test = require('supertape');
const mockRequire = require('mock-require');
const {winToWeb} = require('..');

const {stopAll, reRequire} = mockRequire;
const {defineProperty} = Object;

test('mellow: webToWin', (t) => {
    const stopMockOs = mockOs('win32');
    mockRequire('path', path.win32);
    
    const {webToWin} = reRequire('..');
    const result = webToWin('/c/windows', '');
    const expected = 'c:\\windows';
    
    stopMockOs();
    stopAll();
    
    t.equal(result, expected);
    t.end();
});

test('mellow: webToWin: /', (t) => {
    const stopMockOs = mockOs('win32');
    mockRequire('path', path.win32);
    
    const {webToWin} = reRequire('..');
    const result = webToWin('/', '');
    const expected = '/';
    
    stopMockOs();
    stopAll();
    
    t.equal(result, expected);
    t.end();
});

test('mellow: winToWeb', (t) => {
    const stopMockOs = mockOs('win32');
    mockRequire('path', path.win32);
    
    const result = winToWeb('c:\\windows', '');
    const expected = '/c/windows';
    
    stopAll();
    stopMockOs();
    
    t.equal(result, expected);
    t.end();
});

test('mellow: winToWeb: windows: root /', (t) => {
    const stopMockOs = mockOs('win32');
    mockRequire('path', path.win32);
    
    const result = winToWeb('c:\\windows', '/');
    const expected = '/c/windows';
    
    stopAll();
    stopMockOs();
    
    t.equal(result, expected);
    t.end();
});

test('mellow: winToWeb: no root', (t) => {
    const stopMockOs = mockOs('win32');
    mockRequire('path', path.win32);
    
    const result = winToWeb('c:\\windows');
    const expected = '/c/windows';
    
    stopAll();
    stopMockOs();
    
    t.equal(result, expected);
    t.end();
});

test('mellow: webToWin: linux', (t) => {
    const stopMockOs = mockOs('linux');
    
    mockRequire('path', path);
    
    const {webToWin} = reRequire('..');
    const result = webToWin('/c/windows', '');
    const expected = '/c/windows';
    
    stopAll();
    stopMockOs();
    
    t.equal(result, expected);
    t.end();
});

test('mellow: winToWeb: linux', (t) => {
    const stopMockOs = mockOs('linux');
    mockRequire('path', path);
    
    const result = winToWeb('/home/user', '');
    const expected = '/home/user';
    
    stopAll();
    stopMockOs();
    
    t.equal(result, expected);
    t.end();
});

test('mellow: winToWeb: linux: no root', (t) => {
    const stopMockOs = mockOs('linux');
    mockRequire('path', path);
    
    const result = winToWeb('/home/user');
    const expected = '/home/user';
    
    stopAll();
    stopMockOs();
    
    t.equal(result, expected);
    t.end();
});

test('mellow: winToWeb: windows: no root', (t) => {
    const stopMockOs = mockOs('win32');
    const result = winToWeb('c:\\home\\user');
    const expected = '/c/home/user';
    
    stopMockOs();
    
    t.equal(result, expected);
    t.end();
});

test('mellow: webToWin: windows: root and root not /', (t) => {
    const stopMockOs = mockOs('win32');
    mockRequire('path', path.win32);
    
    const {webToWin} = reRequire('..');
    const result = webToWin('/windows', 'c:\\');
    const expected = 'c:\\windows';
    
    stopAll();
    stopMockOs();
    
    t.equal(result, expected);
    t.end();
});

function mockOs(value) {
    const {platform} = process;
    
    defineProperty(process, 'platform', {
        value,
    });
    
    return () => {
        defineProperty(process, 'platform', {
            value: platform,
        });
    };
}

