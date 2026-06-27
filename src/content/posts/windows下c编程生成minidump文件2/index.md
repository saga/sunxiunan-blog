---
title: Windows下C++编程生成minidump文件(2)
description: "在Windows下C++编程生成minidump文件我介绍了如何使用SEH来捕捉某个程序块的异常。如果你想有一 &hellip; \n继续阅读“Windows下C++编程生成minidump文件(2)”"
published: 2009-09-08
category: tech
---

在[Windows下C++编程生成minidump文件](http://sunxiunan.com/?p=1022)我介绍了如何使用SEH来捕捉某个程序块的异常。如果你想有一个可以捕捉整个程序运行时异常崩溃的函数，可以使用下面的代码。

1）还是定义下面的函数。

#include <dbghelp.h>  
#include <shellapi.h>  
#include <shlobj.h>

#pragma comment(lib, "dbghelp.lib")

LONG WINAPI GenerateDump(struct \_EXCEPTION\_POINTERS \*pExceptionPointers, TCHAR\* pStr)  
{  
    LONG ret = EXCEPTION\_EXECUTE\_HANDLER;  
    BOOL bMiniDumpSuccessful;  
    TCHAR szPath\[MAX\_PATH\];  
    TCHAR szFileName\[MAX\_PATH\];  
    TCHAR\* szAppName = TEXT("AppName");  
    TCHAR\* szVersion = TEXT("v1.0");  
    DWORD dwBufferSize = MAX\_PATH;  
    HANDLE hDumpFile;  
    SYSTEMTIME stLocalTime;  
    MINIDUMP\_EXCEPTION\_INFORMATION ExpParam;

    GetLocalTime( &stLocalTime );  
    GetTempPath( dwBufferSize, szPath );

    \_stprintf( szFileName, TEXT("%s%s"), szPath, szAppName );  
    CreateDirectory( szFileName, NULL );

    \_stprintf( szFileName, TEXT("%s%s.dmp"), TEXT("c:\\\\"), pStr);  
    hDumpFile = CreateFile(szFileName, GENERIC\_READ|GENERIC\_WRITE,  
        FILE\_SHARE\_WRITE|FILE\_SHARE\_READ, 0, CREATE\_ALWAYS, 0, 0);

    ExpParam.ThreadId = GetCurrentThreadId();  
    ExpParam.ExceptionPointers = pExceptionPointers;  
    ExpParam.ClientPointers = TRUE;

    // [http://www.debuginfo.com/articles/effminidumps.html](http://www.debuginfo.com/articles/effminidumps.html)  
    MINIDUMP\_TYPE mdt = (MINIDUMP\_TYPE)(MiniDumpWithFullMemory);

    bMiniDumpSuccessful = MiniDumpWriteDump(GetCurrentProcess(), GetCurrentProcessId(),  
        hDumpFile, mdt, &ExpParam, NULL, NULL);

    int i = GetLastError();  
    HRESULT hr = HRESULT\_FROM\_WIN32(i);

    return ret;  
}

在注释中有一个网址[http://www.debuginfo.com/articles/effminidumps.html](http://www.debuginfo.com/articles/effminidumps.html)，这篇文字非常有用，介绍了Minidump不同参数的详细情况，如果是图方便，那就直接dump所有内容好了。

另外需要注意的是，我直接把dump文件的输出路径hard code在代码中，你可以修改它变得更好看一些。

2）定义一个回调函数，让系统可以在崩溃时候调用它。

LONG WINAPI MyUnhandledExceptionFilter(struct \_EXCEPTION\_POINTERS \*lpTopLevelExceptionFilter)  
{  
    GenerateDump(lpTopLevelExceptionFilter, "unhandle");  
    return EXCEPTION\_CONTINUE\_SEARCH;  
}

在这个函数中，我们会生成dump文件。

3）在main或者winmain或者InitInstance这样的系统初始化函数中，加入这样的代码：

SetUnhandledExceptionFilter(MyUnhandledExceptionFilter);

这就大功告成，不再需要使用\_\_try \_\_except这样的形式去捕捉SEH。

一些需要注意的问题：

C++的exception机制和SEH是两个不同的处理方式，微软提供了一个函数来做转化\_set\_se\_translator，可以查找msdn以及codeproject，里面有不少相关内容。

关于使用SetUnhandledExceptionFilter，好像是在debugger中运行会点问题，具体可以参考这篇文档：BUG: Unhandled exception filter not called inside debugger，[http://support.microsoft.com/kb/173652/en-us/](http://support.microsoft.com/kb/173652/en-us/ "http://support.microsoft.com/kb/173652/en-us/")

在Windows2008以及Windows Vista SP1以后，微软添加了Windows Error Reporting机制（WER），感兴趣的可以看看MSDN。

如果对crash error report感兴趣的，可以找找codeproject，另外也可以参考google-breakpad项目。
