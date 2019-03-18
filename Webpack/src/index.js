import _ from 'lodash';
import './style.css';
import back from './background.png';

import printMe from './print.js';

function componment() {
  var ele = document.createElement('div');

  var btn = document.createElement('button');

  ele.innerHTML = _.join(['Hello', 'World!', 'Webpack']);

  ele.classList.add('hello');

  // 将图像添加到我们现有的 div。
  var myIcon = new Image();
  console.log('back', back);
  myIcon.src = back;

  ele.appendChild(myIcon);

  // 添加点击按钮事件
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  ele.appendChild(btn);

  return ele;
}

document.body.appendChild(componment());