# 前言

`instanceof`用于判断右侧函数的原型对象（`prototype`）是否在左侧对象的原型链上面。

# 模拟

根据上文，我们可以得出`instanceof`的判断队则是：沿着左侧对象的`proto`这条线来向上找，如果这条线的某一个对象为右侧函数的`prototype`，那么就返回true。如果找到终点还未重合，则返回false。

```js
function myInstanceof(left, right) {
  /**
   * __proto__和constructor属性是对象所独有
   * prototype是函数所独有，从一个函数指向一个对象
   * 详细可参考这里：https://blog.csdn.net/cc18868876837/article/details/81211729
   * */
  let leftProto = left.__proto__;
  const rightProto = right.prototype;

  while(true) {
    if (leftProto === null) {
      // 到顶层了
      return false;
    }

    if (leftProto === rightProto) {
      return true;
    } else {
      leftProto = leftProto.__proto__;
    }
  }
}

const a = [];

myInstanceof(a, Array);
```
