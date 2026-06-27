---
title: ROME 0.8 Bug真多啊
description: "在测试宝宝手拉手的功能期间，发现RSS时间解析的相当有问题，查来查去，原来是ROME的bug。可以说这个产品相 &hellip; \n继续阅读“ROME 0.8 Bug真多啊”"
published: 2006-07-08
category: baby
updated: 2006-07-09
---

在测试宝宝手拉手的功能期间，发现RSS时间解析的相当有问题，查来查去，原来是ROME的bug。可以说这个产品相当的不完善，可是我对Java大型一点的程序又没法修改，只能自己想办法了。

  
zone = “UT” / “GMT” ; Universal Time  
; North American : UT  
/ “EST” / “EDT” ; Eastern: – 5/ – 4  
/ “CST” / “CDT” ; Central: – 6/ – 5  
/ “MST” / “MDT” ; Mountain: – 7/ – 6  
/ “PST” / “PDT” ; Pacific: – 8/ – 7  
/ 1ALPHA ; Military: Z = UT;  
; A:-1; (J not used)  
; M:-12; N:+1; Y:+12  
/ ( (“+” / “-“) 4DIGIT ) ; Local differential  
; hours+min. (HHMM)  

这是RFC822关于时区的格式，ROME用的是”EEE, dd MMM yy HH:mm:ss z”这样的小写z格式，使用的是java.text.SimpleDateFormat这个时间格式。查找java的文档关于java.text.SimpleDateFormat的部分就可以知道：  
  
z Time zone General time zone Pacific Standard Time; PST; GMT-08:00  
Z Time zone RFC 822 time zone -0800  

可是，网络上经常用的FeedBurner格式的RSS Feed，Item里面的pubDate元素，恰恰用的就是大写Z的格式，对于如此搞笑的程序还能说什么呢，ROME它实在是太弱了。准备考虑另找一个RSS解析的library了，或者是自己先做一次解析，将我自己解析的结果覆盖ROME错误的部分。
