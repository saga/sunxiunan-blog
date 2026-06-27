---
title: "Re [CPyUG] Coroutine协程和闭包本质上有什么区别么"
description: "协程与闭包的关系，就好比是鸡蛋和灌饼，你说它俩本质上有什么区别？ 我建议楼主如果对概念感兴趣，可以参考wiki &hellip; \n继续阅读“Re [CPyUG] Coroutine协程和闭包本质上有什么区别么”"
published: 2010-12-31
category: tech
---

协程与闭包的关系，就好比是鸡蛋和灌饼，你说它俩本质上有什么区别？

我建议楼主如果对概念感兴趣，可以参考wiki百科关于 coroutine和闭包的条目  
http://en.wikipedia.org/wiki/Closure\_%28computer\_programming%29  
http://en.wikipedia.org/wiki/Coroutine  
而不是在这里瞎猜瞎联想。

至于Python与Lua的协程，可以参考我翻译的这篇  
http://sunxiunan.com/?p=1654  
要注意的是Python本身没有协程概念（第三方实现那就不算本身），只有Generator。

就我个人浅见，闭包概念比较容易理解使用，而协程是一个动态交互的动作，涉及到主程序和协程子程序之间的交换，理解起来要麻烦多多。  
跟闭包相关联的概念不是协程，而是first class function。  
而与协程相关的，多是“并发”这个概念。

关于协程，有一篇论文非常值得参考  
www.inf.puc-rio.br/~roberto/docs/MCC15-04.pdf  
是Lua作者写的，建议感兴趣的朋友看看。  
至于闭包，看完维基百科条目，基本就应该了解的差不多了
