# 核心原理

* 开发环境下，模块以原生 esm 的形式被浏览器加载。

* 生产环境下，模块被 Rollup 以传统方式打包，而且做了很多默认优化。

* 开发和生产环境下共享同一套 Rollup 插件机制，所以单个模块的编译在开发和生产环境下是一致的。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c549367d994a4af694e339770f8be521~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)