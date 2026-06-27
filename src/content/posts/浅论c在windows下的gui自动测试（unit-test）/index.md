---
title: 浅论C++在Windows下的GUI自动测试（Unit Test）
description: "昨天，公司开发组与测试组开会总结上一个release的经验教训，期间就提到一个问题，如何更好的更自动化的测试程 &hellip; \n继续阅读“浅论C++在Windows下的GUI自动测试（Unit Test）”"
published: 2008-09-02
category: tech
---

昨天，公司开发组与测试组开会总结上一个release的经验教训，期间就提到一个问题，如何更好的更自动化的测试程序。

公司正在研究的是IBM的RFT，这个东西不用说，一定是功能强大、极难使用，IBM的软件做的如此有特色，也是不易。问题是作为一个开发人员，我只想能够快速的、可重复、可添加用例的测试自己的代码，难道只能用屏幕定位、鼠标模拟、控件按钮定位这样的“高深”技术？

最近在开发的主要是一些接口，给另外一个产品使用，没有界面上的任何东西。美国的同事开发了一个测试程序，跑在命令行下，每次我添加一个新的功能或者修改了一些代码，他那边只要跑一遍，就知道对以前的功能有没有影响。

这个东西不新鲜，就是unit test，几乎每个新兴的开源代码（以java、python、ruby为代表）都会有一个unittest字样的目录，里面就是一些主要的功能测试代码。可是为何我们一直没有很好的利用这个工具呢？

我想原因也很简单，unit test需要开发人员更好的对代码进行抽象化、模块化。有人一定会反驳说，对于GUI紧密相关的，没法做Unit Test。这是一个问题，但是不是绝对的，也不能成为不进行unit test的理由。关键还是要很好的做到MVC各个模块分离，降低他们之间的耦合度。

通常对于一个Windows程序员来说，一个GUI界面，会包含几个功能，一是按钮或者控件的响应，比如按下一个按钮，它要变成灰色，直到运行功能完成再恢复原状，或者是一个控件，点击一下会让用户输入，输入完成以后校验，根据校验的结果保存或者提醒用户出现问题。这些都是比较common sense的流程。

但是这些流程显然不是原子的（atom），它们涉及到了M（model）、V（View）、C（control）的各个方面，对于Windows程序员，这三个方面往往都被放入到CXXXDialog这样的类里面实现，自己还感觉封装的非常好。

我们就拿用户校验来说明一下如何分解这个MVC过程。

“一个控件，点击一下让用户输入”，这一部分显然是V和C的，个人感觉，这部分的测试可以由test方面做更深入的检查，开发人员需要保证功能实现完整，简单运行正确。

“接受用户输入、检查输入数据”，这一部分，显然是比较复杂的逻辑，涉及到Model和Control，View在这一部分可以被忽略掉，输入部分就是数据，输出部分就是检查的结果。很显然，这一部分可以被包装、抽象起来，自己单独做Unit Test。

“如果出错，反馈用户出错的结果”，这一部分基本上也是以View为主，是需要tester发现问题的部分。

“如果正确，保存用户的输入”，这块很显然也是可以分离出来单独进行自动测试的。

从上面分析可以看出来，GUI的测试不是不能进行，而是需要开发人员做更多的工作，需要很好的抽象逻辑计算部分的代码，如果可能，界面展示规则代码也可以抽象处理单独测试。

这不容易实现，但是值得去做。

另外，在研究C++的GUI测试，发现了一个很好的帖子：[http://bytes.com/forum/thread606579.html](http://bytes.com/forum/thread606579.html)

摘选一些比较精华的部分，中文部分是我的简单翻译：  
Do a google for ‘TFUI’ – its a good technique for your problem.搜索一下“TFUI”，这是一个很好的技术，可以用来解决你的问题。（我找的结果是这里http://c2.c2.com/cgi/wiki?TestFirstUserInterfacesPrinciples）

Aside from that, the main approach is to treat the GUI library like any other 3rd party library – mainly, don’t try and unit test it, unit test your code that uses it.另外，主要的一点是应该把GUI库当作其他的第三方库来看待，不要试图对他们做单元测试，要测试使用这些库的代码。（简单说，就是不要测View界面部分，而是测试逻辑或者数据部分）

By this, I mean: ensure all of your logic (business rules, gui presentation rules, data retrival and updates, etc) are completed separated from the gui code. In your gui’s event handlers, don’t do anything except delegate to a plain old C++ Class.我是说：确保所有你的逻辑（商业逻辑，gui展示规则，数据存取更新等等）是完全的与界面代码分离，在GUI事件处理里面，不要做任何事情，除了代理到一个简单的C++类里。

By separating your code from the gui code, you can easily test your code, without having to even link to the gui library.通过分离代码（功能部分、规则部分）和GUI，就可以很容易测试代码而不需要连接到GUI库。

In software, abstract is usually the way to solve a problem.在软件中，抽象通常都是解决一个问题的办法。

Andrew

另一篇回复，

————————-

Its a great book for working with un tested code, and for seeing how  
to create ‘seams’ between areas like GUI libraries and our code.（这本书应该是《[修改代码的艺术](http://www.china-pub.com/36363)》）

For those interested in unit testing, a good guide that M Features,  
myself and plenty of others use is:

A unit test does NOT :  
\* Use any file IO  
\* Connect to a db  
\* Present anything on screen  
\* communicate across a network.

单元测试不应该：

1，使用任何文件输入输出。

2，连接到数据库。

3，展示任何东西到屏幕。

4，通过网络连接通讯。  
The rational for this, is many, but boils down to forcing us to create  
a design that is decoupled from these areas, which nearly always  
results in a good, clean & highly cohesive design. For example, how  
many times have we in the past put logic directly into a dialog  
class? Where as with this style of testing, we force ourselves to  
separate out the UI aspect from the logic part, resulting in us using  
the MVC or MVP or Humble Dialog design patterns, as they allow us to  
unit test the logic without going anywhere near the GUI.

The second major win is speed of test runs.

I can run 1200 unit tests in 42.7 seconds currently (and these are  
Java unit tests!) because of following these guidelines. And because  
they run soo fast the Team runs ALL tests ALL of the time.  
Slow tests mean we run them fewer times, the less we run them, the  
longer it is before we find out we broken something. The longer time  
before finding out we broke something, the more costly it is to  
fix…..

Andrew
