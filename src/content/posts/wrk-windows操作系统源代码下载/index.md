---
title: "WRK &#8211; windows操作系统源代码下载"
description: "从潘爱民的博客看到这东西的，潘爱民准备写一个windows内核方面的书，就提到了微软的WRK计划（Window &hellip; \n继续阅读“WRK &#8211; windows操作系统源代码下载”"
published: 2009-02-01
category: tech
updated: 2009-09-01
---

从潘爱民的博客看到这东西的，潘爱民准备写一个windows内核方面的书，就提到了微软的WRK计划（Windows Research Kernel），这个计划是让高校师生以及亲密的合作商有一个机会能够了解和学习windows的内核代码，它的网站在这里：

http://www.microsoft.com/resources/sharedsource/windowsacademic/researchkernelkit.mspx

虽然有个下载连接，可是进去以后需要申请一个序列号，我已经申请了，但是不知道能不能拿到这个序列号。

WRK应该是包含了以下这些模块的代码，都是很实惠的，学习一下感觉挺有意义。而且WRK应该是可以编译运行的（需要验证），如果是这样，那就比光看代码更有用处了。

The Windows Research Kernel contains the sources for the core Windows (NTOS) kernel.

NTOS implements the basic OS functions for:

\* Processes  
\* Threads  
\* Virtual memory and cache managers  
\* I/O management  
\* The registry  
\* Executive functions, such as the kernel heap and synchronization  
\* Object manager  
\* Local procedure call mechanism  
\* Security reference monitor  
\* Low-level CPU management (thread scheduling, Asynchronous and Deferred Procedure calls, interrupt/trap handling, exceptions)

既然是为了学习（先拿到再说以后学习的事），估计会有好心人放出来代码的。所以开动google，果然找到了线索。国内有个驱动开发网，里面有个链接就是谈论这个东西。

http://bbs.driverdevelop.com/read.php?tid-99380-fpage-0-toread–page-1.html

如果还没有找到，那就试着查查wrk.7z，大概是个8M左右的7z压缩文件。反正我最后是从某个网站上下载了。

http://groups.google.com/group/lua5/web/wrk.7z

说到windows源代码，不得不说一下前几年windows2000代码泄露事件，那是货真价实的程序源代码，而不是像WRK这样的科研作品，但是好像也没有人因此产生什么新的书籍，谈论的也只是一阵就悄无声息，估计是被微软的法律信吓到了。不是有个博客“刀枪blue”因为介绍Windows7就收到了微软的律师信么？（参见http://www.vista123.com/html/5478.html）

论起来操作系统的开放源代码，MacOSX、Linux家族、BSD家族、Solaris都早已经大规模的开放了源代码，他们都各有特点和长处，在大型服务器领域这些开源的操作系统应该占有率已经超过了微软的windows server。windows这样偷偷摸摸的开放代码，还需要什么身份认证之类，真是很小家子气，你说我瞧不起他们难道没有道理么？而且Linux内核设计、 Linux内核设计和代码阅读、Solaris内核设计都已经有大量的著作介绍，阅读难度要比看WRK简单的多。就我个人而言，我只想看看里面一些简单的函数或者代码，花个半天时间研究一两个，整体上不会去深度研究的，毕竟这个东西研究的深了对我而言也没什么价值，兴趣所至玩玩即可。
