---
title: 勿用屠龙来杀猪-论如何正确整合Lua与C++
description: "经常有人问到关于Lua的问题是“Lua如何能使用C++的成员变量？”“Lua如何调用C++类的成员函数？”“C &hellip; \n继续阅读“勿用屠龙来杀猪-论如何正确整合Lua与C++”"
published: 2009-11-09
category: lua
tags:
  - api设计
  - c++
  - lua
---

经常有人问到关于Lua的问题是“Lua如何能使用C++的成员变量？”“Lua如何调用C++类的成员函数？”“C++的复杂数据结构（如数组）如何传递进入Lua让Lua可以使用？”

这些问题之频繁，几乎每天都可以看到。问题的起源也很简单，这些提问者大多是C++程序员，公司需要使用Lua，他们就想如何能够“完美无缝”整合C++和Lua。

如果在谷歌中文（google.cn）搜索Lua关键字，第一页大概前五六个网址中会有云风的这篇文字《[Lua 不是 C++](http://blog.codingnow.com/2008/08/lua_is_not_c_plus_plus.html)》，里面的结论部分十分精彩：

> 对于那些新接触 lua 的 C/C++ 程序员来说，我的第一条建议通常是：看看 lisp/scheme 吧，可能 lua 的血统里，scheme 的成分比 C 更多一些。要不玩一下 Haskell ，增进对函数式编程的了解。C++ 借助 template 是可以玩玩函数式编程，但很少有人真的去用。进入 lua 的领域后，你得正正经经的理解一下了。

Lua与C++不是一种语言，Lua的产生也不是为了让C++这个大奶高兴，它的地位是独立的。

我在twitter上发了这样一些感慨：

> 感觉这里面有百分之五十的问题都是c++如何导出所有类型给lua，lua如何调用c++成员变量、类成员、内部函数。这些人太纠结了！思路不对，就跟把c++当做高级c来使用一样。展开一点说，这种用法的来源，首先是设计人员脑子不清楚了，lua与c++的边界完全混在一起，没有把接口最小化，以及适当简化，就是c++完全贴到lua上。清晰地api（通用意义上的），就是定义适当的操作，可以扩展，但是不过分耦合。lua和c++应该是哑铃状连接，而不是水桶。

为什么Lua与C++无缝整合有问题，原因很简单：任何一个有经验的程序员都知道，如果两个系统之间是紧密相连到成员函数成员变量都可以随便调用，那么这两个系统的耦合度一定是相当高，容易出现的问题就是难扩展、难修改、难维护。这两个系统不如直接整成一个系统算了。

如何正确使用Lua与C++？

首先第一个问题是，你的系统谁是主导？Lua还是C++？首先搞清楚这个问题。因为主导的部分代码将作为框架出现，负责调用或者响应事件、逻辑。如果Lua与C++的代码都做同样的工作，那么这个系统的设计是有问题的。

第二个问题是，你的系统里面，作为主导部分想开放那些接口？（我们姑且认为Lua与C++的中间连接部分为接口interface）。两个系统之间，不需要完全整合，只要开放必要的接口或者说是API即可。在著名的《**[Designing Qt-Style C++ APIs](http://qt.nokia.com/doc/qq/qq13-apis.html)**》中，作者Matt总结了下面6个优秀API的特点：

-   **Be minimal:** A minimal API is one that has as few public members per class and as few classes as possible. This makes it easier to understand, remember, debug, and change the API.
-   最小化: 一个最小化的借口是使用尽可能少的类以及尽可能少的类成员。这样使得理解、记忆、调试以及改变API更容易。

-   **Be complete:** A complete API means the expected functionality should be there. This can conflict with keeping it minimal. Also, if a member function is in the wrong class, many potential users of the function won’t find it.
-   完整: 一个完整的API意味着被期望的功能都包含在内。这与保持最小化有些冲突。而且，如果一个成员函数在一个错误的类中，很多有可能需要这个函数的用户没法找到它。

-   **Have clear and simple semantics:** As with other design work, you should apply the principle of least surprise. Make common tasks easy. Rare tasks should be possible but not the focus. Solve the specific problem; don’t make the solution overly general when this is not needed. (For example, QMimeSourceFactory in Qt 3 could have been called QImageLoader and have a different API.)
-   清楚简洁的语义： 像其他设计工作一样，你应该应用[最小惊讶原则](http://en.wikipedia.org/wiki/Principle_of_least_astonishment)。这使得通用的任务更容易。不常用的任务可以存在但不是重点。API的目的是解决特定问题。没有必要的时候不要让解决方案互相重叠。

-   **Be intuitive:** As with anything else on a computer, an API should be intuitive. Different experience and background leads to different perceptions on what is intuitive and what isn’t. An API is intuitive if a semi-experienced user gets away without reading the documentation, and if a programmer who doesn’t know the API can understand code written using it.
-   **直观**：与计算机里面其他的事情一样，一个API应该是直观的。不同的经验以及背景导致对什么是直观什么不是直观有着不同的理解。如果一个有些经验的用户可以直接使用API而不需要阅读文档，或者一个程序员可以直接理解用这个API写的代码而不需要了解这个API，那么这个API就是直观的。

-   **Be easy to memorize:** To make the API easy to remember, choose a consistent and precise naming convention. Use recognizable patterns and concepts, and avoid abbreviations.
-   **容易记忆**：让API容易记忆，选择一个统一的简洁的命名规范。使用容易识别的模式或者概念，另外避免缩写。

-   **Lead to readable code:** Code is written once, but read (and debugged and changed) many times. Readable code may sometimes take longer to write, but saves time throughout the product’s life cycle.
-   **产生可读性高的代码：**代码是编写一次，但是要多次阅读（当你调试或者修改的时候）。可读性高的代码常常需要花费更长的时间去编写，但是从整个产品生存周期来看，时间还是节省的。

总而言之，Lua本身有它自身的特点，如函数式编程，尾调用，变量无类型等等，这些特点与C++是截然不同的，如果你非要把C++与Lua弄得无缝整合，将来一定会因为这个高耦合产生各种各样的问题。

就如我在twitter中说的那样：编程弄得这么纠结，何必呢？！
