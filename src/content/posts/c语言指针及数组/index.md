---
title: C语言指针及数组
description: "C语言的指针与数组是一个比较高阶的话题，有些书就是照本宣科，读者看完会认为自己明白了。真要是碰到一些模棱两可的 &hellip; \n继续阅读“C语言指针及数组”"
published: 2010-06-03
category: tech
tags:
  - 指针与数组
---

C语言的指针与数组是一个比较高阶的话题，有些书就是照本宣科，读者看完会认为自己明白了。真要是碰到一些模棱两可的问题，就发现自己了解的还不够深入，那时候就棘手了。我在前面提到的《C语言趣味题目》[http://sunxiunan.com/?p=1647](http://sunxiunan.com/?p=1647 "http://sunxiunan.com/?p=1647")就是一个例子，如果你对里面的题目都完成的非常完美，那指针与数组的话题其实也没必要看了，你一定已经是一个C语言方面的高手。

C语言的指针，是C语言里最为灵活最有力量也最容易产生问题的强力武器。数组相对来讲花样少一些，但也有些比较容易出问题的知识点。

如果你想系统深入了解指针，我推荐你完整系统的阅读这几本书《C Programming language》也就是（K&R圣书），第二本是《C专家编程》，里面关于数组与指针的阐述尽管已经过去十多年依然是熠熠生辉，没有其它书籍能赶上，另外还可以看看《C与指针》这本书，其实也是一本C语言系统教材，把指针单独提出了，也体现了指针的强大威力，还有一本是《C陷阱与缺陷》，也是非常值得一读。

如果看完这些书，可以看看几个专门阐述C指针或者包含相关内容的文档，比如：

[http://home.netcom.com/~tjensen/ptr/pointers.htm](http://home.netcom.com/~tjensen/ptr/pointers.htm "http://home.netcom.com/~tjensen/ptr/pointers.htm") A TUTORIAL ON POINTERS AND ARRAYS IN C

[http://publications.gbdirect.co.uk/c\_book/](http://publications.gbdirect.co.uk/c_book/ "http://publications.gbdirect.co.uk/c_book/") 这本书在线免费阅读

[http://boredzo.org/pointers/](http://boredzo.org/pointers/ "http://boredzo.org/pointers/") Everything you need to know about pointers in C

[http://www.cs.cf.ac.uk/Dave/C/node10.html](http://www.cs.cf.ac.uk/Dave/C/node10.html "http://www.cs.cf.ac.uk/Dave/C/node10.html#SECTION001080000000000000000") Common Pointer Pitfalls 这是从[wiki的pointer页面](http://en.wikibooks.org/wiki/C_Programming/Pointers_and_arrays)上发现的

[http://www.knosof.co.uk/cbook/cbook.html](http://www.knosof.co.uk/cbook/cbook.html "http://www.knosof.co.uk/cbook/cbook.html") New C Standard, 云风在他的blog推荐过。

[http://learn.akae.cn/media/index.html](http://learn.akae.cn/media/index.html "http://learn.akae.cn/media/index.html") Linux C编程一站式学习

———————————

C语言中的指针是什么，数组是什么，该如何定义初始化，我在这里不多讲，任何一本C语言的教材或者我前面推荐的K&R都有很详细的解释。

关于指针与数组最经常提到的问题就是在定义为functionA(int \* p)，然后可以直接把int numArray\[5\]这样的数组直接作为参数传入，或者声明declaration与定义definition不匹配，如extern定义为char\* 但是实际上是char\[\]。

其实我们只要记住指针与数组的几个不同点，到时候类似问题就很容易搞掂了。在《C专家编程》里面列出一些，我这里简述一下：

第一点也是最关键一点，指针访问是间接的，也就是指针存放的是一个地址的值，存放的是被指内容的地址，其实类似一个中转站或者114的功能，如果想取得指针所指向的内容，必须做提领（deference）操作，实际上类似于两个步骤（先取得指针的内容也就是p存放的地址值，然后取得存放地址里面内容）。而数组里存放的就是数组的值，不是什么间接引用的地址，比如我们要取arr\[5\]的值，只要从arr开始数5个位置，里面就是a\[5\]的内容。

另外一点不同是，假如我们有个数组int array\[5\]，数组的地址&array与数组名字array本身代表的地址是不一样的。&array实际上是一个int (\*p1)\[5\]类型的指针，p1每一步递增递减都是sizeof(array)，也就是5个int长度。而array相当于&array\[0\]，也就是第一个元素（element）的地址，类型是int \*p2，p2每一步递增都是sizeof(int)。这个区别在指向二维数组或者多维数组指针里非常需要注意。

再有一点不同是，一般指针类型（除了int \*const p这种）都是没有名字的，可以随意的指来指去的，另外指针可以有加减计算，加上减去一定的值。而数组相当于，定义以后就不可以修改数组地址了，这也是前面一条我都会说有一个p1或者p2指针，而不是数组array本身。尽管数组array有类似指针的行为，也是某种地址，但是它不可以进行加减操作，我们可以认为数组array本身是一个常量。

还有一点不同是，指针可以初始化为NULL，另外可以声明为void指针，还可以声明非常复杂的函数指针、指针的指针、字符串指针等等，但是数组没法定义为函数数组。

什么情况下指针与数组的概念可交换？《C专家编程》总结的以及相当全面，我在这里简单列两条，深入的内容请看书。1）使用a\[i\]这种形式对数组访问，编译器改写为\*(a + i)形式，这也是为何i\[a\]这样写也编译运行通过的原因。2）作为函数参数时，数组会被修改为指向数组第一个元素的指针。

关于指针还有很多高阶内容，比如复杂的指针声明该如何解读？int const \* p1与int \* const p2的不同之处？sizeof \*ptr 与 sizeof ptr结果？这里就不一一讲述了，毕竟这篇文字是给我自己做一个知识备份。如果大家有指针相关问题，欢迎留言，我会尽量解答。
