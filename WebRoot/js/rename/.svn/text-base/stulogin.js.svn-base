function mouseoverlogin(){
	document.login.src="images/user/login2.png";
}
function mouseoutlogin(){
	document.login.src="images/user/login1.png";
}
function focusInput(id){
	var obj = document.getElementById(id);
	obj.style.backgroundColor="#666";
}
function blurInput(id){
	var obj = document.getElementById(id);
	obj.style.backgroundColor="#444";
}
function loginInit(){
	var clientW = window.screen.width;
	var clientH = window.screen.height;
	if(clientW < clientH){
		document.getElementById("loginWrap").style.width = "100%";
	}else{
		document.getElementById("loginWrap").style.width = "33%";
	}
}

function doLogin(){
	var userName = $("#uName").val();
	var userPwd = $("#uPwd").val();
	
	console.log(userName + " " + userPwd);
	if(userName=="" || userPwd == ""){
		alert("Please enter the account name and password");
	}else{
		$.post('action/json/stu_login',{"stuid":userName,"pwd":userPwd},function(data) {					
			if(data.message == "fail"){
				alert("There is no such account");
			}else{
				//alert("success");
				window.location.href="action/jsp/page_goBuildRename";
			}
		},"json");
	}
}

