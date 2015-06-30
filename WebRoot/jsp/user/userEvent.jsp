<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page language="java" import="com.hmapvis.bean.Event"%>
<%@ page language="java" import="com.opensymphony.xwork2.ActionContext"%>
<%@ page language="java" import="javax.servlet.http.HttpServletRequest"%>
<%@ page language="java" import="javax.servlet.http.HttpSession"%>
<%@ page language="java" import="org.apache.struts2.ServletActionContext"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<html>
  <head>
    <base href="<%=basePath%>">
    <title>My JSP 'userEvent.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link rel="stylesheet" type="text/css" href="css/default.css" />
	<link rel="stylesheet" type="text/css" href="css/component.css" />
	<script src="js/jquery/jquery-1.9.1.min.js" type="text/javascript"></script>
	<script src="js/user/userManage.js" type="text/javascript"></script>
  </head>
  
  <body>
  	<script src="js/user/pageClick.js" type="text/javascript"></script>
    <div class="container">			
			<div class="main">
				<ul id="eventList" class="cbp_tmtimeline">
					<% List<Event> events = (List<Event>)ActionContext.getContext().get("user_events");
					   Long event_count = (Long)ActionContext.getContext().get("user_eventcount");
					   HttpServletRequest r = ServletActionContext.getRequest();
					   HttpSession s = request.getSession();
					   int page_num = (Integer)s.getAttribute("user_eventpage");
						   for(int i=0; i < events.size(); i++ ) {
							   int event_id = events.get(i).getEvent_id();
							   String name = events.get(i).getEvent_name(); 
							   String summary = events.get(i).getSummary();
							   String place_name = events.get(i).getPlace_name();
							   String now_name = events.get(i).getNow_name();
							   String start_time = events.get(i).getStart_date();
							   String end_time = events.get(i).getEnd_date();
							   String people = events.get(i).getPeople();
							   String influ = events.get(i).getInflu();
							   %>
					<li>
						<time class="cbp_tmtime" datetime="2013-04-10 18:30">
							<span>4/10/13</span> 
							<span>18:30</span>
						</time>
						<div class="cbp_tmicon cbp_tmicon-phone"><a onclick="editEvent(<%=event_id %>)"><img src="css/images/file_edit.png" style="width:60%; height:60%; margin-top:5px;"></a></div>
						<div class="cbp_tmlabel">
							<h2 id="eventName"><%=name %></h2>
							<p><span style="width:100px;background:#007acd;">时间：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>&nbsp&nbsp<%=start_time %> ~ <%=end_time %></p>
							<p style="background:#3f3f3f;"><font style="background:#007acd;">事件发生地点：</font>&nbsp&nbsp<%=place_name %>(古)&nbsp&nbsp&nbsp&nbsp<%=now_name %>(今)</p>
							<p><font style="background:#007acd;">事件涉及人物：</font>&nbsp&nbsp<%=people %></p>
							<p style="background:#3f3f3f;"><font style="background:#007acd;">事件内容：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</font>&nbsp&nbsp<%=summary %></p>
							<p><font style="background:#007acd;">事件影响：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</font>&nbsp&nbsp<%=influ %></p>
						</div>
					</li>
					<% }%>
				</ul>
				
			</div>
			<div class="page_btn">
				<div class="page_box">
					<a id="prev" class="prev" style="display:none" onclick="EventPrevPage()"><img src="css/images/up1.png" name="pre" style="width:80%; margin:0 auto;" onmouseover="mouseoverUp()" onmouseout="mouseoutUp()" /></a><br/><br/><hr/>
					<span class="num">
						<span id="current_page" class="current_page">1</span>&nbsp<span style="padding:0 3px;">/</span>&nbsp<span class="total"><%=event_count/5 %></span>
					</span><br/><hr/><br/>
					<a id="next" class="next" onclick="EventNextPage()"><img src="css/images/down1.png" name="nex" style="width:80%; margin:0 auto;" onmouseover="mouseoverDown()" onmouseout="mouseoutDown()" /></a>
				</div>
			</div>
		</div>
  </body>
</html>
