---
title: 递归实验-C语言递归调用的极限
description: "C语言递归调用不是无限的，当递归到一定时候，会出现stack over flow的问题。http://en.w &hellip; \n继续阅读“递归实验-C语言递归调用的极限”"
published: 2010-12-21
category: tech
tags:
  - 递归实验
---

C语言递归调用不是无限的，当递归到一定时候，会出现stack over flow的问题。[http://en.wikipedia.org/wiki/Stack\_buffer\_overflow](http://en.wikipedia.org/wiki/Stack_buffer_overflow "http://en.wikipedia.org/wiki/Stack_buffer_overflow")

但是，这个度是多少呢？

我构造了一个极为简单的C语言递归程序，大家可以参考这里[https://gist.github.com/749543](https://gist.github.com/749543 "https://gist.github.com/749543")

#include "stdafx.h"  
      int count = 0;  
void f()  
{  
  int a = 1; int b = 1; int c = 1; int d = 1;  
  a = b + 3;  
  c = count + 4;  
  d = count + 5\*c;  
  count++;  
  printf("count: %d\\n", count);  
  f();  
}

int \_tmain(int argc, \_TCHAR\* argv\[\])  
     {  
        f(); return 0;  
      }

我使用的是VC2010SP1的C语言模式编译，console程序，无优化。

运行结果如下：

默认情况下，count最后结果为42860，然后程序就结束了。通过查询MSDN可以知道

[http://msdn.microsoft.com/en-us/library/8cxs58a6%28v=vs.80%29.aspx](http://msdn.microsoft.com/en-us/library/8cxs58a6%28v=vs.80%29.aspx)

我们可以通过修改project的link选项中的stack commit size和stack reserve size来改变程序的stack大小。

如果这两个size都设置为1、64、640、2048这几个值，结果都是10092.

如果size设置为1024000，那么结果是42860，与默认情况相同。可以看出这个size是以BYTE为单位。

如果size设置为1048000，结果为43372.

size设置为1072000以及2048000，结果都是86551.

size设置为2110000以及3072000，结果都是130242.

一般来说，我们基本上不需要考虑修改这个大小，因为很少会有将近四万的递归层次，默认值已经足够用了。但是如果万一不够用或者有这种递归需求，那么就需要修改这两个值，另外当我们新建一个线程的时候，也可以编程修改线程stack的大小。

[http://cs.nyu.edu/exact/core/doc/stackOverflow.txt](http://cs.nyu.edu/exact/core/doc/stackOverflow.txt "http://cs.nyu.edu/exact/core/doc/stackOverflow.txt") 这里解释了一下不同平台上stackoverflow的问题，有一些数据可以参考。

[http://stackoverflow.com/questions/53827/checking-available-stack-size-in-c](http://stackoverflow.com/questions/53827/checking-available-stack-size-in-c "http://stackoverflow.com/questions/53827/checking-available-stack-size-in-c") 在这里有人提供了一个有趣的递归C代码片段来判断栈大小。

在这里多废话几句，关于Lua的proper tail call [http://www.lua.org/pil/6.3.html](http://www.lua.org/pil/6.3.html "http://www.lua.org/pil/6.3.html") 。当我们使用Lua for windows构造一个简单的递归程序运行，依然是会得到stack over flow的结果。但是当我们使用proper tail call这种方式调用，（由于抛弃了前面程序的栈）调用可以无限循环下去，所以Lua这个特性常常用来构造state machine。关于使用proper tail call来实现斐波拉契，可以参考这里[http://lua-users.org/wiki/ProperTailRecursion](http://lua-users.org/wiki/ProperTailRecursion "http://lua-users.org/wiki/ProperTailRecursion")
