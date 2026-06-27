---
title: "C#高精度定时器，可用于profiling"
description: "如果想准确profiling函数或者代码性能，一个高精度定时器是必备的。 参考这几个资料吧， http://e &hellip; \n继续阅读“C#高精度定时器，可用于profiling”"
published: 2011-04-15
category: tech
---

如果想准确profiling函数或者代码性能，一个高精度定时器是必备的。  
参考这几个资料吧，  
http://en.wikipedia.org/wiki/Time\_Stamp\_Counter

注意rdtsc在多核下的问题  
http://msdn.microsoft.com/en-us/library/ee417693%28v=vs.85%29.aspx

最好最方便的还是这个函数QueryPerformanceCounter

jeffz\_cn在他的blog中提到另外一种方法，但是不支持windowsXP，而且好像精度上也没有我下面写的这个高。

要注意的是软件定时器都不是非常准的，只是比较准罢了。另外定时器不要加的太多，需要的几个位置加一下就可。

实际上，我以前在C++用到的，也是一样的win32函数：

`   class HighResolutionTimer   {   private bool isPerfCounterSupported = false;   private Int64 frequency = 0;   // Windows CE native library with QueryPerformanceCounter().   [DllImport("kernel32.dll", SetLastError = true)]   private static extern int QueryPerformanceCounter(ref Int64 count);   [DllImport("kernel32.dll", SetLastError = true)]   private static extern int QueryPerformanceFrequency(ref Int64 frequency);   public HighResolutionTimer()   {   int returnVal = QueryPerformanceFrequency(ref frequency);   if (returnVal != 0 && frequency != 1000)   {   // The performance counter is supported.   isPerfCounterSupported = true;   }   else   {   // The performance counter is not supported. Use   // Environment.TickCount instead.   frequency = 1000;   }   Start();   }`

`   public Int64 Frequency   {   get   {   return frequency;   }   }  public Int64 Value   {   get   {   Int64 tickCount = 0;  if (isPerfCounterSupported)   {   // Get the value here if the counter is supported.   QueryPerformanceCounter(ref tickCount);   return tickCount;   }   else   {   // Otherwise, use Environment.TickCount.   return (Int64)Environment.TickCount;   }   }   }  private Int64 _startValue;   public void Start()   {   _startValue = Value;   }   `

`public Int64 Stop()   {   Int64 stopValue = Value;   return stopValue - _startValue;   }   }   `
