---
title: 技术笔记-关于c/c++中的const
description: "共享一个有趣的关于const的例子（在网上看到的） const int a = 1; int *p = con &hellip; \n继续阅读“技术笔记-关于c/c++中的const”"
published: 2008-11-07
category: tech
---

> 共享一个有趣的关于const的例子（在网上看到的）
> 
> const int a = 1;
> 
> int \*p = const\_cast<int\*>(&a);
> 
> \*p = 2;
> 
> cout << “value a=”<< a << endl;
> 
> cout << “value \*p=” <<\*p << endl;
> 
> cout << “address a=” <<&a << endl;
> 
> cout << “address p=” <<p << endl;  
> 
> 这段代码输出的结果如下：
> 
> value a=1
> 
> value \*p=2
> 
> address a=0xbff1d48c
> 
> address p=0xbff1d48c
> 
> 地址都是一样的，可值为什么不一样呢？

我使用VC6编译了一个更简单的c++代码。查看汇编部分，发现了原因。

深红色和红色部分就是区别所在，当单步调试到int i1 = a，很有趣的就是a的值是2，但是赋值以后i1的值却变成了1.  
关键就是当进行这个赋值，是直接给i1设置一个值1，而不是像深红色部分那样的赋值过程，  
这也许也是一种优化考虑，对于const变量，赋值时候它会比一般变量跑的更快。

\_main PROC NEAR ; COMDAT![](http://images.china-pub.com/ebook/3051/zcover.jpg)

; 8 : {

push ebp  
mov ebp, esp  
sub esp, 80 ; 00000050H  
push ebx  
push esi  
push edi  
lea edi, DWORD PTR \[ebp-80\]  
mov ecx, 20 ; 00000014H  
mov eax, -858993460 ; ccccccccH  
rep stosd

; 9 : const int a = 1;

mov DWORD PTR \_a$\[ebp\], 1

; 10 : int \*p = (int\*)(&a);

lea eax, DWORD PTR \_a$\[ebp\]  
mov DWORD PTR \_p$\[ebp\], eax

; 11 : \*p = 2;

mov ecx, DWORD PTR \_p$\[ebp\]  
mov DWORD PTR \[ecx\], 2

; 12 :  
; 13 :  
; 14 : int i1 = a;

**mov DWORD PTR \_i1$\[ebp\], 1**

; 15 : int i2 = \*p;

**mov edx, DWORD PTR \_p$\[ebp\]  
mov eax, DWORD PTR \[edx\]  
mov DWORD PTR \_i2$\[ebp\], eax**

; 20 : }  
; 21 :  
; 22 : return 0;

xor eax, eax

; 23 : }
