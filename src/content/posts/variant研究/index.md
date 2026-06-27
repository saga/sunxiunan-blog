---
title: VARIANT研究
description: "Variant如何使用及相关步骤 VARIANT是一个结构而不是类，这是比较容易混淆的一个地方。所以，当我们要 &hellip; \n继续阅读“VARIANT研究”"
published: 2009-02-18
category: tech
updated: 2009-02-19
---

Variant如何使用及相关步骤

VARIANT是一个结构而不是类，这是比较容易混淆的一个地方。所以，当我们要使用或者返回VARIANT类型，必须做以下步骤，不能假设客户端使用的是CComVariant类型。

1.  Before use, all VARIANTARGs must be initialized by [VariantInit](http://msdn.microsoft.com/en-us/library/ms221402.aspx).
2.  For the types VT\_UI1, VT\_I2, VT\_I4, VT\_R4, VT\_R8, VT\_BOOL, VT\_ERROR, VT\_CY, VT\_DECIMAL, and VT\_DATE, data is stored within the VARIANT structure. Any pointers to the data become invalid when the type of the variant is changed.
3.  For VT\_BYREF | any type, the memory pointed to by the variant is owned and freed by the caller of the function.
4.  For VT\_BSTR, there is only one owner for the string. All strings in variants must be allocated with the [SysAllocString](http://msdn.microsoft.com/en-us/library/ms221458.aspx) function. When releasing or changing the type of a variant with the VT\_BSTR type, [SysFreeString](http://msdn.microsoft.com/en-us/library/ms221481.aspx) is called on the contained string.
5.  For VT\_ARRAY | any type, the rule is analogous to the rule for VT\_BSTR. All arrays in variants must be allocated with [SafeArrayCreate](http://msdn.microsoft.com/en-us/library/ms221234.aspx). When releasing or changing the type of a variant with the VT\_ARRAY flag set, [SafeArrayDestroy](http://msdn.microsoft.com/en-us/library/ms221702.aspx) is called.
6.  For VT\_DISPATCH and VT\_UNKNOWN, the objects that are pointed to have reference counts that are incremented when they are placed in a variant. When releasing or changing the type of the variant, **Release** is called on the object that is pointed to.

对于CComVariant类型，安装完VC2008以后可以看到它的源代码（atlcomcli.h)，非常有帮助。比如

CComVariant() throw()  
    {  
        ::VariantInit(this); // 调用了初始化函数，就是上面的1)  
    }

~CComVariant() throw()  
{  
    return ::VariantClear(this);

}

CComVariant& operator=(\_In\_ LPCSTR lpszSrc)  
    {  
        USES\_CONVERSION\_EX;  
        Clear();  
        vt = VT\_BSTR;

> // 使用了SysAllocString在系统堆上申请了一块内存。
> 
> bstrVal = ::SysAllocString(A2COLE\_EX(lpszSrc, \_ATL\_SAFE\_ALLOCA\_DEF\_THRESHOLD));

return \*this;  
    }

HRESULT Detach(\_Out\_ VARIANT\* pDest)  
    {  
        ATLASSERT(pDest != NULL);  
        if(pDest == NULL)  
            return E\_POINTER;  
        // Clear out the variant  
        HRESULT hr = ::VariantClear(pDest);  
        if (!FAILED(hr))  
        {  
            // Copy the contents and remove control from CComVariant  
            Checked::memcpy\_s(pDest, sizeof(VARIANT), this, sizeof(VARIANT));  
            vt = VT\_EMPTY;  
            hr = S\_OK;  
        }  
        return hr;  
    }

我在写代码的时候有个问题，就是对于CComVariant，VT\_BSTR类型Detach以后会不会调用SysFreeString，把申请的内存释放掉，导致Detach出来的Variant指针出错呢？因为做了memcpy\_s，拷贝VARIANT结构，因为结构里面对于VT\_BSTR类型，存放的是我们申请出来的指针，对于VT\_BSTR我们没有另外申请内存。

看代码就明白了结果，当成功以后，把自己类型设置为VT\_EMPTY，这会使得析构的时候，不去调用SysFreeString，所以对于Detach的目标指针，内存不会有问题。但是根据代码，当我们Detach调用以后，就不能继续使用这个CComVariant变量，否则会有问题的。

附上一个函数，用于得到SafeArray。

HRESULT GetSafeArray(SAFEARRAY\*\* pArray, vector<CString>\* ptr)  
{  
    if (!pArray || !ptr)  
        return E\_POINTER;

unsigned int size = ptr->size();  
    CComSafeArrayBound saBound;  
    saBound.SetCount(size);  
    saBound.SetLowerBound(0);  
    CComSafeArray<BSTR>\* psaBuffer = NULL;  
    try  
    {  
        const UINT uDimensions = 1;  
        psaBuffer = new CComSafeArray<BSTR>(&saBound, uDimensions);  
    }  
    catch (…)  
    {  
        return E\_OUTOFMEMORY;  
    }

for (unsigned int i= 0; i< size ; i++)  
    {  
        CComBSTR bstr = (\*ptr)\[i\];  
        psaBuffer->SetAt(i, bstr);  
    }

\*pArray = psaBuffer->Detach();  
    delete psaBuffer;  
    psaBuffer = NULL;  
    return S\_OK;  
};

template<typename T>  
HRESULT GetSafeArray(SAFEARRAY\*\* pArray, vector<T>\* ptr)  
{  
    if (!pArray || !ptr)  
        return E\_POINTER;

unsigned int size = ptr->size();  
    CComSafeArrayBound saBound;  
    saBound.SetCount(size);  
    saBound.SetLowerBound(0);  
    CComSafeArray<T>\* psaBuffer = NULL;  
    try  
    {  
        const UINT uDimensions = 1;  
        psaBuffer = new CComSafeArray<T>(&saBound, uDimensions);  
    }  
    catch (…)  
    {  
        return E\_OUTOFMEMORY;  
    }

for (unsigned int i= 0; i< size ; i++)  
    {  
        psaBuffer->SetAt(i, (\*ptr)\[i\]);  
    }

\*pArray = psaBuffer->Detach();  
    delete psaBuffer;  
    psaBuffer = NULL;  
    return S\_OK;  
};

Reference document:

[http://msdn.microsoft.com/en-us/library/ms221673.aspx](http://msdn.microsoft.com/en-us/library/ms221673.aspx "http://msdn.microsoft.com/en-us/library/ms221673.aspx")

对于COM中的BSTR，windows会为我们做一个致命的缓存，但是用户不知道，包括程序员不少也不知道，导致某些情况下出问题。

[http://msdn.microsoft.com/en-us/library/ms221105.aspx](http://msdn.microsoft.com/en-us/library/ms221105.aspx "http://msdn.microsoft.com/en-us/library/ms221105.aspx")

简单的说就是运行程序前，环境变量做如下设置OANOCACHE=1。
