---
title: lua用于web开发的服务器配置
description: "有两种方式，一种是apache2.3以上会内置的lua module，大家可以下载apache httpd 2 &hellip; \n继续阅读“lua用于web开发的服务器配置”"
published: 2010-11-01
category: lua
---

有两种方式，一种是apache2.3以上会内置的lua module，大家可以下载apache httpd 2.3.8的代码，在modules目录下有lua这个目录。

另外一种是今天要介绍的，使用wsapi方式。

我们使用ubuntu服务器，先确保lua5.14以及apache2都安装成功。

然后

sudo apt-get install apache2-mpm-worker liblua5.1-0-dev luarocks

sudo apt-get install libfcgi-dev libapache2-mod-fcgid

sudo luarocks install wsapi-fcgi

然后修改.htaccess或者httpd.conf或者你的vhost配置，添加下面部分。

Options ExecCGI  
AddHandler fcgid-script .lua  
FCGIWrapper /usr/local/lib/luarocks/bin/wsapi.fcgi .lua

要注意的是wsapi.fcgi也许是在不同目录下，用find自己找吧。

在var/www下你的站点中新建一个luacgi目录，然后建立两个文件。

launcher.fcgi:

#!/usr/bin/env lua

require "wsapi.fastcgi"  
require "hello"  
wsapi.fastcgi.run(hello.run)

index.lua:

module(…, package.seeall)

function run(wsapi\_env)  
  local headers = { \["Content-type"\] = "text/html" }

  local function hello\_text()  
    coroutine.yield("<html><body>")  
    coroutine.yield("<p>Hello Wsapi!</p>")  
    coroutine.yield("<p>PATH\_INFO: " .. wsapi\_env.PATH\_INFO .. "</p>")  
    coroutine.yield("<p>SCRIPT\_NAME: " .. wsapi\_env.SCRIPT\_NAME .. "</p>")  
    coroutine.yield("</body></html>")  
  end

  return 200, headers, coroutine.wrap(hello\_text)  
end

然后用chown –R www-data:www-data luacgi修改目录owner。

这时候应该就能用xxx.com/luacgi/index.lua访问了。

如果你用nginx，也有现成的lua mod可以使用（作者是淘宝的程序员），这里就不多说了。
