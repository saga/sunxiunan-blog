---
title: 这不是Bug而是个Feature
description: "http://geekwhisperin.wordpress.com/2009/09/24/bug-vs-fe &hellip; \n继续阅读“这不是Bug而是个Feature”"
published: 2010-04-06
category: tech
updated: 2011-12-07
---

[![image](http://sunxiunan.com/media/BugFeature_F63A/image_thumb.png "image")](http://sunxiunan.com/media/BugFeature_F63A/image.png)

[http://geekwhisperin.wordpress.com/2009/09/24/bug-vs-feature/](http://geekwhisperin.wordpress.com/2009/09/24/bug-vs-feature/ "http://geekwhisperin.wordpress.com/2009/09/24/bug-vs-feature/")

某个笑话中程序员经常说到的几句话里面就有这句：

> 你懂什么？！这不是bug，这是个feature！

当然，这种情况其实不怎么常见，毕竟客户也不是傻子，还是能看出来有没有错误发生的。

但是在这篇博客中

[http://blogs.msdn.com/shawnhar/archive/2009/12/29/bug-or-feature.aspx](http://blogs.msdn.com/shawnhar/archive/2009/12/29/bug-or-feature.aspx "http://blogs.msdn.com/shawnhar/archive/2009/12/29/bug-or-feature.aspx")

Shawn给我们分享了个真正的bug变feature、老母鸡变鸭的故事，简单说一下：

[Extreme G](http://www.talula.demon.co.uk/xg/index.html)是一个任天堂64上的赛车游戏，每个赛车都有超级加速（turbo boosts）功能，开过车的应该都知道，在弯道时候不应该加速，直道加速才能获得最好的效果。

Ash（主程序员）编写了一些人工智能（AI）代码让计算机控制的赛车知道什么时候应该加速，算法基本上就是直道加速加上随机选定某些值。

游戏出来以后，程序员们读到了一篇玩后感：

“我们特别喜欢这个具有攻击性的人工智能，它会用尽全力来阻止你超车。如果你超了一辆计算机控制的赛车，甚至是在弯道中间它都会加速，结果就是导致一片混乱人仰马翻，或许这个不是最好的比赛策略，但是这个心态简直是太他妈的爽翻了！”

‘喔！”Ash说“这是什么傻逼玩后感啊！我设计的人工智能系统根本不应该是这样运作的。”

检查了一些代码以后（见原文），Ash发现原来是代码写错了，结果就不是他预想的那种特性。当然，修改一些代码还是可以达到他原来的目的。

改不改呢？评论者说的是对的，尽管有些出乎意料，但是这个bug（或者说feature）产生了比原来更爽的效果，游戏开发者把这段代码继续保留在正式发布版本中，作为游戏的feature出现。

挺有意思的故事吧，嘿嘿！
