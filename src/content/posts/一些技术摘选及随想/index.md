---
title: 一些技术摘选及随想
description: "code review的目标，1）消除所有W4警告 2）给不能直接理解的代码加注释 3）丑陋代码的修改，主要针 &hellip; \n继续阅读“一些技术摘选及随想”"
published: 2010-11-18
category: tech
---

code review的目标，1）消除所有W4警告 2）给不能直接理解的代码加注释 3）丑陋代码的修改，主要针对过多for/while/if/switch这类控制的互相嵌套，把它们削平

[https://bugzilla.redhat.com/show\_bug.cgi?id=638477](https://bugzilla.redhat.com/show_bug.cgi?id=638477 "https://bugzilla.redhat.com/show_bug.cgi?id=638477") Linus随手写了个memcpy，当然你可以在glib或者dietlibc这些标准库实现中找到工程级强度代码。

Python web server方案选择比较[http://imilky.cn/blog/2010/04/python-wsgi-web-server/](http://imilky.cn/blog/2010/04/python-wsgi-web-server/ "http://imilky.cn/blog/2010/04/python-wsgi-web-server/") 另外可以考虑[http://mongrel2.org/](http://mongrel2.org/ "http://mongrel2.org/") 现在这个新版本支持Python、Lua、Ruby、C++，uwsgi可以使用Lua开发 [http://projects.unbit.it/uwsgi/wiki/Lua](http://projects.unbit.it/uwsgi/wiki/Lua "http://projects.unbit.it/uwsgi/wiki/Lua")

如何测试webserver性能，这篇可以作为开始阅读的起点：[http://en.wikipedia.org/wiki/Web\_server\_benchmarking](http://en.wikipedia.org/wiki/Web_server_benchmarking "http://en.wikipedia.org/wiki/Web_server_benchmarking") 

另外很多测试提到ab，其实就是apachebench。

如何让node.js与apache/nginx共用，如何让tornadoweb与apache/nginx共用，用不着那些有的没的复杂步骤，apache用rewrite，nginx考虑proxy\_pass就都完事了。

C语言正则表达式库，可以用libc里面的，也可以用pcre，oniguruma。

fastcgi可以用C写，自己devkit就有范例 [http://www.fastcgi.com/devkit/examples/authorizer.c](http://www.fastcgi.com/devkit/examples/authorizer.c "http://www.fastcgi.com/devkit/examples/authorizer.c")

[http://hyperpolyglot.org/lisp](http://hyperpolyglot.org/lisp) Lisp: Common Lisp, Scheme, Clojure, Emacs Lisp lisp各式方言对比！

[http://hyperpolyglot.org/scripting](http://hyperpolyglot.org/scripting) Scripting Languages: PHP, Perl, Python, Ruby, Smalltalk 脚本语言特性比较cheatsheet。

[http://hyperpolyglot.org/small](http://hyperpolyglot.org/small) Scripting Languages: Bash, Tcl, Lua, JavaScript, Io 特性对比

[http://hyperpolyglot.org/c](http://hyperpolyglot.org/c) C, C++, Objective C, Java, C#特性对比cheatsheet

C语言装逼教程推荐，[http://sunxiunan.com/?p=1661](http://sunxiunan.com/?p=1661) 看后面书籍推荐部分，另外只需要加上一本《高效程序的奥秘》

建议Python相关讲师多使用appengine，uliweb多加入一些相关示例，appengine又易用又免费又容易部署，那些迁移成本、不能完成的任务先不考虑，用appengine做一些力所能及的东西，让其他人能实际用到，这种成就感是对初学者最好的鼓励。

最后一条推荐的新闻是Lua5.2进入rc alpha阶段，当然距离真正release也许还要不少时间，但是很值得关注！
