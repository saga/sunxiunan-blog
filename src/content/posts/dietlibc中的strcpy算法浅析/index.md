---
title: dietlibc中的strcpy算法浅析
description: "我们将代码稍作修改，让一些宏定义变成函数更容易理解一些： 为了不和标准库的strcpy名字冲突，我将其改为st &hellip; \n继续阅读“dietlibc中的strcpy算法浅析”"
published: 2010-05-25
category: tech
---

我们将代码稍作修改，让一些宏定义变成函数更容易理解一些：

为了不和标准库的strcpy名字冲突，我将其改为strcpy2.

如果你把上面的程序编译运行一下就会发现，快的原因在于strcpy2这个函数最后一部分while循环里面的这几行：

 \*(unsigned long \*) s1 = l;

s2 += sizeof(unsigned long);

s1 += sizeof(unsigned long);

对C语言指针了解的朋友都知道，第一行是把l这个unsigned long类型变量值赋值给s1为地址的一个unsigned long型指针指向的内容。

在我的i386cpu PC机上，第二第三行分别是将s2以及s1指针增加了4（而不是通常函数实现里面的++)。这也就实现了每次拷贝4个char（也就是一个unsigned long）而不是只拷贝一个char。

而strcpy2前面的函数就是确保这个拷贝可以正确执行。

我们先看MyUnaligned这个函数（在dietlibc中原为UNALIGNED宏）。

先取了一个值是sizeof(unsigned long) – 1,然后将源字符串指针以及目标字符串指针都与这个值做与操作（xPtr & valN1），最后两个结果做一个异或xor操作（xVal ^ yVal）。

其实说白了很简单，xPtr & valN1相当于一个取模操作，i386 cpu上valN1的值为3，也就是与的结果可能为0，1，2，3，当xPtr或者yPtr的值为4的倍数时候，与操作得到结果为0。两个与操作结果做一下异或，只有都为0或者都为1的时候，返回为0。也就是只要有一个指针没对齐，就老老实实的做一个个char的拷贝(\*s1++ = \*s2++)，然后从strcpy2返回。

这个算法就是为了保证xPtr以及yPtr指针都是在内存上是对齐的（aligned），如果没有对齐还要一次赋值4个char，那可能导致写入内存出错（参考这篇[http://en.wikipedia.org/wiki/Data\_structure\_alignment](http://en.wikipedia.org/wiki/Data_structure_alignment "http://en.wikipedia.org/wiki/Data_structure_alignment")）。

有的同学已经看出来了，如果源指针目标指针都没对齐，xor结果也是零，那不就错了么？

OK，不还有一段代码么，在STRALIGN里面，会对目标字符串指针地址取模，然后将余数返回，比如我们运行时人为地修改s1以及s2地址将其+1。debug运行如下图，得到p以及str地址，可以看到都是对齐在unsigned long边界上的（ p & 3 一定是0）。

[![image](http://sunxiunan.com/media/84efcc48ae3e_7DD7/image_thumb.png "image")](http://sunxiunan.com/media/84efcc48ae3e_7DD7/image.png)

我们在Autos窗口里直接修改地址，让其加一，如下图：

[![image](http://sunxiunan.com/media/84efcc48ae3e_7DD7/image_thumb_3.png "image")](http://sunxiunan.com/media/84efcc48ae3e_7DD7/image_3.png)

这样两个指针就都没有对齐了。继续运行：

[![image](http://sunxiunan.com/media/84efcc48ae3e_7DD7/image_thumb_4.png "image")](http://sunxiunan.com/media/84efcc48ae3e_7DD7/image_4.png)

果然如我们预计的retVal的值为0。

[![image](http://sunxiunan.com/media/84efcc48ae3e_7DD7/image_thumb_5.png "image")](http://sunxiunan.com/media/84efcc48ae3e_7DD7/image_5.png)

xRet返回值为4 – 1，也就是3。

[![image](http://sunxiunan.com/media/84efcc48ae3e_7DD7/image_thumb_6.png "image")](http://sunxiunan.com/media/84efcc48ae3e_7DD7/image_6.png)

3个字符串（“aaa”）被拷贝到目标字符串里面，这时候目标字符串指针位置是对齐的了。

这是如果有编程经验的朋友可能已经有疑问，开头有可能没对齐，也有可能结尾部分没对齐啊，也就是尾巴部分一定是4的倍数么？未必，这时候这一段代码就起作用了。

unsigned long key1 = MKW(0x1ul);  
  
        unsigned long key2 = MKW(0x80ul);

运算结果key1是0x01010101,key2结果是0x80808080，如果你看过Tony Bai写的strlen源码分析[http://bigwhite.blogbus.com/logs/37753065.html](http://bigwhite.blogbus.com/logs/37753065.html "http://bigwhite.blogbus.com/logs/37753065.html") ，就会发现这两个有意思的数字同样出现在glibc标准库当中。

((l – key1) & ~l) & key2我就不分析了，可以猜测到，这是对源字符串中NULL结尾符的检测。当检测到有结尾符的时候，就做按char拷贝，然后返回。感兴趣的可以参考TonyBai那篇文章，然后自己写几个test case测试一下。

整个函数就是这样，分析完毕。
