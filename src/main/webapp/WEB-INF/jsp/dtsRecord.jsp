<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
 
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>服務程式執行記錄表</title>
    </head>
    <body>
        <div align="center">
            <font color="red">${msg}</font>
            <table border="1">
                <th>序號</th>
                <th>服務程式英文名稱</th>
                <th>服務程式中文名稱</th>
                <th>實際讀取筆數</th>
                <th>實際存入筆數</th>
                <th>更新時間</th>
                 
                <c:forEach var="dtsrecord" items="${listRecord}" varStatus="status">
                <tr>
                    <td>${status.index + 1}</td>
                    <td>${dtsrecord.KIND}</td>
                    <td>${dtsrecord.CITY}</td>
                    <td align="right">${dtsrecord.RCOUNT}</td>
                    <td align="right">${dtsrecord.UCOUNT}</td>
                    <td>${dtsrecord.UPDATETIME}</td>                             
                </tr>
                </c:forEach>             
            </table>
        </div>
    </body>
</html>
