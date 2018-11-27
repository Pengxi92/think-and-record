/**
 * ES6 Proxy
 */
var obj = {
  name: '张三',
  sex: '男',
  age: 26,
};

// get
var getProxy = new Proxy(obj, {
  get(target, property) {
    if (property in target) {
      return target[property];
    } else {
      return `cannot get ${property}`;
    }
  },
});

// console.log('获取name:', getProxy.name); // 获取name: 张三
// console.log('获取age:', getProxy.age); // 获取age: cannot get age

// set
var setProxy = new Proxy(obj, {
  set(target, propKey, value, receiver) {
    if (propKey in target) {
      if (propKey === 'age') {
        if (value > 200) {
          throw '年龄太大';
        }
        if (value < 0) {
          throw '年龄不可为负数';
        }
      }
      target[propKey] = value;
    } else {
      console.log(`I not have ${propKey}`);
    }
  },
});

setProxy.name = '李四';
// console.log('获取name:', setProxy.name); // 获取name: 李四
setProxy.home = '四川';
// console.log('获取home:', setProxy.home); // I not have home;获取home: undefined
setProxy.age = 27;
// console.log('获取age:', setProxy.age); // 获取age: 27
// setProxy.age = 270; // throw '年龄太大';

// apply
var handler = {
  apply: function(target, thisBinding, args) {
    console.log('apply', target, thisBinding, args); // function (x, y) { return x + y; } undefined [ 4, 2 ]
    return args[0] * args[1];
  },

  construct: function(target, args) {
    console.log('construct', target, args);
    return {value: args[1]};
  }
};

var fproxy = new Proxy(function(x, y) {
  return x + y;
}, handler);

console.log('fproxy直接调用', fproxy(4, 2)); // 8；

// console.log('new fproxy', new fproxy(1, 2)); // { value: 2 }；调用了construct

