//以點選日曆方式輸入日期********************************************************

var weekend = [0,6];
var gNow = new Date();
var ggWinCal;
var gFlag='0';//0是show 0930101 1是show 09301
Calendar.Months = ["1", "2", "3", "4", "5", "6","7", "8", "9", "10", "11", "12"];
Calendar.DOMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
Calendar.lDOMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
Calendar.get_month = Calendar_get_month;
Calendar.get_daysofmonth = Calendar_get_daysofmonth;
Calendar.calc_month_year = Calendar_calc_month_year;
new Calendar();

function Calendar(p_item, p_WinCal, p_month, p_year) {
  if ((p_month == null) && (p_year == null)) return;
  if (p_WinCal == null) this.gWinCal = ggWinCal;
  else this.gWinCal = p_WinCal;
  if (p_month == null) {
    this.gMonthName = null;
    this.gMonth = null;
    this.gYearly = true;
  } else {
    this.gMonthName = Calendar.get_month(p_month);
    this.gMonth = new Number(p_month);
    this.gYearly = false;
  }
  this.gYear = p_year;
  this.gReturnItem = p_item;
}

function Calendar_print() {	ggWinCal.print(); }

function Calendar_get_month(monthNo) { return Calendar.Months[monthNo]; }

function Calendar_get_daysofmonth(monthNo, p_year) {
  if ((p_year % 4) == 0) {
    if ((p_year % 100) == 0 && (p_year % 400) != 0) return Calendar.DOMonth[monthNo];
	else return Calendar.lDOMonth[monthNo];
  } else { return Calendar.DOMonth[monthNo]; }
}

function Calendar_calc_month_year(p_Month, p_Year, incr) {
  var ret_arr = new Array();
  if (incr == -1) {
    if (p_Month == 0) {
      ret_arr[0] = 11;
      ret_arr[1] = parseInt(p_Year) - 1;
    }  else {
      ret_arr[0] = parseInt(p_Month) - 1;
      ret_arr[1] = parseInt(p_Year);
    }
  } else if (incr == 1) {
    if (p_Month == 11) {
      ret_arr[0] = 0;
      ret_arr[1] = parseInt(p_Year) + 1;
    } else {
      ret_arr[0] = parseInt(p_Month) + 1;
      ret_arr[1] = parseInt(p_Year);
    }
  }
  return ret_arr;
}

Calendar.prototype.getMonthlyCalendarCode = function() {
  var vCode = "";
  var vHeader_Code = "";
  var vData_Code = "";
  vHeader_Code = this.cal_header();
  vData_Code = this.cal_data();
  vCode = vCode + vHeader_Code + vData_Code;
  vCode = vCode + "</TABLE>";
  return vCode;
}

