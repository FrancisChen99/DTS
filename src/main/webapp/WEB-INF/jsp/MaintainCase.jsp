<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page language="java" import="java.util.*" %>
<%@ page language="java" import="dts.model.entity.MaintainCase" %>
<%@ page language="java" import="dts.repository.MaintainCaseRepository" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>報修單</title>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/_mdsWebPage/css/ddmenu.css" type="text/css"/>
    <script type="text/javascript" src="<%=request.getContextPath()%>/_mdsWebPage/js/ddmenu.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath()%>/_mdsWebPage/js/jquery/datepicker/my97DatePicker/WdatePicker.js" language="javascript"></script>
    <script type="text/javascript">
      <%
         java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm");
         java.util.Date currentTime = new java.util.Date(); //得到系统時間
         String str_date = formatter.format(currentTime);   //日期時間格式化
      %>

      if($.trim($("#begintime_id").val())!="") {
         if($.trim($("#endtime_id").val())=="") {
           alert("结束時間不可為空值！");
           return false;
         }
      }

      if($.trim($("#endtime_id").val())!="") {
        if($.trim($("#begintime_id").val())=="") {
          alert("開始時間不可為空值！");
          return false;
        }
      }
      </script>
      <script>
      function printCase(){
         alert("選擇 \"列印\" 或 \"取消\" 後, 10秒回到查詢清單");
         var url = document.location.href;
         var filename = url.substring(url.lastIndexOf('=')+1);
         document.title = filename;
         setTimeout("window.print();",500);
         window.setTimeout("history.back();", 10000);
      }

      function displayMsg(msg){
         if(msg) {alert(msg);}
      }

      function formValidate(){
         var unit = document.form1.unit.value.trim();
         var unit1 = document.form1.unit1.value.trim();
         var name = document.form1.name.value.trim();
         var rbtime = document.form1.rbtime.value.trim();
         var problem = document.form1.problem.value.trim();
         var status = document.form1.status.value.trim();
         var msg="以下欄位, 不可為空值或空格\n";
         var tmp="";
         
         if (unit == "" && unit1 == "") { tmp=tmp+"\n報修單位"; }
         if (name == "") {tmp=tmp+"\n聯絡人";}
         if (rbtime == "" ) {tmp=tmp+"\n報修/回覆開始時問";}
         if (problem == "") {tmp=tmp+"\n問題描述";}
         if (status == "") {tmp=tmp+"\n處理狀態";}
         
         if (tmp != ""){
            alert(msg+tmp);
            return false;
         } else {
            return true;
         }
      }
   </script>
