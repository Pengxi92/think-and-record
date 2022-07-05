# 基础

TypeScript是一个强类型的JavaScript超集，支持所有JS已有语法，支持面向对象编程的概念，如：类、接口、继承、泛型等。增加了静态类型，可以在编译脚本的时候检测错误，使得代码质量更好，更健壮。TypeScript需要编译为JS后再运行。

> [TS学习（一）--tsconfig.json配置](https://juejin.cn/post/6949490211243950116)

## 常用内置类型

* number
* string
* boolean
* object
* symbol
* never 永不存在的值的类型
* unknown 任何类型的值都可以赋值给unknown类型，但是**unknown只能赋值给unknown本身和any类型**
* any 动态的变量类型（丢失了类型检查的作用），**any也能赋值给其他类型**

## enum

使用枚举我们可以定义带名字的常量。

枚举转换为ES5代码时：

```ts
// 异构枚举
enum Char {
    A, B, C = "C", D = "D", E = 8, F
}

var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum[Enum["B"] = 1] = "B";
    Enum["C"] = "C";
    Enum["D"] = "D";
    Enum[Enum["E"] = 8] = "E";
    Enum[Enum["F"] = 9] = "F";
})(Enum || (Enum = {}));
```

> 常量枚举只能使用常量枚举表达式并且不同于常规的枚举，他们在编译阶段会被删除。常量枚举成员在使用的地方会被内联起来，之所以真可以这么做是因为，常量枚举不允许包含计算成员。

## interface（接口）和type（类型别名）

相同点：

* 都可以描述对象或者函数
* 都允许扩展（extends）

不同点：

* type类型别名，可以定义基础类型，元组等
* type不可以继承
* 接口创建了一个新的名字，可以在其它任何地方使用。 类型别名并不创建新名字—比如，错误信息就不会使用别名。
* type无法被实现implements，而interface可以被派生类实现
* type重名会抛出错误，interface重名是会产生合并

> [type 与 interface 的区别，你真的懂了吗？](https://mp.weixin.qq.com/s/J6xHq9g91_TLgQLE6P_Teg)

## 其他类型

```ts
// 函数
interface Say {
    (name: string): void;
}
let say: Say = (name: string): void => {};

// 数组
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 2, 3, 4];

// Class
interface Person {
    name: string;
    sayHi(name: string): string;
}
```

## 泛型

可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。

```ts
function identity<T>(arg: T): T {
    return arg;
}
```

# 进阶

## 联合类型

我们用竖线（ |）分隔每个类型，所以 number | string | boolean表示一个值可以是 number， string，或 boolean。

## 类型保护

联合类型适合于那些值可以为不同类型的情况。 但当我们想确切地了解是否为 Number 时怎么办？

* 使用类型断言

```ts
let pet = getSmallPet();

if ((<Fish>pet).swim) {
    (<Fish>pet).swim();
}
else {
    (<Bird>pet).fly();
}
```

* 自定义的类型保护

```ts
function isFish(pet: Fish | Bird): pet is Fish {
    return (<Fish>pet).swim !== undefined;
}
```

* typeof类型保护

```ts
if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
}
```

* instanceof类型保护

```ts
if (padder instanceof SpaceRepeatingPadder) {
    padder; // 类型细化为'SpaceRepeatingPadder'
}
```

## 常用符号

* ?. 可选链，遇到null和undefined可以立即停止表达式的运行。
* ?? 空值合并运算符，当左侧操作数为null或undefined时，其返回右侧的操作数，否则返回左侧的操作数。
* x! 非空断言运算符，x！将从x值域中排出null和undefined。
* !. 在变量名后添加，可以断言排除undefined和null。
* _ 数字分隔符，分隔符不会改变数字字面量的值，是人更容易读懂数字。例如 1_101_123。

## declare

declare是用来定义全局变量、全局函数、全局命名空间、js modules、class等。

```ts
declare global {
    interface Window {
        csrf: string;
    }
}
```

> [TS学习（二）--.d.ts声明文件](https://juejin.cn/post/6991061608386527239)

## implements 和 extends

* implements 使用该关键字的类将需要实现的需要实现的类的所有属性和方法。
* extends 子类会继承父类的所有属性和方法。

## 内置高级用法

* Record<k, v>

```ts
type Key = 'a' | 'b' | 'c';
const a: Record<Key, string> = {
    a: 'a',
    b: 'b',
    c: 'c'
}
```

* Eclude

```ts
type Foo = 'a' | 'b' | 'c';
type A = Exclude<Foo, 'a'>; // 'b' | 'c'
```

* Extract<T, U>

```ts
type Key = 'a' | 'b' | 'c';
type A = Extract<Key, 'a'>; // 'a'
```

* Omit<T, K>

```ts
type Keys = {
    a: string;
    b: number;
    c: boolean;
}
type A = Keys<Keys, 'a' | 'b'>; // {c: boolean}
```

* NonNullable<T>

```ts
type Foo = 'a' | 'b' | null | undefined;
type A = NonNullable<Foo>; 'a' | 'b'
```

* Partial<T> 将属性全部变为可选属性

```ts
type Foo = {
    a: string;
    b: number;
    c: boolean;
}
const a: Partial<Foo> = { b: 12 };
```

* Required<T> 把属性全部变为必须属性

```ts
type Foo = {
    a?: string;
    b?: number;
    c: boolean;
}
const a: Required<Foo> = {a: 'qwe'} // Error
const b: Required<Foo> = {a: '23', b: 1, c: false}; // Ok
```

## 映射

TypeScript 4.1 版本允许我们使用 as 子句对映射类型中的键进行重新映射。它的语法如下：

```ts
type MappedTypeWithNewKeys<T> = {
    [K in keyof T as NewKeyType]: T[K]
    //            ^^^^^^^^^^^^^
    //            这是新的语法！
}
```

* 用于为对象类型生成对应的 Getter 类型

```ts
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
};

interface Person {
    name: string;
    age: number;
    location: string;
}

type LazyPerson = Getters<Person>;
// {
//   getName: () => string;
//   getAge: () => number;
//   getLocation: () => string;
// }
```

* 通过返回 never 类型对键进行过滤

```ts
// Remove the 'kind' property
type RemoveKindField<T> = {
    [K in keyof T as Exclude<K, "kind">]: T[K]
};

interface Circle {
    kind: "circle";
    radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
//   type KindlessCircle = {
//       radius: number;
//   };
```

> [用了 TS 映射类型，同事直呼内行！](https://juejin.cn/post/7089943758543781896)

## 体操库

```ts
type DeepKeyOf<T> = T extends Record<string, any> ? {
    [k in keyof T]: k extends string ? k | `${k}.${DeepKeyOf<T[k]>}` : never;
}[keyof T] : never;

interface Stu {
  name: string;
  nest: {
    a: {
      b: number;
    };
    tt: {
      c: boolean;
    };
  };
  info: {
    score: number;
    grade: string;
  };
}

type res = DeepKeyOf<Stu>; // "name" | "nest" | "info" | "nest.a" | "nest.tt" | "nest.a.b" | "nest.tt.c" | "info.score" | "info.grade"
```

> [TS类型体操入门 —— 实现DeepKeyOf](https://mp.weixin.qq.com/s/ulElvX8zkSgPCGCKGMTIxQ)

## 3 种类型来源和 3 种模块语法

TypeScript 给 JavaScript 添加了类型信息，在编译时做类型检查。

除了在变量声明时定义类型外，TS 也支持通过 declare 单独声明类型。只存放类型声明的文件后缀是 d.ts。

TypeScript 有三种存放类型声明的地方：

* lib：内置的类型声明，包含 dom 和 es 的，因为这俩都是有标准的。
* @types/xx：其他环境的 api 类型声明，比如 node，还有 npm 包的类型声明
* 开发者写的代码：通过 include + exclude 还有 files 指定

其中，npm 包也可以同时存放 ts 类型，通过 packages.json 的 types 字段指定路径即可。

巧合的是，TS 声明模块的方式也是三种：

* namespace：最早的实现模块的方式，编译为声明对象和设置对象的属性的 JS 代码，很容易理解
* module：和 namespace 的 AST 没有任何区别，只不过一般用来声明 CommonJS 的模块，在 @types/node 下有很多
* es module：es 标准的模块语法，ts 额外扩展了 import type

dts 的类型声明默认是全局的，除非有 es module 的 import、export 的声明，这时候就要手动 declare global 了。为了避免这种情况，可以用 reference 的编译器指令。

> [TypeScript 深水区：3 种类型来源和 3 种模块语法](https://mp.weixin.qq.com/s/AsTrGLhipd32RrNUFHuD5A)