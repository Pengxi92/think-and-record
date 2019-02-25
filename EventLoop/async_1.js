function f2() {
    console.log('开始在await中执行');
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('返回await的值');
        reject({
          name: 'pengxi',
        });
      }, 1000);
    })
}
var obj = {
    name: '彭玺',
};
const name = obj.name;
async function f1() {
    obj = await f2();
    console.log('获取await的值', obj.name);
    return obj.name;
}
f1().then((data) => {
    console.log('获取async的返回值', data);
}).catch((data) => {
  console.log('error', data);
  console.log('name2', name);
})
console.log('obj', obj);
console.log('end');

console.log('name1', name);