</head>
  <c:if test="${view != 'print'}">
      <nav id="ddmenu">
        <div class="menu-icon"></div>
        <ul>
          <li class="no-sub"><a class="top-heading" href="<%= request.getContextPath() %>/MaintainCase/new">新增報修單</a></li>
          <li>
            <a class="top-heading" href="#">查詢報修單記錄</a>
            <i class="caret"></i>
            <div class="dropdown">
              <div class="dd-inner">
                <ul class="column">
                  <li><a href="<%= request.getContextPath() %>/MaintainCase/query">全部</a></li>
                  <li><a href="<%= request.getContextPath() %>/MaintainCase/conditions">依日期或編號</a></li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
    </nav>
  </c:if>
  
  <c:if test="${view == 'new'}">
  <body onload="displayMsg('${msg}')">
    <div align="center">
    <style>
      table {border-collapse: collapse;}
      table, th, td {border: 1px solid black; height:40;}
      input, select {font-size: 1em; height: 34px; width: 180px;}
    </style>
    <h2>新增報修單</h2>
    <form name="form1" onsubmit="return formValidate()" action="<%= request.getContextPath() %>/MaintainCase/new" modelAttribute="mCase" method="post">
      <table style="width:50%">
        <tr>
          <td style="width:30%">報修單位<font color="#FF0000">*</font></td>
          <td>分隊&nbsp;
            <select id="unit" name="unit" style="width: 172px;">
              <option value=""></option>
              <c:forEach items="${deptlist}" var="deptlist">
                <option value="${deptlist}">${deptlist}</option>
              </c:forEach>
            </select>
            &nbsp;或&nbsp;其它&nbsp;&nbsp;<input id="unit1" name="unit1" style="width: 168px"/>
          </td>
        </tr>
        <tr>
          <td style="width:30%">聯絡人<font color="#FF0000">*</font></td>
          <td><input name="name" /></td>
        </tr>
        <tr>
          <td style="width:30%">報修/回覆<br/>開始時間<font color="#FF0000">*</font>~結束時間</td>
          <td>
            <input id="begintime_id" name="rbtime" type="text" style="height: 34px;" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'})" readonly="readonly" value="<%=str_date%>" class="Wdate" Style="{width:86px}"/> ~
            <input id="endtime_id"   name="retime" type="text" style="height: 34px;" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',minDate:'#F{$dp.$D(\'begintime_id\')}'})" readonly="readonly" value="<%=str_date%>" class="Wdate" Style="{width:86px}"/>
          </td>
        </tr>
        <tr>
          <td style="width:30%">問題描述<font color="#FF0000">*</font></td>
          <td><textarea style="height: 100%; width: 100%; font-size: 16px;" name="problem"></textarea></td>
        </tr>
        <tr>
          <td style="width:30%">工程師</td>
          <td><input name="engineer" /></td>
        </tr>
        <tr>
          <td style="width:30%">出發時間~到達時間</td>
          <td>
            <input id="depaturetime_id" name="depaturetime" style="height: 34px;" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',minDate:'#F{$dp.$D(\'endtime_id\')}'})" readonly="readonly" value="<%=str_date%>" class="Wdate Style="{width:86px}"/> ~
            <input id="arrivaltime_id"  name="arrivaltime"  style="height: 34px;" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',minDate:'#F{$dp.$D(\'depaturetime_id\')}'})" readonly="readonly" value="<%=str_date%>" class="Wdate Style="{width:86px}"/>
          </td>
        </tr>
        <tr>
          <td style="width:30%">完成時間</td>
          <td>
            <input id="finishtime_id" name="finishtime" style="height: 34px;" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',minDate:'#F{$dp.$D(\'arrivaltime_id\')}'})" readonly="readonly" value="<%=str_date%>" class="Wdate" Style="{width:86px}"/>
          </td>
        </tr>
        <tr>
          <td style="width:30%">處理狀態<font color="#FF0000">*</font></td>
          <td>
            <select id="status" name="status">
              <option value=""></option>
              <option value="完成">完成</option>
              <option value="未完成">未完成</option>
            </select>
          </td>
        </tr>
        <tr>
          <td style="width:30%">處理過程</td>
          <td><textarea style="height: 100%; width: 100%; font-size: 16px;" name="process"></textarea></td>
        </tr>
      </table>
      <br>
      <input type="submit" name="submit" value="確認" style="height: 40px; width: 80px;"/>
    </form>
  </c:if>
  
  <c:if test="${view == 'edit'}">
  <body>
    <div align="center">
    <h2>編輯報修單</h2>
    <style>
      table {border-collapse: collapse;}
      table, td, th {border: 1px solid black;height:40;}
      input, select {font-size: 1em;height: 34px; width: 180px;}
    </style>
    <c:forEach var="record" items="${listRecord}">
    <form name="form1" onsubmit="return formValidate()" action="<%= request.getContextPath() %>/MaintainCase/new?act=update" modelAttribute="mCase" method="post">
      <table style="width:50%">
        <tr>
          <td style="width:30%">報修編號</td>
          <td>&nbsp;<input name="serial" style="border:none;" value="${record.SERIAL}" readonly="readonly"/>
                    <input name="edate" type="hidden" value="${record.EDATE}"/> 
          </td>
        </tr>
        <tr>
          <td style="width:30%">報修單位<font color="#FF0000">*</font></td>
          <td>分隊&nbsp;
            <select id="unit" name="unit" style="width: 172px;">
              <option value=""></option>
              <c:forEach items="${deptlist}" var="deptlist">
                 <option value="${deptlist}" ${deptlist == record.UNIT ? 'selected="selected"' : ''}>${deptlist}</option>
              </c:forEach>
            </select>
             &nbsp;或&nbsp;其它&nbsp;&nbsp;
            <c:choose>
              <c:when test="${not fn:contains(deptlist, record.UNIT)}">
                 <input id="unit1" name="unit1" style="width: 168px;" value="${record.UNIT}"/>
              </c:when>
              <c:otherwise>
                 <input id="unit1" name="unit1" style="width: 168px;"/>
              </c:otherwise>
            </c:choose>
          </td>
        </tr>
        <tr>
          <td style="width:30%">聯絡人<font color="#FF0000">*</font></td>
          <td><input name="name"  value="${record.NAME}"/></td>
        </tr>
        <tr>
          <td style="width:30%">報修/回覆<br/>開始時間<font color="#FF0000">*</font>~結束時間</td>
          <td>
            <input id="begintime_id" name="rbtime" type="text" style="height: 34px;" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'})" readonly="readonly" value="${record.REPBEGINTIME}" class="Wdate" Style="{width:86px}"/> ~
            <input id="endtime_id"   name="retime" type="text" style="height: 34px;" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',minDate:'#F{$dp.$D(\'begintime_id\')}'})" readonly="readonly" value="${record.REPENDTIME}" class="Wdate" Style="{width:86px}"/>
          </td>
        </tr>
        <tr>
          <td style="width:30%">問題描述<font color="#FF0000">*</font></td>
          <td><textarea style="height: 100%; width: 100%; font-size: 16px;" name="problem">${record.PROBLEMDESC}</textarea></td>
        </tr>
        <tr>
          <td style="width:30%"><label>工程師</td>
          <td><input name="engineer"  value="${record.ENGINEER}"/></td>
        </tr>        
        <tr>
          <td style="width:30%">出發時間~到達時間</td>
          <td>
            <input id="depaturetime_id" name="depaturetime" style="height: 34px;" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',minDate:'#F{$dp.$D(\'endtime_id\')}'})" readonly="readonly" value="${record.DEPATURETIME}" class="Wdate Style="{width:86px}"/> ~
            <input id="arrivaltime_id"  name="arrivaltime"  style="height: 34px;" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',minDate:'#F{$dp.$D(\'depaturetime_id\')}'})" readonly="readonly" value="${record.ARRIVALTIME}" class="Wdate Style="{width:86px}"/>
          </td>
        </tr>
        <tr>
          <td style="width:30%">完成時間</td>
          <td>
            <input id="finishtime_id" name="finishtime" style="height: 34px;" type="text" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',minDate:'#F{$dp.$D(\'arrivaltime_id\')}'})" readonly="readonly" value="${record.FINISHTIME}" class="Wdate" Style="{width:86px}"/>
          </td>
        </tr>
        <tr>
          <td style="width:30%">處理狀態<font color="#FF0000">*</font></td>
          <td>
            <select id="status" name="status">
              <option value=""></option>
              <option value="完成" ${"完成" == record.STATUS ? 'selected="selected"' : ''}>完成</option>
              <option value="未完成" ${"未完成" == record.STATUS ? 'selected="selected"' : ''}>未完成</option>
            </select>
          </td>
        </tr>
        <tr>
          <td style="width:30%"><label>處理過程</td>
          <td><textarea style="height: 100%; width: 100%; font-size: 16px;" name="process">${record.PROCESSDESC}</textarea></td>
        </tr>
      </table>
      <br>
      <input type="submit" name="submit" value="確認" style="height: 40px; width: 80px;"/>
    </form>
    </c:forEach>
  </c:if>

  <c:if test="${view == 'conditions'}">
    <div align="center">
    <h2>查詢報修單</h2>
    <font color="blue">條件填入: 二擇一或全部</font>
    <form method="POST" action="<%= request.getContextPath() %>/MaintainCase/query">
    <br/>
    <table style="width:30%">
      <tr>
        <td align="right">報修日期</td>
        <td><input name="date"  placeholder="YYYYMMDD"/></td>
        <td rowspan="2" valign="bottom"><input type="submit" name="submit" value="確認" style="height: 40px; width: 80px;"/></td>
      </tr>
      <tr>
        <td align="right">使用者位置/單位</td>
        <td><input name="unit" /><input name="serial" type="hidden"/></td>
      </tr>
    </table>
    </form>
  </c:if>
  
  <c:if test="${view == 'list'}">
  <body>
    <%
       List<MaintainCase> list = (List<MaintainCase>) request.getAttribute("listRecord");
       int page_current = 1; //目前頁數
       int page_begin = 0;   //起始點,從 0 開始
       int page_end = 9;     //每頁顯示十條信息
       int total_count = 0;
       if(list != null) total_count = list.size();   //信息的總量
       int page_total = total_count / 10 + (total_count % 10 != 0 ? 1 : 0);
       if(request.getParameter("begin") != null) {
         page_current = Integer.parseInt(request.getParameter("begin"));  //取得目前頁數
       }
       page_begin = (page_current - 1) * 10;
       page_end = page_begin + 9 > total_count ? total_count : page_begin + 9;
       request.getSession().setAttribute("page_current", page_current);  //保存到session中
       request.getSession().setAttribute("page_total", page_total);
    %>
    <div align="center">
    <h2>報修單記錄</h2>
    <table border="1px" style="width:100%">
      <th width="3%">項次</th>
      <th width="11%">報修/回覆時間</th>
      <th width="7%">使用者<br/>位置/單位</th>
      <th width="7%">聯絡人</th>
      <th width="7%">工程師</th>
      <th width="11%">出發時間<br/>到達時間<br/>完成時間</th>
      <th width="15%">問題說明</th>
      <th width="6%">處理狀態</th>
      <th width="15%">處理過程</th>
      <th width="6%">處理時間 (小時)</th>
      <th width="6%">交通時間 (小時)</th>
      <th width="7%">報修單<br/>列印/編輯</th>
      <c:forEach var="record" items="${listRecord}" step="1" varStatus="i" begin="<%=page_begin %>" end="<%=page_end %>">
        <tr>
          <td>${i.index + 1}</td>
          <td>${record.REPBEGINTIME}<br/>${record.REPENDTIME}</td>
          <td>${record.UNIT}</td>
          <td>${record.NAME}</td>
          <td>${record.ENGINEER}</td>
          <td>${record.DEPATURETIME}<br/>${record.ARRIVALTIME}<br/>${record.FINISHTIME}</td>
          <td>${record.PROBLEMDESC}</td>
          <td>${record.STATUS}</td>
          <td>${record.PROCESSDESC}</td>
          <td>${record.PROCESSTIME}</td>
          <td>${record.COMMUTETIME}</td>
          <td><a style="text-decoration: none" class="submit" href="<%= request.getContextPath() %>/MaintainCase/print?serial=${record.SERIAL}">${record.SERIAL}<br/>列印</a>
              <a style="text-decoration: none" class="submit" href="<%= request.getContextPath() %>/MaintainCase/edit?serial=${record.SERIAL}">編輯</a></td>
        </tr>
      </c:forEach>
    </table>
    <table style="width:100%">
    	<tr>
        <td align="center">
          <c:if test="${sessionScope.page_current != 1 }">
            <a href="<%= request.getContextPath() %>/MaintainCase/query?serial=${serial}&date=${date}&begin=${sessionScope.page_current - 1 }">&lt;上一頁</a>
          </c:if>
          &nbsp;&nbsp;${sessionScope.page_current } / ${sessionScope.page_total }&nbsp;&nbsp;
          <c:if test="${sessionScope.page_current != sessionScope.page_total && sessionScope.page_total > 0}">
            <a href="<%= request.getContextPath() %>/MaintainCase/query?serial=${serial}&date=${date}&begin=${sessionScope.page_current + 1 }">下一頁&gt;</a>
          </c:if>
        </td>
      </tr>
    </table>
  </c:if>
  
  <c:if test="${view == 'print'}">
  <body onload="printCase()">
    <div align="center">
    <h2>報修單</h2>
    <style>
      table {border-collapse: collapse;}
      table, td, th {border: 1px solid black;height:50;}
    </style>
    <c:forEach var="record" items="${listRecord}">
      <table style="width:80%">
        <tr>
          <td style="width:30%">報修單位</td>
          <td>&nbsp;${record.UNIT}</td>
        </tr>
        <tr>
          <td style="width:30%">聯絡人</td>
          <td>&nbsp;${record.NAME}</td>
        </tr>
        <tr>
          <td style="width:30%">報修/回覆<br/>開始時間~結束時間</td>
          <td>&nbsp;${record.REPBEGINTIME} ~ ${record.REPENDTIME}</td>
        </tr>
        <tr>
          <td style="width:30%"><label>問題描述</td>
          <td>&nbsp;${record.PROBLEMDESC}</td>
        </tr>
        <tr>
          <td style="width:30%"><label>工程師</td>
          <td>&nbsp;${record.ENGINEER}</td>
        </tr>
        <tr>
          <td style="width:30%">出發時間<br/>到達時間<br/>完成時間</td>
          <td>&nbsp;${record.DEPATURETIME}<br/>&nbsp;${record.ARRIVALTIME}<br/>&nbsp;${record.FINISHTIME}</td>
        </tr>
        <tr>
          <td style="width:30%"><label>處理狀態</td>
          <td>&nbsp;${record.STATUS}</td>
        </tr>
        <tr>
          <td style="width:30%"><label>處理過程</td>
          <td>&nbsp;${record.PROCESSDESC}</td>
        </tr>
        <tr>
          <td style="width:30%"><label>處理時間(小時)</td>
          <td>&nbsp;${record.PROCESSTIME}</td>
        </tr>
        <tr>
          <td style="width:30%"><label>交通時間(小時)</td>
          <td>&nbsp;${record.COMMUTETIME}</td>
        </tr>
      </table>
    </c:forEach>
  </c:if>
  
</div>
</body>
</html>
