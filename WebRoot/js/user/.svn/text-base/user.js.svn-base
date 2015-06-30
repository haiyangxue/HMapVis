function mouseoverlogin(){
	document.login.src="images/user/login2.png";
}
function mouseoutlogin(){
	document.login.src="images/user/login1.png";
}
function mouseoverreg(){
	document.reg.src="images/user/reg2.png";
}
function mouseoutreg(){
	document.reg.src="images/user/reg1.png";
}

function goreg(){
	window.location.href="action/jsp/page_goRegister";
}

function focusInput(id){
	var obj = document.getElementById(id);
	obj.style.backgroundColor="rgba(0, 0, 0, 0.3)";
}
function blurInput(id){
	var obj = document.getElementById(id);
	obj.style.backgroundColor="rgba(255, 255, 255, 0.3)";
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
function regInit(){
	var clientW = window.screen.width;
	var clientH = window.screen.height;
	if(clientW < clientH){
		document.getElementById("regWrap").style.width = "100%";
	}else{
		document.getElementById("regWrap").style.width = "33%";
	}
}

function doLogin(){
	var userName = $("#uName").val();
	var userPwd = $("#uPwd").val();
	
	if(userName=="" || userPwd == ""){
		alert("Please enter the account name and password");
	}else{
		$.post('action/json/user_login',{"user.user_name":userName,"user.user_pass":userPwd},function(data) {					
			if(data.message == "fail"){
				alert("There is no such account");
			}else{
				//alert("success");
				window.location.href="/HMapVis_0.2/";
			}
		},"json");
	}
}

function doReg(){
	var userName = $("#uName").val();
	var userPwd = $("#uPwd").val();

	if(userName == "" || userPwd == ""){
		alert("Please enter the account name and password!");
	}else{
		$.post('action/json/user_register',{"user.user_name":userName,"user.user_pass":userPwd},function(data) {
			if(data.message == "space"){
				alert("Please use English letters, Chinese words or \"_\" to register, do not use space or tab.");
			}else if(data.message == "user_exist"){
				alert("fail creating account, account name may have already exist!");
			}else{
				window.location.href="action/jsp/page_goLogin";
			}
		},"json");
	}
}

function doExit(){
	$.post('action/json/user_exit',{},function(data) {
		if(data.message == "success"){
			window.location.href="/HMapVis_0.2";
		}
	},"json");
}
/*
function changeBar(sign){
    img_factory.hideAll();
	marker_factory.hide();
	map.removeControl(layer_control); 
		
	var sidebarcontainer = $("#iframe");
	var sidebarcontent = $("iframe")[0];
	
	sidebarcontent.style.display = "block";
	if(sign == 1){
		$("usermap").hide();
		sidebarcontainer.attr("src","action/jsp/page_goAddPlace");
	}else if(sign == 2){
		sidebarcontainer.attr("src","action/jsp/page_goAddEvent");
	}else if(sign == 3){
		$("usermap").hide();
		sidebarcontainer.attr("src","action/jsp/page_goAddMap");
	}else if(sign == 4){
		sidebarcontainer.attr("src","action/jsp/page_goAddPeople");
	}else if(sign == 5){
		img_factory.hideAll();
		marker_factory.show();
		map.addControl(layer_control);
		sidebarcontainer.attr("src","action/jsp/page_goFilter");
	}else if(sign == 6){
		sidebarcontent.style.display = "none";
	}
	
}
*/

function showMapEvent(event_id){
	//alert("myfunction" + event_id);
	/*popup = new OpenLayers.Popup("showMapEvent",
            new OpenLayers.LonLat(x, y),
            new OpenLayers.Size(200,200),
            "",true);
	*/
	

    var showEventRouter = new App.Routers.HMapVis();
	showEventRouter.navigate("showMapEvent/"+event_id,true);
}

function searchPeople(peopleid){
	 var showPeopleRouter = new App.Routers.HMapVis();
	 showPeopleRouter.navigate("showPeople/"+peopleid,true);
}

function closeEventPopup(eid){
	 var lenP = map.popups.length;   
	 for(var i=lenP-1; i>=0; i--){
		 if(map.popups[i].id == "Popup"+eid){
			 map.removePopup(map.popups[i]);
			 map.removeLayer(markers);
		 }
	 }
}

function closePeoplePopup(pid){
	 var lenP = map.popups.length;   
	 for(var i=lenP-1; i>=0; i--){
		 if(map.popups[i].id == "Popup"+pid){
			 map.removePopup(map.popups[i]);
			 map.removeLayer(markers);
		 }
	 }
}

function editMapEvent(event_id){
	var editEventRouter = new App.Routers.HMapVis();
	
	if($("#leftSideBar").css("display") == "none"){
		$("#leftSideBar").css("display","block");
		$("#leftSideBar").css("width","0px");
		$("#leftSideBar").css("height",$("body").height() - 52 + "px");
		$("#leftSideBar").animate({width:277},"slow");
	}
	
	editEventRouter.navigate("editMapEvent/"+event_id,true);
}

function showEventVideo(eventvideo){
	var showEventVideoRouter = new App.Routers.HMapVis();
	
	if($("#leftSideBar").css("display") == "none"){
		$("#leftSideBar").css("display","block");
		$("#leftSideBar").css("width","0px");
		$("#leftSideBar").css("height",$("body").height() - 52 + "px");
		$("#leftSideBar").animate({width:550},"slow");
	}
	var src = eventvideo.replace(/\//g, "@");
	showEventVideoRouter.navigate("showEventVideo/"+src,true);
}

function editPeople(people_id){
	var editPeopleRouter = new App.Routers.HMapVis();
	
	if($("#leftSideBar").css("display") == "none"){
		$("#leftSideBar").css("display","block");
		$("#leftSideBar").css("width","0px");
		$("#leftSideBar").css("height",$("body").height() - 52 + "px");
		$("#leftSideBar").animate({width:277},"slow");
	}
	editPeopleRouter.navigate("editMapEvent/"+event_id,true);
}

function showtrack(people){
	var trackrouter = new App.Routers.HMapVis();
	trackrouter.navigate("showTrack/"+people, true);
}

function slideBar(sign,id){
	if(trackisused){
		DrawLine.remove();
		trackisused=false;
	}
	
	event_relation_json.addNewEventFlag=false;
	event_relation_json.addExistingEventFlag=false; 
	
	clickpoint=false;
	var router = new App.Routers.HMapVis();
	if($("#leftSideBar").css("display") == "none"){
		$("#leftSideBar").css("display","block");
		$("#leftSideBar").css("width","0px");
		$("#leftSideBar").css("height",$("body").height() - 52 + "px");
		$("#leftSideBar").animate({width:277},"slow");
	}
	if(sign == 1){
		clickpoint=false;
		if(checkPanel(sign)){
			router.navigate("addPlace", true);
			router.navigate("dynastyList", true);
		}else{
			if(confirm("Are you sure you want to give up your editing?")){
				router.navigate("addPlace", true);
				router.navigate("dynastyList", true);
				$("#usermap").hide();
				if(user_image_layer ){
					map.removeLayer(user_image_layer);
					user_image_layer = null;
				}
		    }
		}
	}else if(sign == 2){
		clickpoint=false;
		if(checkPanel(sign)){
			router.navigate("addEvent", true);
			router.navigate("eventTypeList", true);
			router.navigate("dynastyList", true);
		}else{
			if(confirm("Are you sure you want to give up your editing?")){
				router.navigate("addEvent", true);
				router.navigate("eventTypeList", true);
				router.navigate("dynastyList", true);
				$("#usermap").hide();
				if(user_image_layer ){
					map.removeLayer(user_image_layer);
					user_image_layer = null;
				}
		    }
		}
	}else if(sign == 3){
		clickpoint=false;
		if(checkPanel(sign)){
			router.navigate("addMap", true);
			router.navigate("dynastyList", true);
		}else{
			if(confirm("Are you sure you want to give up your editing?")){
				router.navigate("addMap", true);
				router.navigate("dynastyList", true);
				$("#usermap").hide();
				if(user_image_layer ){
					map.removeLayer(user_image_layer);
					user_image_layer = null;
				}
		    }
		}
	}else if(sign == 4){
		clickpoint=false;
		if(checkPanel(sign)){
			router.navigate("addPeople", true);
			router.navigate("jobList", true);
			router.navigate("educationList", true);
			router.navigate("dynastyList", true);
		}else{
			if(confirm("Are you sure you want to give up your editing?")){
				router.navigate("addPeople", true);
				router.navigate("jobList", true);
				router.navigate("educationList", true);
				router.navigate("dynastyList", true);
				$("#usermap").hide();
				if(user_image_layer ){
					map.removeLayer(user_image_layer);
					user_image_layer = null;
				}
		    }
		}
	}else if(sign == 5){
		clickpoint=true;
		if(checkPanel(sign)){
			router.navigate("filter", true);
			//router.navigate("etsl", true);
			router.navigate("jobList", true);
			router.navigate("educationList", true);
			router.navigate("dynastyList", true);
			
			
		}else{
			if(confirm("Are you sure you want to give up your editing?")){
				router.navigate("filter", true);
				//router.navigate("etsl", true);
				router.navigate("jobList", true);
				router.navigate("educationList", true);
				router.navigate("dynastyList", true);
				$("#usermap").hide();
				if(user_image_layer ){
					map.removeLayer(user_image_layer);
					user_image_layer = null;
				}
		    }
		}
	}
	//sign=6是左侧划出编辑事件栏
	else if(sign == 6){
		clickpoint=false;
		if(checkPanel(sign)){
			var event = new App.Models.Event({event_id:id});
			event.fetch({
				success : function() {
					var helloView = new App.Views.EditEvent({model: event});
					helloView.trigger('change');
					router.navigate("eventTypeList", true);
					router.navigate("dynastyList", true);
				}  
			}); 
			
			
			
			
		}else{
			if(confirm("Are you sure you want to give up your editing?")){
				router.navigate("editEvent", true);
				router.navigate("eventTypeList", true);
				router.navigate("dynastyList", true);
				$("#usermap").hide();
				if(user_image_layer ){
					map.removeLayer(user_image_layer);
					user_image_layer = null;
				}
		    }
		}
	}
	//sign=7是左侧划出编辑地点栏
	else if(sign == 7){
		clickpoint=false;
		if(checkPanel(sign)){
			var editplace = new App.Models.Place({place_id:id});
			editplace.fetch({
				success : function() {
					var placeview = new App.Views.EditPlace({model: editplace}); 
					placeview.trigger('change');
					
					router.navigate("dynastyList", true);
				}  
			}); 
		}else{
			if(confirm("Are you sure you want to give up your editing?")){
				router.navigate("editPlace", true);
			
				router.navigate("dynastyList", true);
				$("#usermap").hide();
				if(user_image_layer ){
					map.removeLayer(user_image_layer);
					user_image_layer = null;
				}
		    }
		}
	}	
	//sing=8是左侧划出编辑人物栏
	else if(sign == 8){
		clickpoint=false;
		if(checkPanel(sign)){
			var editpeople = new App.Models.People({people_id:id});
			editpeople.fetch({
				success : function() {
					var peopleview = new App.Views.EditPeople({model: editpeople}); 
					peopleview.trigger('change');
					
			        router.navigate("educationList",true);
			        router.navigate("jobList",true);
					router.navigate("dynastyList", true);
				}  
			}); 
		}else{
			if(confirm("Are you sure you want to give up your editing?")){
				router.navigate("editPeople", true);
				router.navigate("educationList",true);
			    router.navigate("jobList",true);
			    router.navigate("dynastyList", true);
			    $("#usermap").hide();
				if(user_image_layer ){
					map.removeLayer(user_image_layer);
					user_image_layer = null;
				}
		    }
		}
	}else if(sign == 9){
		if(checkPanel(sign)){
			router.navigate("queryEvent", true);
			router.navigate("eventTypeList", true);
			router.navigate("dynastyList", true);
		}else{
			if(confirm("Are you sure you want to give up your editing?")){
				router.navigate("queryEvent", true);
				router.navigate("eventTypeList", true);
				router.navigate("dynastyList", true);
				router.navigate("resultList", true);
		    }
		}
	}else if(sign == 10){
		clickpoint=false;
		event_relation_json.addNewEventFlag=true;
		if(checkPanel(sign)){
			router.navigate("addEvent", true);
			router.navigate("eventTypeList", true);
			router.navigate("dynastyList", true);
		}else{
				router.navigate("addEvent", true);
				router.navigate("eventTypeList", true);
				router.navigate("dynastyList", true);
				$("#usermap").hide();
				if(user_image_layer ){
					map.removeLayer(user_image_layer);
					user_image_layer = null;
				}
		    
		}
	}else if(sign == 11){
			//router.navigate("heatmapEvent", true);
		//heatmap_place_loc是全局变量，点击时的监听中设置了它的值
			App.data.mainRouter.navigate("heatMapEvent/"+heatmap_place_loc ,  {trigger: true, replace: true});
 
	}
	panelChose = sign;
}

function addRelatedEvent(sign){
	
	var event_name = $("#event_name").val();
	var dynasty_id = $("#dynasty").val(); 
	var event_type = $("#event_type").val(); //is int
	var influ = $("#event_influ").val(); 
	var summary = $("#event_summary").val();
	var detail_url = $("#event_detail").val(); 
	var place_id = $("#showplace").val();//int
	var start_time = $("#event_start").val();
	var end_time = $("#event_end").val(); 
	var event_people = $("#event_people").val(); 
	var user_name =  $("#user_name").html(); 
	
	if(event_name=="其他"){
		event_name = "unknown";
	}
	
	var event=new App.Models.Event({
		type_id : event_type,
		dynasty_id : dynasty_id,
		user_name : user_name,
		place_id : place_id,
		event_name : event_name,
		start_time : start_time,
		end_time : end_time,
		people : event_people,
		summary : summary,
		influ : influ,
		img_path : '',
		detail_url : detail_url, 
		event_people : event_people
	});
	
	event.save();
}
function searchEvents(){

	var eventlist=new App.Collections.QueryEvents();
	eventlist.fetch({
		success : function(){
//			alert("查找成功！");
			var result_list = new App.Views.ResultList({collection : eventlist});
			result_list.trigger('change');
		}
	});

}
function showAndhide(classname){
	$("."+classname).toggle(function() {
		$(this).next(".text").animate({
			height : 'toggle',
			opacity : 'toggle'
		}, "1000");
	}, function() {
		$(this).next(".text").animate({
			height : 'toggle',
			opacity : 'toggle'
		}, "1000");
	});
	
}
function saveRelation(eventid1,eventid2,relationid){
	
		var Revent=new App.Models.EventRela({
			event_id1 : eventid1,
			event_id2 : eventid2,
		    relation_id:relationid 
		});
		Revent.save();
	
	
}
function peopletrack (){
	if(DrawLine.isDrawLine){
		DrawLine.remove();
		DrawLine.isDrawLine=false;
	}
	var people_name = $("#people_name").val();
	showtrack(people_name);
}
/*
 * 划线
 */
function drawLine (){
//	var color = "#" + document.getElementById("color").value;
//	var size = document.getElementById("size").value;
//	var style = document.getElementById("style").value;
	trackisused=true;
	DrawLine.isDrawLine=true;
	var pencil = Pencil.createNew("#ff0000", "solid", "3");
	DrawLine.draw(PointsControler.getPoints(), pencil);
	PointsControler.removeAll();
}
function searchPlace(){
	if($("#leftSideBar").css("display") == "none"){
		$("#leftSideBar").css("display","block");
		$("#leftSideBar").css("width","0px");
		$("#leftSideBar").css("height",$("body").height() - 52 + "px");
		$("#leftSideBar").animate({width:277},"slow");
	}
		var routerSearchPlace = new App.Routers.HMapVis();
		routerSearchPlace.navigate("searchPlace",true);
	
}
function userEvent(){
var router = new App.Routers.HMapVis();
	//右侧栏交替出现
	if($("#rightSideBar").css("display") == "none"){
		$("#rightSideBar").css("display","block");
		$("#rightSideBar").css("width","0px");
		$("#rightSideBar").css("height",$("body").height() - 52 + "px");
		$("#rightSideBar").animate({width:600},"slow");
	}
	router.navigate("userevent",true);
	
}
function userPlace(){
	var router = new App.Routers.HMapVis();
		//右侧栏交替出现
		if($("#rightSideBar").css("display") == "none"){
			$("#rightSideBar").css("display","block");
			$("#rightSideBar").css("width","0px");
			$("#rightSideBar").css("height",$("body").height() - 52 + "px");
			$("#rightSideBar").animate({width:600},"slow");
		}
		router.navigate("userplace",true);
		
	}

function userPeople(){
	var router = new App.Routers.HMapVis();
	//右侧栏交替出现
	if($("#rightSideBar").css("display") == "none"){
		$("#rightSideBar").css("display","block");
		$("#rightSideBar").css("width","0px");
		$("#rightSideBar").css("height",$("body").height() - 52 + "px");
		$("#rightSideBar").animate({width:600},"slow");
	}
	router.navigate("userpeople",true);
}
//右侧栏滑回
function slideBack() {
	$("#rightSideBar").animate({width:0},"slow", function(){
		$("#rightSideBar").css("display","none");
		
	});
	$("#userdata").animate({width:0},"slow", function(){
		$("#userdata").css("display","none");
	});
}
function showRelations(){
	var router = new App.Routers.HMapVis();
	router.navigate("showRelations", true);
} 