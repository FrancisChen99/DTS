
var pub_err_bakground='#FF9966';
//由每個畫面所call的檢核
function chkMulitSubmit(event,arrObj_ck,arrObj_cn){
	event = event || window.event;
	if (event.target) {
		el = event.target; 
	}else if (event.srcElement) {
		el = event.srcElement;
	}

	var flag=false;
	var chkFlag=false;
	if (arrObj_ck[0]!='1'){
		for (var i=0;i<arrObj_ck.length;i++){
			if (el.id==arrObj_ck[i]){
				chkFlag=true;
				break;
			}
		}
		if(chkFlag){
			var arrObj=new Array(1);
			arrObj[0]=new Array(el,['Chk']);
			for(var i=0;i<arrObj.length;i++){
				flag=CheckInput_Main(arrObj[i][0],arrObj[i][1]);
				if(!flag){
					return;
				}
			}
		}

	}
	if(!chkFlag){
		if (arrObj_cn.length!=0){
			var tmpFlag;
			for(var i=0;i<arrObj_cn.length;i++){
				tmpFlag=false;
				for(var j=0;j<arrObj_cn[i][1].length;j++){
					if (arrObj_cn[i][1][j]=='Len' || arrObj_cn[i][1][j]=='Num2'){
						tmpFlag=true;
						break;
					}
				}
				if(arrObj_cn[i].length < 3){
					flag=CheckInput_Main(event,arrObj_cn[i][0],arrObj_cn[i][1]);
				}
				else if(tmpFlag && arrObj_cn[i].length == 3){
					flag=CheckInput_Main(event,arrObj_cn[i][0],arrObj_cn[i][1],arrObj_cn[i][2]);
				}
				else if(tmpFlag){
					flag=CheckInput_My_Main(event,arrObj_cn[i][0],arrObj_cn[i][1],arrObj_cn[i][2],arrObj_cn[i][3]);
				}
				else {
					flag=CheckInput_My_Main(event,arrObj_cn[i][0],arrObj_cn[i][1],arrObj_cn[i][2]);
				}
				if(!flag){
					return;
				}
			}
		}
		else{
			return true;
		}
	}
	return true;
}



//檢查（Single Event）

function CheckInput_Main(event,objO,arrA,arrB){
	event = event || window.event;
	if (event.target) {
		el = event.target; 
	}else if (event.srcElement) {
		el = event.srcElement;
	}
	
    if(objO.type!=undefined){
        objO.value=Function_TrimLeft(objO.value);
        objO.value=Function_TrimRight(objO.value);
    }
    var arrILen = arrA.length;

    if(!isNaN(arrILen)){
        for(var i=0;i<arrILen;i++){
            var strB;
            if (arrA[i]=='Len' || arrA[i]=='Num2'){
                strB = eval(arrA[i])(objO,arrB);
            }else{
                strB = eval(arrA[i])(objO);
            }
            if(strB){
            	el.style.background=pub_err_bakground;
                if(objO.type=='text' || objO.type=='password' || objO.type=='textarea'){
                    objO.style.background=pub_err_bakground;
                    objO.select();
                }
                if(objO.type=='select-one'){
                    objO.style.background=pub_err_bakground;
                }
                //alert(strB);
				document.getElementById('_tdSearchResult').style.color = 'red';
				document.getElementById('_tdSearchResult').innerHTML = '查詢失敗：' + strB;
                objO.focus();
                return false;
            }
        }
    }
    else{
        var strB;
        if(objO.type=='password'){
            strB=chkPwd(objO,arrA);

        }
        else{
            strB=chkDateSE(objO,arrA);
        }

        if(strB){
            //objO.select();
        	el.style.background=pub_err_bakground;
            //alert(strB);
			document.getElementById('_tdSearchResult').style.color = 'red';
			document.getElementById('_tdSearchResult').innerHTML = '查詢失敗：' + strB;
            objO.focus();
            return false;
        }
    }

    return true;
}

