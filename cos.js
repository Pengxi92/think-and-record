var http = require("http");
var fs = require("fs");

var firstUrl = '';

var count = 10;

var imgNameLen = 3;

var imgWord = '';

console.log("http start");

var arr = firstUrl.split('/');
var firstImg = arr.pop();
var firstImgName = +firstImg.split('.')[0];
var host = arr.join('/');

var wordUrl = `/Users/bianlifeng/cos/${imgWord}`;

let files = [];
if (!fs.existsSync(wordUrl)) {
  fs.mkdirSync(wordUrl);
} else {
  console.log('已存在该文件夹');
  files = fs.readdirSync(wordUrl);
  if (files.length >= count) {
    console.log('已下载完毕');
    return;
  }
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
  if (files.indexOf(imgName) !== -1) continue;
 
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
              var imgArr = Object.keys(imgObj);
              if (succImg === count || imgArr.length === 0) {
                console.log("http end");
              } else {
                console.log('剩余图片:', imgArr.length >= 5 ? imgArr.length : imgArr);
              }
          });
      });
    }); 
  }(imgName, imgUrl));
}