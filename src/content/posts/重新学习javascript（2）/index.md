---
title: 重新学习JavaScript（2）
description: "继续看mdn的文档，今天看regexp部分。我想到一个小功能，把字符串中每个首字母大写。我看到的代码使用了sp &hellip; \n继续阅读“重新学习JavaScript（2）”"
published: 2020-04-09
category: tech
---

继续看mdn的文档，今天看regexp部分。我想到一个小功能，把字符串中每个首字母大写。我看到的代码使用了split加上reduce，我呢，对于reduce总有些疑虑，因为它不直观，需要想一想才能把流程在脑子里理清楚。这样的功能用正则表达式正好，虽然正则也不容易理解，但是这貌似就是正则能打的领域，不用都可惜了。

看了一会文档，拼凑出一个代码来，在chrome devtool跑了一下是期望的结果。

```
function replacer(match, p1, p2, p3, offset, string) {
    console.log(arguments);
    const x = match.charAt(0).toLowerCase();
    return x + match.substring(1);
}
let re = /(\w+)/g;
let str = 'john smith haha';
let newstr = str.replace(re, replacer);
console.log(newstr); 
```

其实我并不是从string的replace函数看起的，而是看到了一个奇怪的用法。[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/RegExp/@@replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@replace) 我在怎么写replacer一开始没搞懂，因为没有例子。甚至跑到这里看测试用例[https://github.com/tc39/test262/tree/master/test/built-ins/RegExp/prototype/Symbol.replace](https://github.com/tc39/test262/tree/master/test/built-ins/RegExp/prototype/Symbol.replace) 后来看ecmascript的文档才发现提到了string.replace，这才把知识点串联起来。

```
var re = /-/g; 
var replacer = function() {
    console.log(arguments);
    return '.';
};
var newstr = re[Symbol.replace]('2016-01-01', replacer);
```

今天少写一点，就这些吧。