function CheckInput_My_Main(event,objO,arrA,arrB,arrC){
	event = event || window.event;
	if (event.target) {
		el = event.target; 
	}else if (event.srcElement) {
		el = event.srcElement;
	}
	
    if(objO.type!=undefined){
        objO.value=Function_TrimLeft(objO.value);
        objO.value=Function_TrimRight(objO.value);
    }
    var arrILen = arrA.length;

    var name=arrB;
    if(arrC!=undefined){
        name=arrC;
    }

    if(!isNaN(arrILen)){
        for(var i=0;i<arrILen;i++){
            var strB;
            if (arrA[i]=='Len' || arrA[i]=='Num2'){
                strB = eval(arrA[i])(objO,arrB);
            }else{
                strB = eval(arrA[i])(objO);
            }
            if(arrA[i]=='Pid'){
                if(strB){
                    name.replace(/[\s]+/g, "");
                    if(confirm(name + "格式不正確是否繼續執行？")){
                        strB = false;
                    }
                }
            }
            if(strB){
                el.style.background=pub_err_bakground;
                if(objO.type=='text' || objO.type=='password' || objO.type=='textarea'){
                    objO.style.background=pub_err_bakground;
                    objO.select();
                }
                if(objO.type=='select-one'){
                    objO.style.background=pub_err_bakground;
                }
                if(name.replace(/[\s]+/g, "") == "") {
                    //alert(strB);
    				document.getElementById('_tdSearchResult').style.color = 'red';
    				document.getElementById('_tdSearchResult').innerHTML = '查詢失敗：' + strB;
                }
                else {
                    //alert(name + strB.replace("此", ""));
    				document.getElementById('_tdSearchResult').style.color = 'red';
    				document.getElementById('_tdSearchResult').innerHTML = '查詢失敗：' + name + strB.replace("此", "");
                }
                objO.focus();
                return false;
            }
        }
    }
    else{
        var strB;
        if(objO.type=='password'){
            strB=chkPwd(objO,arrA);

        }
        else{
            strB=chkDateSE(objO,arrA);
        }

        if(strB){
            //objO.select();
            el.style.background=pub_err_bakground;
            if(name.replace(/[\s]+/g, "") == "") {
                //alert(strB);
				document.getElementById('_tdSearchResult').style.color = 'red';
				document.getElementById('_tdSearchResult').innerHTML = '查詢失敗：' + strB;
            }
            else {
                //alert(name + strB.replace("此", ""));
				document.getElementById('_tdSearchResult').style.color = 'red';
				document.getElementById('_tdSearchResult').innerHTML = '查詢失敗：' + name + strB.replace("此", "");
            }
            objO.focus();
            return false;
        }
    }

    return true;
}


function Nul(objO){
    return CheckInput_CheckNull(objO);
}
function Mal(objO){
    return CheckInput_CheckMailAddress(objO);
}
function Num(objO){
    return CheckInput_CheckInteger(objO);
}
function Num2(objO,arr){
    return CheckInput_CheckNum2(objO,arr);
}
function Int(objO){
    return CheckInput_CheckInt(objO);
}
function Nat(objO){
    return CheckInput_CheckNat(objO);
}
function Dat(objO){
    return CheckInput_DateFormat(objO);
}
function RocDat(objO){
    return CheckInput_RocDateFormat(objO);
}
function Crd(objO){
    return CheckInput_checkCrd(objO);
}
function chkDateSE(objO1,objO2){
    return CheckInput_CheckDateSE(objO1,objO2);
}
function chkPwd(objO1,objO2){
    CheckInput_CheckTwoFieldPwd(objO1,objO2);
}
function Pid(objO){
    return fnIDChecker(objO);
}
function Pwd(objO){
    return CheckInput_CheckPwdType(objO);
}
function Mon(objO){
    return CheckInput_DateFormat1(objO);
}
//檢查是否為數字********************************************************

function CheckInput_CheckInteger(objO){
    if(isNaN(objO.value)){
        return "此欄必須是數字！";
    }
    else{
        return false;
    }
}

//檢查是否為數字,及整數部份與小數部份的位數********************************************************

function CheckInput_CheckNum2(objO,arr){

    if(isNaN(objO.value)){
        return "此欄必須是數字！";
    }

    var i = objO.value.indexOf(".");

    if(arr[0] != null){
        if((i == -1 && objO.value.length > arr[0]) || (i != -1 && i > arr[0])){
            return "此欄數字整數部份長度不能超過"+arr[0]+"位！";
        }
    }
    if(arr[1] != null && i != -1){
        if((objO.value.length - i - 1) > arr[1]){
            return "此欄數字小數部份長度不能超過"+arr[1]+"位！";
        }
    }

    return false;
}

//檢查是否為整數********************************************************

function CheckInput_CheckInt(objO){
    if(isNaN(objO.value) || objO.value.indexOf(".") >= 0){
        return "此欄必須是整數！";
    }
    else{
        return false;
    }
}

//檢查是否為正整數********************************************************

function CheckInput_CheckNat(objO){
    if(isNaN(objO.value) || (objO.value <= 0 && objO.value!="") || objO.value.indexOf(".") >= 0){
        //  alert(0);
        return "此欄必須是正整數！";
    }
    else{
        return false;
    }
}



//檢查是否為mail標準格式********************************************************

function CheckInput_CheckMailAddress(objO){

    if (objO.value != ''){
        if(objO.value.indexOf("@",0)==-1 || objO.value.indexOf(".",0)==-1){
            return "錯誤的mail格式！";
        }
        else{
            return false;
        }
    }

}



//檢查是否空值********************************************************

function CheckInput_CheckNull(objO){
    if(objO.value==null || objO.value==""){
        return "此欄位不可空值！";
    }
    else{
        return false;
    }
}



//檢查欄位是否為 0~9 或 a~z 或 A~Z"********************************************************

function CheckInput_CheckPwdType(objO){
    var baseStr="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(var i=0;i<objO.value.length;i++){
        if(baseStr.indexOf(objO.value.substr(i,1))==-1){
            return "密碼欄位格式需數字或字母夾雜";
        }
    }
    return false;
}



//檢查兩欄位密碼是否相符********************************************************

