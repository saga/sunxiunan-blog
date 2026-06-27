---
title: C语言中本地变量local variable的作用域与生存期
description: "《狂人C》中191页提到“每次运行到auto变量j所在block，会为j寻找存储空间，离开j所在代码模块，j的 &hellip; \n继续阅读“C语言中本地变量local variable的作用域与生存期”"
published: 2010-12-20
category: tech
updated: 2010-12-21
tags:
  - calling conversion
---

《狂人C》中191页提到“每次运行到auto变量j所在block，会为j寻找存储空间，离开j所在代码模块，j的内存被释放掉。

这是不正确的。

**结论应该是：对于C语言而言，本地变量会在栈开始处申请，栈销毁时结束生命。但是本地变量的作用域与所在block相关。之所以编译不通过，是因为这种block之外访问block之内变量的语法是错误的，离开本地变量所在block{}，它的作用域无效，但不是说销毁了。**

**作用域错误是语法层面的。而生存期（存在销毁）与程序栈相关，是运行时的概念，它们是两码事。而且，有没有auto这个keyword修饰，结果都一样，所以auto用不用没有任何意义。**

关于C语言程序栈以及调用规范，可以参考我前面翻译的文章：[http://sunxiunan.com/?p=1229](http://sunxiunan.com/?p=1229) 也可以查找wiki关于calling conversion方面的资料。

下面我们通过这段代码说明一下：

[https://gist.github.com/748095](https://gist.github.com/748095 "https://gist.github.com/748095")

int main (int argc, char \*argv\[\])

{

 int a = 99;

 int b = a;

 int\* pLocala = NULL;

 int\* pLocalb = NULL;

 int d = 1;

 printf("hello world \\n");

 do{

 int a = 3;

 int b = 23;

 pLocala = &a;

 pLocalb = &b;

 b = a + 5;

 printf("%d %p\\n", b, &a);

 }while(0);

 int e = 1;

 b = a;

 printf("%d %p\\n", b, &a);

 printf("%p %p %p %p %p %p %p %p\\n", &e, pLocalb, pLocala, &d, &pLocalb, &pLocala, &b, &a);

 return(0);

}

如果你运行这段代码（无论是VC++还是GCC），最后printf出来的结果应该是连续的，而&pLocala和&pLocalb其实就是一种while循环中定义的变量a和b所在地址，可以看出来它们夹在变量d与e中间。

我们可以用汇编代码看的更清楚一些，在VC2010生成的汇编代码（C源代码与前面略有不同），完整输出参考 [https://gist.github.com/748116](https://gist.github.com/748116 "https://gist.github.com/748116")

————————————————

;    COMDAT \_wmain

\_TEXT    SEGMENT

\_b$4410 = -32                        ; size = 4

\_a$4409 = -20                        ; size = 4

\_a$ = -8                        ; size = 4

\_argc$ = 8                        ; size = 4

\_argv$ = 12                        ; size = 4

; 7    : {

……

; 8    :     int a = 0;

mov    DWORD PTR \_a$\[ebp\], 0

$LN3@wmain:

; 9    :

; 10   :     do

; 11   :     {

; 12   :         auto int a = 3;

mov    DWORD PTR \_a$4409\[ebp\], 3

; 13   :         auto int b = 0;

mov    DWORD PTR \_b$4410\[ebp\], 0

……

——————————————

可以看到中间;12 : auto int a = 3;使用的是这样的汇编代码

mov    DWORD PTR \_a$4409\[ebp\], 3

很显然\_a$4409是在程序栈开始位置定义，而不是书中提到的”每次进入block时定义”。

此文发在CU后得到不少有价值的评论

http://bbs.chinaunix.net/thread-1834663-2-1.html

果然如我所料，如果没有O1这个编译选项，VC++2010是不会压缩空间的。  
如果加了O1这个”mini space”优化选项，出来的结果也不是OwnWaterloo提到的，临时变量都没有了，优化得很彻底。  
我用的是VC2010，过早的优化果然罪恶！（开个玩笑）

无论如何，还是要谢谢OwnWaterloo的说法：勿以汇编释语言。  
其实我也同意这个看法，所以尽量以K&R来作为解读文本。  
但是对于一些实现相关的内容，如果还有通过自身的解释或者对标准的注解来做说明，那是非常费劲的。  
《狂人C》中对++前后缀方式的说明就是如此，尽管键盘农夫试图把++解释的更为通俗易懂深入浅出，但是我看了还是一头雾水。  
而当我看过++代码生成的“无优化VC++2010特别为了注释”版本以后，就恍然大悟，源码之下别无秘密。  
而且，如果没有我用汇编展示的这个例子，OwnWaterloo大侠也不会出手解释，从这点来讲，也是抛砖引玉。

当然也可以说我这是一种误读，太细化，系统及平台依赖太强，  
但是我感觉用汇编来解读部分C语言实现相关的细节，在现阶段对我而言是有帮助的，那就可以了。

int \_tmain(int argc, \_TCHAR\* argv\[\])  
{  
int a = 0;  
do  
{  
char buf\[1024\];  
buf\[0\] = 1;  
}while (0);

a = 3;

do  
{  
char buf\[1024\];  
buf\[0\] = 93;  
}while(0);

return 0;  
}

ASM输出结果为：

\_TEXT        SEGMENT  
\_buf$4413 = -2076                                        ; size = 1024  
\_buf$4409 = -1044                                        ; size = 1024  
\_a$ = -12                                                ; size = 4  
\_\_$ArrayPad$ = -4                                        ; size = 4  
\_argc$ = 8                                                ; size = 4  
\_argv$ = 12                                                ; size = 4  
\_wmain        PROC                                                ; COMDAT

; 7    : {

push        ebp  
mov        ebp, esp  
sub        esp, 2272                                ; 000008e0H  
push        ebx  
push        esi  
push        edi  
lea        edi, DWORD PTR \[ebp-2272\]  
mov        ecx, 568                                ; 00000238H  
mov        eax, -858993460                                ; ccccccccH  
rep stosd  
mov        eax, DWORD PTR \_\_\_security\_cookie  
xor        eax, ebp  
mov        DWORD PTR \_\_$ArrayPad$\[ebp\], eax

; 8    :         int a = 0;

mov        DWORD PTR \_a$\[ebp\], 0  
$LN6@wmain:

; 9    :  
; 10   :         do  
; 11   :         {  
; 12   :                 char buf\[1024\];  
; 13   :                 buf\[0\] = 1;

mov        BYTE PTR \_buf$4409\[ebp\], 1

; 14   :         }while (0);

xor        eax, eax  
jne        SHORT $LN6@wmain

; 15   :  
; 16   :         a = 3;

mov        DWORD PTR \_a$\[ebp\], 3  
$LN3@wmain:

; 17   :  
; 18   :         do  
; 19   :         {  
; 20   :                 char buf\[1024\];  
; 21   :                 buf\[0\] = 93;

mov        BYTE PTR \_buf$4413\[ebp\], 93                ; 0000005dH

; 22   :         }while(0);
