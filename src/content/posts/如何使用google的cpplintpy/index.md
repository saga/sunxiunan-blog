---
title: 如何使用google的cpplint.py
description: "http://code.google.com/p/google-styleguide/ 这是google使用的 &hellip; \n继续阅读“如何使用google的cpplint.py”"
published: 2009-04-14
category: tech
---

[http://code.google.com/p/google-styleguide/](http://code.google.com/p/google-styleguide/ "http://code.google.com/p/google-styleguide/") 这是google使用的一个C++代码风格规范，可以作为平常开发的参考。

作为风格参考，google还推出了一个cpplint.py的脚本，可以用作风格规范检查使用。可以在这里下载

[http://google-styleguide.googlecode.com/svn/trunk/cpplint](http://google-styleguide.googlecode.com/svn/trunk/cpplint "http://google-styleguide.googlecode.com/svn/trunk/cpplint")

在windows下的使用方法也非常简单，（安装python后）把cpplint.py放在项目目录下，然后进入命令行，敲打命令如下：

**C:\\temp\\>cpplint.py –output=vs7 test1.cpp**

可以通过cpplint.py –help来查看帮助。注意，命令行参数都是两个横线（–）。
