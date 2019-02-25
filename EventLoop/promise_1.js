const p1 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        console.log('开始执行P1了');
        reject(new Error('fail'))
    }, 3000)
  })
  
  const p2 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        console.log('开始执行P2了');
        resolve(p1);
    }, 1000)
  })
  
  p2
  .then(result => console.log("resolve:"+result))
  .catch(error => console.log("error:"+error))
  // Error: fail