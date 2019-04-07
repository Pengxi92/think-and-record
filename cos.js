var http = require("http");
var fs = require("fs");

var firstUrl = 'http://mi.shenbiedu.com/teemm/20181022/9001.jpg';

var count = 272;

var imgNameLen = 4;

var imgWord = '';

console.log("http start");

var arr = firstUrl.split('/');
var firstImg = arr.pop();
var firstImgName = +firstImg.split('.')[0];
var host = arr.join('/');

var wordUrl = `/Users/bianlifeng/cos/${imgWord}`;

if (!fs.existsSync(wordUrl)) {
  fs.mkdirSync(wordUrl);
} else {
  console.log('已存在该文件夹');
  return;
}

var succImg = 0;
var imgObj = {};
for (var i = 0; i < count; i++) {
  var newImgName = parseInt(firstImgName) + i;
  if (String(newImgName).length < imgNameLen) {
    newImgName = [1, 2, 3, 4, 5, 6].reduce((str, val) => {
      return str.length < imgNameLen ? '0' + String(str) : String(str);
    }, newImgName);
  }
  var imgName = `${newImgName}.jpg`;
  var imgUrl = `${host}/${imgName}`;
  imgObj[imgName] = imgName;
  (function getImg(imgName, imgUrl) {
    http.get(imgUrl, function(res){
      var imgData = "";
  
      res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
      res.on("data", function(chunk){
          imgData+=chunk;
      });
      res.on("end", function(){
          fs.writeFile(`${wordUrl}/${imgName}`, imgData, "binary", function(err){
              if(err){
                  console.log("down fail", err);
              }
              console.log(`${wordUrl}/${imgName}`, "down success");
              delete imgObj[imgName];
              succImg++;
              if (succImg === count) {
                console.log("http end");
              } else {
                var imgArr = Object.keys(imgObj);
                console.log('剩余图片:', imgArr.length >= 5 ? imgArr.length : imgArr);
              }
          });
      });
    }); 
  }(imgName, imgUrl));
}