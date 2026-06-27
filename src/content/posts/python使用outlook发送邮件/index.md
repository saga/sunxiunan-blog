---
title: Python使用Outlook发送邮件
description: "In my testing, it could work with Outlook2013. # http:/ &hellip; \n继续阅读“Python使用Outlook发送邮件”"
published: 2012-08-03
category: tech
---

In my testing, it could work with Outlook2013.

# http://mail.python.org/pipermail//python-win32/2011-August/011754.html  
# http://www.java2s.com/Tutorial/Python/0460\_\_Windows/OutlookExample.htm  
# http://www.outlookcode.com/

import win32com.client

outlook = win32com.client.Dispatch(“Outlook.Application”)  
outlook2 = win32com.client.Dispatch(“Outlook.Application”).GetNamespace(“MAPI”)

# Count the number of messages in the inbox  
#inbox = outlook2.GetDefaultFolder(win32com.client.constants.olFolderInbox)  
#messages = inbox.Items  
#print “number of messages in inbox:”, messages.Count

mail = outlook.CreateItem(win32com.client.constants.olMailItem)

recip = mail.Recipients.Add(‘yyy@yyy.com’)  
recip = mail.Recipients.Add(‘xxx@xxx.com’)  
subj = mail.Subject = ‘Python-to-Outlook Demo’

body = \[“This is email from Python script”\]  
body.append(“\\r\\nTh-th-th-that’s all folks!”)

mail.Body = ‘\\r\\n’.join(body)  
mail.Send()
