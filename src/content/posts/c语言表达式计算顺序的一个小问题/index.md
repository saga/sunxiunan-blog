---
title: C语言表达式计算顺序的一个小问题
description: "浏览Q.yuhen的博客这篇文章 http://www.rainsts.com/article.asp?id= &hellip; \n继续阅读“C语言表达式计算顺序的一个小问题”"
published: 2010-09-27
category: tech
tags:
  - c++
---

浏览Q.yuhen的博客这篇文章 [http://www.rainsts.com/article.asp?id=959](http://www.rainsts.com/article.asp?id=959 "http://www.rainsts.com/article.asp?id=959") 发现一个小问题，估计有类似想法的同学也有，所以记录一下。

问题在于这句话：

“很显然，依据 cdecl 规则，"printf(…, test(2), test(1))" 中的 printf 函数参数依次从右向左 "入栈"(暂且用这个说法)。因此 test(1) 被先调用，然后才是 test(2)，上面的汇编代码也说明了这点。”

尽管事实是这样的，但这是一个有问题的说法。

cdecl的入栈顺序是没错的，这个入栈顺序是针对每个逗号分隔的表达式结果而言。也就是说对于每个结果一定是这样的顺序。但是表达式计算顺序（或者说每个逗号分割的函数调用）其实是没有规定的。这在K&R影印版第二版52页最末一段说的非常清楚，下面的f和g不一定谁先调用：

C, like most languages, does not specify the order in which the operands of an operator are evaluated. (exceptions are && || ?: and ",") for example x = f() + g();

另外在63页开始：

The commas that separate function arguments, variables in declarations, etc., are NOT comma operators, and do NOT guarantee left to right evaluation.

这也就是说逗号分隔的函数参数与逗号操作符是不一样的，不保证从左至右的计算顺序（当然也没有保证从右至左）。

注意这个evaluation，其实就是对test(2), test(1)的调用。如果这些调用有边界效应，在不同编译器、操作系统上可能会得到不同的结果。另外类似的问题有对在参数列表中，同一个变量调用++两次以上。

如果要保证求值顺序（注意不是求值结果的入栈顺序），只能用临时变量保存调用结果，或使用逗号操作，&& || :?这样可以保证求值顺序的操作才行。

其实我在前面这篇博客已经提到了这个问题，只是看到这个提法再重申一次。“[C语言中的表达式求值问题](http://sunxiunan.com/?p=1684)”[http://sunxiunan.com/?p=1684](http://sunxiunan.com/?p=1684 "http://sunxiunan.com/?p=1684")

参考资料：

[http://www.andromeda.com/people/ddyer/topten.html](http://www.andromeda.com/people/ddyer/topten.html "http://www.andromeda.com/people/ddyer/topten.html") 参考第七条

C陷阱与缺陷 3.7求值顺序
