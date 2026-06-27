---
title: Debug step by step(1) Memeory leak问题调试常用手段
description: "1, check handle leak. Use Lua script to search the code &hellip; \n继续阅读“Debug step by step(1) Memeory leak问题调试常用手段”"
published: 2009-08-26
category: tech
updated: 2009-08-27
---

1, check handle leak.

Use Lua script to search the codes.

2, check memory leak.

If you use CRT, you could use:

\_CrtSetDbgFlag(\_CrtSetDbgFlag(\_CRTDBG\_REPORT\_FLAG) | \_CRTDBG\_LEAK\_CHECK\_DF);  
//\_CrtSetBreakAlloc(182366);

// http://msdn.microsoft.com/en-US/library/e5ewb1h3(VS.80).aspx

3, get performance data.

We could use PDH functions. CPDHData

4, 注释代码隔离问题。

5,

1\. 加一个对象计数器, 哪种对象一直增加, 就是它了.  
2\. 申请比较多的类, 轮流内部增加一个 char buffer\[65536\], 看看内存增加是否加快, 很快就可以找出了.

6, VLD boundchecker ADPlus WinDbg SysInternals-Tools (handle)

7, OANOCACHE=1  
http://msdn.microsoft.com/en-us/library/ms221105.aspx  
For example, if the application allocates a BSTR and frees it, the free block of memory is put into the BSTR cache by Automation. If the application then allocates another BSTR, it can get the free block from the cache. If the second BSTR allocation is not freed, IMallocSpy will attribute the leak to the first allocation of the BSTR. You can determine the correct source of the leak (the second allocation) by disabling the BSTR caching using the debug version of Oleaut32.dll, and by setting the environment variable OANOCACHE=1 before running the application.

8, some tools Mozilla uses:

http://www.mozilla.org/performance/tools.html

9, 启用或禁用内存诊断可以调用全局函数 AfxEnableMemoryTracking()

＃ifdef \_DEBUG  
CMemoryState oldMemState, newMemState, diffMemState;  
oldMemState.Checkpoint();  
＃endif  
…  
(被测试的代码)  
…  
＃ifdef \_DEBUG  
newMemState.Checkpoint();  
if(diffMemState.Difference(oldMemState, newMemState)) {  
TRACE(“Memory Leaked Here:\\n\\n” );  
}  
＃endif

抄袭了toplanguage讨论中的一些想法。

[http://groups.google.com/group/pongba/browse\_thread/thread/6c871ba9a79be74a#](http://groups.google.com/group/pongba/browse_thread/thread/6c871ba9a79be74a#)
