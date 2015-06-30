<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page language="java" import="com.hmapvis.bean.EventType"%>
<%@ page language="java" import="com.hmapvis.bean.Event"%>
<%@ page language="java" import="com.opensymphony.xwork2.ActionContext"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>filter.jsp</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
    
    <link rel="stylesheet" type="text/css" href="css/add.css">
    <link rel="stylesheet" type="text/css" href="css/filter.css">
    <link rel="stylesheet" type="text/css" href="css/datePick_style.css">
    <link rel="stylesheet" type="text/css" href="css/common.css">
    <script type="text/javascript" src="js/libs/jquery-1.11.1.js"></script>
    <script type="text/javascript" src="js/util/datePick.js"></script>
  </head>
  
  <body>
  	
     <script type="text/javascript" src="js/util/filter.js"></script>
     <script type="text/javascript" src="js/util/util.js"></script>
 	 <div class="wrapper">
 	 	<div class="title">
	    	<h1>中国历史地图查询</h1>
	    </div>
	    <div class="add-content">
			<div class="box">
				<b>名称：</b><br />
				<input id="searchName" class="txtInput" type="text" style="width:100%;">
			</div>
			<br />
			<div class="box">
				<b>时间：</b><br />
				<input id="searchTime" class="txtInput" type="text" onfocus="onTimeStartfocus('searchTime')" onblur="onTimeStartBlur('searchTime')" style="width:100%;" />
			</div>
			<br />
			
			<!-- 下面这些选择项都要从后台获取  -->
			<div id="type">
				<div class="filter_header">类型Type</div>
				<div class="filter_body">
					<div class="filter_content">
						<%  List<EventType> types = (List<EventType>)ActionContext.getContext().get("types");						   
						    for(int i = 0;i < types.size(); i++ ) {
						   		String name = types.get(i).getType_name();
						   		String eqStr = ActionContext.getContext().get("evenum"+i).toString();
						   		int eq = Integer.parseInt(eqStr);
						%>
								<div class="filter_content_value"> 
									<input type="checkbox" name="checkbox" value="<%=types.get(i).getType_id() %>" id="type<%=types.get(i).getType_id() %>" onclick="checkCheckBox('checkbox')">										
										<label for="type<%=types.get(i).getType_id() %>"><%=name %></label>
									</input>
									<span style="margin-left:20%;"><%=eq %></span>
								</div>
						<% 
							} 
						%>
					</div>
					<div class="resizer">
						<img src="images/down-arrow.png">
					</div>
				</div>
			</div>
			<input type="button" id="query_submit" class="buttonInput" style="margin-top:10px; width:100%;" value="查询" onclick="searchEvent()"></input>
			
		</div>
	</div>
	<script type="text/javascript" src="js/util/resizer.js"></script>
	<script type="text/javascript">
		document.onselectstart=new Function("event.returnValue=false");  //限制鼠标选中
	</script>
  </body>
</html>
