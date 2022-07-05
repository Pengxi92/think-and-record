# 1. 盒模型介绍

CSS3 中的盒模型有以下两种：标准盒模型、IE（替代）盒模型。

两种盒子模型都是由 `content` + `padding` + `border` + `margin` 构成，其大小都是由 `content` + `padding` + `border` 决定的，但是盒子内容宽/高度（即 width/height）的计算范围根据盒模型的不同会有所不同：

* 标准盒模型：只包含`content`。
* IE（替代）盒模型：`content` + `padding` + `border`。

可以通过`box-sizing`来改变元素的盒模型：

* content-box ：标准盒模型（默认值）。
* border-box ：IE（替代）盒模型。

# 2. css 选择器和优先级

> 参考资料：[《重学前端》笔记--CSS 选择器](https://juejin.cn/post/6895718325142159368)

# 3. BFC和IFC

> 参考资料：[《重学前端》笔记--CSS排版](https://juejin.cn/post/6902771060979007496)

# 4. CSS 布局

* 两栏布局（左侧固定 + 右侧自适应布局）
* 实现圣杯布局和双飞翼布局（经典三分栏布局）
* 水平垂直居中多种实现方式
* flex 布局

> 参考资料：[做了一份前端面试复习计划，保熟～](https://juejin.cn/post/7061588533214969892#heading-21)

# 具体CSS设置

* position 属性的值有哪些及其区别
* 隐藏页面中某个元素的方法
* 用CSS实现三角符号
* 清除浮动的方式

# 移动端篇

* 如何使用rem或viewport进行移动端适配
* 移动端1px怎么解决的
* rem时挂在哪里的，字体怎么解决的
