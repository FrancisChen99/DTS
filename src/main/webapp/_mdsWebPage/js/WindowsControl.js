//ChangeColor(要改變顏色的物件,要改變的顏色)********************************************************
	
function WindowsControl_ChangeColor(obj,strColor) {
	obj.style.color=strColor;
}



//每個畫面InitMessage********************************************************

function WindowsControl_InitMessage(msg)
    {
        if(msg==null || msg=='' || msg=='first'){
        }
        else if(msg == 'null'){
        }
        else{
            alert(msg);
        }
}



//檢查網頁閒置時間(預設為600秒)********************************************************

function WindowsControl_Second(u){
    x = u;
}

function WindowsControl_SecondCount(){
    if ( x < 60000 ){
	    //document.frm.Timeout.value = x;
	    x = x + 1;
	    setTimeout("WindowsControl_SecondCount()", 1000);
    }
    else {
    	window.location='jsp/base/login.jsp';
    }
}



//計算停留時間********************************************************

function WindowsControl_Wait(u){
    y = u;
}

function WindowsControl_WaitCount(){	 
    //if (TDTitle.height>49){
        document.titlefrm.waittime.value = y;
    //}    
    y = y + 1;
    setTimeout("WindowsControl_WaitCount()", 1000);
}



//SetEnterFocus(要focus的物件)********************************************************

function WindowsControl_SetEnterFocus(objE){
	if(window.event.keyCode==13){
		objE.focus();
		if(objE.type=='text' || objE.type=='password'){
			objE.select();
		}
	}
}



//狀態列********************************************************
/*
function WindowsControl_StatusBar() {
    theTime = window.setTimeout("WindowsControl_StatusBar()", 1000);
    var today = new Date();
    var display= today.toLocaleString();
    status=display;
}
*/

//狀態列(傳值)********************************************************
//0930923 by Steve

function WindowsControl_StatusBar(strMsg) {
    strShowMsg = strMsg;
    theTime = window.setTimeout("WindowsControl_StatusBar(strShowMsg)", 1000);
    var today = new Date();
    //var display= "現在時間：" + today.toLocaleString();
    var yyy = today.getYear()-1911;
    var MM = today.getMonth()+1;
    
    var hh = today.getHours();
    hh = (hh.toString().length < 2) ? "0" + hh : hh;

    var mm = today.getMinutes();
    mm = (mm.toString().length < 2) ? "0" + mm : mm;

    var ss = today.getSeconds();
    ss = (ss.toString().length < 2) ? "0" + ss : ss;

    var display= "現在時間：民國 " + yyy + " 年 " + MM + " 月 " + today.getDate() + " 日 " +
                 hh+":"+mm+":"+ss;
    status = display + "。" + strShowMsg;
}

//標題********************************************************

function WindowsControl_Title(title){

	document.title=title

}



//垂直movebar長寬度縮放功能********************************************************

var strLeftHTML;

function WindowsControl_WidthChangeH(){
    document.frm.moveBarH.value = 'L';
    if (TDLeft.width!="1"){
        document.frm.moveBarH.value = 'R';
        //strLeftHTML=TDLeft.innerHTML;
        //TDLeft.innerHTML="";
//document.all.lefttreetable.visibility = "hiden";
document.all.lefttreetable.style.display = "none";
    }
    wid1();
}

function wid1(){
        var intTime=100;
        var intM=1;
        intM+=2*(121-TDLeft.width);
        if (TDLeft.width=="1"){
            TDLeft.width="120";
            //TDLeft.innerHTML=strLeftHTML;
//document.all.lefttreetable.visibility = "show";
document.all.lefttreetable.style.display = "block";
            return;
        }
        else{
                if (TDLeft.width-intM<=1){
                        intM=TDLeft.width-1;
                }
                TDLeft.width=TDLeft.width-intM;
        }

        if (TDLeft.width<=1){
                return;
        }
        setTimeout("wid1()",intTime);
}



//水平movebar長寬度縮放功能********************************************************
    
var strTitleHTML;

function WindowsControl_WidthChangeW(){
    document.frm.moveBarW.value = 'U';        
    if (TDTitle.height!="1"){     
        document.frm.moveBarW.value = 'D';
        strTitleHTML=TDTitle.innerHTML;
        TDTitle.innerHTML="";
    }
    wid2();
}

function wid2(){
        var intTime=100;
        var intM=1;
        intM+=2*(51-TDTitle.height);
        if (TDTitle.height=="1"){
            TDTitle.height="50";
            TDTitle.innerHTML=strTitleHTML;
            return;
        }
        else{
                if (TDTitle.height-intM<=1){
                        intM=TDTitle.height-1;
                }
                TDTitle.height=TDTitle.height-intM;
        }
        if (TDTitle.height<=1){
                return;
        }
        setTimeout("wid2()",intTime);
}
