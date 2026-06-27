---
title: 神奇的2009年2月13日
description: "在西方的传说里，13号星期五是很不吉利的一个组合，号称是黑色星期五，而情人节的前一天恰恰就是一个黑色星期五，不 &hellip; \n继续阅读“神奇的2009年2月13日”"
published: 2009-02-13
category: tech
---

在西方的传说里，13号星期五是很不吉利的一个组合，号称是黑色星期五，而情人节的前一天恰恰就是一个黑色星期五，不知道是什么寓意。

当然这其实不奇怪，黑色星期五碰到的几率还是很大的，我想提到的是这个数字：**1234567890。**

熟悉unix系统的朋友可以试试，这个时间戳（timestamp）到底是哪天，

% **date -r 1234567890**
Sa 14 Feb 2009 00:31:30 CET
%
% **env TZ=US/Eastern date -r 1234567890**
Fr 13 Feb 2009 18:31:30 EST
%
% **env TZ=US/Pacific date -r 1234567890**
Fr 13 Feb 2009 15:31:30 PST

没错，就是今天！这个时间再次出现的时间估计是人类毁灭之后了（never happen？）。
另外，现在大部分unix族的操作系统好像已经都把时间转换到64位，Year2038基本上是不会产生什么问题了。

相关信息来源：
http://www.feyrer.de/NetBSD/bx/blosxom.cgi/nb\_20090205\_2120.html
http://en.wikipedia.org/wiki/Year\_2038\_problem
