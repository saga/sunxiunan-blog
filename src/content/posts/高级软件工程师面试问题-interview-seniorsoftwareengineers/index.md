---
title: 高级软件工程师面试问题 Interview SeniorSoftwareEngineers
description: "hanselman这篇文章很有意思，尽管不是每个问题都很值得作为面试问题出现，但是很多都值得去仔细想想。 一个 &hellip; \n继续阅读“高级软件工程师面试问题 Interview SeniorSoftwareEngineers”"
published: 2011-02-23
category: blog
---

hanselman这篇文章很有意思，尽管不是每个问题都很值得作为面试问题出现，但是很多都值得去仔细想想。

一个优秀的面试问题，尤其是针对Senior Engineer的面试问题，不应该仅仅是问某个api的用法，某个很容易从帮助中找到的内容。有发散性，可以基于问题进行扩展的问题才是一个比较好的问题。

下面是一个非常长的问题列表，主要是关于面向对象设计，设计模式，以及一些实际工程中会用到概念，都是比较基本的，但是也非常能考察一个高级工程师的水平，因为会牵涉到非常多方面。

另外要说明的是下面很多概念性问题可以直接从wiki维基百科上找到答案。另外我会标记出个人觉得比较值得问的问题。

[原文在这里 http://www.hanselman.com/blog/NewInterviewQuestionsForSeniorSoftwareEngineers.aspx](http://www.hanselman.com/blog/NewInterviewQuestionsForSeniorSoftwareEngineers.aspx)

**\# What is something substantive that you’ve done to improve as a developer in your career?**

**有没有做过什么比较实质性的事情来提升你的程序员职业水平？**

好问题。我的回答：这个很难说，我的做法是坚持学习，坚持写技术类博客。另外有些经验在这里提到过[http://sunxiunan.com/?p=1799](http://sunxiunan.com/?p=1799)

# Would you call yourself a craftsman (craftsperson) and what does that word mean to you?

不敢叫自己大师啊，那得多牛逼？！

**\# Implement a <basic data structure> using <some language> on <paper|whiteboard|notepad>.**

**用某种语言在纸面上实现一个基本的数据结构。(用近似真实格式的伪代码来表达?)**

好问题。我的回答，找一本基础的数据结构书籍吧，比如这一本《数据结构与算法分析：C语言描述（原书第2版）》

**\# What is SOLID?**

**参考http://en.wikipedia.org/wiki/Solid\_%28object-oriented\_design%29**

**这个solid不是说“结实的”，而是面向对象五大原则的简称：单一责任原则，开闭原则，莱西科夫替换原则，接口分离原则，依赖倒置原则。**

好问题。**这几个原则的确应该背下来，太基础了。**

**\# Why is the Single Responsibility Principle important?**

**为什么单一责任原则重要？**

好问题。我的回答，因为职责明确，设计就不容易混乱，即使有后续变化也是可控的。

# What is Inversion of Control? How does that relate to dependency injection?

参考http://en.wikipedia.org/wiki/Inversion\_of\_control

实际中的例子，通知开会，一种可以打电话通知到每个人（这属于中心控制型的，必须有个controller/manager之类的）；也可张贴一个告示，大家自己来看，这属于事件响应型的。

# How does a 3 tier application differ from a 2 tier one?

三层应用与两层应用的区别是什么？

我只知道MVC三层应用。

**\# Why are interfaces important?**

**为什么接口重要？**

好问题。接口的重要在于消费者（客户端）不需要了解生产者（服务端）的细节，接口相当于合同，当合同不变的时候，谁生产如何生产都不是消费者关心的问题。

# What is the Repository pattern? The Factory Pattern? Why are patterns important?

关于设计模式的问题，

第一个参考http://msdn.microsoft.com/en-us/library/ff649690.aspx

工厂模式基本上是众人皆知的模式了。

为何模式重要？我不觉得模式重要，模式的重要性在于让你能“喔！原来是这个”。但是对于一个没有几年编程经验的开发者而言，模式只能让你更混乱。

设计模式很多情况下是通过加入一个抽象层来解决耦合之类的问题，但是层次越多越复杂，就好比单位中领导的级别越多越官僚一样。

# What are some examples of anti-patterns?

反模式？少用模式，多写点清晰的代码吧。

# Who are the Gang of Four? Why should you care?

四人组，名字叫不上来，但是他们是设计模式的总结者。

# How do the MVP, MVC, and MVVM patterns relate? When are they appropriate?

这也是微软特色，大家只要知道MVC就行了，其实大家现在用的都是MVC，但是由于水平高低，效果就是千差万别。

啥MVP，MVVM我不知啊（也不是不知，只知道MVVM是wpf的一个概念，可我也不用wpf啊）

# Explain the concept of Separation of Concerns and it’s pros and cons.

参考http://en.wikipedia.org/wiki/Separation\_of\_concerns

我也不是了解的很细。

# Name three primary attributes of object-oriented design. Describe what they mean and why they’re important.

封装/继承/多态？

参考这里吧http://en.wikipedia.org/wiki/Object-oriented\_programming

学C++这几个概念是基础啊

# Describe a pattern that is NOT the Factory Pattern? How is it used and when?

不是工厂模式，我知道个单件模式。还有模板模式/facade模式/strategy模式，具体也要翻翻书，很少有意识的套用。

**\# You have just been put in charge of a legacy code project with maintainability problems. What kind of things would you look to improve to get the project on a stable footing?**

第一步，先把代码用最大警告级别编译一遍，然后fix所有值得fix的warning。

好问题。

**\# Show me a portfolio of all the applications you worked on, and tell me how you contributed to design them.**

如果光是看文档，很难说到实质上。

好问题。

**\# What are some alternate ways to store data other than a relational database? Why would you do that, and what are the trade-offs?**

好问题，很多啦，内存/文件/云存储/nosql等等。tradeoff就看你的应用需求了。blabla。。。

**\# Explain the concept of convention over configuration, and talk about an example of convention over configuration you have seen in the wild.**

好问题。

我能想到的就是买车开车，很少有人买到车以后，拿着说明书调试这个那个，一般都是直接上路，因为汽车厂会给你一个比较不错的默认配置，也就是所谓的“方便”。

这个方便也保证了你开其它车，基本上都差不多，不用重新配置或者学习什么。

所谓方便”convention“就是把相对不错/比较普遍适用的配置都内置好了，用就是了。

**\# Explain the differences between stateless and stateful systems, and impacts of state on parallelism.**

解释有状态与无状态系统，以及有状态系统在并行上的影响。

好问题。这个说不好。有状态系统因为保持状态，并发运行时的访问/修改需要有锁同步机制。

# Discuss the differences between Mocks and Stubs/Fakes and where you might use them (answers aren’t that important here, just the discussion that would ensue).

跟TDD相关的问题。不会哦。

**\# Discuss the concept of YAGNI and explain something you did recently that adhered to this practice.**

解释“YAGNI”。

最简单的例子是当我们定义接口，会特意预留出一两个参数，说是为了将来使用，其实，没有将来。屁嘞！你根本不需要它！

不是说不考虑可扩展性，但是要基于可预测的基础上。

**\# Explain what is meant by a sandbox, why you would use one, and identify examples of sandboxes in the wild.**

比如把虚拟机比如vmware virtualbox作为沙箱，用起来可以隔离风险。大不了重启，或者删除之。

**\# Concurrency**

**\* What’s the difference between Locking and Lockless (Optimistic and Pessimistic) concurrency models?**

**\* What kinds of problems can you hit with locking model? And a lockless model?**

**\* What trade offs do you have for resource contention?**

**\* How might a task-based model differ from a threaded model?**

**\* What’s the difference between asynchrony and concurrency?**

这些问题不错。并发相关的问题，设计多用户高性能系统必知。

# Are you still writing code? Do you love it?

我喜欢编程。

# You’ve just been assigned to a project in a new technology how would you get started?

如果是我，先了解这个技术的风险。小心求证，尽量缩小使用范围，否则是很致命的。

# How does the addition of Service Orientation change systems? When is it appropriate to use?

不懂。

# What do you do to stay abreast of the latest technologies and tools?

我跟的很紧哦！

# What is the difference between "set" logic, and "procedural" logic. When would you use each one and why?

不懂要问什么。

# What Source Control systems have you worked with?

ClearCase.很难用。最近不少问题都是跟CC相关的。

# What is Continuous Integration? Have you used it and why is it important?

持续集成。这个概念跟TDD也挂钩。

# Describe a software development life cycle that you’ve managed.

涉及的还是传统模型，不是scrum型的。

# How do you react to people criticizing your code/documents?

批评没问题，但是要有道理有根据。

# Whose blogs or podcasts do you follow? Do you blog or podcast?

这就很多了，看我以前写的文章吧。

# Tell me about some of your hobby projects that you’ve written in your off time.

主要是Lua和Py的，appengine上的比较多。

# What is the last programming book you read?

最近看得是《C++ FAQs》中文版。翻译的一般，内容也比较陈旧。更坚定了我使用C风格的C++的决心。

**\# Describe, in as much detail as you think is relevant, as deeply as you can, what happens when I type "cnn.com" into a browser and press "Go".**

**尽可能详细深入的描述，当你在浏览器敲网址然后go后面的技术细节。**

**好问题。很发散，绝对能看出面试者的技术厚度。**

# Describe the structure and contents of a design document, or a set of design documents, for a multi-tiered web application.

# What’s so great about <cool web technology of the day>?

# How can you stop your DBA from making off with a list of your users’ passwords?

# What do you do when you get stuck with a problem you can’t solve?

[**参考这里计算机编程新人入行指导**](http://sunxiunan.com/?p=961) 

[**http://sunxiunan.com/?p=961**](http://sunxiunan.com/?p=961)

# If your database was under a lot of strain, what are the first few things you might consider to speed it up?

先profiling哦！

# What is SQL injection?

# What’s the difference between unit test and integration test?

单元测试应该是程序员做。集成测试就牵扯到tester了。

# Tell me about 3 times you failed.

# What is Refactoring ? Have you used it and it is important? Name three common refactorings.

我一直在重构自己的代码。重构原则参考这里

[C++项目代码规范（偶自用）](http://sunxiunan.com/?p=1787)http://sunxiunan.com/?p=1787

# You have two computers, and you want to get data from one to the other. How could you do it?

命名管道，socket，共享文件夹，路子还是很多的。

# Left to your own devices, what would you create?

**\# Given Time, Cost, Client satisfaction and Best Practices, how will you prioritize them for a project you are working on? Explain why.**

**这个很值得问。**

# What’s the difference between a web server, web farm and web garden? How would your web application need to change for each?

# What value do daily builds, automated testing, and peer reviews add to a project? What disadvantages are there?

都是为了提升代码质量，但是会延长工期。

# What elements of OO design are most prone to abuse? How would you mitigate that?

# When do you know your code is ready for production?

看bug fix的统计曲线。
