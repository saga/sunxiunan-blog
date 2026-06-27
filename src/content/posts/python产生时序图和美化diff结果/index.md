---
title: Python产生时序图和美化diff结果
description: "美化diff这个想法来自今天的code review，tfs的命令行支持导出diff格式的比较结果，但是可读性 &hellip; \n继续阅读“Python产生时序图和美化diff结果”"
published: 2012-10-10
category: tech
---

美化diff这个想法来自今天的code review，tfs的命令行支持导出diff格式的比较结果，但是可读性太差了，所以想用Python代码美化一下。

Python自己有一个difflib，这个功能算是内置支持，可以参考这里http://docs.python.org/library/difflib.html#difflib.HtmlDiff

如果想高级一点，可以用这个pygments.org，我是从SO上看到的 http://stackoverflow.com/questions/641055/diff-to-html-diff2html-program 这个pygments是一个代码美化器，但是支持diff格式，比如这里的例子 http://pygments.org/demo/5455/ 。如果喜欢ruby可以试试这个项目 https://github.com/rubychan/coderay

最近有个写文档的需要，画时序图类图是经常的。顺手查查，发现这个项目 https://github.com/aivarsk/scruffy 使用yUML语法生成类图和时序图，好玩。比如这个例子

![](https://github.com/aivarsk/scruffy/raw/master/samples/sample14-scruffy.png "sample14")

或者这个例子

![](https://github.com/aivarsk/scruffy/raw/master/samples/sequence1-scruffy.png "seq1")

看了一下代码，支持win32应该没有问题。如果只想产生时序图，可以用这个 http://pypi.python.org/pypi/seqdiag