function CheckInput_CheckTwoFieldPwd(objO1,objO2){

    if (objO1.value == '' || objO2.value ==''){
        if(objO1.value == ''){
            objO1.style.background='tomato';
            objO1.select();
        }
        if(objO2.value == ''){
            objO2.style.background='tomato';
            objO2.select();
        }
        return "此欄不可為空值";
    }
    else if(objO1.value.length < 8){
        objO1.style.background='tomato';
        objO1.select();
        return "密碼長度少於八碼";
    }
    else if(objO1.value != objO2.value){
        objO1.style.background='tomato';
        objO2.style.background='tomato';
        objO2.select();
        return "密碼和確認密碼不符";

    }
    else{
        var pwd = objO1.value;
        if(pwd.match(/\d/) && pwd.match(/[a-zA-Z]/i) && !pwd.match(/[^a-zA-Z0-9]/)){
            return false;
        }
        objO1.style.background='tomato';
        objO1.select();
        return "密碼欄位格式需數字及大小寫字母夾雜";
    }
}



//檢查畫面上checkbox欄位是否有勾選********************************************************

function CheckInput_ConfirmCheckBox(objO){
	event = event || window.event;
	if (event.target) el = event.target; else if (event.srcElement) el = event.srcElement;
	
    var chkflag = true;
    for (var i=0;i<el.form.elements.length;i++){
        var e = el.form.elements[i];
        if(e.type=='checkbox' && e.checked){
            chkflag = false;
        //return false;
        }
    }
    if(chkflag){
        for (var i=0;i<el.form.elements.length;i++){
            var e = el.form.elements[i];
            if(e.type=='checkbox'){
                e.style.background='tomato';
            }
        }
        return "資料未勾選！";
    }
    if(el.value=='刪除'){
        if(confirm('確認刪除！')){
            return false;
        }else{
            return "刪除已取消！";
        }
    }
    return false;
}



//將所傳入的formObj中所有的checkbox勾選起來********************************************************

function CheckInput_CheckBoxSelectAll(objF){
    for (var i=0;i<objF.elements.length;i++){
        var e = objF.elements[i];
        if (e.type=='checkbox')
            e.checked=true;
    }
}

//檢查日期起迄兩欄位********************************************************

function CheckInput_CheckDateSE(objO1,objO2){
    objO1.value=Function_DeleteEscapeMark(objO1.value);
    objO2.value=Function_DeleteEscapeMark(objO2.value);

    if (objO1.value != '' && objO2.value ==''){
        objO2.style.background=pub_err_bakground;
        objO2.select();
        return "此欄不可為空值！";
    }
    else if (objO1.value == '' && objO2.value !=''){
        objO1.style.background=pub_err_bakground;
        objO1.select();
        return "此欄不可為空值！";
    }
    else if (objO1.value != '' && objO2.value !=''){
        if(objO2.value<objO1.value){
            objO1.style.background=pub_err_bakground;
            objO2.style.background=pub_err_bakground;
            objO1.select();
            return "迄日必需大於起日！";
        }
    }
    else{
        return false;
    }
}


//日期標準格式（西元年月日-YYYYMMDD）

function CheckInput_DateFormat(objO){
    if(objO.value!=''){
        if(objO.value.length!=8){
            return "日期格式有誤！";
        }
    }
    if(Data_Check(objO.value,'YMD','F')){
        return false;
    }
    else{
        if(objO.value!='')
            return "日期格式有誤！";
    }
}

//日期標準格式（民國年月日-YYYMMDD）

function CheckInput_RocDateFormat(objO){
    if(objO.value!=''){
        if(isNaN(objO.value)){
            return "日期格式有誤(範例:0950101)！";
        }
        if(objO.value.length!=7){
            return "日期格式有誤(範例:0950101)！";
        }
    }
    if(Data_Check(objO.value,'YMD','')){
        return false;
    }
    else{
        if(objO.value!='')
            return "日期格式有誤！";
    }
}

//檢核日期;tmpDate:日期字串,check_type:日期格式(YM/MD/YMD),editType:年表示法(西元年"F"/民國年default)

function Data_Check(tmpDate,check_type,editType){
    var tmpYear,tmpMonth,tmpDay;
    var d = new Date();
    tmpDate = Function_DeleteEscapeMark(tmpDate);
    if( isNaN(tmpDate) ) return false;

    if( editType == "F" ){
        if(check_type == "YM"){
            tmpYear = tmpDate.substr(0,4);
            tmpMonth = tmpDate.substr(4,2);
            tmpDay = 1;
        }
        else if(check_type == "MD"){
            tmpYear = d.getYear();
            tmpMonth = tmpDate.substr(0,2);
            tmpDay = tmpDate.substr(2,2);
        }
        else{
            tmpYear = tmpDate.substr(0,4);
            tmpMonth = tmpDate.substr(4,2);
            tmpDay = tmpDate.substr(6,2);
        }
    }
    else{
        if(check_type == "YM"){
            tmpYear = parseFloat(tmpDate.substr(0,3))+1911;
            tmpMonth = tmpDate.substr(3,2);
            tmpDay = 1;
        }
        else if(check_type == "MD"){
            tmpYear = parseFloat(d.getYear());
            tmpMonth = tmpDate.substr(0,2);
            tmpDay = tmpDate.substr(2,2);
        }
        else{
            tmpYear = parseFloat(tmpDate.substr(0,3))+1911;
            tmpMonth = tmpDate.substr(3,2);
            tmpDay = tmpDate.substr(5,2);
        }
    }

    if(tmpYear < 2000) tmpYear -= 1900;
    var tempMonth = parseFloat(tmpMonth)-1;
    d.setYear(tmpYear);
    d.setMonth(tempMonth);
    d.setDate(tmpDay);

    if(tmpYear == d.getYear(d.setYear(tmpYear)) && parseFloat(tmpMonth) == d.getMonth(d.setMonth(tempMonth))+1 && parseFloat(tmpDay) == d.getDate(d.setDate(tmpDay)))
        return true;
    else return false;

}

