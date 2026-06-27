---
title: A Fool with a Tool is still a Fool
description: "这句话真的是太经典了，让我有冲动写篇博客赞颂一下。 http://www.dwheeler.com/flawf &hellip; \n继续阅读“A Fool with a Tool is still a Fool”"
published: 2010-11-20
category: tech
---

这句话真的是太经典了，让我有冲动写篇博客赞颂一下。

[http://www.dwheeler.com/flawfinder/](http://www.dwheeler.com/flawfinder/ "http://www.dwheeler.com/flawfinder/")

flawfinder是一个c/c++代码静态分析工具，类似splint，或者pclint，尽管在VisualC++找不到这个工具，其实VC++已经自带了，在企业版我们可以定义代码分析扫描规则，或者一般的版本，但你把Build Warning调到Level4，也可以看到足够的信息（如果做C++编程，没有硬性要求把Warning级别调到最高，相信我，产品质量非常值得怀疑），据我所知GCC也可以调整Warning级别，一般来说，消除了Warning提示的，代码质量可以达到50分，满分100。

我们抛开对FlawFinder这个工具的评价，只看关于这句话的解释。

> Any static analysis tool, such as Flawfinder, is merely a tool. No tool can substitute for human thought! In short, "*a fool with a tool is still a fool*". It’s a mistake to think that analysis tools (like flawfinder) are a substitute for security training and knowledge. Developers – please read documents like [my Secure Programming book](http://www.dwheeler.com/secure-programs) so you’ll understand the vulnerabilities that the tool is trying to find! Organizations – please make sure your developers understand how to develop secure software (including learning about the common mistakes past developers have made), *before* having them develop software or use static analysis tools.
> 
> An example of horrific tool misuse is disabling vulnerability reports without (1) fixing the vulnerability, or (2) ensuring that it is *not* a vulnerability. It’s publicly known that RealNetworks did this with flawfinder; I suspect others have misused tools this way. I don’t mean to beat on RealNetworks particularly, but it’s important to apply lessons learned from others, and unlike many projects, the details of their vulnerable source code are publicly available. As noted in [iDEFENSE Security Advisory 03.01.05 on RealNetworks RealPlayer](http://archive.cert.uni-stuttgart.de/vulnwatch/2005/03/msg00000.html) (CVE-2005-0455), a security vulnerability was in this pair of lines:
> 
>  char tmp\[256\]; /\* Flawfinder: ignore \*/ strcpy(tmp, pScreenSize); /\* Flawfinder: ignore \*/
> 
> This means that flawfinder *did* find this vulnerability, but instead fixing it, someone added the "ignore" directive to the code so that flawfinder would stop reporting the vulnerability. But an "ignore" directive simply stops flawfinder from *reporting* the vulnerability – it doesn’t *fix* the vulnerability! The *intended use* of this directive is to add it once a reviewer determined that it was definitely a false positive, but in this case the tool was reporting a real vulnerability. The same thing happened again in [iDefense Security Advisory 06.23.05](http://labs.idefense.com/intelligence/vulnerabilities/display.php?id=250), where the vulnerable line was:
> 
>  sprintf(pTmp, /\* Flawfinder: ignore \*/
> 
> And a third vulnerability with the same issue was reported still later in [iDefense Security Advisory 06.26.07, RealNetworks RealPlayer/HelixPlayer SMIL wallclock Stack Overflow Vulnerability](http://www.securityfocus.com/archive/1/472295/30/0/threaded), where the vulnerable line was:
> 
>  strncpy(buf, pos, len); /\* Flawfinder: ignore \*/
> 
> This is *not* to say that RealNetworks is a fool or set of fools. Indeed, I believe many organizations, not just RealNetworks, have misused tools this way. My thanks to RealNetworks publicly admitting their mistake – it allows others to learn from their mistake! My specific point is that you can’t just add comments with "ignore" directives and expect that the software is suddenly more secure. Do not add "ignore" directives until you are certain that the report is a false positive.
> 
> This kind of problem can easily happen in organizations that say "run scanning tools until there are no more warnings" but don’t later review the changes that were made to eliminate the warnings. If warnings are eliminated because code is changed to eliminate vulnerabilities, that’s great! General-purpose tools scanning like flawfinder will have false positive reports, though; it’s easy to create a tool without false positives, but they’ll do that by failing to report many possible vulnerabilities (some of which will really *be* vulnerabilities). The obvious answer if you want a broader tool is to allow developers to examine the code, and if they can truly justify that it’s a false positive, document *why* it is a false positive (say in a comment near the report) and then add a "Flawfinder: ignore" directive. But you need to really justify that the report is a false positive; just adding an "ignore" directive doesn’t fix anything! Sometimes it’s easier to fix a problem that may or may not be a vulnerability, instead of ensuring that it’s a false positive – the [OpenBSD developers have been doing this successfully for years](http://www.openbsd.org/security.html#process), since if complicated code isn’t an exploitable vulnerability yet, a tiny change can often turn such fragile code into a vulnerability.
> 
> If you’re in an organization using a scanning tool like this, make sure you review every change caused by a vulnerability report. Every change should be either (1) truly fixed or (2) correctly and completely justified as a false positive. I think organizations should require any such justification to be in comments next to the "ignore" directive. If the justification isn’t complete, don’t mark it with an "ignore" directive. And before developers even start writing code, get them trained on how to write secure code and what the common mistakes are; this material is *not* typically covered in university classes or even on the job.

原文并不复杂，我在这就不翻译了。我同意作者提出的这个观点，对于傻瓜来说，再好的工具也白扯。

最近大力鼓吹推行Code Review、Unit Test，其实经常看我博客的朋友都知道，我一直在讲这句话，提升代码质量的两个关键方法就是Code Review加上单元测试，也在自己的项目中身体力行，不过由于我只是小兵一个，所以只能自己做，还打不到让其他人也跟着做的程度。对于这两个工具，没有好的执行力推动，其实是不可能达到提升软件质量的效果的。用工具，用技术，但是最关键的一点是要用对工具，而且要有持之以恒的执行。

最简单的也最容易的就是从手头的项目开始，如果编译工具可以调整Warning，调到最高，然后fix掉这些Warning。如果遇到Bug，不要Ignore，先总结Root Cause，然后写Test case，改代码，编译，跑单元测试。只要持之以恒，不需要什么CEO总经理推动，产品质量自然就提升上来了。

如果你不是傻瓜，但是你的组员是这样的傻瓜该怎么办？如果你有权力，建议你把他调开，有些人真的是不适合编程，不必强求，也许他搞销售更适合呢，让这种傻瓜捣乱的结果就是让整个开发组的士气低落；如果你没法让他离开，那就让他做一些边缘性的项目，不要碰关键代码，另外要小心盯着傻瓜添加或者修改的代码，因为一颗老鼠屎会坏了一锅汤，而且很有可能这个黑锅会被你背上。
