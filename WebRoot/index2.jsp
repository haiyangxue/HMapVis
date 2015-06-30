<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<script type="text/javascript" src="js/libs/jquery-1.11.1.js"></script>
	<script type="text/javascript" src="js/libs/underscore.js"></script>
	<script type="text/javascript" src="js/libs/backbone.js"></script>
	<script type="text/javascript" src="js/libs/mustache.js"></script>
	
	
 </head>
  
  <body>
  	
  	
  	<div id='divid'></div>
  	<input type="button" value="click" onclick="doclick()"></input>
	
	<!-- 显示单个事件信息的模板，需要调整显示结果 -->
	<script id="addevent-template" type="text/template">
	<div style="width:400px;font-family:微软雅黑;font-size:18px;">
		<h4 stye="margin:0 0 5px 0;padding:0.2em 0">{{event_name}}</h4>
		<img style="float:right;margin:4px;width:120;height:180;" id="imgDemo" src="{{img_path}}" width="139" height="104"/>
 		<span>事件类型：{{type_name}}</span><br />
		<span>参与人物：{{people}}</span><br />
		<span>发生地点：{{place_name}}</span><br />
		<span>具体时间：{{start_date}}到{{end_date}}</span><br />
		<span>主要影响：{{content.influ}}</span><br />
		<span>简略信息：</span>
		<p style="margin:0;line-height:1.5;font-size:13px;text-indent:2em">{{summary}}</p>
		<a href="{{detail_url}}" target="_blank">详细信息</a>
	</div>
	</script>
 	
 	
 	<script type="text/javascript" src="js/application.js"></script>
 	<script type="text/javascript" src="js/models/eventModel.js"></script>
 	<script type="text/javascript" src="js/collections/events.js"></script>
 	<script type="text/javascript" src="js/views/event.js"></script>
 	<script type="text/javascript" src="js/controllers/hmapvis.js"></script>
 	
 	<script type="text/javascript">
 		
 		App.initialize();
 		var router = new App.Routers.HMapVis();
 		
 		function doclick(){
 			
 			console.log("success");
 			router.navigate("hello",true);
 		}
 		
 		/**
		 * 需要从后台中取数据，
 		*/
 		
 		/*
 		var data = {
			event_id : 0,
			type_id : 1,
			dynasty_id : 5,
			user_id : 16,
			place_id : 20,
			event_name : '安史112乱',
			start_time : '655',
			end_time : '660',
			people : '安禄山，史思明',
			summary : 'sdfsdfssssssssss',
			influ : '唐朝由盛转衰的转折点',
			img_path : 'images/tang.jpg',
			detail_url : 'http://baike.baidu.com/view/2795.htm',
			start_date : '655',
			end_date : '660',
			type_name : '军事战争',
			place_name : '长安',
			now_name : '西安'	
		};
 		
 		var model = new App.Models.Event(data); 
 		console.log(model);
 		var data = model.toJSON();
 		console.log(data);
 		$("#divid").html(Mustache.to_html($("#event-item-template").html(),data));
 		*/
		
 		//var models = new App.Collections.Events();
 		//var view = new App.Views.Event({collection:models});
 		
 		/*
 		models.fetch({  
			success : function() {
				//获得数据后的操作  
				view.trigger('change');
			}  
		}); 
 		*/
 		
 		/*
 		var router = new App.Routers.HMapVis(); 
 		App.initialize();
 		router.navigate('hello', {  
			trigger: true  
		}); 
		*/
		
 	</script>
 	
  </body>
</html>
