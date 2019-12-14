
 function Submit_Menu(objEvt,objForm,apname,flag){
	objForm.pushFun.value             ="load";
	objForm.pushButton.value          ="load";
	objForm.APname.value              =apname;
	objForm.nextAPname.value          =apname;
 	objForm.SelectedRowData.value     ="";
	objForm.selectedTableName.value   ="";
	objForm.selectedPage.value        ="";
	//objForm._hidmenuAct.value         ="";
 
	objForm.submit();
}

//回首頁
function goHome(objEvt,objForm){
	objForm.pushFun.value             ="_btnHome";
	objForm.pushButton.value          ="_btnHome";
	objForm.APname.value              ="base.NPMenubar.NPMenu";
	objForm.nextAPname.value          ="base.NPMenubar.NPMenu";
 	objForm.SelectedRowData.value     ="";
	objForm.selectedTableName.value   ="";
	objForm.selectedPage.value        ="";
	if(objForm._hidmenuAct)	objForm._hidmenuAct.value ="";
	
 
	objForm.submit();
}

/**
*登出事件
*/
function Submit_Logout(event,objForm,strAPname,strFlag){
	objForm.pushFun.value             ="_btnHome";
	objForm.pushButton.value          ="_btnHome";
	objForm.APname.value              ="base.NPMenubar.NPMenu";
	objForm.nextAPname.value          ="base.NPMenu";
 	objForm.SelectedRowData.value     ="";
	objForm.selectedTableName.value   ="";
	objForm.selectedPage.value        ="";
	
	objForm.action ="LogOutServlet";
	objForm.target="_top";
	objForm.submit();
}
/**
修正event for 跨瀏覽器
*/
function fixEvt(event){
	event = event || window.event;
	if (event.target) el = event.target; else if (event.srcElement) el = event.srcElement;
	return el;
}


