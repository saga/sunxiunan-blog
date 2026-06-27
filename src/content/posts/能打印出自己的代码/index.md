---
title: 能打印出自己的代码
description: "任务：写一段C语言程序，打印出自己整个代码，不能差一分一毫。 这个任务在计算机编程中有个术语叫做：Quine， &hellip; \n继续阅读“能打印出自己的代码”"
published: 2010-09-27
category: tech
tags:
  - c++
---

任务：写一段C语言程序，打印出自己整个代码，不能差一分一毫。

这个任务在计算机编程中有个术语叫做：Quine，维基百科上有专门的条目介绍。

[http://en.wikipedia.org/wiki/Quine\_%28computing%29](http://en.wikipedia.org/wiki/Quine_%28computing%29 "http://en.wikipedia.org/wiki/Quine_%28computing%29")

quine代码好像没有太大作用，但是我们可以将其想象成一种可以自我繁殖的生物，每次运行就产生一个同样的实体，然后一个个这样繁殖下去，哇塞，这就是恐怖片了！

搜索了一下，基于C语言（使用VC2010编译必须设置language为C才可以）主要有以下几种比较简洁的实现：

**main(a){a="main(a){a=%c%s%c;printf(a,34,a,34);}";printf(a,34,a,34);}**

这算是第一种模式，关键在于%c%s%c这个打印格式，然后输入参数中多半有34或者0x22（也就是双引号）或者引用到字符串数组中双引号的位置。

另外一种是通过宏定义实现的：

**#define T(a) main(){printf(a,#a);}  
T("#define T(a) main(){printf(a,#a);}\\nT(%s)")**

宏定义的实现消除了对双引号的使用，格式更为灵活一些，不需要是abab这种模式了。

关于quine一个非常详细的论文，介绍了深层理论、如何写quine代码等等，可以看看。

[http://www.madore.org/~david/computers/quine.html](http://www.madore.org/~david/computers/quine.html "http://www.madore.org/~david/computers/quine.html")

另外可以参考：

[http://www.c4swimmers.esmartguy.com/selfcodeprint.htm](http://www.c4swimmers.esmartguy.com/selfcodeprint.htm "http://www.c4swimmers.esmartguy.com/selfcodeprint.htm")

[http://www.c2.com/cgi/wiki?QuineProgram](http://www.c2.com/cgi/wiki?QuineProgram "http://www.c2.com/cgi/wiki?QuineProgram")
