---
title: C语言中的表达式求值问题
description: "在细读《C programming Language 2nd》（K&R）到53页的时候，看到作者举了这 &hellip; \n继续阅读“C语言中的表达式求值问题”"
published: 2010-08-18
category: tech
tags:
  - c++
---

在细读《C programming Language 2nd》（K&R）到53页的时候，看到作者举了这样一个例子：

a\[i\] = i++;

如果你知道这个表达式有什么问题，就不需要继续看下去了，下面内容对你而言有些浅显。

如果你也像我一样，觉得这个很容易理解啊，i++这个表达式就是先取i的值返回，然后对i自加。a\[i\]就是i的值，然后i自加1。

这其实也是C语言陷阱之一，在K&R中反复强调（page52以及page202），函数参数也好、某个操作符中的操作数也罢，表达式求值次序是不一定的，每个特定机器、操作系统、编译器都不一样。（特例是&&，||，?:以及逗号操作符，它们会确定表达式求值顺序的）

还有类似的例子如下：

f() + (g() \* h())

或者 int i = 7;  printf("%d\\n", i++ \* i++);

在我们一开始提出的问题中，a\[i\]取下标操作与i++自增的运算顺序是不一定的。这就是一种不确定性。

在第一个表达式中，可以确定的是这些内容：g和h函数的结果会先做乘法运算，然后与f函数的结果做加法运算，但是f，g，h谁先被调用，谁后被调用，这是不一定的，C语言标准没有对此作规定。

第二个表达式中，第一个自增操作和第二个自增操作以及乘法操作的顺序是不一定的，所以结果根本无法确定，即使我们给i++都包裹上括号 (i++) \* (i++)也是一样的。括号并不会得到确定的操作数计算顺序，括号只能保证操作数的值（就是表达式或者函数求值的结果）相互计算的顺序。

K&R提供了几个建议，首先是函数调用嵌套赋值语句（或者可能改变参数值的操作）或者自增操作，都会有"side effect”，我们应该确保这种边际效应不会影响程序运行结果，如果某个表达式对同一个变量同时修改两次，那么一定要非常注意这是不是你想得到的结果。

如果不知道特定机器上实现如何，就不要依赖表达式计算顺序；即使知道了实现方式，这种依赖也不是一种好的编程方式。比如f、g、h函数计算，可以用赋值给临时变量来决定需要的顺序，对于print(i++)这个表达式也是如此，在printf之外先计算i的值。用K&R第一版的话来说就是if you don’t know how they are done on various machines, that innocence may help to protect you.

参考资料：

[http://www.eskimo.com/~scs/cclass/notes/sx7c.html](http://www.eskimo.com/~scs/cclass/notes/sx7c.html "http://www.eskimo.com/~scs/cclass/notes/sx7c.html")

《C Programming Language second edition》
