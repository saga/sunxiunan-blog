---
title: "[C Code] 为何需要typedef struct"
description: "这是很基础的知识，只是c和c++相关内容容易混淆起来。 我是在看一个人问c语言题时候发现这个知识点的。 当时他 &hellip; \n继续阅读“[C Code] 为何需要typedef struct”"
published: 2009-01-03
category: tech
---

这是很基础的知识，只是c和c++相关内容容易混淆起来。

我是在看一个人问c语言题时候发现这个知识点的。

当时他的问题里包含了一个结构如下：

typedef struct Str{

int len;

char data\[128\];

} str;

然后使用str（小写形式的）来声明一个新的变量。

这个有点意思了，我的问题就是为何要用typedef struct这样的形式呢？

后来发现，这个是c语言很基础的一个问题，只是c++用多了容易把c++的struct和c的混在一起。

c++的struct实际就是class关键字的一种变体，默认的权限范围为public。

但是c语言使用struct，一般是这样定义

struct CStruct{

int a;

int b;

};

然后这样使用struct CStruct cdata;

如果想省略定义时候使用的struct，就可以用typedef声明一个新的类型。类似：

typedef struct

{

int a;

int b;

} new\_struct;

然后就可以直接使用new\_struct dstruct;来定义变量了。

说的有些罗嗦，只是为了自己知识的一个备忘。嘿嘿。
