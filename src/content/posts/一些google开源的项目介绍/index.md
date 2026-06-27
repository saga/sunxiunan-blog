---
title: 一些google开源的项目介绍
description: "编程中，经常会用到一些开源库或者项目，比如c++中经常用到的boost。 google的主要软件架构基于lin &hellip; \n继续阅读“一些google开源的项目介绍”"
published: 2009-04-11
category: tech
---

编程中，经常会用到一些开源库或者项目，比如c++中经常用到的boost。

google的主要软件架构基于linux，c，c++，java，而且作为一个创新型的公司，他们也经常性的回馈社区一些优秀的代码。在不断的反馈修改中，代码质量得到了提高，用户得到优质服务，这也算是双赢的结果。而且google里面牛人多，写出来的代码质量相对比较高，有很大的学习价值。

周末无事，搜索code.google.com/p，找到一些有趣的google参与的项目，在这里简单分享一下。有一些开源项目没有列出来，主要因为平台是linux-only或者对项目本身不感兴趣。如果想找完全列表，可以在这里看到：  
[http://code.google.com/hosting/projects.html](http://code.google.com/hosting/projects.html "http://code.google.com/hosting/projects.html")

另外也可以使用google这个label来搜索code.google.com/p，但是这样也许搜出来的并不一定是google开发的项目。

———————————-

[http://code.google.com/p/omaha/](http://code.google.com/p/omaha/ "http://code.google.com/p/omaha/")

这是最新放出来的google update的代码，想做windows在线update功能的可以参考。(c++)

[http://code.google.com/p/google-breakpad](http://code.google.com/p/google-breakpad "http://code.google.com/p/google-breakpad")

[http://code.google.com/p/google-glog/](http://code.google.com/p/google-glog/ "http://code.google.com/p/google-glog/")

breakpad，一个项目的开始需要做一些什么样的基础设施，crash dump和运行logging毫无疑问都是应该有的，这个项目就是负责在crash的时候收集信息，发出crash dump报告的。(c++)

glog就是用于项目中logging功能的，一般桌面程序不太需要logging，但是对于大规模长时间服务的系统来说，logging功能一定要有，而且要记录足够多的信息。(c++)

[http://code.google.com/p/protobuf/](http://code.google.com/p/protobuf/ "http://code.google.com/p/protobuf/")

protocol buffer，可以用来在跨进程、跨机器，不同操作系统，不同编程语言之间进行数据交换。类似于微软的COM IDL或者XML，但是解析速度更快，需要传输字节数更少。(c++, java, python)

[http://code.google.com/p/chromium/](http://code.google.com/p/chromium/ "http://code.google.com/p/chromium/")

google chrome浏览器项目，基于webkit，想自己开发个浏览器，学习这个吧。(c++)

[http://code.google.com/p/google-perftools/](http://code.google.com/p/google-perftools/ "http://code.google.com/p/google-perftools/")

TCMalloc，heap检测，是一个google用于性能检测的工具。(c++)

[http://code.google.com/p/jaikuengine/](http://code.google.com/p/jaikuengine/ "http://code.google.com/p/jaikuengine/")

jaiku是被google收购的微博客服务，类似twitter，但是google买下了以后没有什么动作。在将jaiku移植到appengine平台以后就做出了开源而且不再继续开发的决定，jaiku也就这样了。当然，幸福的还是我们这些程序员。（python）

[http://code.google.com/p/googleappengine/](http://code.google.com/p/googleappengine/ "http://code.google.com/p/googleappengine/")

这个只是appengine在桌面进行测试运行的项目，相比google服务器上的appengine，肯定还是有着相当大的区别。不过我们也可以从中学到google对于python的使用，不是么？（python）

[http://code.google.com/p/v8/](http://code.google.com/p/v8/ "http://code.google.com/p/v8/")

google chrome浏览器中的javascript引擎项目。可以单独用作解析javascript，号称速度非常快。(c++)

[http://code.google.com/p/app-engine-site-creator/](http://code.google.com/p/app-engine-site-creator/ "http://code.google.com/p/app-engine-site-creator/")

使用appengine建立企业及个人网站的朋友，可以试试这个项目。（python）

[http://code.google.com/p/googlemock/](http://code.google.com/p/googlemock/ "http://code.google.com/p/googlemock/")

[http://code.google.com/p/googletest/](http://code.google.com/p/googletest/ "http://code.google.com/p/googletest/")

测试框架组合，mock怎么用实话说我也不清楚。

[http://code.google.com/p/google-styleguide/](http://code.google.com/p/google-styleguide/ "http://code.google.com/p/google-styleguide/")

google c++编码规范，可以学习学习，网上有中文版的了。

[http://code.google.com/p/google-email-uploader](http://code.google.com/p/google-email-uploader "http://code.google.com/p/google-email-uploader")

outlook邮件上传到gmail，可以学学c#。
