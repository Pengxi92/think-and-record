/**
 * 循环中断
 */

// for 循环
var arr = [1,2,3];

// for break
for(var i = 0, len = arr.length; i < len; i += 1){
    for(var j = 0; j < 3; j++){
        if(j === 1){
            break;
        }
        // console.log(arr[i]+'-'+j);
    }
}

// 1-0
// 2-0
// 3-0

start: for(var i = 0, len = arr.length; i < len; i += 1){
  for(var j = 0; j < 3; j++){
      if(j === 1){
          break start;
      }
      // console.log(arr[i]+'-'+j);
  }
}

// 1-0

// for continue
for(var i = 0, len = arr.length; i < len; i += 1){
  for(var j = 0; j < 3; j++){
      if(j === 1){
        continue;
      }
      // console.log(arr[i]+'-'+j);
  }
}

// 1-0
// 1-2
// 2-0
// 2-2
// 3-0
// 3-2

start: for(var i = 0, len = arr.length; i < len; i += 1){
  for(var j = 0; j < 3; j++){
      if(j === 1){
        continue start;
      }
      // console.log(arr[i]+'-'+j);
  }
}

// 1-0
// 2-0
// 3-0

// forEach

var arr = [1,2,3];

arr.forEach(function(value,index) {
    if(index === 1){
        return;
    }
    // console.log(arr[index])
});

// 1
// 3

// Array.map
var arr = [1,2,3];

arr.map(function(value,index) {
    if(index === 1){
        return;
    }
    // console.log(arr[index])
});

// 1
// 3

// for in
var arr = [1,2,3];
for(var i in arr){
  if(i === 1){
    break
  }
  // console.log(i)
}

// 1
// 2
// 3

var arr = [1,2,3];
for(var i in arr){
  if(i === 1){
    return
  }
  // console.log(i)
}

// 1
// 2
// 3

// for of
var arr = [1,2,3];

for(var i of arr){
    if(i === 2){
        break
    }
    // console.log(i)
}

// 1

var arr = [1,2,3];

for(var i of arr){
    if(i === 2){
      continue
    }
    console.log(i)
}

// 1
// 3