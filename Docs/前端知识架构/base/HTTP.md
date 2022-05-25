# HTTP演进历史

* HTTP/0.9：GET，无状态的特点形成

* HTTP/1.0：支持 POST，HEAD，添加了请求头和响应头，支持任何格式的文件发送，添加了状态码、多字符集支持、多部分发送、权限、缓存、内容编码等

* HTTP/1.1：
  * 缓存处理，引入了tag等协商缓存策略
  * 带宽优化及网络连接的使用，使用range进行资料分片
  * 长连接，默认开启keep-alive，在一个TCP连接上可以传送多个HTTP请求和响应，减少了建立和关闭连接的消耗和延迟

* HTTP/2.0：多路复用（一次 TCP 连接可以处理多个请求），服务器主动推送，stream 传输
  * 新的二进制格式，协议解析决定采用二进制格式
  * 多路复用，每一个request都是是用作连接共享机制的
  * header压缩，通讯双方各自cache一份header fields表
  * 服务端推送

> HTTP2.0的多路复用和HTTP1.X中的长连接复用有什么区别？<br>
HTTP/1.1 Pipeling解决方式为，**若干个请求排队串行化单线程处理**，后面的请求等待前面请求的返回才能获得执行机会，一旦有某请求超时等，后续请求只能被阻塞，毫无办法，也就是人们常说的线头阻塞;HTTP/2多个请求可同时在**一个连接上并行执行**。某个请求任务耗时严重，不会影响到其它连接的正常执行；

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eff83eaed19e4823ae51886af64bd86e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

