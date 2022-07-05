
![](https://mmbiz.qpic.cn/mmbiz_png/EO58xpw5UMO5o6m7MzbCAbXRYJGekcC98XV28Oia6K9DUwHN2sAp1jdBDa0UFFFl6COoONvIf9xOh0oG1sicnUnQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

# 必须属性

* name 项目的名称
  * 名称的长度必须小于或等于214个字符，不能以“.”和“_”开头，不能包含大写字母（这是因为当软件包在npm上发布时，会基于此属性获得自己的URL，所以不能包含非URL安全字符（non-url-safe））
  * 名称不能和其他模块的名称重复，可以使用npm view命令查询模块明是否重复，如果不重复就会提示404

* version 版本号
  * 格式为：主版本号.次版本号.修订号，通常情况下，修改主版本号是做了大的功能性的改动，修改次版本号是新增了新功能，修改修订号就是修复了一些bug
  * 先行版本通过会加在版本号的后面，通过“-”号连接以点分隔的标识符和版本编译信息：内部版本（alpha）、公测版本（beta）和候选版本（rc，即release candiate）

# 描述信息

* description 描述项目，是一个字符串
* keywords 项目关键字，是一个字符串数组
* author 作者，展示类型一种是字符串，一种是对象
* contributors 项目的贡献值，是一个数组，数组元素同author
* homepage 项目的主地址，是一个字符串
* repository 代码仓库，展示类型一种是字符串，一种是对象
* bugs 项目提交问题的地址，该字段是一个对象

# 依赖配置

* dependencies 声明的是项目的**生产环境**中所必须的依赖包
  * 当在安装依赖时使用--save参数，或者默认安装时，会将npm包写入dependencies属性
  * dependencies是一个对象，key表示npm包，value对应包的版本
    * 固定版本 4.0.3就是固定版本，安装时只安装这个指定的版本
    * 波浪号 比如~4.0.3，表示安装4.0.x的最新版本（不低于4.0.3），也就是说**安装时不会改变主版本号和次版本号**
    * 插入号 比如^17.0.2，表示安装17.x.x的最新版本（不低于17.0.2），也就是说**安装时不会改变主版本号。如果主版本号为0，那么插入号和波浪号的行为是一致的**
    * latest 最新的版本

* devDependencies 声明的是开发阶段需要的依赖包
  * 当npm install --save-dev（或者yarn add --dev），npm包会被自动插入到此列表中

* peerDependencies 用来供插件指定其所需要的主工具的版本

* optionalDependencies 如果需要在找不到包或者安装包失败时，npm仍然能够继续运行，则可以将该包放在optionalDependencies对象中，optionalDependencies对象中的包会覆盖dependencies中同名的包，所以只需在一个地方进行设置即可。

* bundledDependencies 一个数组，数组里可以指定一些模块，这些模块将在这个包发布时被一起打包。

* engines 在engines字段中说明具体的版本号，但是用户安装的版本不符合要求，也不影响依赖包的安装。

# 脚本配置

* scripts 内置的脚本入口
  * 除了运行基本的scripts命令，还可以结合pre和post完成前置和后续操作。比如dev命令，执行顺序是predev→dev→postdev。
  * 原理：npm中的bin会在node_modules/.bin中创建shell允许的脚本，并加入到PATH 变量，scripts中的命令即可以理解为执行这些脚本。详情见：[npm script 原理](https://juejin.cn/post/6846687601982701575#heading-11)

* config 配置scripts运行时的配置参数，会隐射到process.env.npm_package_config_xx中

# 文件&目录

* main 用来指定加载的入口文件
  * 那么当使用 require 导入npm包时，返回的就是main字段所列出的文件的module.exports 属性
  * 如果不指定该字段，默认是项目根目录下的index.js

* browser 定义 npm 包在 browser 环境下的入口文件

* module 定义 npm 包的 ESM 规范的入口文件
  * *.js 文件是使用 commonJS 规范的语法(require('xxx'))，*.mjs 是用 ESM 规范的语法(import 'xxx')
  * 在Web环境中，如果使用loader加载ESM（ES module），那么这三个配置的加载顺序是browser→module→main
  * 如果使用require加载CommonJS模块，则加载的顺序为main→module→browser
  * 如果Node环境中加载CommonJS模块，或者ESM，则只有main字段有效

* bin 指定各个内部命令对应的可执行文件的位置

* files 是一个数组，用来描述当把npm包作为依赖包安装时需要说明的文件列表
  * 当npm包发布时，files指定的文件会被推送到npm服务器中；如果指定的是文件夹，那么该文件夹下面所有的文件都会被提交
  * 如果有不想提交的文件，可以在项目根目录中新建一个.npmignore文件，并在其中说明不需要提交的文件，优先级大于files

* man 通过该指令可以查看 Linux 中的指令帮助、配置文件帮助和编程帮助等信息

* directories 用来规范项目的目录

# 发布配置

* private 设置为true，可防止我们意外地将私有库发布到npm服务器

* preferGlobal 表示当用户不把该模块安装为全局模块时，如果设置为true就会显示警告
  * 只是对用户进行提示，防止产生误解

* publishConfig 在模块发布时生效，用于设置发布时一些配置项的集合

* os 设置该npm包可以在什么操作系统使用，不能再什么操作系统使用

* cpu 限制用户的安装环境

* license 开源协议，开源协议表述了其他人获得代码后拥有的权利
  * MIT 可以拿你的代码做任何想做的事情，你也无需承担任何责任
  * Apache 类似于 MIT ，同时还包含了贡献者向用户提供专利授权相关的条款
  * GPL 修改项目代码的用户再次分发源码或二进制代码时，必须公布他的相关修改

# 第三方配置

* typings 用来指定TypeScript的入口文件，同main
  * `"typings": "types/index.d.ts",`

* eslintConfig eslint的配置可以写在单独的配置文件.eslintrc.json 中，也可以写在package.json文件的eslintConfig配置项中

* babel 指定Babel的编译配置

* unpkg 可以让 npm 上所有的文件都开启 cdn 服务，该CND服务由unpkg提供

* lint-staged lint-staged是一个在Git暂存文件上运行linters的工具，配置后每次修改一个文件即可给所有文件执行一次lint检查，通常配合gitHooks一起使用

* gitHooks 定义一个钩子，在提交（commit）之前执行ESlint检查
  * 在执行lint命令后，会自动修复暂存区的文件。修复之后的文件并不会存储在暂存区，所以**需要用git add命令将修复后的文件重新加入暂存区**

* browserslist 告知支持哪些浏览器及版本

> [关于前端大管家 package.json，你知道多少？](https://mp.weixin.qq.com/s/Np-tDI84_VTJPHAIAl8aGQ)<br>
[Node.js 进阶-你应该知道的 npm 知识都在这！ | 掘金征文](https://juejin.cn/post/6846687601982701575)