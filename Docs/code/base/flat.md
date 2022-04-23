# 前言

Array.prototype.flat() 会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

```js
const arr1 = [0, 1, 2, [3, 4]];

console.log(arr1.flat()); // [0, 1, 2, 3, 4]

const arr2 = [0, 1, 2, [[[3, 4]]]];

console.log(arr2.flat(2)); // [0, 1, 2, [3, 4]]
```

# 模拟

```js
// 这里使用遍历来模拟实现该方法

const deepFlat = fn = (arr, level = 1) => {
    if (level <= 0) return arr.slice();
    return (arr || []).reduce((resArr, item) => {
        return [].concat(resArr, Array.isArray(item) && level > 1 ? fn(item, level - 1) : item);
    }, [])
}
```

> [MDN Array.prototype.flat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)