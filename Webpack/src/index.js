import _ from 'lodash';
import './style.css';

function componment() {
  var ele = document.createElement('div');

  ele.innerHTML = _.join(['Hello', 'World!', 'Webpack']);

  ele.classList.add('hello');

  return ele;
}

document.body.appendChild(componment());