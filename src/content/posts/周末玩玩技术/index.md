---
title: 周末玩玩技术
description: "我很久以前玩过一段时间的google appengine，用它来连接rss填补google reader的空白 &hellip; \n继续阅读“周末玩玩技术”"
published: 2020-03-09
category: tech
updated: 2020-03-10
---

我很久[以前玩过](https://sunxiunan.com/?s=appengine)一段时间的google appengine，用它来连接rss填补google reader的空白。前两天趁着周末又捡出来把玩了一下，现在的感觉却不怎么好用了，难怪google的云计算赶了个大早，却被后来者azure居上。

![](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80)

简单的crud应用，比如todo或者记事本甚至是proxy，appengine还是可以用一用的。但是它有几个问题，一个是standand环境的编程比较复杂，开发者要了解一大堆东西，总算把google datastore在nodejs上跑了起来，但是运行起来才发现javascript版本的rss parser不给力，不如python的feedparser成熟。而python想找一个在appengine稍微能用的blog或者cms几乎是不可能的，大多数的github项目都是11、12年甚至零几年的。另外的问题是如果不付费很多功能都阉割了，即使google cloud赠送了300美元一年的试用，可是我不想浪费时间在这个没落的平台上了。

于是又想到了新型的平台[zeit](https://now.sh/)和[netlify](https://www.netlify.com/)，它俩都支持连接到github直接拽代码部署，命令行直接搞定，试用了一下部署一个coreui的angular demo棒棒哒。如果是纯js项目可以考虑这两个平台。

做toy project的开发者还可以考虑heroku，这个老牌平台虽然有着google cloud同样的缺点，但是它上面一些开源项目却很实用，比如部署了一个[下载youtube视频](https://github.com/Rudloff/alltube)的应用在上面，还可以支持v2，前面挂上cloudflare那就可以特殊情况下应应急。
