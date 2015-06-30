<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page language="java" import="com.hmapvis.bean.NameVote"%>
<%@ page language="java" import="com.opensymphony.xwork2.ActionContext"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<html>
  <head>
    <base href="<%=basePath%>">
    
	<title>add</title>
    
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">    
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">
		<link rel="stylesheet" type="text/css" href="css/main.css" />		
		<script type="text/javascript" src="js/jquery/jquery-1.8.2.min.js"></script>
	</head>
	<body style="background:#6f6f6f;">		
		
		<div class="wrapper">
			<div class="title" style="text-align:center;">
		    	<h1>地点名称投票</h1>
		    </div>
		    <form id="voteForm" action="" method="">
			<div class="add-content" style="background:#4f4f4f;padding-top:10px; padding-bottom:10px;">
				<ul>
				<%
					if(ActionContext.getContext()!=null){
					List<NameVote> newNames = (List<NameVote>)ActionContext.getContext().get("names");
					//System.out.println(newNames);
					if(newNames != null){
					for(int i=0;i<newNames.size();i++ ) { 
						String name = newNames.get(i).getNew_name();
						int namevote_id = newNames.get(i).getNamevote_id();
						int numVote = newNames.get(i).getVote();
						%>
						<li style="list-style:none;">	
							<input type="radio" name="vote" value="<%=namevote_id %>">
								<label style="color:white;" for="<%=namevote_id %>"><%=name %></label>
								<label style="position:absolute; right:15%; color:white;"><%=numVote %></label>
							</input>
						</li>
				<% }}} %>
				</ul>
			</div>
			<input type="button" id="vote_submit" class="buttonInput" style="margin-top:10px; width:100%;" value="投票" onclick="javascript:makeVotes()"></input>
			<input type="button" id="cancel" class="buttonInput" style="margin-top:10px; width:100%;" value="取消" onclick="javascript:cancelVote()"></input>
			</form>
		</div>
		<script type="text/javascript" src="js/rename/vote.js"></script>
		<script language="javascript" type="text/javascript">
			document.onselectstart=new Function("event.returnValue=false");  //限制鼠标选中
		</script>
	</body>
	
</html>
