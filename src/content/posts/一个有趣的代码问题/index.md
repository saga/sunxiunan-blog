---
title: 一个有趣的代码问题
description: "OldNewThing发布了一篇很有意思的文章http://blogs.msdn.com/oldnewthin &hellip; \n继续阅读“一个有趣的代码问题”"
published: 2010-01-21
category: tech
updated: 2010-01-22
tags:
  - IsBadReadPtr
---

OldNewThing发布了一篇很有意思的文章[http://blogs.msdn.com/oldnewthing/archive/2010/01/20/9950638.aspx](http://blogs.msdn.com/oldnewthing/archive/2010/01/20/9950638.aspx "http://blogs.msdn.com/oldnewthing/archive/2010/01/20/9950638.aspx")

> #### The wrong way to determine the size of a buffer
> 
> A colleague of mine showed me some code from a back-end program on a web server. Fortunately, the company that wrote this is out of business. Or at least I hope they’re out of business!
> 
> size = 16384; 
> 
> while (size && IsBadReadPtr(buffer, size)) 
> 
> { size--; }

高人就是高人，这个代码其实还是需要好好想一想才能明白为何有问题。

IsBadReadPtr的意思是尝试去读一个不属于自己进程的内存地址，因为指针越界在大多数情况下都是代表错误发生。但是这个函数实际上并不是那么好用，具体原因可以看OldNewThing的这篇文章[http://blogs.msdn.com/oldnewthing/archive/2006/09/27/773741.aspx](http://blogs.msdn.com/oldnewthing/archive/2006/09/27/773741.aspx "http://blogs.msdn.com/oldnewthing/archive/2006/09/27/773741.aspx") 介绍的非常详细。

回到这个问题上，在OldNewThing的文章中介绍的非常清楚“But guard page exceptions are raised only once.”，也就是说，IsBadReadPtr将只会有效一次（？need to double check），这个代码逻辑就是有问题的。

再把其中包含的问题列一下，主要参考了文章后的留言。

1）16384这个16K大小来的莫名其妙，当然不排除在某些特定软件设计中，最大就是这个大小。

2）第二个问题，IsBadReadPtr并不是那么好用。

3）这个计算得到的值未必正确。

那么我们该如何获取buffer的大小呢？

在c-faq中告诉我们，通常情况下是没有解决办法的，只能自己保存这个buffer大小。办法也很简单，我们需要申请的时候就把buffer大小记住，需要知道的时候，查找一下就知道了，或者是使用某种数据结构，把buffer的大小以及其他信息放在开头固定的一块大小就行了。

如果是windows，那么有一些特定的办法。可以用\_msize来获得malloc申请的buffer。

allocated with LocalAlloc, use LocalSize. For HeapAlloc, use HeapSize. For GlobalAlloc, use GlobalSize，如果使用CoTaskMemalloc，可以先用CoGetMalloc拿到一个IMalloc接口，然后调用GetSize()

这些函数到底好用不好用，还是得靠你自己多测试。最简单牢靠的办法还是自己保存这个size信息。
