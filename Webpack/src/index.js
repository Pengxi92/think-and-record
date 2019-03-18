import _ from 'lodash';
import './style.css';
import back from './background.png';

function componment() {
  var ele = document.createElement('div');

  ele.innerHTML = _.join(['Hello', 'World!', 'Webpack']);

  ele.classList.add('hello');

  // 将图像添加到我们现有的 div。
  var myIcon = new Image();
  console.log('back', back);
  myIcon.src = back;

  ele.appendChild(myIcon);

  return ele;
}

document.body.appendChild(componment());