# 性能指标

从 Web 性能工作组的[主页](https://www.w3.org/webperf/)可以看到全部的性能标准，我们也可以在[ALL STANDARDS AND DRAFTS](https://www.w3.org/TR/)搜索到这些标准。

# 性能度量

最初在性能差异很大时，我们可以通过感官来判断性能的好坏。现在我们可以通过浏览器API--window.performance获取性能指标的度量值，进行量化比较性能。

<img src="./assets/performance对象.png" width="80%">

可以看见performance对象包含属性和方法，这些都和行政指标相关。

## High Resolution Time

该规范定义了一个 API，该 API 以亚毫秒级分辨率提供时间原点和当前时间，使其不受系统时钟偏差或调整的影响。

*注：`Date.now()`获取时间是毫秒级，且会受到系统时钟偏差的影响。*

此规范有两个版本：正式发布版本（[High Resolution Time Level 2](https://www.w3.org/TR/2019/REC-hr-time-2-20191121/)）和规范草案（[High Resolution Time](https://www.w3.org/TR/2021/WD-hr-time-3-20211201/)）。这里我们只关注Level 2版本就好。

Level 2版本的内容如下：
* 定义了时间原点（Time Origin）：performance.timeOrigin
* 定义了用于存储以毫秒为单位的时间值（DOMHighResTimeStamp）：performance.now()

```js
performance.timeOrigin // 1640781651477.7

performance.now() // 1365135.599999994

performance.timeOrigin + performance.now() // 1640783020692.5

Date.now() //1640783023713
```