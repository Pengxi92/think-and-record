/**
 * 对象遍历
 */

var symbol1 = Symbol();
var symbol2 = Symbol();
var objProto = {
  [symbol1]: 'symbol1',
  year: 12,
  5: '5',
  4: '4',
  [symbol2]: 'symbol2',
  name: '张三',
};

objProto = Object.defineProperty(objProto, 'enumerable', {
  value: 123,
  writable: true,
  enumerable: false,
  configurable: true,
})

var obj = Object.create(objProto);

console.log(objProto.enumerable); // 123
console.log(objProto); // { '4': '4', '5': '5', year: 12, name: '张三', [Symbol()]: 'symbol1', [Symbol()]: 'symbol2' }

// for...in 包含对象自身的和继承的可枚举属性（不含 Symbol 属性）
var arr = [];
for (x in obj) {
  arr.push(x);
}
console.log(arr); // [ '4', '5', 'year', 'name' ]

// Object.keys 包含对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名
console.log(Object.keys(objProto)); // [ '4', '5', 'year', 'name' ]
console.log(Object.keys(obj)); // []

// Object.getOwnPropertyNames 包括对象自身的（不含继承的）所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名
console.log(Object.getOwnPropertyNames(objProto)); // [ '4', '5', 'year', 'name', 'enumerable' ]
console.log(Object.getOwnPropertyNames(obj)); // []

// Object.getOwnPropertySymbols 包含对象自身的所有 Symbol 属性的键名
console.log(Object.getOwnPropertySymbols(objProto)); // [ Symbol(), Symbol() ]
// console.log(objProto[Object.getOwnPropertySymbols(objProto).slice(-1)]);

console.log(Object.getOwnPropertySymbols(obj)); // []

// Reflect.ownKeys 包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举
console.log(Reflect.ownKeys(objProto)); // [ '4', '5', 'year', 'name', 'enumerable', Symbol(), Symbol() ]
console.log(Reflect.ownKeys(obj));

// Object.values 包含对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的值
console.log(Object.values(objProto)); // [ '4', '5', 12, '张三' ]
console.log(Object.values(obj)); // []

// Object.entries 包含对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的值
console.log(Object.entries(objProto)); // [ [ '4', '4' ], [ '5', '5' ], [ 'year', 12 ], [ 'name', '张三' ] ]
console.log(Object.entries(obj)); // []
