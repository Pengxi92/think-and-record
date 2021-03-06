# 1. HTML标签&语义化

> 参考资料：[《重学前端》笔记--html标签分类](https://juejin.cn/post/6876768860024864776)

# 2. DOM 和 BOM

DOM 指的是文档对象模型，它指的是把文档当做一个对象来对待，这个对象主要定义了处理网页内容的方法和接口。

BOM  指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。BOM
的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global（全局）
对象。

> [JavaScript学习总结（三）BOM和DOM详解](https://segmentfault.com/a/1190000000654274#articleHeader21)

# 3. 三种事件模型

* DOM0级模型 这种模型不会传播，所以没有事件流的概念，但是现在有的浏览器支持以冒泡的方式实现，它可以在网页中直接定义监听函数，也可以通过 js属性来指定监听函数。这种方式是所有浏览器都兼容的。

* IE 事件模型 在该事件模型中，一次事件共有两个过程，事件处理阶段，和事件冒泡阶段。事件处理阶段会首先执行目标元素绑定的监听事件，然后是事件冒泡阶段。这种模型通过 attachEvent 来添加监听函数，可以添加多个监听函数，会按顺序依次执行。

* DOM2 级事件模型 在该事件模型中，一次事件共有三个过程，第一个过程是事件捕获阶段。捕获指的是事件从 document 一直向下传播到目标元素，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。后面两个阶段和 IE 事件模型的两个阶段相同。这种事件模型，事件绑定的函数是 addEventListener，其中第三个参数可以指定事件是否在捕获阶段执行。

## 3.1 事件代理

由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。

## Event对象使用

* 阻止默认行为 event. preventDefault()
* 阻止冒泡 event.stopPropagation()
* 事件发出者 event.target
* 事件监听者 event.currentTarget

# Web Woker
