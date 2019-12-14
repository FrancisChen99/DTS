<%@page language="java"%>
<%@page contentType="text/html;charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<%
    /** request **/
     /* String dataId = (String)request.getParameter("dataId"); 
	 String lat = (String)request.getParameter("lat"); 
	 String lon = (String)request.getParameter("long"); 
	 System.out.println(dataId);
	 System.out.println(lat);
	 System.out.println(lon); */
%>

<html>
<head>
<style>
#dataTable {
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    border:2px solid #7BBEAB;
}

#dataTable td, #dataTable th {
    border-left:1px solid #E0F2EC;
    border-bottom:1px solid #ECDDDA;
    padding: 8px;
    text-align: center;
}

#dataTable tr:nth-child(odd){background-color: #ffeedf;}

#dataTable tr:hover {background-color: #ddd;}

#dataTable th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: center;
    background-color: #4AB28D;
    color: white;
}
</style>
</head>
<body>

<table id="dataTable">
  <tr>
    <th width="1%">序號</th>
    <!-- th width="10%">no</th-->
    <th width="20%">受理時間</th>
    <th width="10%">案類</th>
    <th width="10%">案別</th>
    <th width="38%">發生地點</th>
    <th width="10%">派遣分隊</th>
    <th width="10%">執行狀況</th>
  </tr>
  
  <c:forEach items='#{data}' var='data' varStatus="count">
    <tr>
        <td>${count.index+1}</td>
        <!-- td>${data.csNo}</td-->
        <td>${data.inTime}</td>
        <td>${data.kind}</td>
        <td>${data.code}</td>
        <td>${data.csPlace}</td>
        <td>${data.deptName}</td>
        <td>${data.status}</td>
    </tr>
</c:forEach>
  <!-- 
  <tr>
    <td>1</td>
    <td>2017/11/10 18:08:14</td>
    <td>緊急救護</td>
    <td>急病</td>
    <td>高雄市前鎮區凱旋四路1027巷</td>
    <td>前鎮分隊</td>
    <td>已出動</td>
  </tr>
  <tr>
    <td>2</td>
    <td>2017/11/09 08:08:14</td>
    <td>緊急救護</td>
    <td>創傷</td>
    <td>高雄市前鎮區凱旋四路526巷</td>
    <td>杉林分隊</td>
    <td>已出動</td>
  </tr>
  <tr>
    <td>3</td>
    <td>2017/10/02 19:38:24</td>
    <td>緊急救護</td>
    <td>創傷</td>
    <td>高雄市林園區大樹路和大樹路北巷</td>
    <td>杉林分隊</td>
    <td>已出動</td>
  </tr>
  <tr>
    <td>4</td>
    <td>2017/09/13 18:38:34</td>
    <td>火災</td>
    <td>急病</td>
    <td>高雄市鳳山區</td>
    <td>鳳山分隊</td>
    <td>已到達</td>
  </tr>
  <tr>
    <td>5</td>
    <td>2017/10/10 13:48:54</td>
    <td>火災</td>
    <td>急病</td>
    <td>高雄市鳳山區</td>
    <td>鳳山分隊</td>
    <td>已到達</td>
  </tr>
  <tr>
    <td>6</td>
    <td>2017/05/10 05:05:15</td>
    <td>火災</td>
    <td>急病</td>
    <td>高雄市林園區</td>
    <td>鳳山分隊</td>
    <td>已到達</td>
  </tr>
  -->
</table>

</body>
</html>