---
title: 关于线程Thread、协程Coroutine、生成器Generator、yield资料
description: "关于Green Thread（绿色环保线程）、Native Thread，以及线程的一些普及问题，下面这个pr &hellip; \n继续阅读“关于线程Thread、协程Coroutine、生成器Generator、yield资料”"
published: 2011-07-29
category: tech
---

关于Green Thread（绿色环保线程）、Native Thread，以及线程的一些普及问题，下面这个presentation最为翔实

[http://www.slideshare.net/tmm1/threaded-awesome-1922719](http://www.slideshare.net/tmm1/threaded-awesome-1922719 "http://www.slideshare.net/tmm1/threaded-awesome-1922719")

另外毫无疑问要看看维基百科上的这一条 [http://en.wikipedia.org/wiki/Thread\_%28computer\_science%29](http://en.wikipedia.org/wiki/Thread_%28computer_science%29 "http://en.wikipedia.org/wiki/Thread_%28computer_science%29")

如果你像我一样也喜欢Lua这个支持协程[http://en.wikipedia.org/wiki/Coroutine](http://en.wikipedia.org/wiki/Coroutine "http://en.wikipedia.org/wiki/Coroutine") （或者我们可以称之为Green Thread）特性的编程语言，这一篇论文非常值得参考，印象中这一篇论文以及《revisiting coroutine》介绍了为什么Lua不实现抢先式以及continuation的设计思路 [www.inf.puc-rio.br/~roberto/docs/corosblp.pdf](http://www.inf.puc-rio.br/~roberto/docs/corosblp.pdf)  [http://www.inf.puc-rio.br/~roberto/docs/MCC15-04.pdf](http://www.inf.puc-rio.br/~roberto/docs/MCC15-04.pdf "http://www.inf.puc-rio.br/~roberto/docs/MCC15-04.pdf")

这一篇教程可以帮助你了解Lua协程的基本用法[http://lua-users.org/wiki/CoroutinesTutorial](http://lua-users.org/wiki/CoroutinesTutorial "http://lua-users.org/wiki/CoroutinesTutorial") 

有人也许质疑Lua的协程功能不支持C函数扩展，那么可以试试大名鼎鼎的LuaJit作者出品的Coco [http://coco.luajit.org/](http://coco.luajit.org/ "http://coco.luajit.org/") 

喜欢中文资料的可以参考TimYang这篇介绍[http://timyang.net/lua/lua-coroutine/](http://timyang.net/lua/lua-coroutine/ "http://timyang.net/lua/lua-coroutine/") 

另外如果想实战使用的可以试试copas [http://keplerproject.github.com/copas/manual.html](http://keplerproject.github.com/copas/manual.html "http://keplerproject.github.com/copas/manual.html")

我也有翻译一篇Lua协程与Python Generator比较的文字 [http://sunxiunan.com/?p=1654](http://sunxiunan.com/?p=1654 "http://sunxiunan.com/?p=1654")

还有使用Lua协程实现斐波拉切 [http://sunxiunan.com/?p=1689](http://sunxiunan.com/?p=1689 "http://sunxiunan.com/?p=1689")

关于Native Thread，还有一个词语叫做Fiber纤程，意思是比纤程更细微轻量，好像Pthread和Windows都有支持。印象中看到过一篇文字说C#的yield就是利用Fiber实现，这个问题先放着。[http://en.wikipedia.org/wiki/Fiber\_%28computer\_science%29](http://en.wikipedia.org/wiki/Fiber_%28computer_science%29 "http://en.wikipedia.org/wiki/Fiber_%28computer_science%29") 另外也有人称之为绿色环保线程 [http://en.wikipedia.org/wiki/Green\_threads](http://en.wikipedia.org/wiki/Green_threads "http://en.wikipedia.org/wiki/Green_threads")

Erlang也有类似术语，叫做Green Process，大致意思差不多（？）。

Python相关概念[http://en.wikipedia.org/wiki/Generator\_%28computer\_programming%29](http://en.wikipedia.org/wiki/Generator_%28computer_programming%29 "http://en.wikipedia.org/wiki/Generator_%28computer_programming%29")

前面提到了一个continuation概念 [http://en.wikipedia.org/wiki/Continuation](http://en.wikipedia.org/wiki/Continuation "http://en.wikipedia.org/wiki/Continuation") 不过好像前面Lua论文里面提到过，设计一个正确continuation的程序太复杂（就我看来能正确理解coroutine这种简化级别continuation的都不容易），所以很少有程序语言支持（smalltalk？）。