//信用卡檢核
function CheckInput_checkCrd(objO){

    var arrCard=objO.value.split("\n");
    var re=/ /gi;
    //var fieldID = event.srcElement.id;
    //var strCard = event.srcElement.value;
    var fx_seq="21212121212121212";
    var fx_beg,fx_chk,fx_chr ;
    var strTemp;
    var i,j,k ;

    for(k=0;k<arrCard.length;k++){
        var strCard = arrCard[k].substring(0,16).replace(re,"");
        var fx_len = strCard.length;
        try{
            //if (strCard.substr(0,1) >= "0" && strCard.substr(0,1) <= "3") return true; //不檢核
            if (fx_len%2 == 0){
                fx_beg = 1 ;
            }
            else{
                fx_beg = 2 ;
            }

            i = 1;
            j = fx_beg-1;
            fx_chk = 0;

            for (i=0;i<fx_len;i++){
                fx_chr = parseInt(strCard.substr(i,1)) * parseInt(fx_seq.substr(j,1));

                if (fx_chr >= 10){
                    strTemp = fx_chr.toString() ;
                    fx_chr = parseInt(strTemp.substr(0,1)) + parseInt(strTemp.substr(1,1)) ;
                }

                fx_chk = fx_chk + fx_chr ;
                j ++;
            }

            if(fx_chk%10==0){
                return false;
            }
            else{
                //throw e;
                return "信用卡號有誤！\n"+strCard;
            }

        }
        catch (e){
        //document.all.item(fieldID).focus();
        //MessageControl_lblMsg.innerText="信用卡號有誤!!";
        }
    }

}


//檢查身分證欄位是否為正確"********************************************************
function fnIDChecker(objO) {
    var strID = objO.value;
    var Code = "";
    var str = "";

    if(strID !=""){
        // 長度須為 10
        if(!(strID.length == 10)) {
            return "長度須為 10";
        }
        // 第一位須為 A~Z
        Code = strID.substring(0, 1).toUpperCase().charCodeAt();
        if(Code < 65  || Code > 90) {
            return "第一位須為 A~Z";
        }

        // 第二位須為 1 或 2
        if(strID.substring(1, 2) != "1" && strID.substring(1, 2) != "2") {
            return "第二位須為 1 或 2";
        }
        // 第三位以後須為數字
        if(isNaN(strID.substring(2, 10))) {
            return "第三位以後須為數字";
        }
        //第一位轉換成大寫
        objO.value = strID.substring(0, 1).toUpperCase() + strID.substring(1, 10);
    }

    //身分證公式計算
    var x1 = new Array(1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3);
    var x2 = new Array(0, 1, 2, 3, 4, 5, 6, 7, 4, 8, 9, 0, 1, 2, 5, 3, 4, 5, 6, 7, 8, 9, 2, 0, 1, 3);
    var index = strID.substring(0, 1).toUpperCase().charCodeAt() - 65;
    sum = x1[index] + x2[index] * 9;
    for(index=2; index <= 9; index++){
        sum = sum + (10 - index) * Number(strID.substring(index-1, index));
    }
    sum = sum + Number(strID.substring(9, 10));
    // 檢查是否為正確的號碼
    if((sum%10) != 0) {
        return "第三位以後號碼有誤";
    }
    return false;
}

//日期標準格式（民國年月日-YYYYMM）*************************************

function CheckInput_DateFormat1(objO){
    if(objO.value!=''){
        if(objO.value.length!=5){
            return "日期格式有誤！";
        }
    }
    if(Data_Check(objO.value,'YM','')){
        return false;
    }
    else{
        if(objO.value!='')
            return "日期格式有誤！";
    }
}

//按鈕及欄位背景色恢復(20041117)"********************************************************
function resetFormColor(objF){
    for (var i=0;i<objF.elements.length;i++){
        var e=objF.elements[i];
        if(e.type=='text' || e.type=='checkbox' || e.type=='radio' || e.type=='select-one' || e.type=='select-multiple'){
            e.style.background='white';
        //alert(e.type);
        }else if(e.type=='button' && e != objF.pageUp && e!=objF.pageDown){
            e.style.background='lightgrey';
        }
    }
}

