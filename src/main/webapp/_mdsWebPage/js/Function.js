//去除字串符號********************************************************

function Function_TrimMark(tmpString,strMark){
	var i = tmpString.length;
	var e_string="";
        var z = strMark.length;
        var flag = false;
	for(var j = 0 ; j < i ; j++){
            flag= false;
            for(var k = 0 ; k < z ; k++){
                if(tmpString.substr(j,1)==strMark.substr(k,1)){
                    flag = true;
                    break;
                }
            }

            if(!flag){
                e_string += tmpString.substr(j,1);
            }
	}
	return e_string;
}



//去除字串多餘的符號********************************************************

function Function_DeleteEscapeMark(tmpString){
	var i = tmpString.length;
	var e_string="";
	for(var j = 0 ; j < i ; j++){
		if(tmpString.substr(j,1)=="." || tmpString.substr(j,1)=="," || tmpString.substr(j,1)=="+" || tmpString.substr(j,1)=="-" || tmpString.substr(j,1)=="/" || tmpString.substr(j,1)==" " || tmpString.substr(j,1)==":" || tmpString.substr(j,1)=="'" || tmpString.substr(j,1)=="="){
		}
		else{
		   e_string += tmpString.substr(j,1);
		}
	}
	return e_string;
}



//去除空白字串********************************************************

function Function_Trim(str){
    return Function_TrimRight(Function_TrimLeft(str));
}



//去除左空白字串********************************************************

function Function_TrimLeft(originalStr){
	//var originalStr = new String(this);
	var newStr = originalStr;
	var len = originalStr.length;
	var x = 0;
	while(x<len){
		if(newStr.charAt(0)==" "){
			var newStr = newStr.substring(1,len);
		}
		x++;
	}
	return newStr;
}



//去除右空白字串********************************************************

function Function_TrimRight(originalStr){
	//var originalStr = new String(this);
	var newStr = originalStr;
	var len = originalStr.length;
	var x = len;
	while(x>0){
		if(newStr.charAt(x-1)==" "){
			var newStr = newStr.substring(0,x-1);
			x--;
		}
		else{
			break;
		}
	}
	return newStr;
}


//清除傳入對象中所有欄位的值********************************************************
/**
*跨瀏覽器問題:charmo1沒效果
*/
function old_Function_Clear(objObject) {
	for (var i=0; i<objObject.all.length; i++) {
		if(objObject.all[i].tagName.toUpperCase() == "SELECT") {
            if(!(objObject.all[i].disabled))
			    objObject.all[i].selectedIndex = 0;
        }else if(objObject.all[i].tagName.toUpperCase() == "INPUT") {
            if(objObject.all[i].type.toUpperCase() == "TEXT")
                objObject.all[i].value = "";
            else if(objObject.all[i].type.toUpperCase() == "CHECKBOX")
                objObject.all[i].checked = false;
		}else if(objObject.all[i].tagName.toUpperCase() == "TEXTAREA") {
            objObject.all[i].value = "";
		}
	}
}




/**
*將table內物件輸入資料清空，可跨瀏覽器:IE、Chrome、fireFox
*/
function Function_Clear(elementID){
 
		// 判斷瀏覽器
		var isFirefox = navigator.userAgent.search("Firefox") > -1; 
		var isOpera = navigator.userAgent.search("Opera") > -1; 
		var isSafari = navigator.userAgent.search("Safari") > -1;//Google瀏覽器是用這核心 		
		
		
			$("#" + elementID + " tr td :input").each(		
		
				function(){			
					//alert("MDS:" + $(this).attr('type'));
					switch($(this).attr('type')){
						case 'select-one':							 
							$(this).attr('selectedIndex', '-1');
							break;
						case 'radio':		 
							$(this).attr('checked', false);
							break;
						case 'checkbox':
							$(this).attr('checked', false);
							break;
						case 'text':		
							$(this).val("");
							break;
						case 'password':		
							$(this).val("");
							break;
						case 'textarea':	
							$(this).val("");
							break;
						case 'file':	
							if (/MSIE/.test(navigator.userAgent)) {
								$(this).replaceWith($(this).clone(true));
							} else {
								$(this).val('');
							}
							break; 						
						case undefined:
							if(isFirefox || isOpera || isSafari){
								//Firefox 的 select-one	
							} else {
								// 使用SOA之後加入的, 因Select抓不到									
								//$(this).find(":selected").text()				
							}
						break;
					}

			});
}



//本頁設置了一個隱藏的_filePath屬性用來存儲所要調閱的文件的路徑
//如果該值為空,證明文件調閱的按鈕沒有被點選,這時不會打開調閱的視窗
//點選文件調閱按鈕後,該屬性被賦值,則新開一個新視窗
function Function_giveMeFile(obj,w,h)
{
    if((obj.value=='')||(obj.value=='null')){
        return;
    }else{
        var LeftPosition = (screen.width)?(screen.width-w)/2:100;
 	    var TopPosition  = (screen.height)?(screen.height-h)/2:100;
	    var settings = 'width='+w+',height='+h+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',location=no,directories=no,status=no,menubar=yes,toolbar=yes,resizable=yes';
	    window.open(obj.value,"調閱資料",settings);
	    obj.value = "";
    }
}
	var SessionTime;

	function SessionTimeout(Time){
		SessionTime = Time;
		DisplaySessionTimeout();
	}
    function DisplaySessionTimeout()
    {
    	SessionTime = SessionTime - 1;
    	//document.getElementById("sessionTimeout").value =SessionTime;  
    	//
    	if (SessionTime >= 0){
    		setTimeout("DisplaySessionTimeout()", 1000);
        }else
        {
            alert("操作逾時, 請重新登入");
            window.top.location = '/fdkc119/LogOutServlet';
        }
   }
