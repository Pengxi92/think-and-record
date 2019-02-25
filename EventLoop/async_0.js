function f2() {
  console.log('开始在await中执行');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('返回await的值');
      resolve({
        name: 'pengxi',
      });
    }, 1000);
  })
}

async function f1() {
    var { name } = await f2();
    console.log('获取await的值1', name);
    return name;
}

f1().then((data) => {
    console.log('获取async的返回值', data);
})

console.log('end');
