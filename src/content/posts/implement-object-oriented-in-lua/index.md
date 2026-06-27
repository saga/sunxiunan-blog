---
title: Implement Object-Oriented in Lua
description: "Lua is not a Object-Oriented language. If we want to us &hellip; \n继续阅读“Implement Object-Oriented in Lua”"
published: 2009-11-02
category: lua
tags:
  - lua
  - Object-Oriented
  - OO
  - 面向对象
---

Lua is not a Object-Oriented language. If we want to use concepts like “class, constructor, desctructor, member function”, we must use table or metatable to simulate.

<Programming In Lua> introduces a method to implement OO in lua. [http://www.lua.org/pil/16.html](http://www.lua.org/pil/16.html "http://www.lua.org/pil/16.html")

    Account = { balance=0,
                withdraw = function (self, v)
                             self.balance = self.balance - v
                           end
              }
    
    function Account:deposit (v)
      self.balance = self.balance + v
    end
    
    Account.deposit(Account, 200.00)
    Account:withdraw(100.00)

Another sample is for privated data:

    function newAccount (initialBalance)
      local self = {balance = initialBalance}
    
      local withdraw = function (v)
                         self.balance = self.balance - v
                       end
    
      local deposit = function (v)
                        self.balance = self.balance + v
                      end
    
      local getBalance = function () return self.balance end
    
      return {
        withdraw = withdraw,
        deposit = deposit,
        getBalance = getBalance
      }
    end

CloudWu (famous chinese game maker) introduces another method for OO implementation [http://blog.codingnow.com/cloud/LuaOO](http://blog.codingnow.com/cloud/LuaOO "http://blog.codingnow.com/cloud/LuaOO").

###################

Lua has a important advantage, that is it could use module mechanism.

I will introduce some awesome modules for OO implementation in Lua.

First one is LOOP, its website is [http://loop.luaforge.net](http://loop.luaforge.net "http://loop.luaforge.net"), you could download release file in website and put to your lua installation directory.

A good example is like following.

> local oo = require “loop.simple”
> 
> Circle = oo.class()  
> function Circle:diameter()  
>   return self.radius \* 2  
> end  
> function Circle:circumference()  
>   return self:diameter() \* 3.14159  
> end  
> function Circle:area()  
>   return self.radius \* self.radius \* 3.14159  
> end
> 
> Sphere = oo.class({}, Circle)  
> function Sphere:area()  
>   return 4 \* self.radius \* self.radius \* 3.14159  
> end  
> function Sphere:volume()  
>   return 4 \* 3.14159 \* self.radius^3 / 3  
> end
> 
> function show(shape)  
>   print(“Shape Characteristics”)  
>   print(”  Side:         “, shape.radius)  
>   print(”  Diameter:     “, shape:diameter())  
>   print(”  Circumference:”, shape:circumference())  
>   print(”  Area:         “, shape:area())  
>   if oo.instanceof(shape, Sphere) then  
>     print(”  Volume:        “, shape:volume())  
>   end  
> end
> 
> c = Circle{ radius = 20.25 }  
> s = Sphere{ radius = 20.25 }
> 
> show(c)  
> show(s)

Another active project for OO in Lua is lua-coat [http://lua-coat.luaforge.net/](http://lua-coat.luaforge.net/ "http://lua-coat.luaforge.net/").

> require ‘Coat’
> 
> class ‘Point’
> 
> has.x = { is = ‘rw’, isa = ‘number’, default = 0 }  
> has.y = { is = ‘rw’, isa = ‘number’, default = 0 }
> 
> overload.\_\_tostring = function (self)  
>     return ‘(‘ .. self:x() .. ‘, ‘ .. self:y() .. ‘)’  
> end
> 
> method.draw = function (self)  
>     return “drawing ” .. self.\_CLASS .. tostring(self)  
> end
> 
> local p1 = Point{ x = 1, y = 2 }  
> print(p1:draw())

You could find some other projects in luaforge. For example, [http://luaforge.net/projects/los/](http://luaforge.net/projects/los/ "http://luaforge.net/projects/los/")

[http://luaforge.net/projects/sool/](http://luaforge.net/projects/sool/ "http://luaforge.net/projects/sool/")

[http://luaforge.net/projects/mnoo/](http://luaforge.net/projects/mnoo/ "http://luaforge.net/projects/mnoo/")

In lua-users, you could find a good item for Lua-OO.

[http://lua-users.org/wiki/ObjectOrientedProgramming](http://lua-users.org/wiki/ObjectOrientedProgramming "http://lua-users.org/wiki/ObjectOrientedProgramming")
