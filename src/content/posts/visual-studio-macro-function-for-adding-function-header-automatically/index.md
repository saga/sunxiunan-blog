---
title: Visual Studio macro function for adding function header automatically
description: "You could use the macro function to add function header &hellip; \n继续阅读“Visual Studio macro function for adding function header automatically”"
published: 2009-04-14
category: tech
updated: 2009-11-27
---

You could use the macro function to add function header that could use by doxygen.

It is tested in Visual studio 2008.

    Sub FunctionHeader()  
        Dim objEditPt As EditPoint  
        Dim currentLine As Integer  
        Dim endline As Integer  
        Dim findString As String  
        Dim findString2 As String  
        Dim firstPosition As Integer  
        Dim voidPosition As Integer  
        Dim BoolPosition As Integer  
        Dim PtrPosition As Integer  
        Dim lastPosition As Integer

        objEditPt = DTE.ActiveDocument.Selection.ActivePoint.CreateEditPoint  
        currentLine = objEditPt.Line  
        objEditPt.EndOfDocument()  
        endLine = objEditPt.Line

        If (endLine > currentLine + 50) Then  
            endLine = currentLine + 50  
        End If

        findString = objEditPt.GetLines(currentLine, endLine)

        ‘get params with “(” and “)”  
        findString2 = “”  
        Dim strList As New System.Collections.ArrayList

        Dim findVoid As Boolean = False  
        Dim findBool As Boolean = False  
        Dim findPtr As Boolean = False

        firstPosition = InStr(findString, “(“)  
        voidPosition = InStr(findString, “void”)  
        BoolPosition = InStr(findString, “BOOL “)  
        PtrPosition = InStr(findString, “\* “)  
        If (firstPosition >= 1) Then  
            If (voidPosition >= 1 And voidPosition < firstPosition) Then  
                findVoid = True  
            End If

            If (PtrPosition >= 1 And PtrPosition < firstPosition) Then  
                findPtr = True  
            End If

            If (BoolPosition >= 1 And BoolPosition < firstPosition) Then  
                findBool = True  
            End If

            lastPosition = InStr(firstPosition, findString, “)”)  
            If (lastPosition >= firstPosition) Then  
                findString2 = Mid(findString, firstPosition + 1, lastPosition – firstPosition – 1)  
                strList.AddRange(findString2.Split(“,”c))  
            End If  
        End If

        DTE.ActiveDocument.Selection.NewLine()  
        DTE.ActiveDocument.Selection.Text = “/\*\*”  
        DTE.ActiveDocument.Selection.NewLine()  
        DTE.ActiveDocument.Selection.Text = “\* ”  
        DTE.ActiveDocument.Selection.NewLine()  
        DTE.ActiveDocument.Selection.Text = “\* ”  
        DTE.ActiveDocument.Selection.NewLine()

        Dim listCount As Integer  
        Dim newString As String

        listCount = strList.Count  
        For Each stringElement In strList  
            stringElement = Replace(stringElement, vbCr, “”)  
            stringElement = Replace(stringElement, vbLf, “”)  
            stringElement = Replace(stringElement, vbTab, ” “)  
            stringElement = Trim(stringElement)  
            If stringElement.Length <= 0 Then  
                Continue For  
            End If

            Dim bAsIn = “\[in\] ”  
            If InStr(stringElement, “\*”) Then  
                bAsIn = “\[out\] ”  
            End If

            newString = “\* @param ” + bAsIn + stringElement + ” : ”  
            DTE.ActiveDocument.Selection.Text = newString  
            DTE.ActiveDocument.Selection.NewLine()  
        Next

        DTE.ActiveDocument.Selection.Text = “\* ”  
        DTE.ActiveDocument.Selection.NewLine()

        If findVoid Then  
            DTE.ActiveDocument.Selection.Text = “\* @return void.”  
            DTE.ActiveDocument.Selection.NewLine()  
        ElseIf findBool Then  
            DTE.ActiveDocument.Selection.Text = “\* @return True success;”  
            DTE.ActiveDocument.Selection.NewLine()  
            DTE.ActiveDocument.Selection.Text = ”          False, failed;”  
            DTE.ActiveDocument.Selection.NewLine()  
        ElseIf findPtr Then  
            DTE.ActiveDocument.Selection.Text = “\* @return valid pointer; or NULL.”  
            DTE.ActiveDocument.Selection.NewLine()  
        Else  
            DTE.ActiveDocument.Selection.Text = “\* @return S\_OK : the processing completed successfully;”  
            DTE.ActiveDocument.Selection.NewLine()  
            DTE.ActiveDocument.Selection.Text = “\*         E\_POINTER : a NULL pointer parameter was passed;”  
            DTE.ActiveDocument.Selection.NewLine()  
            DTE.ActiveDocument.Selection.Text = “\*         E\_FAIL : Some other failure occurred;”  
            DTE.ActiveDocument.Selection.NewLine()  
        End If

        DTE.ActiveDocument.Selection.Text = “\* ”  
        DTE.ActiveDocument.Selection.NewLine()  
        DTE.ActiveDocument.Selection.Text = “\*/”

    End Sub
