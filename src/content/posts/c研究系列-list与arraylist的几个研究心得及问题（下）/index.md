---
title: "C#研究系列-List<>与ArrayList的几个研究心得及问题（下）"
description: "代码在这里： https://gist.github.com/921385 与（上）一样在一开始定义了两个继承 &hellip; \n继续阅读“C#研究系列-List<>与ArrayList的几个研究心得及问题（下）”"
published: 2011-04-19
category: tech
---

代码在这里：

[https://gist.github.com/921385](https://gist.github.com/921385 "https://gist.github.com/921385")

与（上）一样在一开始定义了两个继承List与ArrayList的空类。  
// public class List<T> : IList<T>, ICollection<T>, IEnumerable<T>, IList, ICollection, IEnumerable

class CFromList : List<int> { }

// public class ArrayList : IList, ICollection, IEnumerable, ICloneable

class CFromArrayList : ArrayList{ }

注意在87行，我注释了这行代码

// list1\[index++\] = a;

意思很简单，就是要修改iterate当前位置的值。  
其实我当初写下这个代码也就是随手为之，因为这种行为在C++中不算啥（只是对值进行修改，并不会修改list本身内存排列）。  
可是debug的时候，蹦出异常InvalidOperationException了。太奇怪了。  
好在我设置了step into CLR code，所以能跟踪到List内部的一些实现。从73到85行就是我找到的一些内容。  
在List.cs代码中，前面list1\[index++\]=a;的赋值语句会进入这个函数public T this\[int index\] set{}，在这个属性函数中  
\_items\[index\] = value; \_version++;  
所以\_version会增加1。在MoveNext函数中，会检查这个\_version  
private bool MoveNextRare() {

if (version != list.\_version) {

ThrowHelper.ThrowInvalidOperationException(ExceptionResource.InvalidOperation\_EnumFailedVersion);

}

index = list.\_size + 1;

current = default(T);

return false;

}

很显然，赋值以后，version和list.\_version不一样了。如果我们用try catch包围这些代码，那么就会捕获这个异常。

另外一个问题来了，为何ArrayList没有异常呢？在我debug的时候，如果有list2\[index++\]=a;这样的修改，代码就挂在这块了，也没有异常弹出。

加上try catch以后就没有问题了，这个就更奇怪了。

从MSDN可以看到，List在foreach这种形式的循环下是不可以修改内容。必须说，这个规定太蛋疼了。如果想修改也很容易，不用这种iterator形式就好了。
