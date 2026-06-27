---
title: json parse那些事
description: "json解析简单么？最近有个这样的需求，就听到类似说法。其实json解析既简单又复杂，简单是因为json定义很 &hellip; \n继续阅读“json parse那些事”"
published: 2019-02-21
category: blog
---

![](http://json.org/value.gif)

[json解析简单么？最近有个这样的需求，就听到类似说法。其实json解析既简单又复杂，简单是因为json定义很简单，就这样几种类型。复杂是不同语言不同场景大量的实现，参考 http://json.org/ 就能发现轮子反复被造出来，是因为场景不同需求不同。](http://json.org/)

在JavaScript中，JSON.parse(str, reviver) 其实遵循深度优先的后序遍历，这样每个节点只需要操作一次就可以了，否则枝干节点创建以后，在所有叶子结点计算完毕，有可能还要再操作一次（比如添加子节点到自己的children成员里）。

[https://zh.wikipedia.org/wiki/%E6%A0%91%E7%9A%84%E9%81%8D%E5%8E%86](https://zh.wikipedia.org/wiki/%E6%A0%91%E7%9A%84%E9%81%8D%E5%8E%86)

[http://notes.eatonphil.com/writing-a-simple-json-parser.html](http://notes.eatonphil.com/writing-a-simple-json-parser.html)

[https://news.ycombinator.com/item?id=19214387](https://news.ycombinator.com/item?id=19214387)

[https://github.com/v8/v8/blob/master/src/json-parser.h](https://github.com/v8/v8/blob/master/src/json-parser.h)
