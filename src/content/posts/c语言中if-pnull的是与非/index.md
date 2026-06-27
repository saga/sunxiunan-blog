---
title: C语言中if (p==NULL)的是与非
description: "博客园cnblogs不知为何最近开始渐有C语言开发重启的迹象，不少人开始写一些C语言的教程。 其中看到一段有趣 &hellip; \n继续阅读“C语言中if (p==NULL)的是与非”"
published: 2011-07-05
category: tech
---

博客园cnblogs不知为何最近开始渐有C语言开发重启的迹象，不少人开始写一些C语言的教程。

其中看到一段有趣的留言，提到这个写法：if (p == NULL)，

有人说这是不好的~，经典不提倡的~，会写错出问题的~，华为都禁止的~。

我倒是有些不同的看法。

首先这种写法是有问题，一般来讲对于空指针可以这样写

if ( p )

或者反义是这样 if ( !p )

既简单，还节省字数。

如果是想写的比较容易懂，那么if (p == NULL) 是我提倡的方式。

你可以很简单的读成“如果p等于空值”，反过来的方式NULL==p就有些别扭，不是给人看的。

有人提到p==NULL很容易写成p=NULL，代码出错啦！会有bug啦！

好吧，我承认这是一种可能性，在早期编译器不完善的时候的确如此。那时候还提倡用匈牙利命名法，因为编译器对类型识别支持不好，很容易写出胡乱转型的代码（当然现在的C语言也容易）。但是针对正在使用的编译器以及将来更先进的编译器，在条件判断中使用p==NULL不是问题。

做一个很简单的实验，使用VC2010，项目设置为compile as C，注意关键一点“把warning级别提高到最高级别4”，这时候if (p=NULL )会得到如下警告：

1>purec.cpp(10): warning C4706: assignment within conditional expression

很简单吧，不需要你使用那种反人类常识的代码规范。

使用GCC（v4.5.2 in Ubuntu11.4）也很容易，它有一个编译选项-Wall，警告信息如下：

/home/sun/foobar-sample/main.c:24:2: warning: suggest parentheses around assignment used as truth value

如果工具支持，为何不使用一种更为合乎阅读习惯的方式呢，BTW，我查找了一下经典的K&R，其中==的使用都是我提到的p==0这种方式，其它更为经典的（有么？）我就不知道了。
