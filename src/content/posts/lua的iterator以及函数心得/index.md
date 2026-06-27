---
title: Lua的Iterator以及函数心得
description: "local tbl = {\"one\", \"two\", \"th &hellip; \n继续阅读“Lua的Iterator以及函数心得”"
published: 2009-08-13
category: lua
updated: 2009-08-14
---

local tbl = {"one", "two", "three", ‘five’}  
local count = #tbl  
local inc = 0

function Iter(tableinput)  
return function()  
if inc > count then  
return  
end  
inc = inc + 1  
return tableinput\[inc\], inc  
end  
end

for elem, index in Iter(tbl) do  
print(elem)  
if index > 2 then  
inc = 0  
end  
end

如果运行一下的话，不出意外一定会死循环。如果把函数Iter改一下就是我们常见的generic for了。

function Iter(tableinput)  
local count2 = #tbl  
local inc2 = 0

return function()  
if inc2 > count2 then  
return  
end  
inc2 = inc2 + 1  
return tableinput\[inc2\], inc2  
end  
end

跟踪一下运行也可以发现，count2以及inc2这两行在Iter被for调用的时候，只会第一次运行而且只运行一次。接下来的调用中只会从return function这里开始。如果返回nil，那么for就停止循环。

我比较好奇的是，对于Iter在for循环的时候，很显然是保持了一个内部的堆栈不变，也就是说inc2和count2类似于c语言的static内部变量。但是学的还是一知半解，不知道如何dump出此时的堆栈状态。

关于函数对于局部变量，好像是会在栈上做一个缓存，看下面代码

stringb = "bbbbbbbbbbbbbbb"  
do  
local internalA = "print for first time"  
function printStrA()  
print(internalA)  
end  
function printStrB()  
print(stringb)  
end  
end

do  
local internalA = "!!!!!!!!!!!!!!!!!!!!"  
stringb = "cccccccccccccccc"  
printStrA()  
printStrB()  
end

internalA = "!!!!2222222222222"  
printStrA()  
stringb = "ddddddddddddddddddd"  
printStrB()

当我们运行这段代码，可以发现

print for first time  
cccccccccccccccc  
print for first time  
ddddddddddddddddddd

也就是对于printStrA，每次调用的结果都是一样的，而printStrB的结果会根据全局变量stringb的不同而不同。这一点值得以后的研究。

关于闭包（closures），PIL上有一个很有意思的例子，我做了一些扩展。

local x = function ()  
    local i = 0  
    print "aaa"  
    local function x2()  
        i = i + 1  
        print "bbb"  
        return i  
    end  
    return x2 — 这个地方不能是return x2()，否则返回的就是值而不是函数  
end

x()  
print "======="  
x()  
print "======="

local c = x()  
print "======="  
print(c())  
print "======="  
print(c())  
print "======="  
print(c())  
print "======="

local c = x()  
print "======="  
print(c())

结果会是什么呢？

首先，很有意思的一点是，对于返回正确函数尾调用，一种情况下，return function()后面的代码不会运行，就是说当x()时，以及当local c=x()的时候。

我们如果想达到计数器的效果，一定要用local c=x()，然后反复调用c()，而不是调用x()。原因就是c实际上指向了x返回的匿名函数，这样每次运行c，实际上运行的就是那个匿名函数。另外一个有趣的结论是，对于返回正确尾调用的函数，尾调用实际上还没有运行。

运行的结果就是下面这样，你猜对了么？

aaa  
\=======  
aaa  
\=======  
aaa  
\=======  
bbb  
1  
\=======  
bbb  
2  
\=======  
bbb  
3  
\=======  
aaa  
\=======  
bbb  
1

关于尾调用, return g(x)是尾调用，而return (g(x))就不是，原因是return (Fun()) — This expression is a single function call surrounded in parentheses, which is different than the required single function call (the parentheses adjust Fun to one return value).
