---
title: "C语言中的lvalue, rvalue"
description: "lvalue算是C语言里面不怎么太容易说清楚的概念，我们上学的时候多半称之为left-value左值，对应的还 &hellip; \n继续阅读“C语言中的lvalue, rvalue”"
published: 2010-05-18
category: tech
tags:
  - CLanguage
  - lvalue
---

lvalue算是C语言里面不怎么太容易说清楚的概念，我们上学的时候多半称之为left-value左值，对应的还有在C++标准中的rvalue，也就是右值。

在wiki百科上[http://en.wikipedia.org/wiki/Value\_%28computer\_science%29](http://en.wikipedia.org/wiki/Value_%28computer_science%29 "http://en.wikipedia.org/wiki/Value_%28computer_science%29") 解释了一些。

首先什么是value？value也好object也好在计算机内部的表示都是0和1，没有什么区别，某一块内存地址的数据，按照整数解释是一个值，按照class CObject解释又是另外一个值，浮点数也好字符串也好，如果光看这个内存地址里面的数据是没法看出什么究竟的。所以需要编译器做一些处理在某个地方记录下来类型信息。

[![image](http://sunxiunan.com/media/Clvalue_8A42/image_thumb.png "image")](http://sunxiunan.com/media/Clvalue_8A42/image.png)

上面文字翻译成中文就是lvalue是程序运行时可以通过地址（address）信息编程存取的值（比如通过&操作符），意味着他们是变量或者可以提领（dereferenced，通常用\*操作符）某一块特定内存位置。在C++标准中说明：不是lvalue的值就是rvalue。我们不能把rvalue作为lvalue使用，但是反过来可以，比如int a = b; 其中变量b可以为lvalue。

在伟大的K&R第二版中197页写道：一个对象是被命名的存储区域或者被指向一块存储区域（an object is a named or pointed to region of storage）；一个lvalue是一个指向对象的表达式（an lvalue is an expression referring to an object），（！！注意lvalue是一个表达式，这在后面例子中会体现出来）。。。lvalue这个名字来自赋值表达式E1 = E2，其中左边的操作数E1必须是一个lvalue。

在Dan Saks的文章中提到，一个rvalue之所以不引用一个object，不是因为不能，而是因为不需要（Conceptually, an rvalue is just a value; it doesn’t refer to an object. In practice, it’s not that an rvalue can’t refer to an object. It’s just that an rvalue doesn’t necessarily refer to an object. Therefore, both C and C++ insist that you program as if rvalues don’t refer to objects.）

我们拿int n = 1; 来做说明，如果1是一个lvalue，那么产生的汇编代码类似下面这样：

**one: .word 1  
      …  
      mov (one), n**

实际上对于大多数机器而言，其实是对n直接操作，类似：

**mov #1, n**

在这里1没有像我们想象的那样指向一个object（如one），而是直接就操作了。甚至还有的机器产生汇编代码如：

**clr n  
     inc n**

先把n清零，然后增加n的值，这里面根本就没有出现1。

MSDN博客上[http://blogs.msdn.com/vcblog/archive/2009/02/03/rvalue-references-c-0x-features-in-vc10-part-2.aspx](http://blogs.msdn.com/vcblog/archive/2009/02/03/rvalue-references-c-0x-features-in-vc10-part-2.aspx "http://blogs.msdn.com/vcblog/archive/2009/02/03/rvalue-references-c-0x-features-in-vc10-part-2.aspx")

有一篇非常详细的文字解释c++中的lvalue，rvalue，有兴趣的可以去看看。其中最为重要的一句话就是“another way to determine whether an expression is an lvalue is to ask "can I take its address?".  If you can, it’s an lvalue.  If you can’t, it’s an rvalue. ”翻译为中文就是“决定一个表达式是否是lvalue的方法可以是：我能不能获取它的地址？如果可以，那就是lvalue，否则就是rvalue。”另外需要着重说明的是，lvalue一定可以获取地址，但不要求是可以修改的（如const，如后面提到的字符串字面值）。

加法操作一直返回一个rvalue，比如m+ 1 = n; 这就没法编译通过，因为 m + 1 这个表达式是一个rvalue。

针对lvalue中的l，我们也可以认为是location，其实也就是能不能获取地址的另一种意思，这也就是为何数字型字面值以及非引用型函数不是lvalue的原因。

char(\*pchar)\[\] = &("aabbccddee");

有些文章说字符串字面值（string literals）算是lvalue，但是不能改变这个值，上面的代码就是一个演示。

\*&("aabbccddee") = ‘a’;

这个赋值语句在VC6下编译通过（这是错误的！），在Xcode中出错提示“对read-only location赋值”，在VC2008下提示"left operand must be l-value"。所以还是建议大家用新版本的编译器来学习工作，否则很容易造成误解。

下面我举几个例子，大家看看能否判断是lvalue还是rvalue。

obj , \*ptr , ptr\[index\] , ++x, 1729 , x + y , std::string("meow") , x++

在VC6中编写一个最简单的操作台程序，输入下面代码：

int main(int argc, char\* argv\[\])  
    {  
        int obj = 0;  
        int\* ptr = &obj;  
        int x = 1;  
        int\* ptr2 = &(++x);  
        int\* ptr3 = &(x++);  
        return 0;  
    }

编译结果是testconsole1.cpp(12) : error C2102: ‘&’ requires l-value，第12行就是int\* ptr3 = &(x++);

稍微修改一下这段代码让它做一下deference操作：

int main(int argc, char\* argv\[\])  
{  
    int x = 1;     
    \*&(++x) = 9;  
    \*&(x++) = 10;  
    return 0;  
}

同样也是在x++这一行编译不通过。尽管x++或者++x并没有修改x的内存位置，但x++这种形式就是rvalue，没法对这个表达式进行提领（\*）操作。很有意思吧，这里面应该还有更说得通的理由，希望有高人指点一下。（在msdn blog上的解释是x++这种形式会产生临时对象，但那是针对C++而言，不知道对于C来说是不是也是同一种解释）

既然是表达式，函数也是表达式一种形式，是不是也可以作为lvalue出现呢？stackoverflow上有一个问题里面举了一个很有意思的例子[http://stackoverflow.com/questions/579421/often-used-seldom-defined-terms-lvalue](http://stackoverflow.com/questions/579421/often-used-seldom-defined-terms-lvalue "http://stackoverflow.com/questions/579421/often-used-seldom-defined-terms-lvalue")

#include "stdafx.h"  
      static int aa = 0;  
      int\* func() {    
         aa++;  
         return &aa;  
       }  
int main(int argc, char\* argv\[\])  
{  
    \*func() = 42;  
    printf("%d", aa);  
    return 0;  
}

在VC6下运行结果为43（？！），而VC2008以及Mac XCode3.1运行结果为42，在这里VC6好像是有一些问题啊。当然我们期望aa结果应该是42.

相关参考文档：ISO C99标准

《[The New C Standard](http://www.coding-guidelines.com/cbook/cbook1_2.pdf)》[http://www.coding-guidelines.com/cbook/cbook1\_2.pdf](http://www.coding-guidelines.com/cbook/cbook1_2.pdf "http://www.coding-guidelines.com/cbook/cbook1_2.pdf")

《*C Programming Language*》K&R第二版

[http://publications.gbdirect.co.uk/c\_book/](http://publications.gbdirect.co.uk/c_book/ "http://publications.gbdirect.co.uk/c_book/")

[http://www.cs.dartmouth.edu/~chris/cs23/summit-intro/](http://www.cs.dartmouth.edu/~chris/cs23/summit-intro/ "http://www.cs.dartmouth.edu/~chris/cs23/summit-intro/")

[http://www.embedded.com/story/OEG20010518S0071](http://www.embedded.com/story/OEG20010518S0071 "http://www.embedded.com/story/OEG20010518S0071")
