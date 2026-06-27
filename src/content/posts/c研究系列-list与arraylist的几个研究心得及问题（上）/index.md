---
title: "C#研究系列-List<>与ArrayList的几个研究心得及问题（上）"
description: "代码放在gist.github.com上了，看不到的请留言。 第一个心得，是我看某本书提到，IList用起来要 &hellip; \n继续阅读“C#研究系列-List<>与ArrayList的几个研究心得及问题（上）”"
published: 2011-04-15
category: tech
---

代码放在gist.github.com上了，看不到的请留言。

第一个心得，是我看某本书提到，IList用起来要比ArrayList快。

这里面用到了我上一篇博客提到的高精度计时器 http://sunxiunan.com/?p=1829

我在开始定义了两个类。  
// public class List : IList, ICollection, IEnumerable, IList, ICollection, IEnumerable  
class CFromList : List{}

// public class ArrayList : IList, ICollection, IEnumerable, ICloneable  
class CFromArrayList : ArrayList{}  
List和ArrayList的定义在注释中给出，可以看出来其实都差不多。ArrayList只是多了ICloneable，还少了几个泛型接口继承。

在后面代码中都用Add方法向list中添加int类型数据，然后通过foreach形式枚举数据，注意！枚举部分的代码是有问题的，我们在（下）中会提到。

这里还要推荐一个非常棒的工具ILSpy，是sharpdevelop开发的，强烈建议dotnet程序员都下载使用。

我把ILSpy disassemble出来的C#代码和IL代码分别列在后面。注意对于ArrayList的foreach语句，C#形式的代码与源代码有些差别（79到96行），编译器加入一个IEnumerator enumerator2 = cFromArrayList.GetEnumerator();本地变量，另外使用int num5 = (int)enumerator2.Current;这样访问iterator。而且还加入了IDisposable的finally部分。

再继续看IL代码部分，对于List形式，IL代码没有box装箱指令，而ArrayList在145行有个box指令，这是性能差别之一。  
但是奇怪的是，在枚举部分，ILSpy生成的（以及ILDasm）IL代码，对于ArrayList和List而言，基本上差别不大，一样也有对MoveNext和Current以及IDisposable接口的调用。只不过ArrayList多出unbox和box的指令。

运行结果如我们所料，List要比ArrayList快不少。

但是我们在枚举部分的代码是有问题的，我明天在（下）中会介绍。
