#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var cssToJs = require('rn-css-transform');

/**
 * 读取文件 返回 Promise 对象
 */
var readFile = function(fileName) {
    return new Promise(function(resolve, reject) {
        fs.readFile(fileName, function(error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
};

/**
 * 读取文件夹
 */
var readDir = function(path) {
    return new Promise(function(resolve, reject) {
        fs.readdir(path, function(error, files) {
            if (error) reject(error);
            resolve(files);
        });
    });
};

/**
 * 文件或者路径状态
 */
var fileStat = function (path) {
    return new Promise(function(resolve, reject) {
        fs.stat(path, function(error, stats) {
            if (error) reject(error);
            resolve(stats);
        });
    });
};


var walk = function (filePath, handleFile) {
    fileStat(filePath).then(function (stats) {
        if (stats.isFile()) {
            handleFile(filePath);
            return;
        }

        readDir(filePath).then(function (files) {
            files.forEach(function(item) {
                var tmpPath = path.resolve(filePath, item);

                fileStat(tmpPath).then(function (stats) {
                    if (stats.isDirectory()) {
                        return walk(tmpPath, handleFile);
                    }
                    return handleFile(tmpPath);
                });
            });
        });
    }).catch(function (err) {
        console.log(err);
    });
}

var args = process.argv.slice(2); 

// simple regExp
var r_css  = /([a-zA-Z0-9-_\s\.\#\>\+]+)\{([^\{\}]+)\}/g;

walk(args[0] || process.cwd(), function (file) {
    if (!/css$/.test(file)) return;

    readFile(file).then(function (data) {
        var obj = {},
            temp = null,
            selector = '';

        while(temp = r_css.exec(data.toString())) { 
            selector = _.camelCase(_.trim(temp[1]));
            obj[selector] = cssToJs(_.trim(temp[2]));
        }

        fs.writeFile(file + '.js', getStyle(obj), (err) => {
            if (err) throw err;
        });

    }).catch(function (err) {
        console.log(err);
    });
});

function getStyle(css) {
    return (`
/**
 * create by react-native-css-transform
 * see: https://github.com/AngusFu/react-native-css-transform
 */

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create(${JSON.stringify(css, null, 4)});

export default styles;
`
    );
};
