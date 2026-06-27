---
title: "不要用一个模子制造所有东西 &#8211; 软件开发的复杂宣言"
description: "http://www.noop.nl/2009/03/the-complex-manifesto.html n &hellip; \n继续阅读“不要用一个模子制造所有东西 &#8211; 软件开发的复杂宣言”"
published: 2009-03-03
category: tech
updated: 2009-03-04
---

[http://www.noop.nl/2009/03/the-complex-manifesto.html](http://www.noop.nl/2009/03/the-complex-manifesto.html "http://www.noop.nl/2009/03/the-complex-manifesto.html")

noop.nl是一个比较关注开发方面的博客，里面有些文章很有意思，比如这篇。

我平时喜欢到toplanguage这个开发群组里去看看有什么讨论的话题，发现很多人有一种习惯，自己比较喜欢的一种语言或者模式，就喜欢推荐给别人，当然，本意不是坏的。经常会出现类似情况，前面一个人提问一个相对还不怎么具体的问题，后面就跟上来“这个问题可以用xx解决”或者“这个是xx语言擅长的”，也许也对，但是未免以偏概全。用标题的句子来说就是试图用一个模子去制造所有的物件。

就如同文章里提到的，人们倾向于简单的解决方式，可是我们也要意识到，真实世界比我们想象的更复杂。

作者提出一个复杂宣言，大意如下，后面的注是我的想法。

**Each Problem Has Multiple Solutions**

每个问题都有不同的解决方案。

注：显然如此，而开发者经常需要做的就是权衡抉择，从不同方案里尽快选择一个可行的。相比保证方案的完整性正确性，行动起来往往更重要。

**Solutions Depend on the Problem’s Situation**

解决方案依赖于问题的具体情形

注：Erlang不是万能的，java、ruby、python不是万能的，软件开发没有银弹。一个问题，如果用basic就可以快速解决完成，那就是好的。一个高并发高性能的设计方案，如果没有真实运行起来，没有实际数据的证明，那就是个纸上谈兵，都是假的。

**Changing Context Requires Changing Solutions**

改变了环境（需求变化？），也需要变更解决方案。

注：同样的，没有银弹，没有万灵药。

**Some Solutions are More Prevalent Than Others**

一些解决方案比其它的更流行

注：没错，ruby on rails是很火爆，django也非常有名，但未必就一定适合你，选择好的不如选择对的，尽管有时候对的长得不一定好看。

**For Every Solution There is a Best Situation**

对于每个解决方案都有一个最佳的时机

注：这句话稍有些拗口，不过可以这样理解，“这个方案为何不用c++？”ok，也许那时候c++还没有发明出来，“为什么会有1M内存限制这么傻的东西？”那时代，1M内存就是高配了。也许现在看来一些很愚蠢的选择，当时也许都有一些必须的原因。

**Solutions Change Themselves by Changing Their Situations**

解决方案通过改变它们的运行环境来改变它们自己

注：解决方案改变了环境，环境改变又需要改变解决方案，一个互相影响互相作用的关系。

**Understanding Complexity Helps** **in Applying Simplicity**

对复杂度的理解可以帮助应用的简洁

注：可不可以这样理解，对问题理解的更深刻，也许解决起来未必就很复杂。比如网上流传的那个电风扇吹空盒的故事。

**It Is Impossible to Predict the Best Solution**

不可能预见到最佳的解决方案

注：邓公不是说过吗，摸着石头过河，不可能一下子就找到最佳的过河地点过河时机的。只有走出这一步，才是最重要的。

最后有句话我非常非常欣赏，相比那些绚丽多彩的技术（敏捷、scrum、用例、用户卡片），我们更应该关心“**什么时候用什么**”。推荐大家读读此文。
