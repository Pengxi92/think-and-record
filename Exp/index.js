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

