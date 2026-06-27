---
title: Lua通过COM调用外部程序excel及调用windows api
description: 为了方便起见，最好安装lua for windows，里面已经包含了很多有用的第三方模块。
published: 2009-08-14
category: lua
---

为了方便起见，最好安装lua for windows，里面已经包含了很多有用的第三方模块。

require(‘luacom’) — luacom  
ie = luacom.CreateObject(“InternetExplorer.Application”)  
ie:Navigate2(“[http://sunxiunan.com”)](http://sunxiunan.com"\))

ie.Visible = true

**使用lua调用excel，然后往cell里面填一些数据。**

require(‘luacom’) — luacom  
— Excelの起動  
excel = luacom.CreateObject(“Excel.Application”)  
excel.Visible = true — 可視状態に  
— ワークブックを追加  
local book  = excel.Workbooks:Add()

local sheet = book.Worksheets(1)  
— 適当な値を100個書き込む  
for row=1,100 do  
  sheet.Cells(row, 1).Value2 = math.floor(math.random() \* 20)  
end

稍微复杂一些的代码

require “luacom”  
excel = luacom.CreateObject(“Excel.Application”)  
local book  = excel.Workbooks:Add()  
local sheet = book.Worksheets(1)  
excel.Visible = true

— 適当な値を書き込む  
for row=1,30 do  
  for col=1,30 do  
    sheet.Cells(row, col).Value2 = math.floor(math.random() \* 100)  
  end  
end  
— 値を調べて50以上のものを黄色でマークする  
local range = sheet:Range(“A1”)  
for row=1,30 do

  for col=1,30 do  
    local v = sheet.Cells(row, col).Value2  
    if v > 50 then  
          local cell = range:Offset(row-1, col-1)  
          cell:Select()  
          excel.Selection.Interior.Color = 65535  
        end  
  end

end

excel.DisplayAlerts = false — 終了確認を出さないようにする

excel:Quit()  
excel = nil

**如果想给excel加个图表该怎么做？**

require “luacom”  
excel = luacom.CreateObject(“Excel.Application”)  
local book  = excel.Workbooks:Add()  
local sheet = book.Worksheets(1)  
excel.Visible = true

for row=1,30 do  
  sheet.Cells(row, 1).Value2 = math.floor(math.random() \* 100)  
end

local chart = excel.Charts:Add()  
chart.ChartType = 4 — xlLine  
local range = sheet:Range(“A1:A30”)

chart:SetSourceData(range)

**如果想调用windows api，可以用下面的代码**

require “alien”

MessageBox = alien.User32.MessageBoxA  
MessageBox:types{ret = ‘long’, abi = ‘stdcall’, ‘long’, ‘string’,  
‘string’, ‘long’ }

MessageBox(0, “title for test”, “LUA call windows api”, 0)

**如何实现回调函数呢？下面的例子展示了回调。**

require ‘alien’  
–声明了两个函数EnumWindows和GetClassName  
EnumWindows = alien.user32.EnumWindows  
EnumWindows:types {“callback”, “pointer”, abi=”stdcall”}

GetClassName = alien.user32.GetClassNameA  
GetClassName:types {“long”, “pointer”, “int”, abi=”stdcall” }

local buf = alien.buffer(512)

— 会被EnumWindows反复调用，传入windows的handle  
local function enum\_func(hwnd, p)

  GetClassName(hwnd, buf, 511)  
  print (hwnd..”:”..tostring(buf))  
  return 1  
end  
local callback\_func = alien.callback(  
        enum\_func,  
        {“int”, “pointer”, abi=”stdcall”})

EnumWindows(callback\_func, nil)

其中函数原型是

BOOL EnumWindows(WNDENUMPROC *lpEnumFunc*, LPARAM *lParam*);

int GetClassName(HWND *hWnd*, LPTSTR *lpClassName*, int *nMaxCount*);

其中EnumWindows第一个参数的原型为，这个函数是客户调用时候传入，EnumWindows用它返回

BOOL CALLBACK EnumWindowsProc(HWND *hwnd*, LPARAM *lParam*);

其他复杂的使用方法可以参考alien的文档。

这些代码都来自[www.hakkaku.net/articles/20090615-459](http://www.hakkaku.net/articles/20090615-459)
