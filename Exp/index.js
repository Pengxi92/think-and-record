/**
 * 正则表达式
 */

 /**
  * 1.货币格式化。从个位数起，每三位之间加一个逗号，例如“10,000”
  */

var num = '10817422450823.12';

function transfer(num) {
  const fn = (match, $1, $2) => {
    console.log(match); // 10817422450823.
    console.log('$1', $1); // 10817422450823
    console.log('$2', $2); // .
    return $1.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + $2;
  }
  return num.replace(/^(\d*)(.)?/, fn);
}

console.log(transfer(num)); // 10,817,422,450,823.12

/**
 * 2.获取[]里的值
 */

var str="123[你的]456[我的]789";
var r = /^.+?\[(.+?)\].+\[(.+?)\].*$/;
var m = r.exec(str);

console.log(str.match(r));
// [ '123[你的]456[我的]789', '你的', '我的', index: 0, input: '123[你的]456[我的]789' ]

var str="123[你的]456[我的]789123[你的1]456[我的1]789";
var r1 = /\[(.*?)\]/g;
 
console.log(str.match(r1));
// [ '[你的]', '[我的]', '[你的1]', '[我的1]' ]