//<input name="btnReset" id="btnReset" type="button" value="重設條件" onclick="javascript:resetFormColor(this.form);Clear()" ></font>


//清除Form上所有TextBox的頭尾空白
function trimFormTextBox(objF){
    var elementsLen = objF.elements.length; //objF.elements.length
    for (var i=0;i<elementsLen;i++){
        var e=objF.elements[i];

        //if(e.type=='text' || e.type=='textarea'){
        //不處理textArea
        if(e.type=='text'){
            e.value = Trim(e.value);
        }
    }
}


function Trim(s)
{
    // Remove leading spaces and carriage returns

    while ((s.substring(0,1) == ' ') || (s.substring(0,1) == '\n') || (s.substring(0,1) == '\r'))
    {
        s = s.substring(1,s.length);
    }

    // Remove trailing spaces and carriage returns

    while ((s.substring(s.length-1,s.length) == ' ') || (s.substring(s.length-1,s.length) == '\n') || (s.substring(s.length-1,s.length) == '\r'))
    {
        s = s.substring(0,s.length-1);
    }
    return s;
}

//Added start by MSN...

//檢察傳入的畫面元素中輸入字符數有沒有超過限制******************************************************
function Len(obj0,para){
    return CheckInput_CheckTextLength(obj0,para);
}
//檢察傳入的畫面元素中輸入字符數有沒有超過限制******************************************************
function CheckInput_CheckTextLength(obj0,length){
    if(CheckInput_CaculateStringLength(obj0.value)>length){
        //return '此欄位長度超過上限';//DELETE BY WANGZHAOYANG DT:03/19
        //為了能夠提示用戶在輸入字符超長時候告知輸入超長了多少字或字節
        //ADD BY WANGZHAOYANG DT"03/19
        var allnum = parseInt(CheckInput_CaculateStringLength(obj0.value))-parseInt(length);
        var chinanum = parseInt(allnum/4);

        if(chinanum < (allnum/4)){
            chinanum = chinanum+1;
        }

        return '此欄位長度超過上限!\n目前超出'+chinanum+'個中文 或 '+allnum+'個字元';

    //END BY
    }else
        return false;
}
//返回String長度
function CheckInput_CaculateStringLength(input){
    //by guoyang. Jul.22nd,2005.
    var length=0;
    var reg=/^[\u0391-\uFFE5]+$/
    while(input.length>0){
        var achar=input.substring(0,1);
        if (reg.test(achar)){
            length+=4;
        }else{
            length++;
        }
        input=input.substring(1);
    }
    return length;
}
//檢查（Single Event） 修改於2005.8.1,為了將檢核長度的功能加入到原先的js函數中去,將上部原有的js函數copy來rename,
//原先呼叫CheckInput_Main的部份按情況而定呼叫CheckInput_Main_MSN,  多增加一個傳入參數,為需要檢核的長度上限.
function CheckInput_Main_MSN(objO,arrA,para){
	event = event || window.event;
	if (event.target) el = event.target; else if (event.srcElement) el = event.srcElement;
	
    if(objO.type!=undefined){
        objO.value=Function_TrimLeft(objO.value);
        objO.value=Function_TrimRight(objO.value);
    }

    var arrILen = arrA.length;
    if(!isNaN(arrILen)){
        for(var i=0;i<arrILen;i++){
            var strB;
            if ((''+para!='undefined')&&(arrA[i]=='Len' || arrA[i]=='Num2')){//發現檢核長度的需求,調用特殊的函數
                strB=eval(arrA[i])(objO,para);
            }else{
                strB=eval(arrA[i])(objO);
            }
            if(strB){
                el.style.background=pub_err_bakground;
                if(objO.type=='text' || objO.type=='password' || objO.type=='file' || objO.type=='textarea'){
                    objO.style.background=pub_err_bakground;
                    objO.select();
                }
                if(objO.type=='select-one'){
                    objO.style.background=pub_err_bakground;
                }
                //alert(strB);
				document.getElementById('_tdSearchResult').style.color = 'red';
				document.getElementById('_tdSearchResult').innerHTML = '查詢失敗：' + strB;
                return false;
            }
        }
    }
    else{
        var strB;
        if(objO.type=='password'){
            strB=chkPwd(objO,arrA);
        }
        else{
            strB=chkDateSE(objO,arrA);
        }
        if(strB){
            //objO.select();
            el.style.background=pub_err_bakground;
            //alert(strB);
			document.getElementById('_tdSearchResult').style.color = 'red';
			document.getElementById('_tdSearchResult').innerHTML = '查詢失敗：' + strB;
            return false;
        }
    }
    return true;
}


/******************************************************/
//前端檢核函數
//最後更新者：guoyang
//最後更新日：2005/8/3
/******************************************************/

