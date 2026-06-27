---
title: 如何学习Lua编程
description: "最近迷上了使用Lua写一些方便的小程序，也看了一些关于lua的文档。发现不少人经常问一些很常见的问题，感觉好像 &hellip; \n继续阅读“如何学习Lua编程”"
published: 2009-08-24
category: lua
---

最近迷上了使用Lua写一些方便的小程序，也看了一些关于lua的文档。发现不少人经常问一些很常见的问题，感觉好像还没有找到学习lua的好办法。下面介绍一下个人经验。

1，学习lua需要什么基础？

很显然，lua不适合作为你第一个编程语言，因为它需要比较深的c语言编程基础，而且对于数据结构有一定的了解，最关键的是它的功能函数并不完整，需要很多额外第三方支持，比如最基本的socket。所以学习lua最好有c或者c++的基础。

2，学习lua看什么文档？

国人学习lua，最好从Programming In Lua中文版看起，非常有帮助，最好是逐字逐句的看。文档在这里可以下载：[http://groups.google.com/group/lua5](http://groups.google.com/group/lua5 "http://groups.google.com/group/lua5")

另外可以看看lua的manual，推荐大家安装lua for windows这个整合安装包，里面包含了这两个文档，虽然都是英文的。

3，如何在windows下使用lua？

windows下最好安装lua for windows，里面会包含一些常用的模块，比如socket，sql，sqlite等。而且还包含了一个编辑器Scite，可以通过它来对lua脚本进行调试运行。不需要额外安装什么IDE了。

4，如何写一个lua的调试器？

看PIL或者manual，里面会提到lua的debug库，或者更深入的办法就是直接看lua代码，不过100多k而已。

5，lua如何进行网络编程？

通过luasocket。

6，lua除了编写魔兽世界的插件，还能做什么？

可以用lua来写一些常用的程序，比如操作excel，比如定制一些查找。还可以把lua作为一种配置方式（类似ini文件或者cfg文件），因为lua的表，可以达到非常复杂的配置功能，另外lua的解析速度要比xml快多了。当然lua主要用处还是游戏。

7，lua可以调用windows api么？可以调用COM组件么？

可以自己编写一个dll封装对windows api的调用，或者用alien这个模块。可以通过luacom来调用COM组件。BTW，通过COM组件调用可以实现对excel或者word的操作。

8，学习lua有什么网站么？

两个很重要的[http://*lua*\-users.org](http://lua-users.org)，另外一个[http://lua.org](http://lua.org)，还有一个重要的网站是[http://luaforge.org](http://luaforge.org)
