---
title: "String s = new String(\"xyz\");创建了多少个String实例？"
description: "在”传智播客DotNet面试宝典(改).pdf“有这样一道非常有意思，也比较有深度的题目。 String s  &hellip; \n继续阅读“String s = new String(\"xyz\");创建了多少个String实例？”"
published: 2011-07-21
category: tech
---

在”传智播客DotNet面试宝典(改).pdf“有这样一道非常有意思，也比较有深度的题目。

String s = new String(“xyz”);创建了多少个String实例？

传智的老师告诉同学们：答案是两个，一个是”xyz”，一个是指向”xyz”的引用对象。

貌似很正确，很有道理。没错，”xyz”是一个字符串，而DotNet字符串（其实Java也是）有驻留intern这样一种机制。

抱歉的是，传智的老师没有料到，问这个问题的同学或者是公司太坏了。这道题的题目是错的，答案也不对。

大家手头有visualstudio的可以建立一个console程序试试看，能不能编译通过？！

至于答案为什么也不对，看看这篇非常详细的解释吧，虽然作者解释的是针对Java语言。

[http://www.iteye.com/topic/774673](http://www.iteye.com/topic/774673 "http://www.iteye.com/topic/774673")

为什么Java能这样写？因为Java有这种构造函数`**[String](http://download.oracle.com/javase/1.4.2/docs/api/java/lang/String.html#String%28java.lang.String%29)**([String](http://download.oracle.com/javase/1.4.2/docs/api/java/lang/String.html) original)而DotNet中的String类没有。`

稍微修改让它能够编译

        static void Main(string\[\] args)         {             char\[\] chars = { 'w', 'o', 'r', 'd' };             String s2 = new String(chars);             String s3 = new String(chars);             int i = s2.Length;             int j = s3.Length;             Console.WriteLine(i + j);         }

如果我们用ILSpy看，结果如下，注意，其中只调用了两次newobj，分别是针对s2和s3。

.method private hidebysig static  
void Main (  
string\[\] args  
    ) cil managed  
{  
// Method begins at RVA 0x2058  
// Code size 57 (0x39)  
.maxstack 3  
.entrypoint  
.locals init (  
        \[0\] char\[\] chars,  
        \[1\] string s2,  
        \[2\] string s3,  
        \[3\] int32 i,  
        \[4\] int32 j  
    )  
    IL\_0000: ldc.i4.4  
    IL\_0001: newarr \[mscorlib\]System.Char  
    IL\_0006: dup  
    IL\_0007: ldtoken field int64 ‘<PrivateImplementationDetails>{06FAE1C3-0E45-4AE7-A401-B8A7D1EFF5D6}’::’$$method0x6000001-1′  
    IL\_000c: call void \[mscorlib\]System.Runtime.CompilerServices.RuntimeHelpers::InitializeArray(class \[mscorlib\]System.Array, valuetype \[mscorlib\]System.RuntimeFieldHandle)  
    IL\_0011: stloc.0

    IL\_0012: ldloc.0  
    IL\_0013: newobj instance void \[mscorlib\]System.String::.ctor(char\[\])  
    IL\_0018: stloc.1

    IL\_0019: ldloc.0  
    IL\_001a: newobj instance void \[mscorlib\]System.String::.ctor(char\[\])  
    IL\_001f: stloc.2

    IL\_0020: ldloc.1  
    IL\_0021: callvirt instance int32 \[mscorlib\]System.String::get\_Length()  
    IL\_0026: stloc.3

    IL\_0027: ldloc.2  
    IL\_0028: callvirt instance int32 \[mscorlib\]System.String::get\_Length()  
    IL\_002d: stloc.s j

    IL\_002f: ldloc.3  
    IL\_0030: ldloc.s j  
    IL\_0032: add  
    IL\_0033: call void \[mscorlib\]System.Console::WriteLine(int32)  
    IL\_0038: ret  
} // end of method Program::Main
