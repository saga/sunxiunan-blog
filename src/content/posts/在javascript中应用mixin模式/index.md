---
title: 在JavaScript中应用Mixin模式
description: "编程中Mixin是什么？我最近看到这个词，有点感兴趣起来。我以前也见过这个词，依稀记得是在介绍Ruby的文章当 &hellip; \n继续阅读“在JavaScript中应用Mixin模式”"
published: 2020-04-02
category: tech
---

编程中Mixin是什么？我最近看到这个词，有点感兴趣起来。我以前也见过这个词，依稀记得是在介绍Ruby的文章当中，但是JavaScript中的Mixin干什么用呢？有些公众号提到express.js和vue.js的实现应用了mixin模式，我最近主要也是做这些方面，所以得关注了解啊。

最权威的还是先看看wiki怎么说：[https://en.wikipedia.org/wiki/Mixin](https://en.wikipedia.org/wiki/Mixin) 头一段说明有点绕，不是很容易理解，那就看看JS代码吧。Wiki列出了三种实现，分别是extend，Object.assign以及Flight-Mixin。

第一种extend方式的参考实现，就是把源对象上面的key，逐个赋值到目标对象上。其它的两种大致也都是如此，Flight-Mixin模式其实就是IIFE直接执行的变形。

剥掉了神秘感，剩下的就很简单了。有什么限制呢？首先，mixin的源对象操作this的属性，一定要在目标对象上存在，否则就会出现undefined问题了。其次mixin在JS这种动态类型的编程语言是合适的，如果用在c#这样的静态类型语言，就可以用扩展方法来实现，更灵活的就得用dynamic来定义this了。

那mixin的用处，大致就是mixin源对象可以定义behavior，然后可以动态的绑定到其它对象上，只要这些对象满足mixin的constraints就可以了，把行为抽象出来。就此推论，mixin也很容易实现成decorator。mixin还要注意的一点是，它实质是一种浅拷贝，浅拷贝可能有的问题它也会有。

在core-decorators项目中的代码更加完整 [https://github.com/jayphelps/core-decorators/blob/5b754256a30c23a0aef846c1b45f261e0c7b21a2/src/mixin.js](https://github.com/jayphelps/core-decorators/blob/5b754256a30c23a0aef846c1b45f261e0c7b21a2/src/mixin.js)，其中使用了getOwnPropertyDescriptors以及defineProperty这样更为特定的函数处理不同的情况。

mixin有什么问题么？当然有，什么设计模式都有局限性和适用的场景。比如react就提到[https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html) 简单说，mixin在大的codebase中增加了隐形依赖复杂度（Mixins introduce implicit dependencies），命名冲突问题（Mixins cause name clashes），滚雪球复杂度（Mixins cause snowballing complexity）。所以在express.js这样的轻量级框架中使用mixin说的通，但是复杂的企业级应用，就不得不考虑复杂度带来的各种问题。

我的建议是如果软件超过7个人开发，那就考虑angular/TypeScript/rxjs这一套。如果是小项目，可以考虑react或者vue.js，但是最好也配上babel加ES最新标准。

感兴趣的可以留言讨论。
