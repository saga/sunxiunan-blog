---
title: async/await仅仅是promise的语法糖么？
description: "简单的说结论：可以这么说。但我不能确定它是百分百等同，因为标准没有这么说。 根据这篇文章https://mat &hellip; \n继续阅读“async/await仅仅是promise的语法糖么？”"
published: 2020-04-20
category: tech
---

简单的说结论：可以这么说。但我不能确定它是百分百等同，因为标准没有这么说。

根据这篇文章[https://mathiasbynens.be/notes/async-stack-traces](https://mathiasbynens.be/notes/async-stack-traces) Mathisas提到的，以及MDN上面的这一篇[https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async\_await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) 当我们使用await的时候，JS Engine会block当前运行代码，然后启动新的Promise（task）运行，等待它的结束或者异常抛出。

这个部分我可能还要看一下emcascript的spec，确定真的理解了。但是很明显这与C#是截然不同的，差别就在于JS Engine是单线程的，而C#中会自动启动一个新的Task来做事情，当前的主Task和新启动Task是并行运行的。

在async文档中有slow async和fast async的例子，便于更深入的理解[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async\_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

那到底是用async/await还是promise？我的建议是，能用async/await的尽量用，也尽量不要和promise混用（我见过这么干的）。更细节上的判断可以参考MDN [https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Choosing\_the\_right\_approach](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Choosing_the_right_approach)

另外需要注意的一点是，如果await多个promise，那么await和Promise.all在时序上和错误处理上是有所不同的。知道了这一点，trouble shooting的时候可以更仔细的研究细节。在这里Google Chrome团队就写了一篇很实用的文章，里面提到了如何对应转换promise代码成为async/await代码 [https://developers.google.com/web/fundamentals/primers/async-functions](https://developers.google.com/web/fundamentals/primers/async-functions)

先理解到这层面吧，如果有更深入了解再更新。
