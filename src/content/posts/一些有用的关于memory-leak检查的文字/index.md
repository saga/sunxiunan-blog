---
title: 一些有用的关于memory leak检查的文字
description: 问题起源来自这个帖子：
published: 2010-02-24
category: tech
---

问题起源来自这个帖子：

实验代码如下：

 1: USES\_CONVERSION;

 2: CComVariant varStr = "This is string test";

 3: WCHAR buff\[\] = L"aaaaaaaaaaaaabbbbbbbb222222222222222222222222";

 4: CHAR buff2\[\] = "aaaaaaaaaaaaabbbbbbbbbbbbaaaaaaaaaaabbbb222222222222222";

 5:  

 6:  

 7: for (int i = 0; i< 500; i++)

 8: {

 9: // will increase memory fastly.

 10: //varStr.bstrVal = SysAllocString(buff);

 11: // will crash very soon.

 12: //varStr.bstrVal = SysAllocString(A2OLE(buff2));

 13: // will increase memory fastly.

 14: CString str = buff2;

 15: //varStr.bstrVal = str.AllocSysString();

 16: BSTR bstr = str.AllocSysString();

 17: Sleep(1);

 18: //SysFreeString(bstr);

 19: ::OutputDebugString("\\nloooooooooop\\n");

 20: }

 21:  

这里产生的Leak无法用CRT方式抓到，实验了visual leak detector [http://sites.google.com/site/dmoulding/vld](http://sites.google.com/site/dmoulding/vld)

也在初始化加了如下代码：

    \_CrtDumpMemoryLeaks();

    \_CrtSetDbgFlag(\_CrtSetDbgFlag(\_CRTDBG\_REPORT\_FLAG) | \_CRTDBG\_LEAK\_CHECK\_DF);

也添加了ONNOCACHE = 1这个全局环境变量

对于new char\[255\]这种leak都可以在output中输出。

但是这种AllocSysString产生的leak没看到输出。

我用了Debug Diag Tool，

[http://www.microsoft.com/downloadS/details.aspx?FamilyID=28bd5941-c458-46f1-b24d-f60151d875a3&displaylang=en](http://www.microsoft.com/downloadS/details.aspx?FamilyID=28bd5941-c458-46f1-b24d-f60151d875a3&displaylang=en)

可以看到如下结果：

###### Function details

Function **test1!Ctest1Dlg::OnBnClickedButton1+114**

Allocation type  BSTR allocation(s)

Allocation Count **5 allocation(s)**

Allocation Size **47.86 KBytes**

Leak Probability **43%**

问题是，还有没有其他工具也可以捕捉到这类leak？或者VC有没有内置的方案，类似CrtDumpMemoryLeaks这样的，不要purify，boundschecker这种重型工具（不想用盗版）。

参考链接：

[http://stackoverflow.com/questions/45627/how-do-you-detect-avoid-memory-leaks-in-your-unmanaged-code](http://stackoverflow.com/questions/45627/how-do-you-detect-avoid-memory-leaks-in-your-unmanaged-code)

  
\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

我又找了一些关于memory leak的信息，放在下面：

[http://msdn.microsoft.com/en-us/library/e5ewb1h3%28VS.80%29.aspx](http://msdn.microsoft.com/en-us/library/e5ewb1h3%28VS.80%29.aspx "http://msdn.microsoft.com/en-us/library/e5ewb1h3%28VS.80%29.aspx")

\_CrtDumpMemoryLeaks();

————————————————–

[http://windbg.info/doc/1-common-cmds.html#20\_memory\_heap](http://windbg.info/doc/1-common-cmds.html#20_memory_heap "http://windbg.info/doc/1-common-cmds.html#20_memory_heap")

**Finding memory leaks**

-   From WinDbg’s command line do a **!address –summary**.
    
    If **RegionUsageHeap** or **RegionUsagePageHeap** are growing, then you might have a memory leak on the heap. Proceed with the following steps.
    

1.  Enable "Create user mode stack trace database" for your image in GFlags (gflags.exe /i +ust)
2.  From WinDbg’s command line do a **!heap -stat**, to get all active heap blocks and their handles.
3.  Do a **!heap -stat -h 0**. This will list down handle specific allocation statistics for every AllocSize.
    
    For every AllocSize the following is listed: AllocSize, #blocks, and TotalMem. Take the AllocSize with maximum TotalMem.
    
4.  Do a **!heap -flt s** . =AllocSize that we determined in the previous step. This command will list down all blocks with that particular size.
5.  Do a **!heap -p -a** to get the stack trace from where you have allocated that much bytes. Use the that you got in step 4.
6.  To get source information you must additionally enable page heap in step 1 (gflags.exe /i +ust +hpa)
7.  Do a **dt ntdll!\_DPH\_HEAP\_BLOCK StackTrace** , where is the DPH\_HEAP\_BLOCK address retrieved in step 5.
8.  Do a **dds** ", where is the value retrieved in step 7.
    
    Note that dds will dump the stack with source information included.
    

——————————————

[http://blogs.msdn.com/oldnewthing/archive/2005/08/15/451752.aspx](http://blogs.msdn.com/oldnewthing/archive/2005/08/15/451752.aspx "http://blogs.msdn.com/oldnewthing/archive/2005/08/15/451752.aspx")

Think about it: If you are leaking something, then there are going to be a lot of them. Whereas things you aren’t leaking will be few in number. Therefore, if you grab something at random, it will most likely be a leaked object! In mathematical terms, suppose your program’s normal memory usage is 15 megabytes, but for some reason you’ve used up 1693 megabytes of dynamically-allocated memory. Since only 15 megabytes of that is normal memory usage, the other 1678 megabytes must be the leaked data. If you dump a random address from the heap, you have a greater-than-99% chance of dumping a leaked object.

So grab a dozen or so addresses at random and dump them. Odds are you’ll see the same data pattern over and over again. That’s your leak. If it’s a C++ object with virtual methods, dumping the vtable will quickly identify what type of object it is. If it’s a [POD](http://c2.com/cgi/wiki?PlainOldData) type, you can usually identify what it is by looking for string buffers or pointers to other data.

Your mileage may vary, but I’ve found it to be an enormously successful technique. Think of it as applied psychic powers.

——————————————

[http://blogs.msdn.com/larryosterman/archive/2004/09/28/235304.aspx](http://blogs.msdn.com/larryosterman/archive/2004/09/28/235304.aspx "http://blogs.msdn.com/larryosterman/archive/2004/09/28/235304.aspx")

——————————————

[http://en.wikipedia.org/wiki/Memory\_debugger](http://en.wikipedia.org/wiki/Memory_debugger "http://en.wikipedia.org/wiki/Memory_debugger")

——————————————

[http://blogs.msdn.com/oldnewthing/archive/2009/11/27/9929238.aspx](http://blogs.msdn.com/oldnewthing/archive/2009/11/27/9929238.aspx "http://blogs.msdn.com/oldnewthing/archive/2009/11/27/9929238.aspx")

——————————————