Calendar.prototype.show = function() {
  var vCode = "";
  var Y = this.gYear-1911; //this.gYear;
  this.gWinCal.document.open();
  this.wwrite("<HTML><HEAD><TITLE>日曆</TITLE></HEAD><BODY>");
  
  this.wwrite("<TABLE CELLSPACING=0 CELLPADDING=1 BORDER=0 WIDTH='100%' height='100%'bgColor='silver'>");
//  this.wwrite("<tr><th><SELECT style='FONT-SIZE: 9pt' onchange=changeCld() name=SY>");  
//  this.wwrite("<SCRIPT language=JavaScript> for(i=0;i<200;i++) {if(i=="+(gNow.getFullYear()-1911)+"){document.write('<option selected>'+i)}else{document.write('<option >'+i)}}</script></select></th></tr>");
  //this.wwriteA("<CAPTION>西元 " + this.gYear + " 年 " + this.gMonthName + " 月</CAPTION>");
  this.wwriteA("<tr><th bgColor='#c8e3ff' ><font style='FONT-SIZE: 16pt; COLOR: #330099'>民國 " + (this.gYear-1911) + " 年 " + this.gMonthName + " 月 </font></th>");
  var prevMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, -1);
  var prevMM = prevMMYYYY[0];
  var prevYYYY = prevMMYYYY[1];
  var nextMMYYYY = Calendar.calc_month_year(this.gMonth, this.gYear, 1);
  var nextMM = nextMMYYYY[0];
  var nextYYYY = nextMMYYYY[1];
  vCode = this.getMonthlyCalendarCode();
  this.wwrite("<th rowspan='2' align='center' height='100%' bgColor='#c8e3ff'><TABLE WIDTH='100%' BORDER=0 CELLSPACING=0 CELLPADDING=0><tr><TH>");
  this.wwrite("<br><font style='FONT-SIZE: 12pt; COLOR: #330099'>年</font><br>");
  this.wwrite("<SMALL><input type='Button' style='FONT-SIZE: 10pt' value='▲' name='yu' onclick=\"javascript:window.opener.Build('" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)+1) + "', '" + this.gFormat + "');\"><br></SMALL> ");
  this.wwrite("<SMALL><input type='Button' style='FONT-SIZE: 10pt' value='▼' name='yd' onclick =\"javascript:window.opener.Build('" + this.gReturnItem + "', '" + this.gMonth + "', '" + (parseInt(this.gYear)-1) + "', '" + this.gFormat + "');\"><br></SMALL> ");
  this.wwrite("<br><font style='FONT-SIZE: 12pt; COLOR: #330099'>月</font><br>");
  this.wwrite("<SMALL><input type='Button' style='FONT-SIZE: 10pt' value='▲' name='mu' onclick=\"javascript:window.opener.Build('" + this.gReturnItem + "', '" + nextMM + "', '" + nextYYYY + "', '" + this.gFormat + "');\"></SMALL><br> ");
  this.wwrite("<SMALL><input type='Button' style='FONT-SIZE: 10pt' value='▼' name='md' onclick=\"javascript:window.opener.Build('" + this.gReturnItem + "', '" + prevMM + "', '" + prevYYYY + "', '" + this.gFormat + "');\"></SMALL><br></th></tr></TABLE></th></tr> ");
  this.wwrite("<tr><th align='center'><TABLE WIDTH='100%' height='100%' BORDER=1 CELLSPACING=0 CELLPADDING=0><tr><TH align='center'>");
  this.wwrite(vCode);
  this.wwrite("</th></tr></TABLE></th></tr></table>");
  
  this.gWinCal.document.close();
}

Calendar.prototype.wwrite = function(wtext) { this.gWinCal.document.writeln(wtext); }

Calendar.prototype.wwriteA = function(wtext) { this.gWinCal.document.write(wtext); }

Calendar.prototype.cal_header = function() {
  var vCode = "";
  vCode = vCode + "<TR >";
  vCode = vCode + "<TH bgColor='#0080ff'><font style='FONT-SIZE: 14pt; COLOR: white'>日</font></TH>";
  vCode = vCode + "<TH bgColor='#0080ff'><font style='FONT-SIZE: 14pt; COLOR: white'>一</font></TH>";
  vCode = vCode + "<TH bgColor='#0080ff'><font style='FONT-SIZE: 14pt; COLOR: white'>二</font></TH>";
  vCode = vCode + "<TH bgColor='#0080ff'><font style='FONT-SIZE: 14pt; COLOR: white'>三</font></TH>";
  vCode = vCode + "<TH bgColor='#0080ff'><font style='FONT-SIZE: 14pt; COLOR: white'>四</font></TH>";
  vCode = vCode + "<TH bgColor='#0080ff'><font style='FONT-SIZE: 14pt; COLOR: white'>五</font></TH>";
  vCode = vCode + "<TH bgColor='#0080ff'><font style='FONT-SIZE: 14pt; COLOR: white'>六</font></TH>";
  vCode = vCode + "</TR>";
  return vCode;
}

