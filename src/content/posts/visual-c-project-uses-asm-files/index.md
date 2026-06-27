---
title: Visual C++ Project uses asm files
description: "As you know, C++ project could embed asm in function. B &hellip; \n继续阅读“Visual C++ Project uses asm files”"
published: 2010-08-18
category: tech
tags:
  - asm
---

As you know, C++ project could embed asm in function. But in some cases, we want to use asm file in our project. How to do?

1, open the project, and insert existing xxx.asm file into project. Or you could generate new file and name it as "xxx.asm".

[![image](http://sunxiunan.com/media/VisualCProjectaddsasmfile_9B70/image_thumb.png "image")](http://sunxiunan.com/media/VisualCProjectaddsasmfile_9B70/image.png)

2, in C/C++ source code, if you want to use the function, just add declaration before using it. Please note: in C++ code, extern "C" should be added (like above image).

3, edit and save the asm function.

[![image](http://sunxiunan.com/media/VisualCProjectaddsasmfile_9B70/image_thumb_3.png "image")](http://sunxiunan.com/media/VisualCProjectaddsasmfile_9B70/image_3.png)

4, In asm1.asm custom project setting, add following in command line:

ml /c /Cx /coff -Zi "-Fl$(InputDir)\\$(InputName).lst" "$(InputPath)"

Add following in outputs:

$(InputName).obj

[![image](http://sunxiunan.com/media/VisualCProjectaddsasmfile_9B70/image_thumb_4.png "image")](http://sunxiunan.com/media/VisualCProjectaddsasmfile_9B70/image_4.png)

Try to compile the asm1.asm, the asm1.lst and asm1.obj files should appear under project folder.

5, Build the solution. All done.

If there are some errors, you could try to copy the asm1.obj to "Debug" or "release" folder, if it could fix the issue, you could modify the path of command line and outputs setting of asm1.asm.
