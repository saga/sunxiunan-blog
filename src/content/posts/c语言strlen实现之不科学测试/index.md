---
title: C语言strlen实现之不科学测试
description: "代码放在这里： http://gist.github.com/419473&#160; &#8212;&#038;#82 &hellip; \n继续阅读“C语言strlen实现之不科学测试”"
published: 2010-05-31
category: tech
tags:
  - strlen
---

代码放在这里：

[http://gist.github.com/419473](http://gist.github.com/419473 "http://gist.github.com/419473") 

————————————-

其中strlenBSD为delphij实现的FreeBSD使用的strlen标准库函数。[http://www.freebsd.org/cgi/cvsweb.cgi/src/lib/libc/string/strlen.c?rev=1.10](http://www.freebsd.org/cgi/cvsweb.cgi/src/lib/libc/string/strlen.c?rev=1.10 "http://www.freebsd.org/cgi/cvsweb.cgi/src/lib/libc/string/strlen.c?rev=1.10")

strlenVC来自VS2010的CRT src，我建立了一个内嵌汇编函数，其实是有问题的，因为MSDN说的很清楚，内嵌汇编这种方式是没法做优化的。

strlenDiet这个函数来自DietlibC，使用的是0.32版本。

strlenStandard是最一般常见的实现方式，比如wiki上、《c标准库》上都是类似写法。

logger是我自己写的一个高精度计时函数，里面用的QueryPerformanceFrequency这个函数，每段strlen计算都是单独start()以及stop()，然后计算运行时间。

还有一个重要的问题就是project setting。

首先我们使用release版本，在VC2010 project property page里面

[![image](http://sunxiunan.com/media/Cstrlen_8E8F/image_thumb.png "image")](http://sunxiunan.com/media/Cstrlen_8E8F/image.png)

最后一个问题就是测试字符串，我们使用了windowsUpdate.txt这个文本文件，大概1.2M左右。

当字符串个数为80000时，运行两次，我们得到测试结果如下(时间单位都是us)：

Result strlen 0.000000 ##

Result strlenBSD 0.102586 ##

Result strlenVC 3012.946893 ##

Result strlenDiet 2802.122562 ##

Result strlenStandard 3485.999846 ##

—– second time ——–

Result strlen 0.000000 ##

Result strlenBSD 0.000000 ##

Result strlenVC 3015.086831 ##

Result strlenDiet 2806.302525 ##

Result strlenStandard 3676.002553 ##

可以看到这时候使用CRT标准库的strlen最快，而strlenBSD也是非常非常快乐，而标准实现是最慢的。

去掉优化看看。

[![image](http://sunxiunan.com/media/Cstrlen_8E8F/image_thumb_3.png "image")](http://sunxiunan.com/media/Cstrlen_8E8F/image_3.png)

Result strlen 4161.887115 ##

Result strlenBSD 3968.818857 ##

Result strlenVC 3078.673800 ##

Result strlenDiet 3819.303217 ##

Result strlenStandard 5035.940199 ##

—————– second ————

Result strlen 3165.460250 ##

Result strlenBSD 4013.348883 ##

Result strlenVC 3764.022041 ##

Result strlenDiet 5623.339493 ##

Result strlenStandard 6379.640180 ##

这个结果就比较有意思了，除了标准实现方式的版本最慢，其他差别不是很大，相比来说VC++内嵌汇编的实现比较快一些。

第二个测试文本来自ironruby的changelog.txt，大概5000行左右，我们依然试图读取80000个字符串（也就是只改变了代码中fopen的源文件）。

全优化版本两次测试结果如下：

Result strlen 0.000000 ##

Result strlenBSD 0.433735 ##

Result strlenVC 1011.775006 ##

Result strlenDiet 826.736862 ##

Result strlenStandard 1050.510424 ##

—————————-

Result strlen 0.000000 ##

Result strlenBSD 0.165407 ##

Result strlenVC 1030.929523 ##

Result strlenDiet 836.285049 ##

Result strlenStandard 1057.499975 ##

无优化设置版本两次测试结果如下：

Result strlen 1166.623783 ##

Result strlenBSD 1438.473774 ##

Result strlenVC 1265.279138 ##

Result strlenDiet 1456.994396 ##

Result strlenStandard 1546.674976 ##

—————————-

Result strlen 1166.989685 ##

Result strlenBSD 1480.218605 ##

Result strlenVC 1033.686648 ##

Result strlenDiet 1239.002409 ##

Result strlenStandard 1450.543506 ##

得到什么结论呢？除了我比较无聊，好像没有什么科学性的结论。如果硬要想，可以说两个：一个是内嵌汇编未必很快，因为编译器没法做优化。另外是，如果你想写一个优化版本strlen，delphij实现的FreeBSD版本是非常好的例子，而dietlibc的实现几乎没有什么改进，反而因为代码复杂容易引入bug。

有几个问题其实可以好好研究的，比如为何delphij的版本会如此快？VC++以及GCC优化选项哪个比较有用？该如何写一个类似CRT这样的strlen（也就是汇编代码编译为so或者lib然后连接进来）。只是这些话题有些超出我水平，就不乱说了。

updated:

新测试代码在这里，增加了一个没对齐情况的测试（p+1)，另外测试字符串个数增加到300000，对testbyte，增加一个版本，直接写testbyte在代码里。

[http://gist.github.com/419585](http://gist.github.com/419585 "http://gist.github.com/419585")

测试结果如下：

———–对齐———————–  
      Result strlenVC 84904.335012 ##

Result strlenDiet 82614.256452 ##

Result strlenStandard 99900.620863 ##

Result strlen 0.000000 ##

Result strlenBSD 0.002673 ##

Result strlenBSD2 0.032413 ##

————未对齐————————

Result strlenVC 87593.624963 ##

Result strlenDiet 83682.625534 ##

Result strlenStandard 99746.446413 ##

Result strlen 0.002339 ##

Result strlenBSD 0.002673 ##

Result strlenBSD2 0.015037 ##

可以看到对齐没对齐差别不是很大，至于0.000000，那是因为太快了，计时器没法计算出差别。
