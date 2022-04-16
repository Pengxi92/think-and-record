# call

`call`用于改变函数调用中的this的值，第一个参数为用于改变this的值，第二个及以后的参数为传入函数的参数。

```js
function test (unit) {
  console.log(`${this.sex}${unit}`);
}

test.call({ sex: 6 }, '岁');
```

`this`指向的是函数运行时所在的环境（即上下文），存在几种用法：

* 纯粹函数的调用，`this`代表的就是全局对象
* 作为对象方法的调用，`this`代表的就是这个上级对象
* 作为构造函数调用，`this`指的就是这个新对象，或者叫做实例
* 箭头函数中，`this`始终都是继承自函数定义时上级对象的`this`值。

那么，我们想改变`this`的值，就可以按照第2种case情况来进行处理：

```js
Function.prototype.myCall = function(content, ...args) {
  if (!content) {
    content = window;
  }

  const fn = Symbol();
  content[fn] = this;
  return content[fn](...args);
};

test.myCall({ sex: 6 }, '岁'); // 6岁
```

# apply

`apply`和`call`的用法类似，唯一的区别在于`apply`的第二个参数是数组，作为传入函数的参数。

根据上面的`call`，我们可以很容易的写出`apply`的模拟函数。

```js
Function.prototype.myApply = function(content, args) {
  if (!content) {
    content = window;
  }

  const fn = Symbol();
  content[fn] = this;
  return content[fn](...args);
};

test.myApply({ sex: 6 }, ['岁']); // 6岁
```

# bind

`bing`方法用于固定函数内的`this`值，可以使`apply`和`call`不生效。`bind`会创建一个新的函数，在`bind()`被调用时，这个新函数的`this`被指定为`bind()`的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```js
function test (name, unit) {
  console.log(`${name}已经${this.sex}${unit}`);
}

const testBind = test.bind({ sex: 9 }, 'Tom');

testBind.call({ sex: 6 }, '岁'); // Tom已经9岁
```

那么，我们为了模拟`bind`，可以通过闭包来实现：

```js
Function.prototype.myBind = function(content, ...args) {
  if (!content) {
    content = window;
  }

  const self = this;

  const resFn = function() {
    return self.call(content, ...args.concat(Array.from(arguments)));
  }

  return resFn;
};

const testBind = test.myBind({ sex: 9 }, 'Tom');

testBind.call({ sex: 6 }, '岁'); // Tom已经9岁
```

这里需要注意的一个点在于，`bind()`返回的函数，是可以被`new`操作符来调用的，这时的`this`并不是`bind`传递值。

```js
function testObj () {
  console.log(`name is ${this.name}`);
}

const a = new (testObj.bind({ name: 'Tom' })); // name is undefined
const b = new (testObj.myBind({ name: 'Tom' })); // name is Tom
```

所以，我们的`myBind`函数还需要进行改造，对`new`操作符这种case做单独处理。以下几种方法，可以用来判断函数是否为`new`操作符调用。

* 函数中`this`继承于该函数，即`this instanceof fn === true`
* 函数中`new.target`有值

```js
function Person() {
  console.log(this, Person, this instanceof Person);
  console.log(new.target);
  console.log(arguments.cell, this.constructor);
}

Person();
console.log('>>>>>> 下面是new调用 >>>>>>');
new Person();

// Window {...} ƒ Person() {...} false
// undefined
// undefined ƒ Window() { [native code] }

// >>>>>> 下面是new调用 >>>>>>

// Person {...}  ƒ Person() {...} true
// ƒ Person() {...}
// undefined ƒ Person() {...}
```

好了，现在我们知道了如何判断是否为`new`操作符调用，那么再继续进行`bing`函数改造：

```js
Function.prototype.myBind = function(content, ...args) {
  if (!content) {
    content = window;
  }

  const self = this;

  const resFn = function() {
    const newArgs = args.concat(Array.from(arguments));
    return new.target ? self(...newArgs) : self.call(content, ...newArgs);
  }

  // 针对构造函数，重置fn原方法的原型链到resFn
  resFn.prototype = Object.create(self.prototype);

  // 网上也有另一种更新原型链的方法
  // const noFun = function () { };
  // noFun.prototype = this.prototype;
  // resFn.prototype = new noFun();

  // 注：这里不直接使用resFn.prototype = this.prototype，是为了避免当修改resFn.prototype，不会污染this.prototype

  return resFn;
};

new (testObj.myBind({ name: 'Tom' })); // name is 
```
