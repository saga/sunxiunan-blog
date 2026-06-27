---
title: 关于Python Web开发我的感悟-兼答wsgi fastcgi uwsgi
description: "有位朋友最近在python.cn接连提问关于python web开发的问题， 当然由于他问题的标题是Pytho &hellip; \n继续阅读“关于Python Web开发我的感悟-兼答wsgi fastcgi uwsgi”"
published: 2010-12-19
category: tech
---

有位朋友最近在python.cn接连提问关于python web开发的问题，  
当然由于他问题的标题是Python http server，我也很难确定我下面的说法可以回答他。

如果单论http server，通俗点讲，其实就是一个可以相应客户端针对80端口的http请求的一个网络程序。  
apache也好，nginx也罢莫不如此。python写一个http server也很简单，只要绑定80端口，解析请求，返回一些格式化好的响应数据就行了。

但是根据列举的这些关键字，其实这位朋友要问的应该是python web开发。  
从最简单开始讲，python支持cgi编程，也有标准的cgi模块。  
什么是CGI，它不是Python自己独有的东西，而是一个通用的web标准，可以粗陋的认为CGI就是一种用任意语言（那时候都是指perl）写Web程序的标准。最简单的就是用C写一个hello world的程序，只要做一些简单的apache配置，你就可以在网上运行这个程序。

cgi有缺点，就是你自己玩玩还好，想想一个py程序如何运行的？它需要运行py解释器，然后载入这段py脚本，  
运行，然后py解释器退出。也就是说每当一个用户访问你的py程序都要经历这个py解释器运行、载入、退出的过程。

设计很不优化。

很显然，这时候需要重用，缓存，对不对？

我印象中fastcgi机制（这是一种机制，早期nginx都是用lighttpd的spawn-fcgi）就是做这样的工作，它会起几个python进程，不退出一直运行着，当你有请求，某一个空闲的python进程就负责载入你的脚本，然后跑，然后继续空闲。

看出区别了吧，python不需要反复启动、退出，这是极为耗费时间的，所以节省了这个过程，就省去了很多时间。  
实际上这个机制被普遍运用着，比如office预启动或者很多程序都在系统启动时加载。

当然fastcgi还有其它的机制保证它的运行，我了解不多，就不乱说了。

那么wsgi是什么？  
跟wsgi一样概念的有Ruby语言的Rack，可以认为wsgi是一种通用的接口标准或者接口协议，实现了python web程序与服务器之间交互的通用性。就好比JCP一样。有了这个东西，web.py或者bottle或者django等等的python web开发框架，就可以轻松地部署在不同的web server上了，不需要做任何特殊配置（也需要一些小小的配置调整）  
http://wsgi.org/wsgi/Frameworks 这里可以看到几乎所有流行的web框架都支持wsgi协议。

uwsgi又是什么？  
就我看到的一些东西，uwsgi类似tornadoweb或者flup，也是一种python web server，负责响应python 的web请求，因为apache也好，nginx也罢，它们自己都没有解析动态语言如php的功能，而是分派给其他模块来做，比如apache就可以说内置了php模块，支持的非常爽，让人感觉好像apache就支持php一样。

我说的很简单，其实最重要的是这一句。学Pythonweb开发，应该从动手做开始，而且应该从appengine开始，先省略python部署问题，着重于用python开发web程序，真正跑起来用起来。至于后续的一些概念，应该多学多看，其实我现在对很多python基础也是了解的极为粗浅，但是喜欢没事就查查资料，所以能对这些词语忽悠一些出来。
