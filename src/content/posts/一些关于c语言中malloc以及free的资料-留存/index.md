---
title: 一些关于c语言中malloc以及free的资料-留存
description: "Advanced C Programming Memory Management II (malloc, fr &hellip; \n继续阅读“一些关于c语言中malloc以及free的资料-留存”"
published: 2010-05-18
category: tech
---

Advanced C Programming Memory Management II (malloc, free, alloca, obstacks, garbage collection) [http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/lecture09.pdf](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/lecture09.pdf "http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/lecture09.pdf")

在这个网页上的pdf slide都非常不错，值得推荐[http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/literature.html](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/literature.html "http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/literature.html")

-   Lecture 1, 10/21/2008: [Slides \[pdf\]](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/lecture01.pdf)
-   Lecture 2, 10/28/2008: [Slides \[pdf\]](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/lecture02.pdf), Examples: [list.h](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/list.h) [list.c](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/list.c). **Caution:** this module will not compile properly, it is just useful to illustrate the documentation and coding style concepts from the lecture.
-   Lecture 3, 11/04/2008: [Slides \[pdf\]](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/lecture03.pdf), Examples: [const.c](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/const.c), [volatile.c](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/volatile.c), [restrict.c](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/restrict.c)
-   Lecture 4, 11/11/2008: [Slides \[pdf\]](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/lecture04.pdf)
-   Lecture 5, 11/18/2008: [Slides \[pdf\]](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/lecture05.pdf)
-   Lecture 6, 11/25/2008: [Slides \[pdf\]](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/lecture06.pdf)
-   Lecture 7, 12/02/2008: [Slides \[pdf\]](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/lecture07.pdf)
-   Lecture 8, 12/09/2008: [Slides \[pdf\]](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/lecture08.pdf)
-   Lecture 9, 12/16/2008: [Slides \[pdf\]](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/lecture09.pdf)
-   Lecture 10, 01/06/2009: [Slides \[pdf\]](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/lecture10.pdf)
-   Lecture 11, 01/13/2009: [Slides \[pdf\]](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/lecture11.pdf)
-   Lecture 12, 01/20/2009: [Slides \[pdf\]](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/lecture12.pdf)
-   Lecture 13, 01/27/2009: [Slides \[pdf\]](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/lecture13.pdf), here are some example graphs [\[ZIP\]](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/graphs.zip), for the graphs you need the following [tool](http://www.info.uni-karlsruhe.de/software/ycomp/ycomp-1.3.11.tar.bz2)
-   Lecture 14, 02/03/2009: [Slides \[pdf\]](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/lecture14.pdf), Guest Lecture by Markus Thiele
-   Lecture 15, 02/10/2009: [Slides \[pdf\]](http://www.mpi-inf.mpg.de/departments/rg1/teaching/advancedc-ws08/script/lecture15.pdf)

A Memory Allocator by [Doug Lea](http://g.oswego.edu)

[http://gee.cs.oswego.edu/dl/html/malloc.html](http://gee.cs.oswego.edu/dl/html/malloc.html "http://gee.cs.oswego.edu/dl/html/malloc.html")

Simple Memory Allocation Algorithms

[http://www.osdcom.info/content/view/31/39/](http://www.osdcom.info/content/view/31/39/ "http://www.osdcom.info/content/view/31/39/")

Simple Memory Allocation Algorithms

[http://goog-perftools.sourceforge.net/doc/tcmalloc.html](http://goog-perftools.sourceforge.net/doc/tcmalloc.html "http://goog-perftools.sourceforge.net/doc/tcmalloc.html")

[http://en.wikipedia.org/wiki/Dynamic\_memory\_allocation](http://en.wikipedia.org/wiki/Dynamic_memory_allocation "http://en.wikipedia.org/wiki/Dynamic_memory_allocation")

[http://en.wikipedia.org/wiki/Malloc](http://en.wikipedia.org/wiki/Malloc "http://en.wikipedia.org/wiki/Malloc")

[https://users.cs.jmu.edu/bernstdh/web/common/lectures/slides\_cpp\_dynamic-memory.php](https://users.cs.jmu.edu/bernstdh/web/common/lectures/slides_cpp_dynamic-memory.php "https://users.cs.jmu.edu/bernstdh/web/common/lectures/slides_cpp_dynamic-memory.php")

[http://www.flounder.com/inside\_storage\_allocation.htm](http://www.flounder.com/inside_storage_allocation.htm "http://www.flounder.com/inside_storage_allocation.htm")

[http://blog.codingnow.com/2010/05/memory\_proxy.html#more](http://blog.codingnow.com/2010/05/memory_proxy.html#more "http://blog.codingnow.com/2010/05/memory_proxy.html#more")

[http://www.ibm.com/developerworks/linux/library/l-memory/](http://www.ibm.com/developerworks/linux/library/l-memory/ "http://www.ibm.com/developerworks/linux/library/l-memory/")
