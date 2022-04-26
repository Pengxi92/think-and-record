# 基础

Loader 是一个node模块，会导出一个函数，用于 Webpack 在转换源模块（resource）时，将源模块转换成通用模块。

## Loader的引入

在配置文件中，通过`config.module.rules`来进行Loader引入。

```js
{
  ...,
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        //这里写 loader 的路径
        loader: path.resolve(__dirname, 'loaders/a-loader.js'), 
        options: {/* ... */}
      }]
    }]
  }
}

// loader 也可以直接写名字，但需要在resolveLoader中设置寻找loader的地址
{
  ...,
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        //这里写 loader 的路径
        loader: 'a-loader', 
      }]
    }]
  },
  resolveLoader: {
    // 告诉 webpack 该去那个目录下找 loader 模块
    modules: ['node_modules', path.resolve(__dirname, 'loaders')]
  }
}
```

## 基础使用

Loader 导出的函数，接收的唯一参数是一个包含源文件内容的字符串，可以称为 source。

一般情况下可以通过 return 返回一个值，是转化后的 source，可以是 string 或 buffer。如果要返回多个值，则通过调用 this.callback(err, values...) 来返回。

在异步 Loader 中你可以通过抛错来处理异常情况。

## 进阶使用

单一的 Loader 一般不一定能满足我们的需求，这时我们会串行使用多个 Loader 来达成我们的目的。

Webpack 规定 use 数组中 Loader 的执行顺序是从最后一个到第一个。

## 开发关注点

Webpack 提供的几点指南，它们按重要程度排序，注意其中有些点只适用特定情况。

* 单一职责
* 链式组合
  > 事实上串联组合中的 loader 并不一定要返回 JS 代码。只要下游的 loader 能有效处理上游 loader 的输出，那么上游的 loader 可以返回任意类型的模块。
* 模块化
* 无状态

  不应该在 loader 中保留状态。

* Loader 实用工具
  * loader-utils
  * schema-utils

## loader 的依赖

Loader 中用到了外部资源（也就是从文件系统中读取的资源），我们必须声明这些外部资源的信息。这些信息用于在监控模式（watch mode）下验证可缓存的 loder 以及重新编译。

```js
import path from 'path';

export default function(source) {
    var callback = this.async();
    var headerPath = path.resolve('header.js');

    this.addDependency(headerPath);

    fs.readFile(headerPath, 'utf-8', function(err, header) {
        if(err) return callback(err);
        //这里的 callback 相当于异步版的 return
        callback(null, header + "\n" + source);
    });
};
```

## 模块依赖

不同的模块会以不同的形式指定依赖，比如在 CSS 中我们使用 @import 和 url(...) 声明来完成指定。而模块系统有两种处理方案：

* 把不同的依赖声明统一转化为 require 声明。

* 通过 this.resolve 函数来解析路径。

> [手把手教你撸一个 Webpack Loader](https://juejin.cn/post/6844903555673882632)