addEvent(window, 'load', function()
{

    //因為以下處理會照成前端JSP在load時,效率很差,而且好像現在已經沒有用了~~
    //所以先用return處理...希望有朝一日可以拿掉...
    return true;

    //以下處理畫面的欄位的最大值問題,這一段檢查的是按英文/數字類型的長度檢核(中\英\數都當作1個單位長度)
    //本段是對應LengthLimitEnglishNoSpan屬性,此屬性使用時不會對畫面的<span></span>標籤採取行動
    var counts = document.getElementsNeedLimitLengthEnglishNoSpan();
    var i, count, matches, countHolder;
    for (i=0; i<counts.length; i++)
    {
        count = counts[i];
        var ss=count.className.split(';');
        var maxlength=0;
        for (var j=0;j<ss.length;j++)
        {
            if (ss[j].indexOf('LengthLimitEnglishNoSpan=')>-1)
            {
                maxlength=ss[j].substring(25);
                break;
            }
        }
        if (isNaN(maxlength))
        {
            //alert('畫面格式錯誤.\n錯誤元素為:'+count.name+',其 LengthLimitEnglishNoSpan 屬性必須為數字!');
			document.getElementById('_tdSearchResult').style.color = 'red';
			document.getElementById('_tdSearchResult').innerHTML = '查詢失敗：' + '畫面格式錯誤.\n錯誤元素為:'+count.name+',其 LengthLimitEnglishNoSpan 屬性必須為數字!';
            return;
        }else if (maxlength.indexOf('.')>-1)
        {
            //alert('畫面格式錯誤.\n錯誤元素為:'+count.name+',其 LengthLimitEnglishNoSpan 屬性必須為整數!');
			document.getElementById('_tdSearchResult').style.color = 'red';
			document.getElementById('_tdSearchResult').innerHTML = '查詢失敗：' + '畫面格式錯誤.\n錯誤元素為:'+count.name+',其 LengthLimitEnglishNoSpan 屬性必須為整數!';
            return;
        }
        count.maxVal = maxlength;
        count.onkeyup = function()
        {
            //alert(this.value.length +'>'+ this.maxVal)
            if (this.value.length > this.maxVal)
                this.value = this.value.substring(0, this.maxVal);
        }
    }
    //以下處理畫面的欄位的最大值問題,這一段檢查的是按中文類型的長度檢核(中文當做2個單位,英文\數字當作1個單位長度)
    //本段是對應LengthLimitChineseNoSpan屬性,此屬性使用時不會對畫面的<span></span>標籤採取行動
    counts = document.getElementsNeedLimitLengthChineseNoSpan();
    //var i, count, matches, countHolder;
    for (i=0; i<counts.length; i++)
    {
        count = counts[i];
        //alert(count)
        var ss=count.className.split(';');
        var maxlength=0;
        for (var j=0;j<ss.length;j++)
        {
            if (ss[j].indexOf('LengthLimitChineseNoSpan=')>-1)
            {
                maxlength=ss[j].substring(25);
                break;
            }
        }
        if (isNaN(maxlength))
        {
            //alert('畫面格式錯誤.\n錯誤元素為:'+count.name+',其 LengthLimitChineseNoSpan 屬性必須為數字!');
			document.getElementById('_tdSearchResult').style.color = 'red';
			document.getElementById('_tdSearchResult').innerHTML = '查詢失敗：' + '畫面格式錯誤.\n錯誤元素為:'+count.name+',其 LengthLimitChineseNoSpan 屬性必須為數字!';
            return;
        }else if (maxlength.indexOf('.')>-1)
        {
            //alert('畫面格式錯誤.\n錯誤元素為:'+count.name+',其 LengthLimitChineseNoSpan 屬性必須為整數!');
			document.getElementById('_tdSearchResult').style.color = 'red';
			document.getElementById('_tdSearchResult').innerHTML = '查詢失敗：' + '畫面格式錯誤.\n錯誤元素為:'+count.name+',其 LengthLimitChineseNoSpan 屬性必須為整數!';
            return;
        }
        count.maxVal = maxlength;
        count.onkeyup = function()
        {
            //alert(CheckInput_CaculateStringLength(this.value)+','+this.maxVal);
            if (CheckInput_CaculateStringLength(this.value) > this.maxVal){
                //alert('this.value='+this.value+'\nacceptmaxnum='+acceptmaxnum)
                var acceptmaxnum=0;
                for (var number=0;number<this.value.length;number++ )
                {
                    if (CheckInput_CaculateStringLength(this.value.substring(0,number))<=this.maxVal)
                    {
                        if (CheckInput_CaculateStringLength(this.value.substring(0,number+1))>this.maxVal)
                        {
                            acceptmaxnum=number;
                            break;
                        }
                    }
                }
                this.value = this.value.substring(0, acceptmaxnum);
            }
        }
    }

    //以下處理畫面的欄位的最大值問題,這一段檢查的是按英文/數字類型的長度檢核(中\英\數都當作1個單位長度)
    //本段是對應LengthLimitEnglishSpan屬性,此屬性使用時必須有對應的用來顯示剩餘字數的同名的<span></span>
    counts = document.getElementsNeedLimitLengthEnglishSpan();
    //var i, count, matches, countHolder;
    for (i=0; i<counts.length; i++)
    {
        count = counts[i];
        var ss=count.className.split(';');
        var maxlength=0;
        for (var j=0;j<ss.length;j++)
        {
            if (ss[j].indexOf('LengthLimitEnglishSpan=')>-1)
            {
                maxlength=ss[j].substring(23);
                break;
            }
        }
        if (isNaN(maxlength))
        {
            //alert('畫面格式錯誤.\n錯誤元素為:'+count.name+',其LengthLimitEnglishSpan屬性必須為數字!');
			document.getElementById('_tdSearchResult').style.color = 'red';
			document.getElementById('_tdSearchResult').innerHTML = '查詢失敗：' + '畫面格式錯誤.\n錯誤元素為:'+count.name+',其LengthLimitEnglishSpan屬性必須為數字!';
            return;
        }else if (maxlength.indexOf('.')>-1)
        {
            //alert('畫面格式錯誤.\n錯誤元素為:'+count.name+',其LengthLimitEnglishSpan屬性必須為整數!');
			document.getElementById('_tdSearchResult').style.color = 'red';
			document.getElementById('_tdSearchResult').innerHTML = '查詢失敗：' + '畫面格式錯誤.\n錯誤元素為:'+count.name+',其LengthLimitEnglishSpan屬性必須為整數!';
            return;
        }
        count.maxVal = maxlength;
        count.holder = document.getElementById(''+count.name);
        var hasspan=(''+count.holder.type)=='undefined';//判斷是否存在此<span>
        if (!hasspan) {
            //alert('畫面格式錯誤.\n錯誤元素為:'+count.name+',其LengthLimitEnglishSpan時必須有同id的<span></span>!');
			document.getElementById('_tdSearchResult').style.color = 'red';
			document.getElementById('_tdSearchResult').innerHTML = '查詢失敗：' + '畫面格式錯誤.\n錯誤元素為:'+count.name+',其LengthLimitEnglishSpan時必須有同id的<span></span>!';
            return;
        }
        if (count.holder)
        {
            if (hasspan)//存在此<span>
                count.holder.innerHTML = count.maxVal - count.value.length;
            count.onkeyup = function()
            {
                if (this.value.length > this.maxVal)
                    this.value = this.value.substring(0, this.maxVal);
                if (hasspan)////存在此<span>
                    this.holder.innerHTML = this.maxVal - this.value.length;
            }
        }
    }
    //以下處理畫面的欄位的最大值問題,這一段檢查的是按中文類型的長度檢核(中文當做2個單位,英文\數字當作1個單位長度)
    //本段是對應 LengthLimitChineseSpan 屬性,此屬性使用時必須有對應的用來顯示剩餘字數的同名的<span></span>
    counts = document.getElementsNeedLimitLengthChineseSpan();
    //var i, count, matches, countHolder;
    for (i=0; i<counts.length; i++)
    {
        count = counts[i];
        var ss=count.className.split(';');
        var maxlength=0;
        for (var j=0;j<ss.length;j++)
        {
            if (ss[j].indexOf('LengthLimitChineseSpan=')>-1)
            {
                maxlength=ss[j].substring(23);
                break;
            }
        }
        if (isNaN(maxlength))
        {
            //alert('畫面格式錯誤.\n錯誤元素為:'+count.name+',其LengthLimitChineseSpan屬性必須為數字!');
			document.getElementById('_tdSearchResult').style.color = 'red';
			document.getElementById('_tdSearchResult').innerHTML = '查詢失敗：' + '畫面格式錯誤.\n錯誤元素為:'+count.name+',其LengthLimitChineseSpan屬性必須為數字!';
            return;
        }else if (maxlength.indexOf('.')>-1)
        {
            //alert('畫面格式錯誤.\n錯誤元素為:'+count.name+',其LengthLimitChineseSpan屬性必須為整數!');
			document.getElementById('_tdSearchResult').style.color = 'red';
			document.getElementById('_tdSearchResult').innerHTML = '查詢失敗：' + '畫面格式錯誤.\n錯誤元素為:'+count.name+',其LengthLimitChineseSpan屬性必須為整數!';
            return;
        }
        count.maxVal = maxlength;
        count.holder = document.getElementById(''+count.name);
        var hasspan=(''+count.holder.type)=='undefined';//判斷是否存在此<span>
        //alert(hasspan)
        if (!hasspan) {
            //alert('畫面格式錯誤.\n錯誤元素為:'+count.name+',其 LengthLimitChineseSpan 時必須有同id的<span></span>!');
			document.getElementById('_tdSearchResult').style.color = 'red';
			document.getElementById('_tdSearchResult').innerHTML = '查詢失敗：' + '畫面格式錯誤.\n錯誤元素為:'+count.name+',其 LengthLimitChineseSpan 時必須有同id的<span></span>!';
            return;
        }
        if (count.holder)
        {
            if (hasspan)//存在此<span>
                count.holder.innerHTML = count.maxVal - CheckInput_CaculateStringLength(count.value);
            count.onkeyup = function()
            {
                //alert(CheckInput_CaculateStringLength(this.value)+','+this.maxVal);
                if (CheckInput_CaculateStringLength(this.value) > this.maxVal){
                    //alert('this.value='+this.value+'\nacceptmaxnum='+acceptmaxnum)
                    var acceptmaxnum=0;
                    for (var number=0;number<this.value.length;number++ )
                    {
                        if (CheckInput_CaculateStringLength(this.value.substring(0,number))<=this.maxVal)
                        {
                            if (CheckInput_CaculateStringLength(this.value.substring(0,number+1))>this.maxVal)
                            {
                                acceptmaxnum=number;
                                break;
                            }
                        }
                    }
                    this.value = this.value.substring(0, acceptmaxnum);
                }

                if (hasspan)//存在此<span>
                    this.holder.innerHTML = this.maxVal - CheckInput_CaculateStringLength(this.value);
            }
        }
    }


});


