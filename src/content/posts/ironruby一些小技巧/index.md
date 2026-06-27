---
title: IronRuby一些小技巧
description: "操作excel 1: require \"Microsoft.Office.Interop.Excel &hellip; \n继续阅读“IronRuby一些小技巧”"
published: 2010-03-19
category: tech
tags:
  - IronRuby
---

操作excel

 1: require "Microsoft.Office.Interop.Excel, Version=12.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" 

 2:  

 3: include Microsoft::Office::Interop::Excel

 4: excel = ApplicationClass.new

 5: excel.Visible = true

 6: workbook = excel.Workbooks.Add()

 7: worksheet = workbook.Worksheets.Add()

 8: worksheet.Name = "aaaaa" 

 9:  

 10: cell1 = worksheet.Cells(1,1)

 11: cell1.Value = 42

如何获得assembly的strong name?

 1: load\_assembly 'Microsoft.Office.Interop.Excel'

 2:  

 3: System::AppDomain.current\_domain.get\_assemblies.each{|x| puts x};

RPC 解决方案（[http://www.ruby-forum.com/topic/206314](http://www.ruby-forum.com/topic/206314 "http://www.ruby-forum.com/topic/206314")）

Very CLR centric:  
  
You can create a proxy to your webservice using visual studio, compile to a dll and use the proxy from your ruby code.

CLR centric:  
  
You can use System.Net.HttpWebRequest to make the request and System.Xml.XmlDocument to parse the response

Very Ruby centric:  
  
Use Net::HTTP to perform the request and REXML to parse the response
