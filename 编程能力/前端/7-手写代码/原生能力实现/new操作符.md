# 前言

`new`运算符用于创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例，会执行以下步骤：

* 创建一个空的JavaScript对象A
* 链接该对象A到构造函数的`prototype`对象上
* 将对象A作为构造函数的上下文（即`this`）来执行
* 如果构造函数没有返回对象，则返回`this`（即对象A）

```js
function Duck(name, color, age) {
  this.name = name;
  this.color = color;
  this.age = age;
}

Duck.prototype.getName = function() {
  return this.name;
}

const duck = new Duck('大黄', 'yellow', 3);

duck.getName(); // 大黄
```

# 模拟实现

那么，按照上面的步骤我们来模拟`new`运算符。

```js
function newFn (fn, ...args) {
  // 第一步
  const resObj = {};

  // 第二步
  resObj.__proto__ = fn.prototype;

  // 第三步
  const fnRes = fn.call(resObj, ...args);

  // 第四步
  return typeof fnRes === 'object' ? fnRes : resObj;
}

const newDuck = newFn(Duck, '大黄', 'yellow', 3);

newDuck.getName(); // 大黄
```
