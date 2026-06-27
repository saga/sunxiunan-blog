---
title: 奇怪的C语言特性
description: "Most from http://stackoverflow.com/questions/1995113/st &hellip; \n继续阅读“奇怪的C语言特性”"
published: 2010-05-19
category: tech
tags:
  - CLanguage
---

Most from [http://stackoverflow.com/questions/1995113/strangest-language-feature](http://stackoverflow.com/questions/1995113/strangest-language-feature "http://stackoverflow.com/questions/1995113/strangest-language-feature")

下面列出的特性未必奇怪，有的算是有趣。

1）a\[2\] 等价于 2\[a\]

"aabbccdd"\[5\] 等价于 5\["aabbccdd"\]

这条特性可以用于使用数组、指针、字符串，但不能用在变量定义时。K&R C Programming language 217页对此有介绍。

2）二元、三元复合字符

[http://en.wikipedia.org/wiki/Digraphs\_and\_trigraphs](http://en.wikipedia.org/wiki/Digraphs_and_trigraphs "http://en.wikipedia.org/wiki/Digraphs_and_trigraphs")

字符串字面值？？！将被认为是|，所以两个问号同时出现在字符串的时候一定要小心。二元复合字符在C99被引入，如<:等价于\[

3）Duff’s Device

[http://en.wikipedia.org/wiki/Duff%27s\_device](http://en.wikipedia.org/wiki/Duff%27s_device "http://en.wikipedia.org/wiki/Duff%27s_device")

特点是switch与while交错出现。代码类似

[![image](http://sunxiunan.com/media/C_E6B5/image_thumb.png "image")](http://sunxiunan.com/media/C_E6B5/image.png)

4）同名同姓现象

[![image](http://sunxiunan.com/media/C_E6B5/image_thumb_3.png "image")](http://sunxiunan.com/media/C_E6B5/image_3.png)

在《C陷阱与缺陷》中有详细解释。

5）a\[i++\]= i;

这个好像是依赖特定编译器实现，我在Xcode实验结果为先对a\[i\]赋值i，然后操作i++。此类代码一定要小心。如果你在做code review发现++ –出现在其它表达式中或者作为参数出现，一定要立刻马上把它移出来作为单独语句，小心驶得万年船。

6）sizeof

sizeof(x), x可以是一个表达式或者类型名,如果是表达式,不做运算,int x = 1; size\_t sz = sizeof(x++); X不会增加。T \*p = NULL; p = malloc(sizeof \*p); p并没有提领,K&R圣书也有讲。

sizeof unary-expr; sizeof(typename);一元表达式可以没有括号,圣书里面语法部分提到。如size\_t f = sizeof 99;

7）宏定义要小心

例如：[#define](http://twitter.com/search?q=%23define) FOO(a,b) (a+b)/(1-a)如果这样调用FOO(bar++,4),自增两次,当然,把宏展开就非常清楚了。

参考资料：

[http://www.steike.com/code/useless/evil-c/](http://www.steike.com/code/useless/evil-c/ "http://www.steike.com/code/useless/evil-c/")

《C陷阱与缺陷》
