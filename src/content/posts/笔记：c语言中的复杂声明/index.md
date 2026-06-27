---
title: 笔记：c语言中的复杂声明
description: 最近在复习c（c++）语言里面的复杂声明，这个东西真是麻烦的紧啊。
published: 2009-06-26
category: tech
updated: 2009-07-12
---

最近在复习c（c++）语言里面的复杂声明，这个东西真是麻烦的紧啊。

例子1，来自[http://msdn.microsoft.com/en-us/library/1x82y1z4(VS.80).aspx](http://msdn.microsoft.com/en-us/library/1x82y1z4\(VS.80\).aspx "http://msdn.microsoft.com/en-us/library/1x82y1z4(VS.80).aspx")

char \*( \*(\*var)() )\[10\];

var是一个指针，指向一个函数，函数参数为空，函数返回一个指针，指向一个数组（10个元素），数组里面保存char\*。

unsigned int \*(\* const \*name\[5\]\[10\] ) ( void );

name是一个2维数组(5×10)，保存的是指向const型函数指针的指针，函数指针返回值为UINT指针。

The name array has 50 elements organized in a multidimensional array. The elements are pointers to a pointer that is a constant. This constant pointer points to a function that has no parameters and returns a pointer to an unsigned type.

union sign \*(\*var\[5\])\[5\];

var声明了一个指针数组，指针指向一个union sign指针的数组（5个元素）。

Array of pointers to arrays of pointers to unions.

例子2，来自[http://www.codeproject.com/KB/cpp/complex\_declarations.aspx](http://www.codeproject.com/KB/cpp/complex_declarations.aspx "http://www.codeproject.com/KB/cpp/complex_declarations.aspx")

const char \* const \* const p8;

p8是一个const指针，指向一个const指针pa，pa指针指向const char类型。

const pointer to const pointer to const char

int \* (\* (\*fp1) (int) ) \[10\];

fp1是一个函数指针，参数为int，返回值为一个指针pb，pb指向一个int指针的数组。

fp1 is a pointer to a function that takes an int as argument, and returns a pointer to an array of 10 pointers to ints.

例子3，来自《C programming language》，123页的5.12 Complicated declarations

char (\* **(\*x\[3\]) ()** ) \[5\]

x是一个数组，包含3个函数指针，函数指针返回一个指向char\[5\]的指针。

x: array\[3\] of pointer to function returning pointer to array\[5\] of char.

void (\*signal(int sig, void (\*handler)(int)))(int) 来自255页的标准库说明，这个是我看到的现实世界里用到的复杂实例。（不好意思读的代码太少了，见识不广）

这个signal函数也经常写作如下格式（from dietlibc）：

typedef void (\*sighandler\_t)(int);

sighandler\_t signal(int signum, sighandler\_t action)；

这样看就容易多了。

例子4，来自《C专家编程》3.4

char \*(\* c\[10\])(int \*\*)

c是一个函数指针数组，参数为int\*\*（指向int指针的指针），返回值为char\*。

关于如何解析复杂的声明，可以参考前面提到的相关文档。其中C专家编程里面提到了一个人机皆可使用的规则。

A 声明从名字开始读取，然后按照优先级依次读取。

B 优先级从高到低依次为：

> B1 被括号括起来的部分
> 
> B2 声明后缀符， 括号表示是一个函数，方括号【】表示是一个数组。
> 
> B3 前缀操作，\*表示“指向…的指针”

C 如果const和（或）volatile关键字后面紧跟类型说明符（如int long double），那么它作用于类型说明符。在其他情况下const volatile关键字作用于它**左边**紧邻的指针星号。

unix世界有个著名的程序叫做cdecl，专门负责解析C语言声明，在c programming language里面有个简易版说明了其工作原理。