document.getElementsNeedLimitLengthEnglishNoSpan = function ()
{
    var         my_array = document.getElementsByTagName("*");
    var         retvalue = new Array();
    var        i;
    var        j;

    for (i = 0, j = 0; i < my_array.length; i++)
    {
        var theclassname=''+my_array[i].className;
        var reg=/LengthLimitEnglishNoSpan=/
        if (reg.test(theclassname))
        {
            retvalue[j++] = my_array[i];
        }
    }
    return retvalue;
}

document.getElementsNeedLimitLengthChineseNoSpan = function ()
{
    var         my_array = document.getElementsByTagName("*");
    var         retvalue = new Array();
    var        i;
    var        j;

    for (i = 0, j = 0; i < my_array.length; i++)
    {
        var theclassname=''+my_array[i].className;
        var reg=/LengthLimitChineseNoSpan=/
        if (reg.test(theclassname))
        {
            retvalue[j++] = my_array[i];
        }
    }
    return retvalue;
}

function addEvent(obj, evType, fn)
{

    if (obj.addEventListener)
    {
        obj.addEventListener(evType, fn, true);
        return true;
    }
    else if (obj.attachEvent)
    {
        var r = obj.attachEvent("on"+evType, fn);
        return r;
    }
    else
    {
        return false;
    }
}

