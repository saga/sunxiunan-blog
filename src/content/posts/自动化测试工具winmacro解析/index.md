---
title: 自动化测试工具WinMacro解析
description: "在codeproject上找到一个project名字是WinMacro。 具体实现是使用了SetWindows &hellip; \n继续阅读“自动化测试工具WinMacro解析”"
published: 2006-05-15
category: tech
---

在codeproject上找到一个project名字是WinMacro。  
具体实现是使用了SetWindowsHookEx函数。  
SetWindowsHookEx(WH\_GETMESSAGE,GetMsgProc,hinstance,0)，设置了一个操作系统级钩子，主要是为了获得WM\_CANCELJOURNAL消息。在MSDN的JournalPlaybackProc帮助里说

> If the user presses CTRL+ESC OR CTRL+ALT+DEL during journal playback, the system stops the playback, unhooks the journal playback procedure, and posts a WM\_CANCELJOURNAL message to the journaling application

录制动作使用的是SetWindowsHookEx(WH\_JOURNALRECORD,JournalRecordProc,hinstance,0)，存到一个文件里。回放动作使用了这个函数SetWindowsHookEx(WH\_JOURNALPLAYBACK,JournalPlaybackProc,hinstance,0)。WinMacro代码里面有一些技巧就是加速回放，具体可以看code。项目地址：http://www.codeproject.com/tools/winmacro.asp

[Functions](http://msdn.microsoft.com/library/default.asp?url=/library/en-us/winui/winui/windowsuserinterface/windowing/hooks/hookreference/hookfunctions/setwindowshookex.asp)

> SetWindowsHookEx Function
> 
> The SetWindowsHookEx function installs an application-defined hook procedure into a hook chain. You would install a hook procedure to monitor the system for certain types of events. These events are associated either with a specific thread or with all threads in the same desktop as the calling thread.
