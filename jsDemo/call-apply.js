// 原生实现call:
// 原理为将待操作方法，作为待操作对象中的一个属性来调用；
// 又由于调用该函数时，传入的参数不确定，使用eval()方法来实现该函数传入参数并实现的逻辑
Function.prototype.call2 = function call2(thisArg) {
  thisArg.fnn = this;
  var args = [];
  for (var i = 1, len = arguments.length; i < len; i++) {
    // args.push(arguments[i]);
    args.push('arguments[' + i + ']');
  }
  var star = 'context.fn(' + args + ')'

  console.log(star)
  eval('thisArg.fnn(' + args +')'); // context.fn(arguments[1],arguments[2])；为了参数格式不会出问题
  delete thisArg.fnn;
}

// 测试一下
var foo = {
  value: 1
};

function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value);
}

bar.call2(foo, 'kevin', 18); 
// kevin
// 18
// 1

// 原生实现apply: 与call的实现类型
Function.prototype.apply2 = function (thisArg, arr) {
  var thisArg = Object(thisArg) || window;
  thisArg.fn = this;

  var result;
  if (!arr) {
      result = thisArg.fn();
  }
  else {
      var args = [];
      for (var i = 0, len = arr.length; i < len; i++) {
          args.push('arr[' + i + ']');
      }
      result = eval('thisArg.fn(' + args + ')')
  }

  delete thisArg.fn
  return result;
}