//會開確認視窗
function Submit_SetDestName2(event,objF,strAPname,strFlag){
	evt = fixEvt(event);	 
	var el = event.target || event.srcElement;	
	
	$('#_divConfirmWin').attr("title", el.value);
	
	$('#_divConfirmWin').html("確認要執行此動作嗎？");
	
	$('#_divConfirmWin').dialog({
		autoOpen:true,
		modal:true,
		buttons:{
			確定:function(){ $(this).dialog('close');el.disabled=true;Submit_SetDestName(evt,objF,strAPname,strFlag)},//將evt傳回給callback使用
			取消:function(){ $(this).dialog('close');}//將evt傳回給callback使用
		}
	});
}
function getEvent(){ //避免el=null(用於firefox相容性) 
	if(document.all) return window.event; 
	func=getEvent.caller; 
	while(func!=null){ 
		var arg0=func.arguments[0]; 
		if(arg0){ 
			if((arg0.constructor==Event || arg0.constructor ==MouseEvent) 
					|| (typeof(arg0)=="object" && arg0.preventDefault && arg0.stopPropagation)){ 
				return arg0; 
			} 
		} 
		func=func.caller; 
	} 
	return null; 
} 
function Submit_SetDestName(event,objF,strAPname,strFlag){

	//將畫面文字方塊Trim掉
	trimFormTextBox(objF);
	if (event.target) {
		el = event.target; 
	}else if (event.srcElement) {
		el = event.srcElement;
	}else{
		event = getEvent();
		el = event.target?event.target:event.srcElement;
	}
	
	if(el.type=='button' && !(el.value=='回上層' || el.value=='列印' || el.value=='排序設定' || el.value=='密碼重置' || el.value=='取消')){
		if(!Submit_CheckSubmit(event,objF)){
			return;
		}
	}

	objF.nextAPname.value=strAPname;
	objF.pushButton.value=el.name;

	if(el.type=='button' || el.type=='select-one'){
		objF.pushFun.value=el.value;
	}
	else{
		objF.pushFun.value=el.innerText;
	}

	if (strFlag == '1'){
		//add by wangzhaoyang dt:2006/03/13
		Function_ReplaceMark(objF);

		objF.submit();

		for (i=0;i<objF.length;i++){
			var tempobj=objF.elements[i]
			if(tempobj.type.toLowerCase()=="button"||tempobj.type.toLowerCase()=="select-one"||tempobj.type.toLowerCase()=="reset"||tempobj.type.toLowerCase()=="submit")
				tempobj.disabled=true
		}

		el.disabled=true

		if (objF.name == 'titlefrm'){
			frm.disabled=true
		}
	}
}
//add by wangzhaoyang .
//date:2006/03/13
//desc:將文本框 and 多行文本框的中的 ' and " 換為 ` and ``
function Function_ReplaceMark(objF){
var str = "";
	for (i=0;i<objF.length;i++){
		var tempobj=objF.elements[i] ;
		if(tempobj.type.toLowerCase()=="text"||tempobj.type.toLowerCase()=="textarea"){
			str = tempobj.value.replace(/\'/g,"`");
			str = str.replace(/\"/g,"``");
			tempobj.value = str;
		}
	}
}
//end by
function Submit_SetDestName_Menu(event,objF,strAPname,strFlag,menuAct){

    //將畫面文字方塊Trim掉
    trimFormTextBox(objF);
 event = event || window.event;
 if (event.target) el = event.target; else if (event.srcElement) el = event.srcElement;

	if(el.type=='button' && !(el.value=='回上層' || el.value=='列印' || el.value=='排序設定' || el.value=='密碼重置' || el.value=='取消')){
        if(!Submit_CheckSubmit(event,objF)){
    		return;
        }
    }
objF._hidmenuAct.value=menuAct;
    objF.nextAPname.value=strAPname;
    objF.pushButton.value="menuAct";

    if(el.type=='button' || el.type=='select-one'){
        objF.pushFun.value=el.value;
    }
    else{

        objF.pushFun.value=el.innerText;
    }

    if (strFlag == '1'){
	    //add by wangzhaoyang dt:2006/03/13
	    Function_ReplaceMark(objF);

	    objF.submit();

	    for (i=0;i<objF.length;i++){
		    var tempobj=objF.elements[i]
		    if(tempobj.type.toLowerCase()=="button"||tempobj.type.toLowerCase()=="select-one"||tempobj.type.toLowerCase()=="reset"||tempobj.type.toLowerCase()=="submit")
          	    tempobj.disabled=true
	    }

        el.disabled=true

        if (objF.name == 'titlefrm'){
        	frm.disabled=true
        }
    }
}

//開啟子視窗
function Submit_openWin(event,objF,APname,nextAPname,strFlag,winwidth,winheight,para){

	event = event || window.event;
	if (event.target) el = event.target; else if (event.srcElement) el = event.srcElement;

    if(el.type=='button' && !(el.value=='回上層' || el.value=='列印' || el.value=='排序設定' || el.value=='取消')){
        if(!Submit_CheckSubmit(event,objF)){
            return;
        }
    }

	objF.nextAPname.value=nextAPname;
    objF.pushButton.value=el.name;

    if(el.type=='button' || el.type=='select-one'){
        objF.pushFun.value=el.value;
    }else{
        objF.pushFun.value=el.innerText;
    }
	var urlparavvv="";
	urlparavvv+="pushFun="+objF.pushFun.value+"&";
	urlparavvv+="pushButton="+objF.pushButton.value+"&";
	//urlparavvv+="pushButton=load&";
	urlparavvv+="APname="+APname+"&";
	urlparavvv+="SelectedRowData="+objF.SelectedRowData.value+"&";
	urlparavvv+="nextAPname="+objF.nextAPname.value;
	strPath = objF.action+"?"+urlparavvv;

	//2005/6/15 by Steve
	strPath += "&" + para;

	strPath=encodeURI(strPath);

	dialogFeatures = "center:yes;" +
                     "dialogHeight=600px;" +
                     "dialogWidth=800px;" +
                     "help:no;" +
                     "status:no";


    if(strFlag == '1'){

        //winwidth = 600; // width of the new window
        //winheight = 600; // height of the new window
        winleft   = 200; // just dummie values
        wintop    = 200; // just dummie values

        if(parseInt(navigator.appVersion)>=4){
            winleft = (screen.width / 2) - (winwidth / 2); // center the window right to left
            wintop = (screen.height / 2) - (winheight / 2); // center the window top to bottom
            // the values get inserted into the features parameter of the window.open command...
        }

        var str = "status=yes,toolbar=no,location=no,menubar=no";
        str += ",resizable=no,scrollbars=yes,center=yes";
        str += ",top=" + wintop+ ",left=" + winleft;
        str += ",height=" + winheight  + ",innerHeight=" + winheight;
        str += ",width=" + winwidth + ",innerWidth=" + winwidth;

        //開啟視窗
        //開啟小視窗時,強制focus在小視窗上
        var openWindow = window.open(strPath,null,str);
        openWindow.focus();
        return openWindow;
    }//end of openwin


    if(strFlag == '2'){
        window.showModelessDialog(strPath,window,dialogFeatures);
    }
    if(strFlag == '3'){
        window.showModelDialog(strPath,window,dialogFeatures);
    }
}




function Submit_FullScreenAfterCall_SetLeftDestName(event,objF,strAPname,strnextAPname,strFlag){
    Submit_SetLeftDestName(event,objF, strAPname, strnextAPname, strFlag)
}


//form action submit (LeftTree, Menu) ********************************************************

function Submit_SetLeftDestName(event,objF,strAPname,strnextAPname,strFlag){
 event = event || window.event;
 if (event.target) el = event.target; else if (event.srcElement) el = event.srcElement;
	if(el.type=='button' && !(el.value=='回上層' || el.value=='列印' || el.value=='排序設定' || el.value=='密碼重置' || el.value=='取消')){
        if(!Submit_CheckSubmit(event,objF)){
            return;
        }
    }

    objF.APname.value=strAPname;
    objF.nextAPname.value=strnextAPname;
    objF.pushButton.value='load';

    if(el.type=='button' || el.type=='select-one'){
        objF.pushFun.value=el.value;
    }
    else{
        objF.pushFun.value=el.innerText;
    }

    if (strFlag == '1'){
        //Other_chkNode();
        objF.submit();

        for (i=0;i<objF.length;i++){
    	    var tempobj=objF.elements[i]
    	    if(tempobj.type.toLowerCase()=="button"||tempobj.type.toLowerCase()=="select-one"||tempobj.type.toLowerCase()=="reset"||tempobj.type.toLowerCase()=="submit")
                tempobj.disabled=true
        }

        el.disabled=true

        if (objF.name == 'titlefrm'){
        	frm.disabled=true
        }
    }
}



//form action submit (HyperLink or button in table) ********************************************************




function Submit_SetSelectedRowData2(event,objF,strAPname,strSelectedRowData){

	evt = fixEvt(event);	 
	//因為event.srcElement可能為null,所以要做判斷處理。
	var el = event.target || event.srcElement;	
	
	 event = event || window.event;
	 if (event.target) el = event.target; else if (event.srcElement) el = event.srcElement;

	$('#_divConfirmWin').attr("title", el.value);
	
	$('#_divConfirmWin').html("確認要執行此動作嗎？");
	
	$('#_divConfirmWin').dialog({
		autoOpen:true,
		modal:true,
		buttons:{
			確定:function(){ $(this).dialog('close');el.disabled=true;Submit_SetSelectedRowData(evt,objF,strAPname,strSelectedRowData)},//將evt傳回給callback使用
			取消:function(){ $(this).dialog('close');}//將evt傳回給callback使用
		}
	});
}

function Submit_SetSelectedRowData(event,objF,strAPname,strSelectedRowData){

 event = event || window.event;
 if (event.target) el = event.target; else if (event.srcElement) el = event.srcElement;

    objF.nextAPname.value=strAPname;
	if(el.name)
    	objF.pushButton.value=el.name;
    else    
     	objF.pushButton.value=el.id;
	 if(objF.pushButton.value=='_btnDelete'){
        if(!confirm("是否要刪除此筆資料?")){
            return;
        }
    }
    if(objF.pushButton.value=='_urlDelete'){
        if(!confirm("是否要刪除此筆資料?")){
            return;
        }
	}
    if(objF.pushButton.value=='_btnChangePasswd'){
        if(!confirm("確認更改密碼?")){
            return;
        }
    }
    
    objF.SelectedRowData.value=strSelectedRowData;
    objF.pushFun.value=el.innerText;
    objF.nextAPname.value=strAPname;
    
    objF.submit();
    
    for (i=0;i<objF.length;i++){
        var tempobj=objF.elements[i];
        if(tempobj.type.toLowerCase()=="button"||tempobj.type.toLowerCase()=="select-one"||tempobj.type.toLowerCase()=="reset"||tempobj.type.toLowerCase()=="submit")
            tempobj.disabled=true;
    }
}

// 檔案上傳專用
function Submit_FileUpload(event,objF,strAPname,strFlag){
    // 改 objF 參數設定
    objF.encoding = "multipart/form-data";
    return Submit_SetDestName(event,objF,strAPname,strFlag);
}

//檔案上傳專用
function delete_FileUpload(event,objF,strAPname,strSelectedRowData){
	event = event || window.event;
	if (event.target) el = event.target; else if (event.srcElement) el = event.srcElement;
	objF.nextAPname.value=strAPname;
	if(el.name){
		objF.pushButton.value=el.name;
	}else   {
		objF.pushButton.value=el.id;
	}
	if(objF.pushButton.value=='_btnDelete1' || objF.pushButton.value=='_btnDelete2'){
		if(!confirm("是否要刪除此筆檔案?")){
			return;
		}
	}

	objF.SelectedRowData.value=strSelectedRowData;
	objF.pushFun.value=el.innerText;

	for (i=0;i<objF.length;i++){
		var tempobj=objF.elements[i];
		if(tempobj.type.toLowerCase()=="button"||tempobj.type.toLowerCase()=="select-one"||tempobj.type.toLowerCase()=="reset"||tempobj.type.toLowerCase()=="submit")
			tempobj.disabled=true;
	}	   
}


