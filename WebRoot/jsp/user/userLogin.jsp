<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>login</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link rel="stylesheet" type="text/css" href="css/user.css">
	<script type="text/javascript" src="js/jquery/jquery-1.8.2.min.js"></script>
  </head>
  <body onload = "loginInit()">
  	<script type="text/javascript" src="js/user/user.js"></script>
  	<script type="text/javascript">  
		document.onkeydown = function(e) {  
		    var ev = (typeof event!= 'undefined') ? window.event : e;  
		    if(ev.keyCode == 13) {  
		        doLogin();  
		    }  
		}  
	</script>  
  	<div class="outerWrapper">
		<ul class="imgList">
			<li><img src="images/loginBg/1.jpg" /></li>
			<li><img src="images/loginBg/2.jpg" /></li>
			<li><img src="images/loginBg/3.jpg" /></li>
			<li><img src="images/loginBg/4.jpg" /></li>
			<li><img src="images/loginBg/5.jpg" /></li>
			<li><img src="images/loginBg/9.jpg" /></li>
			<li><img src="images/loginBg/6.jpg" /></li>
			<li><img src="images/loginBg/7.jpg" /></li>
			<li><img src="images/loginBg/8.jpg" /></li>
		</ul>
		<div class="cover"></div>
		<script>
			var switchSpeed = 3000;
			var fadeSpeed = 4000;
			setInterval(function(){
				$('img').last().fadeOut(fadeSpeed, function(){
					$(this).show().parent().prependTo($('ul'));
				});
			}, switchSpeed);
		</script>
	    <div id="loginWrap" class="wrapper">
			<div class="txt">Welcome</div>
			<div class="outer_wrapper" id="uname">
				<div class="un_inner_wrapper"></div>
				<input type="text" class="username" id="uName" onfocus="focusInput('uname')" onblur="blurInput('uname')" />
			</div>
			<div class="outer_wrapper" id="upwd">
				<div class="pwd_inner_wrapper"></div>
				<input type="password" class="password" id="uPwd" onfocus="focusInput('upwd')" onblur="blurInput('upwd')" />
			</div>
			<div class="txt" style="font-size:40px;width:100px;padding-top:10px;">- or -</div>
			<br/>
			<div class="buttons">
				<a onclick="doLogin()">Login</a>
				<a onclick="goreg()">Register</a>
	  		</div>
		</div>
	</div>
  </body>
</html>
