---
title: strlen与性能问题
description: "在Tony bai的博客上看到他提起strlen的性能问题，这还真是比较有意思的一个话题。 我在前一阵专门用两 &hellip; \n继续阅读“strlen与性能问题”"
published: 2009-04-11
category: tech
---

在Tony bai的博客上看到[他提起strlen的性能](http://bigwhite.blogbus.com/logs/37753065.html)问题，这还真是比较有意思的一个话题。

我在前一阵专门用两周时间来对代码做优化，问题的起因是我们组有人提出来程序跑的慢，另外使用接口功能的外国同事也提起过几次。关于优化还专门做了一张ppt演示，有空节选一下分享出来。不过有意思的是，最后发现速度的最大瓶颈其实并不是在我们新加了多少功能，而是两方的客户端调用代码都写的太烂了，这种巧合都能碰到一起，太奇妙了。

印象中BSD的kernal开发人员delphij也曾经提到过strlen，开起google一搜[果然如此](http://blog.delphij.net/archives/2009/01/new-strlen3-com.html)。strlen这个函数貌似简单容易写，但是里面的花花肠还真不少呢。这也间接的说明了阅读学习经典代码的重要性。
