/**
 * 字符串相关操作
 */

/**
 * 一.截取
 */
var str = '北京是中国的首都，有16,808平方公里';

/**
 * 1.String.slice
 * slice第一个参数代表开始位置,第二个参数代表结束位置的位置,截取出来的字符串的长度为第二个参数与第一个参数之间的差
 * 若参数值为负数,则将该值加上字符串长度后转为正值;
 * 若第一个参数等于大于第二个参数,则返回空字符串.
 */

console.log(str.slice(2, 4)); // 是中

console.log(str.slice(2, -2)); // 是中国的首都，有16,808平方

// 等价于
console.log(str.slice(2, 18)); // 是中国的首都，有16,808平方

console.log(`[${str.slice(5, 1)}]`); // []

/**
 * 2.Sting.substring
 * 第一个参数代表开始位置,第二个参数代表结束的位置;
 * 若参数值为负数,则将该值转为0;
 * 两个参数中,取较小值作为开始位置,截取出来的字符串的长度为较大值与较小值之间的差.
 */

console.log(str.substring(2, 4)); // 是中

console.log(str.substring(2, -4)); // 北京

// 等价于
console.log(str.substring(0, 2));

/**
 * 3.String.substr
 * 第一个参数代表开始位置,第二个参数代表截取的长度；
 * 若第一个参数为负数，将该值加上字符串长度后转为正值;若第二个参数为负数，则该值为0，返回的值为空
 */

console.log(str.substr(2, 4)); // 是中国的

console.log(str.substr(-2, 4)); // 公里

// 等价于
console.log(str.substr(18, 4));

console.log(`[${str.substr(2, -4)}]`); // []

// 等价于
console.log(`[${str.substr(2, 0)}]`);
