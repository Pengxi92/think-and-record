# 个人理解Vue和React区别

> [个人理解Vue和React区别](https://lq782655835.github.io/blogs/vue/diff-vue-vs-react.html)

1. 核心思想不同

Vue早期定位是尽可能的降低前端开发的门槛；React早期口号是Rethinking Best Practices。

> 以React推崇函数式编程（纯组件），数据不可变以及单向数据流。函数式编程最大的好处是其稳定性（无副作用）和可测试性（输入相同，输出一定相同），所以通常大家说的React适合大型应用，根本原因还是在于其函数式编程。

2. 组件实现不同

3. 响应式原理不同

Vue依赖收集，自动优化，数据可变；React基于状态机，手动优化。

4. diff算法不同