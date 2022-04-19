# 基础

## 生命周期

> [官方文档：生命周期](https://ustbhuangyi.github.io/vue-analysis/v2/components/lifecycle.html#beforecreate-created)

## $nextTick

> [你真的理解$nextTick么](https://juejin.cn/post/6844903843197616136)

## Vuex

Vuex 主要用于 Vue，和 Flux，Redux 的思想很类似。

* Vuex 里面有一个全局的 Store，包含着应用中的状态 State
* 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
* 对比Redux的中间件，Vuex 加入了 Action 这个东西来处理异步。

> [Vuex、Flux、Redux、Redux-saga、Dva、MobX](https://zhuanlan.zhihu.com/p/53599723)

## 组件间传值

> [vue中8种组件通信方式, 值得收藏!](https://juejin.cn/post/6844903887162310669)

# 进阶

## MVVM

* 通过数据劫持+发布订阅模式，使用Object.defineProperty。

```js
Object.defineProperty(obj, 'music', {
    // 1. value: '七里香',
    configurable: true,     // 2. 可以配置对象，删除属性
    // writable: true,         // 3. 可以修改对象
    enumerable: true,        // 4. 可以枚举
    // ☆ get,set设置时不能设置writable和value，它们代替了二者且是互斥的
    get() {     // 5. 获取obj.music的时候就会调用get方法
        return song;
    },
    set(val) {      // 6. 将修改的值重新赋给song
        song = val;   
    }
});
```

* 数据劫持

```js
function Observe(data) {
    // 所谓数据劫持就是给对象增加get,set
    // 先遍历一遍对象再说
    for (let key in data) {     // 把data属性通过defineProperty的方式定义属性
        let val = data[key];
        observe(val);   // 递归继续向下找，实现深度的数据劫持
        Object.defineProperty(data, key, {
            configurable: true,
            get() {
                return val;
            },
            set(newVal) {   // 更改值的时候
                if (val === newVal) {   // 设置的值和以前值一样就不理它
                    return;
                }
                val = newVal;   // 如果以后再获取值(get)的时候，将刚才设置的值再返回去
                observe(newVal);    // 当设置为新值后，也需要把新值再去定义成属性
            }
        });
    }
}
```

* 编译

```js
// 创建Compile构造函数
function Compile(el, vm) {
    // 将el挂载到实例上方便调用
    vm.$el = document.querySelector(el);
    // 在el范围里将内容都拿到，当然不能一个一个的拿
    // 可以选择移到内存中去然后放入文档碎片中，节省开销
    let fragment = document.createDocumentFragment();
    
    while (child = vm.$el.firstChild) {
        fragment.appendChild(child);    // 此时将el中的内容放入内存中
    }
    // 对el里面的内容进行替换
    function replace(frag) {
        Array.from(frag.childNodes).forEach(node => {
            let txt = node.textContent;
            let reg = /\{\{(.*?)\}\}/g;   // 正则匹配{{}}
            
            if (node.nodeType === 3 && reg.test(txt)) { // 即是文本节点又有大括号的情况{{}}
                console.log(RegExp.$1); // 匹配到的第一个分组 如： a.b, c
                let arr = RegExp.$1.split('.');
                let val = vm;
                arr.forEach(key => {
                    val = val[key];     // 如this.a.b
                });
                // 用trim方法去除一下首尾空格
                node.textContent = txt.replace(reg, val).trim();
            }
            // 如果还有子节点，继续递归replace
            if (node.childNodes && node.childNodes.length) {
                replace(node);
            }
        });
    }
    
    replace(fragment);  // 替换内容
    
    vm.$el.appendChild(fragment);   // 再将文档碎片放入el中
}
```

* 发布订阅

```js
// 发布订阅中心
function Dep() {
    // 一个数组(存放函数的事件池)
    this.subs = [];
}
Dep.prototype = {
    addSub(sub) {   
        this.subs.push(sub);    
    },
    notify() {
        // 绑定的方法，都有一个update方法
        this.subs.forEach(sub => sub.update());
    }
};

// 监听器
function Watcher(fn) {
    this.fn = fn;   // 将fn放到实例上
}
Watcher.prototype.update = function() {
    this.fn();  
};

let watcher = new Watcher(() => console.log(111));  // 
let dep = new Dep();
dep.addSub(watcher);    // 将watcher放到数组中,watcher自带update方法， => [watcher]
dep.addSub(watcher);
dep.notify();   //  111, 111
```

* 数据更新

```js
function replace(frag) {
    // 省略...
    // 替换的逻辑
    node.textContent = txt.replace(reg, val).trim();
    // 监听变化
    // 给Watcher再添加两个参数，用来取新的值(newVal)给回调函数传参
    new Watcher(vm, RegExp.$1, newVal => {
        node.textContent = txt.replace(reg, newVal).trim();    
    });
}

// 重写Watcher构造函数
function Watcher(vm, exp, fn) {
    this.fn = fn;
    this.vm = vm;
    this.exp = exp;

    // 添加一个事件
    Dep.target = this; // 这里我们先定义一个属性

    let arr = exp.split('.');
    let val = vm;
    arr.forEach(key => {    // 取值
       val = val[key];     // 获取到this.a.b，默认就会调用get方法，用于触发Observe的get逻辑
    });

    Dep.target = null;
}

// 设置Observe中的Dep
function Observe(data) {
    let dep = new Dep();
    // 省略...
    Object.defineProperty(data, key, {
        get() {
            Dep.target && dep.addSub(Dep.target);   // 将watcher添加到订阅事件中 [watcher]
            return val;
        },
        set(newVal) {
            if (val === newVal) {
                return;
            }
            val = newVal;
            observe(newVal);
            dep.notify();   // 让所有watcher的update方法执行即可
        }
    })
}
```

综上，就实现了MVVM逻辑。在此基础上，可以实现元素的`v-model`等逻辑，不过是针对特定场景做判断处理。

> [不好意思！耽误你的十分钟，让MVVM原理还给你](https://juejin.cn/post/6844903586103558158)

## Proxy比defineproperty的优势

* Object.defineProperty 有一个缺陷是无法监听数组变化

  * 通过索引访问或设置对应元素的值时，可以触发 getter 和 setter 方法
  * 通过 push 或 unshift 会增加索引，对于新增加的属性，需要再手动初始化才能被 observe
  * 通过 pop 或 shift 删除元素，会删除并更新索引，也会触发 setter 和 getter 方法

* Object.defineProperty 只能劫持对象的属性，而 Proxy 是直接代理对象

* Object.defineProperty 对新增属性需要手动进行 Observe

* Proxy支持 13 种拦截操作，这是 defineProperty 所不具有的

* 新标准性能红利

* Proxy 兼容性差

> [为什么Vue3.0不再使用defineProperty实现数据监听？](https://mp.weixin.qq.com/s/O8iL4o8oPpqTm4URRveOIA)

## Virtual DOM

当我们频繁的去做 DOM 更新，会产生一定的性能问题，而 Virtual DOM 就是用一个原生的 JS 对象去描述一个 DOM 节点。

```js
export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  fnScopeId: ?string; // functional scope id support

  ...
}
```

Virtual DOM 除了它的数据结构的定义，映射到真实的 DOM 实际上要经历 VNode 的 create、diff、patch 等过程。

Virtual DOM 的更新，就是根据 type 生成对应的 DOM，把 data 里定义的 各种属性设置到 DOM 上。

> [Vue Virtual DOM 源码剖析](https://ustbhuangyi.github.io/vue-analysis/v2/data-driven/virtual-dom.html)

## Virtual DOM diff

我们先根据真实DOM生成一颗virtual DOM，当virtual DOM某个节点的数据改变后会生成一个新的Vnode，然后Vnode和oldVnode作对比，发现有不一样的地方就直接修改在真实的DOM上，然后使oldVnode的值为Vnode。

* 首先比较两个根节点是否值得比较，不一样就直接替换

```js
function sameVnode (a, b) {
  return (
    a.key === b.key &&  // key值
    a.tag === b.tag &&  // 标签名
    a.isComment === b.isComment &&  // 是否为注释节点
    // 是否都定义了data，data包含一些具体信息，例如onclick , style
    isDef(a.data) === isDef(b.data) &&  
    sameInputType(a, b) // 当标签是<input>的时候，type必须相同
  )
}
```

* 当两个根节点值得比较
  * 当都有文本节点时，比较两个阶段的文本节点是否相等
  * 没有文本节点时，比较下一层的子节点。若一个有，另一个没有，则进行增补操作
  * 若都有子节点，则updateChildren子节点（重点）:

    1. 当旧首部和新首部，旧尾部和新尾部比较，相同就复用原节点，并把指针向中间靠拢
    2. 若都不相同，则旧首部和新尾部，旧尾部和新首部比较，若相同则复用原节点，并把指针向中间靠拢
    3. 若都没有成功的，但是新旧节点都存在key，则判断新首部的key是否在旧节点中存在，若存在，则复用原节点，并把新首部指针向中间靠拢；若不存在，则使用新首部节点，并把新首部指针向中间靠拢
    4. 若四次比较都没有相等的情况，则直接使用新节点
    5. 若存在指针移动的情况，则当旧首部的指针>旧尾部的指针，轮询结束，直接插入未轮询的新节点；当新首部的指针>新尾部的指针，轮询也结束，直接删除未轮询的旧节点。

> [面试官: 你对虚拟DOM原理的理解?](https://juejin.cn/post/6844903902429577229)<br>
[详解vue的diff算法](https://juejin.cn/post/6844903607913938951)

## Vue CLI 3
