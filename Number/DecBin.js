// 将十进制整数转为二进制：通过除2求余直到商为0，再顺序倒过来
function integerDec2bin(integer) {
  const numberArray = [];
  while (integer >0) {
    var number1 = integer % 2;
    numberArray.unshift(number1);
    integer = Math.floor(integer/2);
  }

  return numberArray.join('');
}

// 将十进制小数转为二进制：通过乘2取整数部分，直到小数部分为0
function decimalDec2bin(decimals) {
  const numberArray = ['0', '.'];
  while (decimals !== 0) {
    var dNumber = decimals * 2;
    var intNum = Math.floor(dNumber);
    numberArray.push(intNum);
    decimals = dNumber - intNum;
  }

  return numberArray.join('');
}

console.log(decimalDec2bin(0.14));

console.log(decimalDec2bin(0.14).split('').splice(0, 54).join(''));

// 将二进制整数转为时进制：
function integerDec10bin(integer) {
  return parseInt(integer, 2);
}

// 将二进制小数转为十进制：通过乘2取整数部分，直到小数部分为0
function decimalDec10bin(decimals) {
  var numArr = decimals.toString().split(".");
  if (numArr.length > 1) {
    return numArr[1].split('').reduce(function(total, val, idx) {    
      return 1 * total + val * Math.pow(2, -1 * idx - 1);
    }, 0);
  }
  return '';
}

console.log(decimalDec10bin(decimalDec2bin(0.14)));
