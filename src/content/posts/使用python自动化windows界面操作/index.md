---
title: 使用Python自动化Windows界面操作
description: "要拷贝几百个文件到另一个目录，有重名现象，但是不想覆盖原有文件，在命令行下应该可以通过命令行开关来完成需求。  &hellip; \n继续阅读“使用Python自动化Windows界面操作”"
published: 2010-09-09
category: tech
tags:
  - Python
---

要拷贝几百个文件到另一个目录，有重名现象，但是不想覆盖原有文件，在命令行下应该可以通过命令行开关来完成需求。

但是已经开始拷贝，而且就想使用界面操作，怎么办？（太纠结了！）

好在我们有Python可以使用。

[http://www.tizmoi.net/watsup/intro.html](http://www.tizmoi.net/watsup/intro.html "http://www.tizmoi.net/watsup/intro.html")

[http://www.brunningonline.net/simon/blog/archives/winGuiAuto.py.html](http://www.brunningonline.net/simon/blog/archives/winGuiAuto.py.html "http://www.brunningonline.net/simon/blog/archives/winGuiAuto.py.html")

其主要设计思想就是使用Windows API找到特定窗口，然后发送键盘或者鼠标消息。

watsup我使用Python2.6，然后安装了PyWin32，还有SendKeys库，最后下载watsup，解压到Python的lib目录即可。

代码极为简单，我对winGuiAuto稍作修改，加了equalText参数，因为原来的wantedText使用的是(wantedText in targetWindows)，只要有"No"在字符串里面就会返回，与我想达到的效果不太一样，当然也可以用selectionFunction加lambda完成，但不想费那劲了。

 1: from watsup.winGuiAuto import findControl, findTopWindow, clickButton

 2: from time import sleep

 3:  

 4: aWindow = findTopWindow(wantedText='Confirm File Replace')

 5: while aWindow:

 6: button = findControl(aWindow, equalText='No')

 7: sleep(0.1)

 8: clickButton(button)

 9: sleep(1)

 10: aWindow = findTopWindow(wantedText='Confirm File Replace')

.csharpcode, .csharpcode pre { font-size: small; color: black; font-family: consolas, "Courier New", courier, monospace; background-color: #ffffff; /\*white-space: pre;\*/ } .csharpcode pre { margin: 0em; } .csharpcode .rem { color: #008000; } .csharpcode .kwrd { color: #0000ff; } .csharpcode .str { color: #006080; } .csharpcode .op { color: #0000c0; } .csharpcode .preproc { color: #cc6633; } .csharpcode .asp { background-color: #ffff00; } .csharpcode .html { color: #800000; } .csharpcode .attr { color: #ff0000; } .csharpcode .alt { background-color: #f4f4f4; width: 100%; margin: 0em; } .csharpcode .lnum { color: #606060; }

如果你使用Ruby，可以参考这篇，也是一样的使用相关Windows API。

[http://rubyonwindows.blogspot.com/2007/05/automating-applications-with-ruby.html](http://rubyonwindows.blogspot.com/2007/05/automating-applications-with-ruby.html "http://rubyonwindows.blogspot.com/2007/05/automating-applications-with-ruby.html")
