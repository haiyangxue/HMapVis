<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ page import="javax.xml.parsers.*" %>
<%@ page import="org.w3c.dom.*" %>

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

<link rel="stylesheet" type="text/css" href="css/main.css">
<link rel="stylesheet" type="text/css" href="css/common.css">
<link rel="stylesheet" type="text/css" href="css/map.css">
<link rel="stylesheet" type="text/css" href="css/usermap.css">
<link rel="stylesheet" type="text/css" href="css/filter.css">
<link rel="stylesheet" type="text/css" href="openlayers/theme/default/style.css">
<link rel="stylesheet" type="text/css" href="css/relationGraph.css">

<script type="text/javascript" src="js/libs/jquery-1.11.1.js"></script>
<script type="text/javascript" src="js/libs/ajaxfileupload.js"></script>
<script type="text/javascript" src="openlayers/OpenLayers.js"></script>
<script type="text/javascript" src="js/map/heatmap.js"></script>
<script type="text/javascript" src="js/map/heatmap-openlayers.js"></script>

<link rel="stylesheet" type="text/css" href="css/add.css">
<link rel="stylesheet" type="text/css" href="css/datePick_style.css">
<script type="text/javascript" src="js/util/datePick.js"></script>
<script type="text/javascript" src="js/libs/underscore.js"></script>
<script type="text/javascript" src="js/libs/backbone.js"></script>
<script type="text/javascript" src="js/libs/backbone.fetch-cache.min.js"></script>
<script type="text/javascript" src="js/libs/ajaxfileupload.js"></script>


<!-- timeline 的 js-->
<!-- 
<link rel="stylesheet" type="text/css" href="css/timeline.css">
<script type="text/javascript" src="js/libs/jquery-ui-1.10.4.custom.js"></script>
<script type="text/javascript" src="js/timeline/bcdate.js"></script>
<script type="text/javascript" src="js/timeline/timeline.controller.js"></script>
<script type="text/javascript" src="js/timeline/timeline.widget.js"></script>
<script type="text/javascript" src="js/libs/d3.v3.min.js"></script>
<script type="text/javascript" src="js/timeline/hisline.view.js"></script>
 -->


<script type="text/javascript" src="js/map/CurveLine.js"></script>
<script type="text/javascript" src="js/map/Util.js"></script>
<script type="text/javascript" src="js/map/DynamicLine.js"></script>

<script type="text/javascript" src="js/libs/mustache.js"></script>
</head>


<body onload="init();getparm1()"> 

<%
	DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
	DocumentBuilder builder = factory.newDocumentBuilder();
	Document doc = null;
	if(session.getAttribute("language") == null){
		doc = builder.parse("xml/english.xml");
	}else if(session.getAttribute("language") != null && (Integer)session.getAttribute("language") == 1){//chinese
		doc = builder.parse("xml/chinese.xml");
	}else{
		doc = builder.parse("xml/english.xml");
	}
	doc.normalize();
	Element lang = (Element)doc.getElementsByTagName("lang").item(0);
%>

