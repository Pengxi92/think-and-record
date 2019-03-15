import _ from 'lodash';

function componment() {
  var ele = document.createElement('div');

  ele.innerHTML = _.join(['Hello', 'World!', 'Webpack']);

  return ele;
}

document.body.appendChild(componment());