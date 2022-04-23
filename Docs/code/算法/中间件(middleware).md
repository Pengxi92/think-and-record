# 题目
let middleware = []
middleware.push((next) => {
console.log(1)
setTimeout(next, 0);
// next()
console.log(1.1)
})
middleware.push((next) => {
console.log(2)
next()
console.log(2.1)
})
middleware.push((next) => {
console.log(3)
next()
console.log(3.1)
})
let fn = compose(middleware)
fn()
// /*
// 1
// 2
// 3
// 3.1
// 2.1
// 1.1
// */
//实现 compose

# 计算
这里本质上实现的是中间件(middleware)先进后出的洋葱模式效果，具体可以参考kop-compose。

> [koa之koa-compose](https://blog.csdn.net/kk3909/article/details/105699973)<br>
[聊聊大前端领域 Middleware 的几种实现方式？](https://blog.csdn.net/xgangzai/article/details/117341128)