> [HTTP1.0、HTTP1.1 和 HTTP2.0 的区别](https://mp.weixin.qq.com/s/GICbiyJpINrHZ41u_4zT-A?)

* HTTP/3：基于 UDP 实现了 QUIC 协议
  * 避免包阻塞，不同的流之间的数据传输真正实现了相互独立互不干扰，某个流的数据包在出问题需要重传时，并不会对其他流的数据包传输产生影响。
  * 快速重启会话，普通基于tcp的连接，是基于两端的ip和端口和协议来建立的。在网络切换场景，例如手机端切换了无线网，使用4G网络，会改变本身的ip，这就导致tcp连接必须重新创建。而QUIC协议使用特有的UUID来标记每一次连接，**在网络环境发生变化的时候，只要UUID不变，就能不需要握手，继续传输数据**。

* HTTPS：HTTP + TLS（ 非对称加密 与 对称加密 ）

  1. 客户端发出 https 请求，请求服务端建立 SSL 连接
  2. 服务端收到 https 请求，申请或自制数字证书，得到公钥和服务端私钥，并将公钥发送给客户端
  3. 户端验证公钥，不通过验证则发出警告，通过验证则产生一个随机的客户端私钥
  4. 客户端将公钥与客户端私钥进行对称加密后传给服务端
  5. 服务端收到加密内容后，通过服务端私钥进行非对称解密，得到客户端私钥
  6. 服务端将客户端私钥和内容进行对称加密，并将加密内容发送给客户端
  7. 客户端收到加密内容后，通过客户端私钥进行对称解密，得到内容

> [前端基础篇之HTTP协议](https://juejin.cn/post/6844903844216832007)<br>
[（建议精读）HTTP灵魂之问，巩固你的 HTTP 知识体系](https://juejin.cn/post/6844904100035821575)<br>

# HTTP基础

## http缺点

* 无状态

* 明文传输

* 队头阻塞问题

## TCP 和 UDP的差别

* TCP是面向连接的，UPD是无连接的，即发送数据前不需要先建立连接
* TCP提供可靠的服务，通过TCP连接传送的数据，无差错，不丢失，不重复，且按序到达，UDP尽最大努力交付，即不保证可靠交付
* tcp 可靠，面向连接，不会丢失数据因此适合大数据量的交换
* 每一条TCP连接，只能是1对1的，UDP支持1对1，1对多，多对1，多对多的交互通讯
* TCP的首部开销为20字节，而UDP的只有8字节

## HTTP报文

用于HTTP协议交互的信息被称为HTTP报文。客户端的HTTP报文叫请求报文，服务端的HTTP报文叫响应报文。

请求报文 是由请求行（请求方法、请求URI、协议版本）、请求首部、内容实体（用户信息和资源信息等，可为空）、空行构成。

* 请求行，方法 + 路径 + http版本

```http
GET /home HTTP/1.1
```

## GET和POST的区别

GET 和 POST 方法没有实质区别，只是报文格式不同。

> [都9102年了，还问GET和POST的区别](https://segmentfault.com/a/1190000018129846)

## 请求首部（仅记录一些常用的）

* 通用首部
  * Cache-Control	控制缓存的行为，具体见缓存部分
  * Connection 浏览器想要优先使用的连接类型： keep-alive close（开启和关闭持久连接）
  * Date 创建报文时间
  * Via 代理服务器相关信息，每经过一个代理服务器就会添加相关信息，用逗号分割
* 请求首部
  * Accept 能正确接收的媒体类型：application/json text/plain
  * Accept-Encoding 能正确接收的编码格式列表：gzip deflate
  * Accept-Language 能正确接收的语言列表：zh-cn,zh;1=0.9,en,1=0.8
  * Cookie 发送给服务器的Cookie信息
  * Host 服务器的域名
  * origin 当前请求的域名
  * referer 请求发起页面的原始URI
  * User-Agent 客户端信息
* 响应首部
  * Content-Length 相应内容实体的大小，即用十进制数字表示的八位元组的数目
  * Content-Type 相应内容实体的格式
  * Location 客户端重定向到某个 URL
  * Server 服务器名字：Apache Nginx

  > 首部Range相关：[Http Range规范：简析html中视频无法拖动问题](https://juejin.cn/post/6871524945957634061)<br>
  Keep-Alive相关：[HTTP协议头部与Keep-Alive模式详解](https://byvoid.com/zhs/blog/http-keep-alive-header/)
## 状态码

* 2xx 成功，表明请求被正常处理了
  * 200 OK，表示从客户端发来的请求在服务器端被正确处理
  * 204 No content，表示请求成功，但响应报文不含实体的主体部分
* 3xx 重定向，表明浏览器要执行特殊处理
  * 301 永久性重定向，表示资源已被分配了新的 URL
  * 302 临时性重定向，表示资源临时被分配了新的 URL
  * 303 表示资源存在着另一个 URL，应使用 GET 方法获取资源
  * 304 表示服务器允许访问资源，但请求未满足条件的情况
* 4xx 客户端错误
  * 400 请求报文存在语法错误
  * 401 表示发送的请求需要有通过 HTTP 认证的认证信息
  * 403 表示对请求资源的访问被服务器拒绝，可在实体主体部分返回原因描述
  * 404 表示在服务器上没有找到请求的资源
* 5xx 服务端错误
  * 500 表示服务器端在执行请求时发生了错误
  * 501 表示服务器不支持当前请求所需要的某个功能
  * 503 表明服务器暂时处于超负载或正在停机维护，无法处理请求

## DNS

> [字节面试被虐后，是时候搞懂 DNS 了](https://juejin.cn/post/6990344840181940261)

## CDN

CDN全称Content Delivery Network，即内容分发网络。其基本思路是尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，使内容传输的更快、更稳定。

> [五分钟了解CDN](https://juejin.cn/post/6844903605888090125)

## TCP的三次握手

发送端发送一个带有SYN标志的数据包给对方，接收端收到后，回传一个带有SYN/ACK标志的数据包表示传达确认信息，发送端再回传一个带有ACK标志的数据包，代表“握手”结束。

# web 存储

* cookie
* session
* localStorage
* sessionStorage

## cookie属性

* 生存周期，Expires和Max-Age
* 作用域，Domain和path
* 安全相关
  * Secure，只能通过https传递cookie
  * HttpOnly，不能通过 JS 访问
  * SameSite，值为Strict、Lax和None，用于是否禁止第三方请求携带Cookie
  * SameParty，定义域名集合，集合内可传递cookie [腾讯三面：Cookie的SameSite了解吧，那SameParty呢？](https://juejin.cn/post/7087206796351242248)

> [面试官 -- 跨域请求如何携带 cookie ?](https://mp.weixin.qq.com/s/zE0iG0DNs52hyf3LrLXIbA) (注：评论说在IOS和低版本IE上可能不兼容)

# 同源政策及跨域

[同源政策及跨域解决方案简析](https://juejin.cn/post/6844903802303152142)

# 缓存

## 强缓存

* Expires 缓存过期时间
* Cache-Control 缓存控制，优先级高于Expires

## 协商缓存

* Last-Modified和If-Modified-Since，判断文件修改时间
  * 如果本地打开缓存文件，即使没有对文件进行修改，但还是会造成 Last-Modified 被修改，服务端不能命中缓存导致发送相同的资源
  * 因为 Last-Modified 只能以秒计时，如果在不可感知的时间内修改完成文件，那么服务端会认为资源还是命中了，不会返回正确的资源

* ETag和If-None-Match，当前资源文件的一个唯一标识(由服务器生成)

> [HTTP 缓存别再乱用了！推荐一个缓存设置的最佳姿势！](https://mp.weixin.qq.com/s/43pa04szJ2zU_IyVP4LraQ)<br>
[深入理解浏览器的缓存机制](https://www.jianshu.com/p/54cc04190252)

# WebSocket

 > 本质上是基于什么协议进行通信的（TCP / UDP）?<br/>
 在不兼容 WebSockect 的情况下如何做降级兼容处理？

WebSocket是基于http协议的，或者说借用了http协议来完成一部分握手。基于一个websocket握手协议的实现，基本是有2个属性，Upgrade和Connection：

```http
Upgrade: websocket
Connection: Upgrade
```

websocket与Http协议一样度是基于tcp的，都属于应用层的协议，websocket在建立握手连接时，数据是通过http协议传输的，但是在建立连接之后，真正的数据传输阶段是不需要http协议参与的。

# URL

> [url的hash和HTML5的history模式](https://blog.csdn.net/weixin_43974265/article/details/112762367)
