---
title: 如何得到Windows系统的高精度计时
description: "可以看这篇http://en.wikipedia.org/wiki/Time_Stamp_Counter 文章 &hellip; \n继续阅读“如何得到Windows系统的高精度计时”"
published: 2009-01-30
category: tech
---

可以看这篇http://en.wikipedia.org/wiki/Time\_Stamp\_Counter

文章里有个简单的代码，如下：

1）calling  ticks getticks(void);

2）calling double elapsed(ticks t1, ticks t0);

#if \_MSC\_VER >= 1200 && \_M\_IX86 >= 500 && !defined(HAVE\_TICK\_COUNTER)  
#include <windows.h>  
typedef LARGE\_INTEGER ticks;  
#define RDTSC \_\_asm \_\_emit 0fh \_\_asm \_\_emit 031h /\* hack for VC++ 5.0 \*/  
static \_\_inline ticks getticks(void)  
{  
ticks retval;  
\_\_asm {  
RDTSC  
mov retval.HighPart, edx  
mov retval.LowPart, eax  
}  
return retval;  
}

static \_\_inline double elapsed(ticks t1, ticks t0)  
{  
return (double)t1.QuadPart – (double)t0.QuadPart;  
}

如果是64位

#if defined(\_MSC\_VER) && defined(\_M\_IA64) && !defined(HAVE\_TICK\_COUNTER)  
typedef unsigned \_\_int64 ticks;

#  ifdef \_\_cplusplus  
extern “C”  
#  endif  
ticks \_\_getReg(int whichReg);  
#pragma intrinsic(\_\_getReg)  
static \_\_inline ticks getticks(void)  
{  
volatile ticks temp;  
temp = \_\_getReg(3116);  
return temp;  
}

在64位机器上的代码有些难懂，简单查了一下，可以看出来如下，intrinsic在这里有介绍

http://msdn.microsoft.com/en-us/library/tzkfha43(VS.80).aspx

http://msdn.microsoft.com/en-us/library/sctyh01s(VS.80).aspx

http://msdn.microsoft.com/en-us/library/26td21ds(VS.80).aspx

好像是说要把函数调用改成内联，来提高速度。对于可以内联的函数，msdn上有列表，基本上都是CRT函数，不是每个函数都可以调用这个预定义的。

\_\_getReg将会得到寄存器的值。这个命令必须先使用intrinsic（msdn里提到的）。

http://msdn.microsoft.com/en-us/library/kcb3wece(VS.80).aspx

3116，是INL\_REGID\_APITC寄存器。这段代码应该是由intel自己的developer发出来的，在这里有个文档。

http://www.securitytechnet.com/resource/rsc-center/presentation/intel/spring2002/DESL187.pdf

这篇文章http://msdn.microsoft.com/en-us/library/bb173458.aspx介绍了windows下编程高精度时间需要考虑的一些问题，值得一读。
