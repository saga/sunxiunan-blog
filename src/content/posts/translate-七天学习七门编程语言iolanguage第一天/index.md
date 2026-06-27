---
title: "[Translate] 七天学习七门编程语言IOLanguage第一天"
description: "http://oscardelben.com/seven-languages-io-day-1 我刚买了Sev &hellip; \n继续阅读“[Translate] 七天学习七门编程语言IOLanguage第一天”"
published: 2010-03-29
category: lua
tags:
  - IOLanguage
---

[http://oscardelben.com/seven-languages-io-day-1](http://oscardelben.com/seven-languages-io-day-1 "http://oscardelben.com/seven-languages-io-day-1")

我刚买了[Seven languages in seven weeks](http://www.pragprog.com/titles/btlang/seven-languages-in-seven-weeks)这本书的Beta版，真是一本好书。

这本书每章介绍一门编程语言，总共是七门语言。每章你都能找到语言的介绍，还有一些练习和自学题目。实际上每章也分成三天，我将用“第一天”“第二天”“第三天”来写它们。

这本书里介绍了下面这些编程语言：

Ruby

IOLanguage

Prolog

Scala

Erlang

Clujure

Haskell

因为我（原作者）知道ruby了，就很快翻到第二章IOLanguage。IO是一门原型编程语言，某种程度上类似javascript（译者注：类似语言还有Lua）。我喜欢这门语言的语法和简洁性。

在Mac os X上安装IO

如果你想编译所有依赖库，从源代码开始安装需要一些时间。这里我们使用macports来获取所有依赖库，你可以在这里[http://www.iolanguage.com/scm/io/docs/IoGuide.html#Introduction-Installing](http://www.iolanguage.com/scm/io/docs/IoGuide.html#Introduction-Installing "http://www.iolanguage.com/scm/io/docs/IoGuide.html#Introduction-Installing")找到详细的安装文档。

 1: cd ~/

 2: git clone git://github.com/stevedekorte/io.git

 3: cd io

 4: make vm; sudo make install; sudo make port; sudo make install

你可能不得不加入一些辅助库，可以参考前面关于安装的在线文档知道详细步骤。

如果你想安装textmate的绑定，可以运行以下命令：

 1: cd "/Library/Application Support/TextMate/Bundles"

 2: svn co http://svn.textmate.org/trunk/Bundles/Io.tmbundle/

就是这些，现在可以运行Terminal程序了。

IO语言基础

IO编程语言的完整介绍可以参考这里[http://www.iolanguage.com/scm/io/docs/IoGuide.html](http://www.iolanguage.com/scm/io/docs/IoGuide.html "http://www.iolanguage.com/scm/io/docs/IoGuide.html")

下面是一个简单的预览：

 1: Io 20090105

 2:  

 3: Io> 3 \* 4

 4: ==> 12

 5:  

 6: Io> Animal := Object clone

 7: ==> Animal\_0x10034c170:

 8: type = "Animal"

 9:  

 10:  

 11: Io> Animal description := "All animals in the world"

 12: ==> All animals in the world

 13:  

 14: Io> dog := Animal clone

 15: ==> Animal\_0x10033f5f0:

 16:  

 17: Io> dog description

 18: ==> All animals in the world

 19:  

 20: Io> dog description := "A generic dog"

 21: ==> A generic dog

 22:  

 23: Io> dog description

 24: ==> A generic dog

 25:  

 26: Io> dog talk := method("Baw" print)

 27: ==> method(

 28: "Baw" print

 29: )

 30:  

 31: Io> dog talk()

 32: Baw==> Baw

 33:  

 34: Io> list(1, 2, 3) sum

 35: ==> 6

 36:  

 37: Io> list(1, 2, 3) average

 38: ==> 2

 39:  

 40: Io> list(1, 2, 3) map(x, x \* x)

 41: ==> list(1, 4, 9)

 42:  

 43: Io> fibonacci := method(n, if(n < 2, n, (fibonacci(n -1) + fibonacci(n - 2))))

 44: ==> method(n,

 45: if(n < 2, n, (fibonacci(n - 1) + fibonacci(n - 2)))

 46: )

 47: Io> fibonacci(34)

 48: ==> 5702887

先别担心这语言看上去有些怪异，实际上你会发现它的语法非常简单。

通过IO建立一个在线新闻程序

这是我做的一个小练习，刚刚学过语言以后，用IO语言在20分钟内创建一个简单版本的新闻平台。代码不是很出彩，但是它证明了使用IO多轻松简单。

 1: # INSTANTIATE DB

 2:  

 3: db := SQLite clone

 4: db setPath("news.sqlite")

 5:  

 6: # HTML HELPERS

 7:  

 8: ul := method(content, "<ul>" .. content .. "</ul>")

 9:  

 10: li := method(content, "<li>".. content .. "</li>")

 11:  

 12: a := method(text, url, "<a href=\\"#{url}\\">#{text}</a>" interpolate)

 13:  

 14: form := method(action, content, "<form action=\\"#{action}\\" method=\\"get\\">" interpolate .. content .. "</form>")

 15:  

 16: field := method(name, "<label>#{name}</label>: <input type=\\"text\\" name=\\"#{name}\\" \\>" interpolate)

 17:  

 18: submit := method("<input type=\\"submit\\" />")

 19:  

 20: with\_template := method(title, body,

 21: "<!DOCTYPE HTML PUBLIC \\"-//W3C//DTD HTML 4.01 Transitional//EN\\"

 22: \\"http://www.w3.org/TR/html4/loose.dtd\\">

 23: <html>

 24: <head>

 25: <meta http-equiv=\\"Content-type\\" content=\\"text/html; charset=utf-8\\">

 26: <title>" .. title .. "</title>

 27: <style type=\\"text/css\\" media=\\"screen\\">

 28: body {

 29: background:#ffffcc;

 30: margin:20px;

 31: padding:0;

 32: font-family:Calibri;

 33: font-size:18px;

 34: }

 35:  

 36: h1 {

 37: color:#006363;

 38: margin:1em;

 39: }

 40:  

 41: a {

 42: color:#ff7373;

 43: font-size:20px;

 44: }

 45:  

 46: li {

 47: line-height:1.5em;

 48: }

 49: </style>

 50: </head>

 51: <body>" .. a("Home", "/") .. " - " .. a("New", "/new") .. "<h1>" .. title .. "</h1>" .. body .. "</body></html>"

 52: )

 53:  

 54: # Actions

 55:  

 56: render\_index := method(params,

 57: db open

 58: posts := db exec("SELECT \* from posts")

 59: db close

 60:  

 61: posts\_html := posts map(post, li( a( post at("title"), post at("url") ) ) ) join

 62:  

 63: with\_template("Io News", ul(posts\_html))

 64: )

 65:  

 66: render\_new := method(params,

 67: with\_template("New", form("/create", field("title") .. field("url") .. submit() ))

 68: )

 69:  

 70: render\_create := method(params,

 71: db open

 72: db exec("INSERT into posts (title, url)

 73: values ('#{params at(\\"title\\")}', '#{params at(\\"url\\")}')" interpolate)

 74: db close

 75: with\_template("Hurray!", "Io rocks!")

 76: )

 77:  

 78: not\_found := method(

 79: with\_template("Not found")

 80: )

 81:  

 82: # Unfortunately I had to manually extract the parameters

 83:  

 84: extract\_parameters := method(string,

 85: # foo=bar&x=y => list(list("foo", "bar"), list("x", "y"))

 86: l := string split("&") map(param, param split("="))

 87:  

 88: params := Map clone

 89: l foreach(param, params atPut(param at(0), param at(1)))

 90: params

 91: )

 92:  

 93: handle\_request := method(request,

 94: path\_and\_parameters := request split("?")

 95: path := path\_and\_parameters at(0)

 96:  

 97: if(path\_and\_parameters size > 1,

 98: parameters := extract\_parameters(path\_and\_parameters at(1)),

 99: parameters := nil

 100: )

 101:  

 102: # Does anyone know how to implement cond()?

 103: if(path == "/",

 104: render\_index(parameters),

 105: if(path == "/new",

 106: render\_new(parameters),

 107: if(path == "/create",

 108: render\_create(parameters),

 109: not\_found

 110: )

 111: )

 112: )

 113: )

 114:  

 115: WebRequest := Object clone do(

 116: handleSocket := method(aSocket,

 117: aSocket streamReadNextChunk

 118: request := aSocket readBuffer betweenSeq("GET ", " HTTP")

 119: aSocket streamWrite(handle\_request(request))

 120: aSocket close

 121: )

 122: )

 123:  

 124: WebServer := Server clone do(

 125: setPort(8000)

 126: handleSocket := method(aSocket,

 127: WebRequest clone @handleSocket(aSocket)

 128: )

 129: )

 130:  

 131: WebServer start

如果你想运行代码，你可能需要先建立一个数据库结构，下面是我的步骤：

 1: db := SQLite clone

 2: db setPath("news.sqlite")

 3: db open

 4: db exec("CREATE TABLE posts(id INTEGER PRIMARY KEY ASC,

 5: title VARCHAR(255),

 6: url VARCHAR(255),

 7: published\_at DATE)")

 8:  

 9: db exec("INSERT INTO posts (title, url, published\_at)

 10: values

 11: ('Welcome aboard', 'http://example.com', DATETIME('NOW'))")

 12:  

 13: db exec("INSERT INTO posts (title, url, published\_at)

 14: values

 15: ('Io documentation', 'http://www.iolanguage.com/scm/io/docs/IoGuide.html', DATETIME('NOW'))")

 16:  

 17: db close

结果如下：

[![image](http://sunxiunan.com/media/Translate1IOLanguage_BDF5/image_thumb.png "image")](http://sunxiunan.com/media/Translate1IOLanguage_BDF5/image.png)

[![image](http://sunxiunan.com/media/Translate1IOLanguage_BDF5/image_thumb_3.png "image")](http://sunxiunan.com/media/Translate1IOLanguage_BDF5/image_3.png)

[![image](http://sunxiunan.com/media/Translate1IOLanguage_BDF5/image_thumb_4.png "image")](http://sunxiunan.com/media/Translate1IOLanguage_BDF5/image_4.png)

[![image](http://sunxiunan.com/media/Translate1IOLanguage_BDF5/image_thumb_5.png "image")](http://sunxiunan.com/media/Translate1IOLanguage_BDF5/image_5.png)

个人而言，我非常喜欢IO语言，我可能会多学习它几天时间。
