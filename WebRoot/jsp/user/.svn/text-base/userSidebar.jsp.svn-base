<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page language="java" import="com.hmapvis.bean.Dynasty"%>
<%@ page language="java" import="com.hmapvis.bean.EventType"%>
<%@ page language="java" import="com.hmapvis.bean.User"%>
<%@ page language="java" import="com.opensymphony.xwork2.ActionContext"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>sideBar</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" type="text/css" href="css/add.css">
	<script type="text/javascript" src="js/jquery/jquery-1.8.2.min.js"></script>
		
  </head>
  
	<body>
		<%
			User user3 = (User)ActionContext.getContext().get("targetUser");
		%>
		<div class="wrapper">
			<div class="title">
				<h1>用户园地</h1>
			</div>			
			<!-- 下面这些选择项都要从后台获取  -->
			<div class="add-content">
				<div class="box">
					用户名：<%=user3.getUser_name() %>					
				</div>
				<div class="box">
					上传事件数：<%=user3.getEvent_count() %>
				</div>
				<div class="box">
					上传地点数：<%=user3.getMap_count() %>
				</div>
				<div class="box">
					上传人物数：<%=user3.getPeople_count() %>
				</div>
				<div class="box">					
					<input type="button" id="show_event" class="buttonInput" style="margin-top:10px; width:100%;" value="事件" onclick="showEvent()"></input>
				</div>
				<div class="box">					
					<input type="button" id="show_map" class="buttonInput" style="margin-top:10px; width:100%;" value="地点" onclick=""></input>
				</div>
				<div class="box">					
					<input type="button" id="show_people" class="buttonInput" style="margin-top:10px; width:100%;" value="人物" onclick=""></input>
				</div>
				<br /><br />
				<div class="box">					
					<input type="button" id="back" class="buttonInput" style="width:100%;" value="返回" onclick="parent.window.location.href='/HMapVis_0.2/'"></input>
				</div>
			</div>
		</div>
		
		<script language="javascript" type="text/javascript">
			document.onselectstart=new Function("event.returnValue=false");  //限制鼠标选中
			function showEvent(){
				$("#iframe_content", window.parent.document).attr("src","action/jsp/userdata_goUserEventPage");
			}
		</script>
	</body>
</html>
