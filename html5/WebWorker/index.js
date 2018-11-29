class webWorker {
  /**
   * @description: webworker的简单封装
   * @param {String} data js的url/script信息 
   * @param {Object} type url的类型，url或者string
   * @return: WebWorker 对象
   */
  constructor(data, type = "url") {
    this.worker = null;
    this.workerInit(data, type);
  }

  workerInit(data, type) {
    if (type === 'url') {
      // 默认是以url脚本形式的worker线程
      this.worker = new Worker(data);
    } else {
      // 以字符串形式创建worker线程
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);
      this.worker = new Worker(url);
    }
  }

  // 发送消息
  postMessage(msg) {
    return this.worker.postMessage(msg);
  }

  // 监听消息
  onmessage(fn) {
    this.worker.onmessage = (msg) => {
      fn(msg);
    }
  }

  // 监听错误
  error(fn) {
    this.worker.error = (e) => {
      fn(e);
    }
  }

  // 监听onmessage错误
  onmessageerror(fn) {
    this.worker.onmessageerror = (e) => {
      fn(e);
    }
  }

  // 关闭worker
  closeWorker() {
    return this.worker.terminate();
  }
}

const data = `
      // worker线程加载脚本 TODO: Worker 线程无法读取本地文件,加载的脚本必须来自网络
      // importScripts('hello1.js', 'http~.js');
      
      // 监听主线程传过来的信息
      self.onmessage = e => {
        console.log('主线程传来的信息：', e.data);
        // do something
      };
      
      // 发送信息给主线程
      self.postMessage({"name": '张三'});
      
      // 关闭worker线程
      function closeSon() {
        return self.close();
      }`;
const worker = new webWorker(data, "string");
worker.onmessage(msg => {
  console.log("主进程接收的数据：", msg.data);
});
worker.postMessage("主进程传给worker线程");
worker.error(msg => {
  console.log("主线程报错：", msg);
});
worker.onmessageerror(msg => {
  console.log("onmessage报错：", msg);
});