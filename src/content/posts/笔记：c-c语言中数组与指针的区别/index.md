---
title: 笔记：C (C++)语言中数组与指针的区别
description: "-关于《c专家编程》的读书笔记 &#8212;&#8212;&#8212;&#8212;&#8212;&#038;#82 &hellip; \n继续阅读“笔记：C (C++)语言中数组与指针的区别”"
published: 2009-06-29
category: tech
updated: 2009-07-12
---

\-关于《c专家编程》的读书笔记

—————————————————

试验目的1，比较指针与数组取值方式的异同。2，比较指针与数组作为函数参数时候的异同。

void funcA(int\* p)  
{  
printf(“%d”, p\[3\]);    printf(“%d”, p\[2\]);  
}

void funcB(int arr\[\])  
{  
printf(“%d”, arr\[3\]);    printf(“%d”, arr\[2\]);  
}

int \_tmain(int argc, \_TCHAR\* argv\[\])  
{  
int arrayInt\[5\] = {3, 4, 5, 6, 7};  
int\* pInt = arrayInt;

printf(“%d”, arrayInt\[3\]);  
printf(“%d”, pInt\[3\]);

funcA(arrayInt);    funcB(arrayInt);

funcA(pInt);    funcB(pInt);

return 0;  
}

使用vc2008编译，project setting里面选择生成asm代码。

; 23   :     int arrayInt\[5\] = {3, 4, 5, 6, 7};  
mov    DWORD PTR \_arrayInt$\[ebp\], 3  
mov    DWORD PTR \_arrayInt$\[ebp+4\], 4  
mov    DWORD PTR \_arrayInt$\[ebp+8\], 5  
mov    DWORD PTR \_arrayInt$\[ebp+12\], 6  
mov    DWORD PTR \_arrayInt$\[ebp+16\], 7

; 24   :     int\* pInt = arrayInt;  
lea    eax, DWORD PTR \_arrayInt$\[ebp\]  
mov    DWORD PTR \_pInt$\[ebp\], eax

pInt指向arrayInt的首地址\_arrayInt$\[ebp\]，将其保存在\_pInt$\[ebp\]

mov    eax, DWORD PTR \_arrayInt$\[ebp+12\]

对于数组的取值arrayString\[3\]，直接访问首地址加3的地址取出数据。在这里，数据存放在eax寄存器。

mov    eax, DWORD PTR \_pInt$\[ebp\]  
mov    ecx, DWORD PTR \[eax+12\]

对于指针取值，要使用两步，首先取得指针的首地址，然后取得首地址加12的地址（也就是eax+12)里包含的数据（\[eax+12\]）。拿到的数据存放在ecx寄存器。

根据《C专家编程》里比较的表格，指针是“1，保存数据的地址。2，间接访问数据，首先取得指针的内容，然后把它作为地址提取数据。如果有下标\[I\]，那么指针的内容加上I作为地址，从中提取数据。”

而数组是“1，保存数据。2，直接取得数据，比如a\[I\]就是以a+I为地址取得数据。”

基本上可以从代码里看出来这两个说明。

而在函数调用里，无论是以数组还是指针作为参数，生成的代码都是这样的：

使用指针作为参数funcA：

; 8    :     printf(“%d”, p\[3\]);  
mov    eax, DWORD PTR \_p$\[ebp\]  
mov    ecx, DWORD PTR \[eax+12\]

使用数组作为参数funcB：

; 14   :     printf(“%d”, arr\[3\]);  
mov    eax, DWORD PTR \_arr$\[ebp\]  
mov    ecx, DWORD PTR \[eax+12\]

很显然这两种取数据的方式都是“指针方式”而不是“数组方式”。也就是说，对于指针或者数组作为参数，函数内部都是使用指针方式来使用它们。在这一点上，数组和指针是一样的。

—————————————————

除了这些区别，还有的区别是：

指针通常使用在动态数据长度，而数组的长度一般是固定的（对于c来说是编译时已知的）。

一般来说，数组的分配是在栈上，分配过程是隐含的，而指针要分配空间，要显式使用malloc/free，一般是在堆上（除了alloca）。如果要分配很大的空间（比如使用内存池技术），一般都要使用指针方式，因为程序栈一般都不怎么大。

数组本身是有名字的，定义了以后名字就是指向首地址无法更改。而指针通常指向匿名数据，可以指向不同的地址。

—————————————————

关于字符串，这是一个比较常用而且特殊的例子。

通常的字符串定义方式：char\* pStr1 = \_T(“This is array string”);

CONST    SEGMENT  
OBNGGKAB DB ‘This is array string’, 00H ; \`string’  
……  
CONST    ENDS

; 23   :     char\* pStr1 = \_T(“This is array string”);  
mov    DWORD PTR \_pStr1$\[ebp\], OFFSET OBNGGKAB

; 24   :     char arrayString\[\] = \_T(“This is array string”);  
mov    eax, DWORD PTR OBNGGKAB  
mov    DWORD PTR \_arrayString$\[ebp\], eax  
mov    ecx, DWORD PTR OBNGGKAB+4  
mov    DWORD PTR \_arrayString$\[ebp+4\], ecx  
mov    edx, DWORD PTR OBNGGKAB+8  
mov    DWORD PTR \_arrayString$\[ebp+8\], edx  
mov    eax, DWORD PTR OBNGGKAB+12  
mov    DWORD PTR \_arrayString$\[ebp+12\], eax  
mov    ecx, DWORD PTR OBNGGKAB+16  
mov    DWORD PTR \_arrayString$\[ebp+16\], ecx  
mov    dl, BYTE PTR OBNGGKAB+20  
mov    BYTE PTR \_arrayString$\[ebp+20\], dl

可以看出对于char\* pStr1 = \_T(“This is array string”); 来说，它是指向了静态只读数据段的OFFSET。基本上所有靠谱的C语言编程书都会提到，**不要修改这种方式声明的字符串内容。**

pStr1\[1\] = ‘H’; // critical error

如果这样的代码运行起来，会导致下面的错误。

> Unhandled exception at 0x00411594 in testbbbb1.exe: 0xC0000005: Access violation writing location 0x004157c1.

而以数组方式声明的字符串（char arrayString\[\] = \_T(“This is array string”); )，虽然也使用了静态只读数据段里内容，但很显然是复制而不仅仅是指向偏移，所以修改其中的内容不会导致错误。