Calendar.prototype.cal_data = function() {
  var vDate = new Date();
  vDate.setDate(1);
  vDate.setMonth(this.gMonth);
  vDate.setFullYear(this.gYear);
  var vFirstDay=vDate.getDay();
  var vDay=1;
  var vLastDay=Calendar.get_daysofmonth(this.gMonth, this.gYear);
  var vOnLastDay=0;
  var vCode = "";
  vCode = vCode + "<TR ALIGN=\"CENTER\"> ";
  for (i=0; i<vFirstDay; i++) {
    vCode = vCode + "<TD bgColor='#ffffff'" + this.write_weekend_string(i) + ">&nbsp;</TD> ";
  }
  for (j=vFirstDay; j<7; j++) {
  	
    vCode = vCode + "<TD bgColor='#ffffff'" + this.write_weekend_string(j) + ">" + 
	"<A HREF='#' style='color: #000000' onClick=\"self.opener.document." + this.gReturnItem + ".value='" + 
	this.format_data(vDay) + "'; window.close();\"><b><font size='3'>" + this.format_day(vDay) + "</font></b></A></TD> ";
    vDay=vDay + 1;
  }
  vCode = vCode + "</TR> ";
  for (k=2; k<7; k++) {
    vCode = vCode + "<TR ALIGN=\"CENTER\">";
    for (j=0; j<7; j++) {
      vCode = vCode + "<TD bgColor='#ffffff'" + this.write_weekend_string(j) + ">" + 
	"<A HREF='#' style='color: #000000' onClick=\"self.opener.document." + this.gReturnItem + ".value='" + 
      this.format_data(vDay) + "'; window.close();\"><b><font size='3'>" + this.format_day(vDay) + "</font></b></A></TD> ";
      vDay=vDay + 1;
      if (vDay > vLastDay) {
        vOnLastDay = 1;
        break;
      }
    }
    if (j == 6)	vCode = vCode + "</TR>";
    if (vOnLastDay == 1) break;
  }
  for (m=1; m<(7-j); m++) {
    if (this.gYearly) vCode = vCode + "<TD " + this.write_weekend_string(j+m) + ">&nbsp;</TD> ";
	else vCode = vCode + "<TD bgColor='#ffffff'" + this.write_weekend_string(j+m) + "><FONT COLOR='gray'>　</FONT></TD> ";
  }
  return vCode;
}

Calendar.prototype.format_day = function(vday) {
  var vNowDay = gNow.getDate();
  var vNowMonth = gNow.getMonth();
  var vNowYear = gNow.getFullYear();
  if (vday == vNowDay && this.gMonth == vNowMonth && this.gYear == vNowYear) {
    return ("<FONT COLOR=\"RED\">" + vday + "</B></FONT>");
  } else { return (vday); }
}


Calendar.prototype.write_weekend_string = function(vday) {
  var i;
  for (i=0; i<weekend.length; i++) {
    if (vday == weekend[i] && vday ==0) {
    	return (" BGCOLOR=\"#FFB997\"");
    }
    else if(vday == weekend[i] && vday ==6){
    	return (" BGCOLOR=\"#66FF66\"");
    }
  }
  return "";
}

Calendar.prototype.format_data = function(p_day) {
  var vData;
  var vMonth = 1 + this.gMonth;
  vMonth = (vMonth.toString().length < 2) ? "0" + vMonth : vMonth;
  var vY4 = new String(this.gYear-1911); //new String(this.gYear);
  vY4 = (vY4.toString().length < 3) ? "0" + vY4 : vY4;
  var vDD = (p_day.toString().length < 2) ? "0" + p_day : p_day;
  if(gFlag == '0')
  	vData = vY4 + vMonth + vDD;
  else if(gFlag == '1')
  	vData = vY4 + vMonth ;
  return vData;
}

function Build(p_item, p_month, p_year) {
  var p_WinCal = ggWinCal;
  gCal = new Calendar(p_item, p_WinCal, p_month, p_year);
  gCal.show();
}

function Calendar_show_calendar() {
  p_item = arguments[0];
  if (arguments[1] == "" || arguments[1] == null) p_month = new String(gNow.getMonth());
  else p_month = arguments[1];
  if (arguments[2] == "" || arguments[2] == null) p_year = new String(gNow.getFullYear().toString());
  else p_year = arguments[2];
  //alert(arguments[3]);  
  gFlag = arguments[3];
  //alert(gFlag);
  vWinCal = window.open("", "Calendar", "width=250,height=300,status=no,resizable=no,top=200,left=200");
  vWinCal.opener = self;
  ggWinCal = vWinCal;
  Build(p_item, p_month, p_year);
}
function changeCld() {
 var y,m;
 y=this.SY.selectedIndex;
// m=this.SM.selectedIndex;
 
}
