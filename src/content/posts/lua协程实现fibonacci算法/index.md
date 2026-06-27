---
title: Lua协程实现Fibonacci算法
description: "费波拉且数的算法如图所示： 所以a和b分别保存了前两次的结果，每次for循环调用generator都从yiel &hellip; \n继续阅读“Lua协程实现Fibonacci算法”"
published: 2010-08-25
category: lua
tags:
  - lua 协程
---

[![image](http://sunxiunan.com/media/LuaFibonacci_9824/image_thumb.png "image")](http://sunxiunan.com/media/LuaFibonacci_9824/image.png)

费波拉且数的算法如图所示：

[![image](http://sunxiunan.com/media/LuaFibonacci_9824/image_thumb_3.png "image")](http://sunxiunan.com/media/LuaFibonacci_9824/image_3.png)

所以a和b分别保存了前两次的结果，每次for循环调用generator都从yield这一行代码恢复然后进行a, b = b, a+b操作。然后判断a是否小于等于n决定返回结果。

如果不用coroutine.wrap，我们可以这样写，效果是一样的，代码稍显啰嗦：

[![image](http://sunxiunan.com/media/LuaFibonacci_9824/image_thumb_4.png "image")](http://sunxiunan.com/media/LuaFibonacci_9824/image_4.png)
