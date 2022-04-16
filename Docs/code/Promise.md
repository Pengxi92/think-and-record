# 前言

`Promise`是现在的异步回调解决方案，使用链式调用来执行异步返回的步骤。

# 模拟

首先，我们知道生成`Promise`时，会传入一个函数，有`resolve`和`reject`两个参数。当函数触发`resolve`时，`Promise`会执行步骤`then`里面的逻辑，表示正常；当函数触发`reject`时，`Promise`会执行步骤`catch`里面的逻辑，表示异常；无论正常还是异常，都会执行步骤`finally`里面的逻辑。

此外，当`resolve`或者`reject`触发后，当前`Promise`对象的状态已经固定，链式步骤的执行也会固定，即会一直只执行`then`或者`catch`。

所以，我们先在`Promise`内添加了一个状态标记。

```js
class Mypromise {
  state = 'pending'; // 状态

  thenFuns = []; // 注册的成功后的步骤
  thenArgs = []; // 成功后的返回值
  failFuns = []; // 注册的失败后的步骤
  failArgs = []; // 失败后的返回值

  constructor(fn) {
    if (this.isFunction(fn)) {
      try {
        fn(this.resolve, this.reject);
      } catch(err) {
        this.reject(err);
      }
    }
  }

  isFunction(fn) {
    return typeof fn === 'Function'
  }

  resolve(...args) {
    if (this.state !== "pending") return;
    this.thenArgs = args;
    this.state = 'succ';
    // 执行注册的成功后的步骤。为了保证then事件先注册，使用setTimeout，下同
    setTimeout(() => {
      this.thenFuns.forEach(item => item(...args));
    }, 0);
  }

  reject(...args) {
    if (this.state !== "pending") return;
    this.state = 'fail';
    this.failArgs = args;
    // 执行注册的成功后的步骤
    setTimeout(() => {
      this.failFuns.forEach(item => item(...args));
    }, 0);
  }
}
```

接下来，由于`then`的是链式调用的，所以`then`方法需要返回一个`Promise`对象。这里也按照当前`Promise`的状态触发不同的逻辑。

```js
class Mypromise {
  ...

  then(resolveCallback, rejectCallback) {
    return new Mypromise((resolve, reject) => {
      if (this.isFunction(resolveCallback)) {
        if (this.state === "pending") {
          const thenFn = (val) => {
            const thenRes = resolveCallback(val)
            thenRes instanceof Mypromise ? thenRes.then(resolve, reject) : resolve(thenRes);
          };
          // 注册成功的步骤
          this.thenFuns.push(thenFn);
        } else if (this.state === 'succ') {
          thenFn(this.thenArgs)
        }
      }

      if (this.isFunction(rejectCallback)) {
        if (this.state === "pending") {
          const failFn = (val) => {
            const failRes = rejectCallback(val)
            failRes instanceof Mypromise ? failRes.then(resolve, reject) : reject(failRes);
          };
          // 注册失败的步骤
          this.failFuns.push(failFn);
        } else if (this.state === 'succ') {
          failFn(this.failFuns)
        }
      }
    });
  }
}
```

现在我们就已经完成了`Promise`的基本功能，下面再了解一些常用的方法。

```js
class Mypromise {
  ...

  // 返回多个promise的回调
  static all(promiseArr) {
    const res = (promiseArr || []).map(() => null);
    return new Mypromise((resolve, reject) => {
      (promiseArr || []).forEach((item, idx) => {
        item.then((res) => {
          res[idx] = res;
          // 判断是否全部都返回了，全部触发resolve，则all触发resolve
          if (res.filter(r => !!r).length === res.length) {
            resolve(res);
          }
        }).catch(err => {
          res[idx] = err;
          // 一个promise触发reject，则all触发reject
          reject(res);
        })
      })
    })
  }

  // 多个promise的回调完成后，再触发resolve
  static allSettled(promiseArr) {
    const res = (promiseArr || []).map(() => null);
    return new Mypromise((resolve) => {
      (promiseArr || []).forEach((item, idx) => {
        item.then((res) => {
          res[idx] = res;
        }).catch(err => {
          res[idx] = err;
        }).finally(() => {
          // 判断是否全部都返回了，则all触发resolve
          if (res.filter(r => !!r).length === res.length) {
            resolve(res);
          }
        })
      })
    })
  }

  // 多个promise中只要有一个回调完成后，则返回该回调结果
  static race(promiseArr) {
    const res = null;
    return new Mypromise((resolve, reject) => {
      (promiseArr || []).forEach((item) => {
        Promise.resolve(item).then(resolve).catch(reject);
      })
    })
  }
}
```
