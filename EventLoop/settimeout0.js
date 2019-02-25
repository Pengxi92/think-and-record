let a = new Promise(
    function(resolve, reject) {
      console.log(1);
      setTimeout(() => console.log(2), 100);
      console.log(3);
      console.log(4);
      setTimeout(() => {
        resolve(true);
      }, 100)
    }
  );
  a.then(v => {
    console.log(8);
  });
  let b = new Promise(
    function aa() {
      console.log(5);
      setTimeout(() => console.log(6), 100);
    }
  )
  console.log(7);

  // 在node中为2，6，8；在浏览器中为2，8，6