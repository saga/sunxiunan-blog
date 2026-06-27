---
title: 界面自动测试工具UI auto test tool
description: "与unit test不同，我们项目特点决定了，一个可以录制回放键盘鼠标动作的自动化界面测试工具更为有用。基于这 &hellip; \n继续阅读“界面自动测试工具UI auto test tool”"
published: 2012-06-25
category: tech
---

与unit test不同，我们项目特点决定了，一个可以录制回放键盘鼠标动作的自动化界面测试工具更为有用。基于这种想法，我们组里某个新人的training项目就是完成这个小工具。

C#可以使用这个工程打底 [http://www.codeproject.com/Articles/28064/Global-Mouse-and-Keyboard-Library](http://www.codeproject.com/Articles/28064/Global-Mouse-and-Keyboard-Library) 加入一些定制代码，就可以录制键盘和鼠标了，我还要求加入定时抓屏，重复回放的功能，在我们最近的项目开发中非常有用，比如测试某个动作300次，看内存消耗，不用这个工具就崩溃了。

Python也可以达到类似效果，比如这个项目autopy [https://github.com/msanders/autopy/](https://github.com/msanders/autopy/) 或者是Pywinauto [http://code.google.com/p/pywinauto/](http://code.google.com/p/pywinauto/)  也可以通过PyWin32直接访问windows api达到效果。还有一种办法就是 [http://sikuli.org/](http://sikuli.org/) 这个sikuli的问题是录制起来稍微麻烦了些，不是那么直接。