<!-- timeline 的 js-->
<link rel="stylesheet" type="text/css" href="css/timeline.css">
<script type="text/javascript" src="js/libs/jquery-ui-1.10.4.custom.js"></script>
<script type="text/javascript" src="js/libs/jquery.mousewheel.js"></script>
<script type="text/javascript" src="js/timeline/bcdate.js"></script>
<script type="text/javascript" src="js/timeline/timeline.controller.js"></script>
<script type="text/javascript" src="js/timeline/timeline.widget.js"></script>
<script type="text/javascript" src="js/libs/d3.v3.min.js"></script>
<script type="text/javascript" src="js/timeline/hisline.view.js"></script>

	<script type="text/javascript" src="js/util/drag.js"></script>
	<script type="text/javascript" src="js/util/util.js"></script>
	<div class="header">
		<%
			String user_name = (String) session.getAttribute("user_name");
			System.out.println(user_name);
			if (user_name == null) {
		%>
		<div class="tool">
			<ul style="margin-right:10px;">
				<li><a href="action/jsp/page_goLogin"><%=lang.getElementsByTagName("login").item(0).getFirstChild().getNodeValue() %></a>
				</li>
				<li><a href="action/jsp/page_goRegister"><%=lang.getElementsByTagName("register").item(0).getFirstChild().getNodeValue() %></a>
				</li>
				<li><a id="langBtn" href="#" onclick="changeLanguage()"><%=lang.getElementsByTagName("languagebutton").item(0).getFirstChild().getNodeValue() %></a>
				</li>
			</ul>
		</div>
		<%
			} else {
		%>
		<div class="toolbar">
			<ul>
				<li><a href="javascript:void(0);" onclick="slideBar(1,0);"><%=lang.getElementsByTagName("addplace").item(0).getFirstChild().getNodeValue() %> </a>
				</li>
				<li><a href="javascript:void(0);" onclick="slideBar(2,0);"><%=lang.getElementsByTagName("addevent").item(0).getFirstChild().getNodeValue() %> </a>
				</li>
				<li><a href="javascript:void(0);" onclick="slideBar(3,0);"><%=lang.getElementsByTagName("addmap").item(0).getFirstChild().getNodeValue() %></a>
				</li>
				<li><a href="javascript:void(0);" onclick="slideBar(4,0);"><%=lang.getElementsByTagName("addpeople").item(0).getFirstChild().getNodeValue() %> </a>
				</li>
				<li>
					<a href="javascript:void(0);"><%=lang.getElementsByTagName("query").item(0).getFirstChild().getNodeValue() %></a>
					<ul class="first">
						<li><a href="javascript:void(0);" onclick="slideBar(5,0);"><%=lang.getElementsByTagName("people").item(0).getFirstChild().getNodeValue() %></a></li>
						<li><a href="javascript:void(0);" onclick="slideBar(9,0);"><%=lang.getElementsByTagName("event").item(0).getFirstChild().getNodeValue() %></a></li>
						<li><a href="javascript:void(0);" onclick="searchPlace();"><%=lang.getElementsByTagName("place").item(0).getFirstChild().getNodeValue() %></a></li>
					</ul>
				</li>
				<li><a href="javascript:void(0);" onclick="showRelations();"><%=lang.getElementsByTagName("peoplerelation").item(0).getFirstChild().getNodeValue() %></a> 
				</li>
			</ul>
		</div>
		<div class="tool">
			<ul>
				<!-- <li><a href="action/jsp/page_goUserManager"></a> -->
				<li><a href="#"><%=user_name%></a>
					<ul class="second">
						<li><a href="javascript:void(0);"><%=lang.getElementsByTagName("uploadevent").item(0).getFirstChild().getNodeValue() %><%=(Integer)session.getAttribute("event_count" )%>	</a></li>
						<li><a href="javascript:void(0);"><%=lang.getElementsByTagName("uploadplace").item(0).getFirstChild().getNodeValue() %><%=(Integer)session.getAttribute("place_count" )%></a></li>
						<li><a href="javascript:void(0);"><%=lang.getElementsByTagName("uploadpeople").item(0).getFirstChild().getNodeValue() %><%=(Integer)session.getAttribute("people_count" )%></a></li>
						<li><a href="javascript:void(0);"><%=lang.getElementsByTagName("uploadmap").item(0).getFirstChild().getNodeValue() %><%=(Integer)session.getAttribute("map_count" )%></a></li>

						
						<li style="border-top: 1px solid white;"><a href="javascript:void(0);" onclick="userEvent();"><%=lang.getElementsByTagName("event").item(0).getFirstChild().getNodeValue() %></a></li>
						<li style="border-top: 1px solid white;"><a href="javascript:void(0);" onclick="userPlace();"><%=lang.getElementsByTagName("place").item(0).getFirstChild().getNodeValue() %></a></li>
						<li style="border-top: 1px solid white;"><a href="javascript:void(0);" onclick="userPeople()"><%=lang.getElementsByTagName("people").item(0).getFirstChild().getNodeValue() %></a></li>
						<li style="border-top: 1px solid white;"><a href="javascript:void(0);" onclick="slideBack();"><%=lang.getElementsByTagName("continue").item(0).getFirstChild().getNodeValue() %></a></li>
						<li style="border-top: 1px solid white;"><a href="javascript:void(0);" onclick="doExit()"><%=lang.getElementsByTagName("logout").item(0).getFirstChild().getNodeValue() %></a></li>
					</ul>
				</li>
				<!-- <li><a href="javascript:void(0);" onclick="doExit()">注销</a> -->
				<li><a id="langBtn" href="#" onclick="changeLanguage()"><%=lang.getElementsByTagName("languagebutton").item(0).getFirstChild().getNodeValue() %></a>
				</li>
			</ul>
		</div>
		<%
			}
		%>
	</div>
	<div id="allmap">
		<div id="block" style="height:100px;width:100px;background-color:blue;position:absolute;"></div>
		<div id="map">
			<%
				if (user_name != null) {
			%>
			<div id="usermap" style="display:none">
				<img id="mapimg" />
				<div id="translate"><%=lang.getElementsByTagName("move").item(0).getFirstChild().getNodeValue() %></div>
				<div id="scale"><%=lang.getElementsByTagName("stretch").item(0).getFirstChild().getNodeValue() %></div>
			</div>
			<%
				}
			%>
		</div>
		<!-- <div class="resizer">
			<img src="images/down-arrow.png">
		</div> -->
		<div id="timeline-indicatorS"></div>
	</div>
	<div id="timeline"></div>
	<div id="leftSideBar"></div>
	<div id="leftSideBar2"></div> 
	<div id = "heatMap" > </div>
	
	<!--     <div id="userdata"></div>   -->
	<div id="rightSideBar" style="overflow:auto"></div>

