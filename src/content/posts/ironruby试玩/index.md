---
title: IronRuby试玩
description: "IronRuby下载最新版本解压，然后把目录加入系统Path。 IronRuby使用Sinatra 1）ige &hellip; \n继续阅读“IronRuby试玩”"
published: 2010-03-18
category: tech
tags:
  - IronRuby
  - IronRubyRails
  - Sinatra
---

IronRuby下载最新版本解压，然后把目录加入系统Path。

IronRuby使用Sinatra

1）igem install sinatra –no-rdoc –no-ri

2) 应该提示rack和sinatra都安装完毕

3）写代码如下：

 1: require 'rubygems'

 2: require 'sinatra' 

 3: get '/' do

 4: "My machine name is #{System::Environment::machine\_name}"

 5: end

保存为mysinatra1.rb

4) 运行 ir mysinatra1.rb，应该提示类似pid=xxxx port=4567，打开浏览器，输入[http://localhost:4567/](http://localhost:4567/) 就可以看到期望的信息了。

注意，在我测试过程中，最新版本下，不需要对sinatra做任何patch，跟ironruby官网提到的不一样。

IronRuby使用Rails，参考[http://www.ironruby.net/Documentation/Real\_Ruby\_Applications/Rails](http://www.ironruby.net/Documentation/Real_Ruby_Applications/Rails "http://www.ironruby.net/Documentation/Real_Ruby_Applications/Rails")

1）安装 "igem install rake rails activerecord-adonet-sqlserver –no-rdoc –no-ri"

2）如果自己测试，可使用sqlite3-ironruby，"igem install sqlite3-ironruby –no-ri –no-rdoc”

3）建立一个IronRuby rail程序， "ir -S rails IronFirst"

4）修改config/environment.rb，可以看到有类似的代码，改成 config.gem "sqlite3-ironruby", :lib => "sqlite3" ，使用sqlserver有另外的修改方式，大家自己看网页吧。

5）ir script\\generate scaffold post title:string body:text published:boolean

    ir -S rake db:migrate

6）ir script\\server

这时候可以看到[http://localhost:3000](http://localhost:3000) 是rails的默认界面，进入[http://localhost:3000/posts](http://localhost:3000/posts) 可以进行添删改操作。不过我测试，默认下不支持中文，应该是要修改一些参数才行。

all done.
