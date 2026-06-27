---
title: 一个VARIANT引发的bug
description: "昨天一位同事跟领导讨论过程中提到，他认为微软Visual c++6.0编译器的最大优化有bug。因为以前没有使 &hellip; \n继续阅读“一个VARIANT引发的bug”"
published: 2009-11-05
category: tech
tags:
  - Bug
  - VARIANT
  - Visual C++
---

昨天一位同事跟领导讨论过程中提到，他认为微软Visual c++6.0编译器的最大优化有bug。因为以前没有使用最大优化的时候代码没有问题，把project setting改成最大优化以后就出现bug了。

因为这个max speed optimization设置修改是我提出来的，所以感觉有必要看看原因到底是什么。因为我是不相信这种“微软编译器优化能导致接口调用出错”的说法，往往此类问题就出在我们自己的代码上面。

在这个同事的电脑上重现了一下这个问题，然后回到我自己电脑上，果然也可以重现，这就有点意思了。

在代码中加入断点，发现是某个接口函数调用失败，这也是那个同事所谓的“最大速度优化导致接口调用失败”说法的起源，不过我相信，这之前的代码一定已经有问题了。

查看运行时的调用栈，在几个相关函数加入log信息，然后跑了一遍错误的情况（setting为最大优化），再跑一次结果正确的情况（setting为不优化）。然后使用winmerge比较两次log的文本，发现它们俩有不同的输入参数。

为何同样的代码，只是修改了project setting就有不同的结果呢？难道真的是VC++出了问题被我这个同事抓到bug？

我又跑了几次错误的情况，发现输入参数字符串的最后一部分是随机变化的（正常情况应该是不变的）。我记起一种可能性，当我们使用最大优化的时候，某些没有初始化的变量会有这种可能。

从调用栈上溯，发现这个参数是来自另外一个接口，它的调用方式类似这样：

CComVariant var;  
p->GetAddr(&var);  
CString str.Format("aaaa %d", var.uiVal);

uiVal的定义是unsigned short，也就是一个2Bytes数据，可是查看GetAddr()这个函数，里面代码类似这样：

HRESULT CAaaa::GetAddr(VARIANT\* pVar)  
{        
     CComVariant var(m\_addr); // 这里的m\_addr的声明是BYTE m\_addr;  
     return var.Detach(pVar);  
}

好像能抓到一些问题的原因了。我们查看VARIANT的定义可以发现它内部包含了一个union，里面有BYTE bVal;有unsigned short uiVal;有unsigned long ulVal;

OK，原因很清楚了。我们在GetAddr中赋值的时候，只（使用）设置了VARIANT的联合中1个BYTE的数据，而我们在后面的代码里使用uiVal形式，实际上读取了2个BYTE，高位部分的数据是无效的。通过观察随机数的16进制格式也可以发现，正确数据应该为0x00，我们得到的错误结果都是0x5800，0x6300，0xCC00这样的。

知道了问题的原因该如何修改呢？有两种办法，一个是在结果中也是使用bVal，这是最好的办法。另外，如果要使用比赋值时数据长度更宽的类型，一定要通过var.ChangeType(VT\_UI2);这样的类型转换，保证高位部分数据有效。

改完了这部分代码，程序在最大优化的设置下一样运行正确，根本就不是什么设置导致的问题，就是代码有问题。

另外非常需要注意的是，这种bug跟优化不优化没有任何联系，而是跟CComVariant以及VARIANT这种复杂数据结构里面的union有关系，CComVariant好像没有对VARIANT的数值成员做清零操作，而是调用了VariantInit()。使用union的时候都需要注意类似的情况。

我构造了一个test case可以在不设置最大优化的情况下一样出现类似问题。如果认为这是“最大速度优化导致接口调用失败”，只是看到了一种表象，真正的原因离着远呢。
