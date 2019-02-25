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

const f1 = async function () {
  let result = await f2().then((res) => {
    console.log('then ===>', res.name);
    res.name = `${res.name} then refrash message`;
    // 注释掉这条 return 或 手动返回一个 promise
    return Promise.resolve(res);
  });
  console.log('result after await ===>', result.name);
}
f1();
