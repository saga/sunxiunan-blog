---
title: 周末加班，晚上八点回家
description: "这两个礼拜的周末，老板一直在公司，我们也得到公司上班。今天星期六，结果还是八点多才回来。 手里有两个内存泄漏或 &hellip; \n继续阅读“周末加班，晚上八点回家”"
published: 2006-03-11
category: baby
---

这两个礼拜的周末，老板一直在公司，我们也得到公司上班。今天星期六，结果还是八点多才回来。

手里有两个内存泄漏或者资源泄漏的问题，都是要运行十几个小时的，实在头疼。  
其中一个可以在VMWare虚拟机重现了，从任务管理器看它的user objects数量不正确，已经达到了10000，正常应该不过一百二百。在google上查询，DDE link也算是一种user object，而我们正使用了DDE连接。  
查了半天资料，发现可以使用GetGuiResources这个函数来得到user object，但是必须使用LoadLibrary和GetProcAddress这两个进程调用函数来使用。如果是内存泄漏就比较好办，WorkingSetSize就是实际内存使用量。

调用的代码片段在这里，留此存照。

typedef int (CALLBACK \* GETGUIRESOURCES\_PROC)(HANDLE, DWORD);  
typedef DWORD (CALLBACK \* GETMODULEFILENAMEEX\_PROC)(HANDLE, HMODULE, LPTSTR, DWORD);

// from USER32.DLL  
HMODULE hUser32;  
GETGUIRESOURCES\_PROC pfnGetGuiResources;

// try to find GetGuiResources() in USER32.DLL  
if ( hUser32 == NULL)  
{  
hUser32 = ::LoadLibrary(\_T(“USER32.DLL”));  
if (hUser32 != NULL)  
pfnGetGuiResources = (GETGUIRESOURCES\_PROC)::GetProcAddress(hUser32, \_T(“GetGuiResources”));  
}

ASSERT((hUser32 != NULL) && (pfnGetGuiResources != NULL));

然后就是更进一步，查找是什么样类型的handle或者object有问题，就要使用一个没有文档的函数NTQueryObject()，不过有了网络，我们就可以查询了，具体怎么使用现在还没有好的代码，还在研究过程中。

真的很佩服sysinternals.com的作者们，编写了大量的工具，大部分不知道怎么实现的。
