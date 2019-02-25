/**
 * 数组去重
 */

var array = [1, 1, '1', '1'];
var array = [1, 1, '1', '1', null, null, undefined, undefined, new String('1'), new String('1'), /a/, /a/, NaN, NaN];
// 1. 双层循环
function unique1(array) {
  var res = [];
  for (var i = 0, arrLen = array.length; i < arrLen; i++) {
    var arr = array[i];
    for (var j = 0, resLen = res.length; j < resLen; j++) {
      if (res[j] === arr) {
        break;
      }
    }
    // res 遍历完毕，未触发break操作，即arr不存在res数组中
    if (j === res.length) {
      res.push(arr);
    }
  }
  return res;
}

console.log(unique1(array)); // [ 1, '1' ]

// 2. 使用indexOf简化双层循环
function unique2(array) {
  var res = [];
  for (var i = 0, arrLen = array.length; i < arrLen; i++) {
    var arr = array[i];
    if (res.indexOf(arr) === -1) {
      res.push(arr);
    }
  }
  return res;
}

console.log(unique2(array)); // [ 1, '1' ]

// 3. 使用reduce简化双循环操作
function unique3(array) {
  return array.reduce((res, val) => {
    if (res.indexOf(val) === -1) {
      res.push(val);
    }
    return res;
  }, []);
}

console.log(unique3(array)); // [ 1, '1' ]

// 4. 排序后去重
function unique4(array) {
  var array = array.sort();
  var res = [], seen = undefined;
  for (var i = 0, arrLen = array.length; i < arrLen; i++) {
    if (i === 0 || seen !== array[i]) {
      res.push(array[i]);
      seen = array[i];
    }
  }
  return res;
}

console.log(unique4(array)); // [ 1, '1' ]

// 5. filter
function unique5(array) {
  return array.filter(function(val, idx, arr) {
    return arr.indexOf(val) === idx;
  });
}

console.log(unique5(array)); // [ 1, '1' ]

// 6. Object 键值对
var array6 = [{value: 1}, {value: 1}, {value: 2}];
function unique6(array) {
  var obj = {};
  return array.filter(function(item, idx, arr) {
    var name = typeof item + JSON.stringify(item);
    return obj.hasOwnProperty(name) ? false : (obj[name] = true);
  });
}

console.log(unique6(array)); // [ 1, '1' ]
console.log(unique6(array6)); // [ { value: 1 }, { value: 2 } ]

// 7. ES6
function unique7(array) {
  return Array.from(new Set(array));
}

console.log(unique7(array)); // [ 1, '1' ]

function unique8(array) {
  return [...new Set(array)];
}

console.log(unique8(array)); // [ 1, '1' ]

function unique9(array) {
  var map = new Map();
  return array.filter((item) => !map.has(item) && map.set(item, item));
}

console.log(unique9(array)); // [ 1, '1' ]