---
title: 使用Lua编写Utility的一些小贴士
description: "string trim功能 1: function string_trim(s) 2: if s == nil &hellip; \n继续阅读“使用Lua编写Utility的一些小贴士”"
published: 2010-03-08
category: lua
---

string trim功能

 1: function string\_trim(s)

 2: if s == nil then

 3: return

 4: end

 5:  

 6: return (string.gsub(s, "^%s\*(.-)%s\*$", "%1"))

 7: end

检查某个字符串是不是指向合法目录。

 1: function check\_directory(s)

 2: s = string\_trim(s)

 3: if not s or s == "" then

 4: return false

 5: end

 6:  

 7: if string.sub(s, -1, -1) == \[\[\\\]\]then

 8: s = string.sub(s, 1, -2)

 9: end

 10:  

 11: local attr = lfs.attributes (s)

 12: if (attr and attr.mode == "directory") then

 13: return true

 14: end

 15:  

 16: return false

 17: end

对于文件操作，最好先备份一下原来文件：

 1: local str = "copy \\"" .. Folder .. '\\\\log.db' .. "\\" \\"" .. Folder .. '\\\\log.db' .. "." .. os.time() .. "\\" /v /y"

 2:  

 3: os.execute(str)

对于sqlite的操作，注意使用了一个自增myid作为key。

 1: Db1 = sqlitelua.open(upFolder .. '\\\\mainlog.db')

 2:  

 3: Db1:exec('CREATE TABLE newfiles(myid INTEGER PRIMARY KEY AUTOINCREMENT, myname, myfolder)')

 4:  

 5: local stmt1 = Db1:prepare\[\[ INSERT INTO newfiles VALUES (:myid, :myname, :myfolded) \]\]

 6:  

 7: stmt1:bind\_names{myname = new\_name, myfolder = currentFolder}

 8:  

 9: stmt1:step()

 10: stmt1:reset()

 11: stmt1:finalize()