<!-- 这个函数是试验传参的。 -->
	<script type="text/javascript">
	

	</script>
	
	<script type="text/javascript" src="js/application.js"></script>
	
	<script type="text/javascript" src="js/models/eventModel.js"></script>
	<script type="text/javascript" src="js/models/dynastyModel.js"></script>
	<script type="text/javascript" src="js/models/eventTypeModel.js"></script>
	<script type="text/javascript" src="js/models/jobModel.js"></script>
	<script type="text/javascript" src="js/models/educationModel.js"></script>
	<script type="text/javascript" src="js/models/mapModel.js"></script>
	<script type="text/javascript" src="js/models/heatMapModel.js"></script>
	<script type="text/javascript" src="js/models/queryEventModel.js"></script>
	<script type="text/javascript" src="js/models/eventRelaModel.js"></script> 
	<script type="text/javascript" src="js/models/peoplequeryModel.js"></script>
	
	<script type="text/javascript" src="js/collections/events.js"></script>
	<script type="text/javascript" src="js/collections/dynasties.js"></script>
	<script type="text/javascript" src="js/collections/places.js"></script> 
	<script type="text/javascript" src="js/collections/eventTypes.js"></script>
	<script type="text/javascript" src="js/collections/jobs.js"></script>
	<script type="text/javascript" src="js/collections/educations.js"></script>
	<script type="text/javascript" src="js/collections/people.js"></script>
	<script type="text/javascript" src="js/collections/queryevents.js"></script>
	<script type="text/javascript" src="js/collections/peoplequery.js"></script>
	<script type="text/javascript" src="js/collections/heatmapevents.js"></script>
	<script type="text/javascript" src="js/collections/eventrelas.js"></script>
	
	<script type="text/javascript" src="js/views/event.js"></script>
	<script type="text/javascript" src="js/views/addEventView.js"></script>
	<script type="text/javascript" src="js/views/addPlaceView.js"></script>
	<script type="text/javascript" src="js/views/addMapView.js"></script>
	<script type="text/javascript" src="js/views/addPeopleView.js"></script>
	<script type="text/javascript" src="js/views/dynastyListView.js"></script>
	<script type="text/javascript" src="js/views/placeShowListView.js"></script>
	<script type="text/javascript" src="js/views/eventTypeListView.js"></script>
	<script type="text/javascript" src="js/views/jobListView.js"></script>
	<script type="text/javascript" src="js/views/educationListView.js"></script>
	<script type="text/javascript" src="js/views/filterView.js"></script>
	<script type="text/javascript" src="js/views/eventTypeShowListView.js"></script>
	<script type="text/javascript" src="js/views/relationView.js"></script>
    <script type="text/javascript" src="js/views/showMapEventView.js"></script>	
	<script type="text/javascript" src="js/views/editMapEventView.js"></script>
	<script type="text/javascript" src="js/views/heatMapView.js"></script>
	<script type="text/javascript" src="js/views/queryEventView.js"></script>
	<script type="text/javascript" src="js/views/resultListView.js"></script>
	<script type="text/javascript" src="js/views/queryResultView.js"></script>
	<script type="text/javascript" src="js/views/showPeopleView.js"></script>
	<script type="text/javascript" src="js/views/SearchPlaceView.js"></script>
	<script type="text/javascript" src="js/views/searchplacesListView.js"></script>
	<script type="text/javascript" src="js/views/showMapPlaceView.js"></script>
	<script type="text/javascript" src="js/views/editMapPlaceView.js"></script>
	<script type="text/javascript" src="js/views/heatMapEventView.js"></script>
	<script type="text/javascript" src="js/views/showEventVideoView.js"></script> 
	<script type="text/javascript" src="js/views/showReEventView.js"></script>	
	
	<script type="text/javascript" src="js/controllers/hmapvis.js"></script>

	<script type="text/javascript" src="js/map/MarkerFactory.js"></script>
	<script type="text/javascript" src="js/map/ImgMapFactory.js"></script>
	<script type="text/javascript" src="js/util/resizer.js"></script>
	
	<script type="text/javascript" src="js/map/init.js"></script>
	<script type="text/javascript" src="js/user/user.js"></script>
	
	 <script src="js/track/Direction.js"></script>
    <script type="text/javascript" src="js/views/DrawLine.js"></script>
    <script type="text/javascript" src="js/models/trackModel.js"></script>
    <script type="text/javascript" src="js/collections/tracks.js"></script>
    <script type="text/javascript" src="js/views/addTrackView.js"></script>

	<script type="text/javascript" src="js/util/d3.v3.min.js"></script>
	<script type="text/javascript" src="js/views/userEditEventView.js"></script> 
	<script type="text/javascript" src="js/models/userplaceModel.js"></script>
	<script type="text/javascript" src="js/collections/userplace.js"></script>
 	<script type="text/javascript" src="js/views/userPlaceView.js"></script>
 	<script type="text/javascript" src="js/models/placeModel.js"></script>
    <script type="text/javascript" src="js/views/userEditPlaceView.js"></script>
    
	 <script type="text/javascript" src="js/models/usereventModel.js"></script>
 	<script type="text/javascript" src="js/collections/userevent.js"></script>
 	<script type="text/javascript" src="js/views/userEventView.js"></script>

    <script type="text/javascript" src="js/models/userpeopleModel.js"></script>
 	<script type="text/javascript" src="js/collections/userpeople.js"></script>
 	<script type="text/javascript" src="js/views/userPeopleView.js"></script>

    
    
    <script type="text/javascript" src="js/models/peopleModel.js"></script>
    <script type="text/javascript" src="js/views/userEditPeopleView.js"></script>

	 <script type="text/javascript" src="js/models/userModel.js"></script>
 
 	<script type="text/javascript" src="js/views/userView.js"></script>
</body>
</html>