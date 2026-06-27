---
title: "C++工程实践 值语义&#8211;读后感及补充"
description: "C++ 工程实践(8)：值语义 http://www.cnblogs.com/Solstice/archive &hellip; \n继续阅读“C++工程实践 值语义&#8211;读后感及补充”"
published: 2011-08-17
category: tech
---

## C++ 工程实践(8)：值语义 http://www.cnblogs.com/Solstice/archive/2011/08/16/2141515.html

由于近期一直不做C++，看着都有些陌生了，阅读速度并不快，而且C++这块实际上陈硕提到的方面，以前用得不多。但因为这里面很多概念与C#共通，所以也不难理解。

下面是一些问题以及相关资料的补充。

1）“标准库里的 complex<> 、pair<>、vector<>、map<>、string等等类型也都是值语意，拷贝之后就与原对象脱离关系”

如果对C#的字符串类型稍有了解，便知道它们都有类似intern的机制，在Ruby中则为Symbol，另外微软BSTR类型也会做类似字符串驻留。目的都是让字符串字面值在内存中只有一份，使用者都指向同一份好了。

稍做实验便可得知标准库中string是值语义。但是对于模版类型，比较有疑问，因为它们都不是完整类型，怎么说明是值语义？

关于值语义，我这里也有一个解释，不一定对。对于值语义类型他们的拷贝是所谓的深拷贝（byte by byte），而引用类型常规拷贝是所谓的浅拷贝（shallow copy），只不过大家指向同一个引用。对于引用类型的取值也与值类型不一样，是先取引用地址，然后从这个地址取内容，相当于两个动作。

关于shallow copy [http://en.wikipedia.org/wiki/Object\_copy#Shallow\_copy](http://en.wikipedia.org/wiki/Object_copy#Shallow_copy)

2）“值语义，引用语义”。在C#中有值类型和引用类型，对照的更为明显一些。另外，在C语言中全部都是值语义，不存在引用语义。

3）”Java 有 value object 一说，按(PoEAA 486)的定义，它实际上是 immutable object”。

对于C#，值类型都来自于System.ValueType。

4）另外与本文列举模版类比如vector不同的是，在loop中，C#中的范型类型可以修改其内容，但是修改以后再继续使用iterator就会跑出异常，因为对象中有个version信息，修改后会增加。而C++中没有这种机制，loop中修改vector内容是OK的。

5）POD，Plain Old Data，类似C语言Structure这样。没有什么包装多态vtable这些东西，按byte拷贝没有问题。

[http://en.wikipedia.org/wiki/Plain\_old\_data\_structure](http://en.wikipedia.org/wiki/Plain_old_data_structure)

6）对象语义的 object 由于不能拷贝，我们只能通过指针或引用来使用它。

C#所谓managed heap，专门存放对象语义的object实例。

7）“一旦使用指针和引用来操作对象，那么就要担心所指的对象是否已被释放，这一度是 C++ 程序 bug 的一大来源”.

个人感觉这是本文中工程实践味道最浓的部分。对象互相通知生存状态变化，是很麻烦。如果你再用个object pool机制，那就更麻烦。

8）一个 smart pointer 应该是 weak reference，否则会出现循环引用，导致内存泄漏

在C#中也有weak reference机制，保证可以观察对象生存状态，又不至于影响到GC.

9）SGI Assignable concept

[http://www.sgi.com/tech/stl/Assignable.html](http://www.sgi.com/tech/stl/Assignable.html)

10）值语义是C++语言的三大约束之一

这里面的三大约束，没找到来源(update [http://blog.csdn.net/Solstice/article/details/5455835](http://blog.csdn.net/Solstice/article/details/5455835))，在wiki上[http://en.wikipedia.org/wiki/C%2B%2B](http://en.wikipedia.org/wiki/C%2B%2B)

Philosophy. In The Design and Evolution of C++ (1994), Bjarne Stroustrup describes some rules that he used for the design of C++:
... ...

11) RVO返回值优化

[http://en.wikipedia.org/wiki/Return\_value\_optimization](http://en.wikipedia.org/wiki/Return_value_optimization)

\==================================

从这篇文章以及我个人感受而言，要么用语意定义更为明确，语言更为规范的C#做面向对象开发，要不使用C语言来开发。C++真是有些鸡肋。如果用C++，也可以把它学好以后，在工作中当成Enhanced C来使用。