document.getElementsNeedLimitLengthEnglishSpan = function ()
{
    var         my_array = document.getElementsByTagName("*");
    var         retvalue = new Array();
    var        i;
    var        j;

    for (i = 0, j = 0; i < my_array.length; i++)
    {
        var theclassname=''+my_array[i].className;
        var reg=/LengthLimitEnglishSpan=/
        if (reg.test(theclassname))
        {
            retvalue[j++] = my_array[i];
        }
    }
    return retvalue;
}

document.getElementsNeedLimitLengthChineseSpan = function ()
{
    var         my_array = document.getElementsByTagName("*");
    var         retvalue = new Array();
    var        i;
    var        j;

    for (i = 0, j = 0; i < my_array.length; i++)
    {
        var theclassname=''+my_array[i].className;
        var reg=/LengthLimitChineseSpan=/
        if (reg.test(theclassname))
        {
            retvalue[j++] = my_array[i];
        }
    }
    return retvalue;
}

//返回String中所含有的中文字數
function MSN_CaculateChineseCharacter(input){
    var num=0;
    var reg=/^[\u0391-\uFFE5]+$/
    while(input.length>0){
        var achar=input.substring(0,1);
        if (reg.test(achar)){
            num++;
        }
        input=input.substring(1);
    }
    return num;
}
//將元素的鼠標樣式改成手狀:
function MSN_ChangeStateToHand(obj){
    obj.style.cursor='hand';
}

//檢查是否為負數********************************************************
function Pos(objO){
    return CheckInput_CheckNotNegative(objO);
}

//檢查是否為負數********************************************************
function CheckInput_CheckNotNegative(objO){
    if (isNaN(objO.value)){
        return "此欄位必須為數字!";
    }else if ((''+objO.value).indexOf('-')>-1){
        return '此欄位不能為負數!'
    }else{
        return false;
    }
}


//檢查上傳檔案之副檔名
function CheckUploadFile(filename,fileExt) { 
	var tmp = fileExt.replace(/\,/g,"|").toLowerCase(); // 允許的圖片副檔名
	//alert("tmp = "+tmp);
	var regex = new RegExp("/|"+tmp+"|/");
  	//alert("filename"+filename); 
  	//alert(regex.test(filename.toLowerCase()));
	if (!regex.test(filename.toLowerCase())) {
		//alert("請檢查上傳檔案是否合法"+filename);
		document.getElementById('_tdSearchResult').style.color = 'red';
		document.getElementById('_tdSearchResult').innerHTML = '查詢失敗：' + "請檢查上傳檔案是否合法"+filename;
		return false;
 	}	
	return true;
}

//檢查檔案大小

function checkSize() {
    //FOR IE FIX
    if ($.browser.msie) {
        fileSize = this.fileSize;
    }

    if (fileSize > SizeLimit) {
        Message((fileSize / 1024).toPrecision(4), (SizeLimit / 1024).toPrecision(2));
    } else {
        document.FileForm.submit();
    }
}


//Added end by MSN...
