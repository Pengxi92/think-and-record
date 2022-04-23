# 原理

通过JSBridge，Web端可以调用Native端的Java接口，同样Native端也可以通过JSBridge调用Web端的JavaScript接口，实现彼此的双向调用。

## Native->Web

将拼接的JavaScript代码字符串，传入JS解析器执行就可以，JS解析器在这里就是webView。

* Android 4.4之前只能用loadUrl来实现，并且无法执行回调：

```java
String jsCode = String.format("window.showWebDialog('%s')", text);
webView.loadUrl("javascript: " + jsCode);
```

* Android 4.4之后提供了evaluateJavascript来执行JS代码，并且可以获取返回值执行回调

```java
String jsCode = String.format("window.showWebDialog('%s')", text);
webView.evaluateJavascript(jsCode, new ValueCallback<String>() {
  @Override
  public void onReceiveValue(String value) {

  }
});
```

* iOS的UIWebView使用stringByEvaluatingJavaScriptFromString

* iOS的WKWebView使用evaluateJavaScript

## Web->Native

* 拦截Webview请求的URL Schema

* 向Webview中注入JS API

    会通过webView提供的接口，App将Native的相关接口注入到JS的Context

> [深入浅出JSBridge：从原理到使用](https://zhuanlan.zhihu.com/p/438763800)