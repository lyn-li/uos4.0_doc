'use strict';

const fs = require('fs');
const path = require('path');
const bookPath = path.join(__dirname, '../book');

/*
 * - : 转换成空格
 * @ : 文件名中 @ 前面的部分将会删除
 */

const catalog = [];

function readOneByOne (level, dir) {
  let files = fs.readdirSync(dir);
  files
  .sort()
  .forEach( e => {
    if (isDir(dir, e)) {
      catalog.push( record(level, title(e), join(dir, e, e + '.md')) );
      readOneByOne(level + 1, join(dir, e));
    } else if (path.extname(e) === '.md') {
      catalog.push( record(level, title(e), join(dir, e)) );
    }
  });
}

/*
 * check directory after path.join
 */
function isDir () {
  return fs.statSync(join.apply(null, arguments)).isDirectory();
}

// Primitive

/*
 * alias for path.join()
 */
function join() {
  return path.join.apply(null, arguments);
}

function filename(file/* path, filename with/without ext */) {
  return file.replace(new RegExp(path.extname(file) + '$'), '');
}

function trim(str) {
  return str.replace(/^[\s]+/, '').replace(/[\s]+$/, '');
}

function bigCap(str/* string with or without trim */) {
  str = trim(str);
  return str.replace(/^[a-z]/, str[0].toUpperCase());
}

// Private

function title(file/* path, filename with/without ext */) {
  file = filename(file).replace(/^([\s\S]*@)/, '');
  return bigCap(file).replace(/\-/g, ' ');
}

function record(level, name, dir) {
  let space = '';
  for (let i = level - 1; i--;) {
    space += '    ';
  }
  dir = path.relative(join(__dirname, '../') ,dir);
  return `${space}* [${name}](${dir})`;
}

function wirteSummary(data) {
  return new Promise( (resolve, reject) => {
    fs.writeFile(join(__dirname, '../', 'SUMMARY.md'), data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

readOneByOne(1, bookPath);
wirteSummary(catalog.join('\n\r'));

