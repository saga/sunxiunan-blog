---
title: Lua简介
description: "lua是一个很有意思的编程语言，我是用它写base64编码辅助工具时候发现的。 lua是巴西里约热内卢大学的一 &hellip; \n继续阅读“Lua简介”"
published: 2009-08-11
category: lua
updated: 2009-11-26
---

lua是一个很有意思的编程语言，我是用它写base64编码辅助工具时候发现的。

lua是巴西里约热内卢大学的一个研究项目，最新版本5.1，真正变成一个人人皆知的编程语言还是因为魔兽世界这个网络游戏。因为暴雪选择了lua作为插件语言，一时间变得众人皆知。现在国内也有不少网络游戏使用lua作为脚本语言。

lua的特点一个是小，整个vm，编译器以及第三方库加起来可能也不过就几兆，vm可以单独运行，大概也就需要100k左右内存，非常适合嵌入式设备或者掌上设备使用，比如psp就有一个lua player，而google的gphone最新版操作系统也内置了lua的脚本支持。现在几乎所有的流行操作系统都可以运行lua，这要归功于lua使用了标准的ansi c实现。

lua可以用来编写小的utility，比如十几二十行就能完成的，我选择lua作为学习对象的原因一个是它代码量小而且极为精致，另外实用性也很强，通过luainterface，luacom，luasocket这些类库，可以完成大多数常见任务。

lua的网站是[www.lua.org](http://www.lua.org)，可以下载最新的版本lua-5.1.4.tar.gz，源代码不过才200k，所以我选择用它来学习如何构建一个工业级的c程序。另外比较有用的lua网站一个是[www.lua-users.org](http://www.lua-users.org)，另外还有一个是lua开源项目集合luaforge.net，可以下载到大量有用的projects。

如果是windows用户，可以到luaforwindows.luaforge.net下载Lua for windows，这是一个大概15M左右的安装文件，包含了大量实用的lua第三方库，另外还有一个可以调试运行的编辑器。

我第一个使用lua的例子是读进一个目录文件，然后处理。

这个文件是这样生成的，在命令行下输入 dir \*.txt > aaa.txt

这样生成了一个aaa.txt，问题是我只想要文件名不需要大小等其他信息，文件名长度也是固定的20个字符（包括扩展名），所以采用下面的脚本处理这个aaa.txt。

filename = \[\[C:\\aaa.txt\]\]  
filename\_b = \[\[C:\\bbb.txt\]\]  
local f = assert(io.open(filename))  
local f\_w = assert(io.open(filename\_b, ‘w’))

while true do  
local buffer = f:read(“\*l”)

if not buffer then  
break  
end

print(buffer)

if string.len(buffer) > 20 then  
newBuffer = string.sub (buffer, string.len(buffer) – 20 +1)  
print(newBuffer)  
f\_w:write(newBuffer)  
f\_w:write(‘\\n’)  
end

end

f:close()  
f\_w:close()

其中的io以及string都是lua内置的模块。简单快速，而且功能不亚于python、ruby这样的脚本语言。

lua尽管没有面向对象的类、继承、多态等概念，它的table、function、metatable、userdata一样可以完成非常炫目的功能。

另外可以通过c或者c++语言编写第三方模块，让lua调用完成特定任务。

写一个c++实现的lua扩展并不难，但是需要了解lua堆栈处理的知识，而且还有可能需要处理GC方面的问题，这都是比较高级的话题。但是基本步骤大体如下：

1，include lua的头文件，因为lua代码是c语言实现，所以需要使用extern “C”

extern “C”  
{  
#include <lua.h>  
#include <lauxlib.h>  
}

2，声明一个结构，类似

static const struct luaL\_reg mfcluatest \[\] =  
{  
{“test”, l\_test},  
{“average”, l\_average},  
{NULL, NULL}  /\* sentinel \*/  
};

其中test以及average都是lua可以调用的名字，l\_test和l\_average都是静态函数。

static int average(lua\_State \*L){…}

其中我还没有搞懂的地方是函数具体该如何编写。

3，声明一个函数如下luaopen\_xxx，注意需要声明为dllexport和使用extern “C”，另外注意mfcluadll这个名字，另外要注意的是我们前面定义的mfcluatest结构。

extern “C” \_\_declspec(dllexport) int luaopen\_mfcluadll(lua\_State \*l)  
{  
luaL\_openlib(l, “mfcluadll”, mfcluatest, 0);  
return 1;  
}

4，项目设置需要加入lua的include和lib，以及lua51.lib，然后编译就ok了。

5，最后把编译好的文件放到lua目录下的clibs里面，使用这样的代码测试一下：

require(“mfcluadll”)  
avg, sum = mfcluadll.average(10, 20, 30, 40, 50)  
print(“The average is “, avg)  
print(“The sum is “, sum)

大功告成！

[mfcluadll.rar](http://sunxiunan.com/wp-content/uploads/2009/08/mfcluadll.rar)

这是我编译的lsqlite3, http://luaforge.net/projects/luasqlite/，其中已经内嵌了sqlite3的代码，只要用vc2008编译就可以直接运行使用了。需要注意的是模块名字是sqlitelua。

require(“sqlitelua”)  
local db = sqlitelua.open\_memory()

db:exec\[\[  
CREATE TABLE testlua (id INTEGER PRIMARY KEY, content);  
INSERT INTO testlua VALUES (NULL, ‘Hello World !’);  
INSERT INTO testlua VALUES (NULL, ‘Hello Lua !’);  
INSERT INTO testlua VALUES (NULL, ‘Hello Sqlite3 !’)  
\]\]

for row in db:nrows(“SELECT \* FROM testlua”) do  
print(row.id, row.content)  
end

[sqlitelua.rar](http://sunxiunan.com/wp-content/uploads/2009/08/sqlitelua.rar)
