---
title: "Intel x86 Function-call Conventions &#8211; Assembly View中文版"
description: "我翻译的中文版本，比较粗糙，但是对于理解Visual C++生成的汇编代码很有帮助。 中文版在线链接：http &hellip; \n继续阅读“Intel x86 Function-call Conventions &#8211; Assembly View中文版”"
published: 2009-07-22
category: tech
---

我翻译的中文版本，比较粗糙，但是对于理解Visual C++生成的汇编代码很有帮助。

中文版在线链接：[http://docs.google.com/View?id=dcrhkvwg\_159d8gpf4dx](http://docs.google.com/View?id=dcrhkvwg_159d8gpf4dx)

英文版链接：[http://unixwiz.net/techtips/win32-callconv-asm.html](http://unixwiz.net/techtips/win32-callconv-asm.html)

One of the “big picture” issues in looking at compiled C code is the function-calling conventions. These are the methods that a calling function and a called function agree on how parameters and return values should be passed between them, and how the stack is used by the function itself. The layout of the stack constitutes the “stack frame”, and knowing how this works can go a long way to decoding how something works.

查看编译后的C代码有一个大问题就是函数调用约定。这是调用方与被调用方约定好如何互相传递参数和返回值，以及函数自己如何使用栈。栈的布局组成了“栈帧”，知道这些如何运作需要一些脑力劳动去破译。
