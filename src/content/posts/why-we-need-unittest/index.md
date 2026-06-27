---
title: "Why we need unittest?"
description: "这是我给team member写的一封邮件，感觉很有通用性，值得推广给各位。 我们的项目主要是以COM int &hellip; \n继续阅读“Why we need unittest?”"
published: 2011-03-10
category: tech
---

这是我给team member写的一封邮件，感觉很有通用性，值得推广给各位。  
我们的项目主要是以COM interface形式被其它软件使用，所以我写了一个ProjectAutoTest项目来实现功能测试。  
ProjectAutoTest通过config.txt这样的文本形式配合一些必要文件来定义测试用例，实现了不增加修改代码就可引入新测试用例的目的。

因为针对的不是内部代码而是COM接口，严格的说算不上单元测试。  
但是，ProjectAutoTest可以帮助我提高软件质量，检测潜在的问题，就足够了。

**“Why we need unittest? it wastes time”**

Why we need unittest, because we need good code quality.

1) The issue comes from ProjectA, and changes in our project.  
And AAA told me why it happens and debug with project,  
but we can’t repeat this step in every code change.

2) Which files are affected, how to duplicate the issue more simple more easy?  
The unittest of ProjectAutotest is most easy way to get it.

3) When we fix the issue for ProjectA, for ProjectB,  
it maybe affects our projects or others in same time. How could we know the change good or bad?  
Whether this change affect other defects?

It is just my suggestion, but if you want to keep the code quality of our project,  
Following steps will be good way to do, and  
I have mentored BBB, CCC to follow the rule, it is not difficult.

\====================================  
Step1) duplicate the issue with Defect description.

Step2) convert the issue to ProjectAutoTest testcase. There must be one or two files.  
There must be one or more interface function are called.  
There have incorrect result or no output.

Step3) run your new adding testcase, it should be able to duplicate the issue too.  
If some incorrect result is output, the incorrect result should same as Defect issue too.

Step4) Fix the bug. Find the root cause.

Step5) Change the code, and try with the testcase in ProjectAutoTest.  
It should get correct result.

Step6) Test with all testcases in ProjectAutoTest, results should be correct too.

Step7) Test with Defect duplication steps. It should be correct too.

Step8) Check in the code, and change Defect state.

!!! Note: the testcase in ProjectAutoTest should be checked in too.  
The testcase must be maintained same as source code, and consider the testcase as same importance too.

For the code review, it should have changed code, and new testcase in same time.
