---
title: Re 浅谈C和C++中的const关键字
description: "This article contains many errors, I just list them sim &hellip; \n继续阅读“Re 浅谈C和C++中的const关键字”"
published: 2011-04-19
category: tech
---

This article contains many errors, I just list them simply.  
http://www.cnblogs.com/dolphin0520/archive/2011/04/18/2020248.html

BTW About const concept in C/C++, I have 2 articles.  
[《c专家编程》阅读笔记-关于const指针](http://sunxiunan.com/?p=1161) http://sunxiunan.com/?p=1161  
[技术笔记-关于c/c++中的const](http://sunxiunan.com/?p=870) http://sunxiunan.com/?p=870

————————  
“但是程序中使用过多的const，可能在对代码的阅读时增加一定的难度”  
Can’t understand. This idea is so strange.  
If possible, you should use const as possible. It is a good contract.

————————  
const int n; 这种声明方式是错误的  
This definition method is wrong. (should NOT declaration!)  
extern char\* const p; // this is declaration, p as extern variable

————————  
指针常量:即指针本身的值是不可改变的，而指针指向的变量的值是可以改变的;  
I never heard the concept “指针常量”, it should be “the pointer points to constant” 指针指向常量!!

————————  
“C语言和C++中的const有很大区别。在C语言中用const修饰的变量仍然是一个变量;而在C++中用const修饰过后，就变成常量了。  
const int a=3; int \*pa=&a; \*pa=4; printf(“%d\\n”,\*pa); printf(“%d\\n”,a);  
这种情况在C++中是不允许的，原因在于a用const修饰后，已经成为常量了，因此是不允许被修改的，无论是显示的更改a的值或是通过其它方法修改它的值都是不允许的。”

!!!! WTF !!  
C++ has a keyword const\_cast !!

Try following code:  
const int a=3;  
`int *pa= const_cast < int * > (&a);` \*pa=4;  
printf(“%d\\n”,\*pa);  
printf(“%d\\n”,a);

Will print out “4 4” as result.
