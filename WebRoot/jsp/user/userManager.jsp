<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>welcome</title>
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta content="telephone=no" name="format-detection">

<link rel="stylesheet" type="text/css" href="css/main.css">
<link rel="stylesheet" type="text/css" href="css/common.css">
<link rel="stylesheet" type="text/css" href="css/map.css">
<link rel="stylesheet" type="text/css" href="css/usermap.css">
<link rel="stylesheet" type="text/css" href="openlayers/theme/default/style.css">
<script type="text/javascript" src="js/jquery/jquery-1.8.2.min.js"></script>
<script type="text/javascript" src="openlayers/OpenLayers.js"></script>
<script type="text/javascript" src="js/user/userManage.js"></script>
</head>

<body onload="init()">
	<div class="header">
		<%
			String user_name = (String) session.getAttribute("user_name");
			System.out.println(user_name);
			if (user_name == null) {
		%>
		<script type="text/javascript">
		login_user_name = "null";
		</script>
		<div class="tool">
			<ul style="margin-right:10px;">
				<li><a href="action/jsp/page_goLogin">登录</a>
				</li>
				<li><a href="action/jsp/page_goRegister">创建用户</a>
				</li>
			</ul>
		</div>
		<%
			} else {
		%>
		<script type="text/javascript">
		login_user_name = "login";
		</script>
		<div class="tool">
			<ul>
				<li><%=user_name%></li>
				<li><a href="javascript:void(0);" onclick="doExit()">注销</a>
				</li>
			</ul>
		</div>
		<%
			}
		%>
	</div>	
	<table id="frame">
		<tbody>
			<tr>
				<td id="sidebar" style="width:20%;height:100%;">
					<iframe id="iframe_sidebar" name="iframe"
						frameborder=0 style="width:100%;min-width:277px;height:100%;"
						src="action/jsp/user/page_goUserSideBar">
					</iframe>
					
				</td>

				<td id="content">
					<iframe id="iframe_content" name="iframe"
						frameborder=0 style="width:100%;min-width:277px;height:100%;background:white;"
					 	src="">
					</iframe>
				</td>
			</tr>
		</tbody>
	</table>
	<script type="text/javascript" src="js/data/college.js"></script>
	<script type="text/javascript" src="js/util/resizer.js"></script>
</body>
</html>