function EventNextPage(){
	$.post('action/json/userdata_goNextEventPage',{},function(data) {
		if(data.message == "success"){
			$("#current_page").html(data.page_count);
			var eventList = $("#eventList");
			var events = data.events;
			var new_html = "";
			for(i = 0; i < events.length; i++){
				new_html =  new_html + "<li>" +
								"<time class='cbp_tmtime' datetime='2013-04-10 18:30'>" +
									"<span>4/10/13</span>" + 
									"<span>18:30</span>" +
								"</time>" +
								"<div class='cbp_tmicon cbp_tmicon-phone'><a onclick='editEvent(" + events[i].event_id + ")'><img src='css/images/file_edit.png' style='width:60%; height:60%; margin-top:5px;'></a></div>" +
								"<div class='cbp_tmlabel'>" +
								"<h2>" + events[i].event_name + "</h2>" +
								"<p><span style='width:100px;background:#007acd;'>时间：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>&nbsp&nbsp" + events[i].start_date + " ~ " + events[i].end_date + "</p>" +
								"<p style='background:#3f3f3f;'><font style='background:#007acd;'>事件发生地点：</font>&nbsp&nbsp" + events[i].place_name + "(古)&nbsp&nbsp&nbsp&nbsp" + events[i].now_name + "(今)</p>" + 
								"<p><font style='background:#007acd;'>事件涉及人物：</font>&nbsp&nbsp" + events[i].people + "</p>" +
								"<p style='background:#3f3f3f;'><font style='background:#007acd;'>事件内容：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</font>&nbsp&nbsp" + events[i].summary + "</p>" +
								"<p><font style='background:#007acd;'>事件影响：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</font>&nbsp&nbsp" + events[i].influ + "</p>" +
								"</div>" +
							"</li>";
			}
			eventList.html(new_html); 
			
			if(data.page_count > 1){
				$("#prev").show();
			}
			if(data.page_count == data.max_page_count){
				alert("equal");
				$("#next").hide();
			}
		}
	},"json");
}
function EventPrevPage(){
	$.post('action/json/userdata_goPrevEventPage',{},function(data) {
		if(data.message == "success"){
			$("#current_page").html(data.page_count);
			var eventList = $("#eventList");
			var events = data.events;
			var new_html = "";
			for(i = 0; i < events.length; i++){
				new_html =  new_html + "<li>" +
								"<time class='cbp_tmtime' datetime='2013-04-10 18:30'>" +
									"<span>4/10/13</span>" + 
									"<span>18:30</span>" +
								"</time>" +
								"<div class='cbp_tmicon cbp_tmicon-phone'><a onclick='editEvent(" + events[i].event_id + ")'><img src='css/images/file_edit.png' style='width:60%; height:60%; margin-top:5px;'></a></div>" +
								"<div class='cbp_tmlabel'>" +
									"<h2>" + events[i].event_name + "</h2>" +
									"<p><span style='width:100px;background:#007acd;'>时间：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>&nbsp&nbsp" + events[i].start_date + " ~ " + events[i].end_date + "</p>" +
									"<p style='background:#3f3f3f;'><font style='background:#007acd;'>事件发生地点：</font>&nbsp&nbsp" + events[i].place_name + "(古)&nbsp&nbsp&nbsp&nbsp" + events[i].now_name + "(今)</p>" + 
									"<p><font style='background:#007acd;'>事件涉及人物：</font>&nbsp&nbsp" + events[i].people + "</p>" +
									"<p style='background:#3f3f3f;'><font style='background:#007acd;'>事件内容：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</font>&nbsp&nbsp" + events[i].summary + "</p>" +
									"<p><font style='background:#007acd;'>事件影响：&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</font>&nbsp&nbsp" + events[i].influ + "</p>" +
								"</div>" +
							"</li>";
			}
			eventList.html(new_html); 
			if(data.page_count == 1){
				$("#prev").hide();
			}
			if(data.page_count < data.max_page_count){
				$("#next").show();
			}
		}
	},"json");
}

function init(){
	var pageCover = document.createElement("div");
	pageCover.id = "pc";
	pageCover.style.position = "absolute";
	pageCover.style.top = "0px";
	pageCover.style.left = "0px";
	pageCover.style.width = parent.document.body.offsetWidth +"px";
	pageCover.style.height = parent.document.body.offsetHeight +"px";
	pageCover.style.background = "rgba(0, 0, 0, 0.5)";
	pageCover.style.display = "none";
	window.parent.document.body.appendChild(pageCover);
	
	var flowLayer = document.createElement("div");
	flowLayer.id = "fl";
	flowLayer.style.position = "absolute";
	flowLayer.style.top = parent.document.body.offsetHeight*0.2 + "px";
	flowLayer.style.left = parent.document.body.offsetWidth*0.2 + "px";
	flowLayer.style.width = parent.document.body.offsetWidth*0.6 + "px";
	flowLayer.style.height = parent.document.body.offsetHeight*0.6 + "px";
	flowLayer.style.background = "#2f2f2f";
	flowLayer.style.paddingLeft = "10px";
	flowLayer.style.paddingRight = "10px";
	flowLayer.style.paddingBottom = "10px";
	flowLayer.style.border = "1px solid #007acd";
	
	var flow_header = document.createElement("div");
	flow_header.style.width = "100%";
	flow_header.style.height = parent.document.body.offsetHeight*0.03 + "px";
	flow_header.style.background = "#007acd";
	flow_header.style.position = "absolute";
	flow_header.style.top = "0px";
	flow_header.style.left = "0px";
	
	var close = document.createElement("img");
	close.name = "closeF";
	close.style.position = "absolute";
	close.style.top = "0px";
	close.style.right = "10px";
	close.style.height = "100%";
	close.src = "css/images/close.png";
	close.onmouseover = function(){
		close.src="css/images/close2.png";
	}
	close.onmouseout = function(){
		close.src="css/images/close.png";
	}
	close.onclick = function(){
		pageCover.style.display = "none";
		flowLayer.style.display = "none";
	}
	flow_header.appendChild(close);
	flowLayer.appendChild(flow_header);
	
	var edit_event = document.createElement("iframe");
	edit_event.id = "eef";
	edit_event.name = "editEventFrame";
	edit_event.style.float = "left";
	edit_event.style.width = "60%";
	edit_event.style.height = "95%";
	edit_event.style.marginTop = "3%";
	edit_event.src = "action/jsp/page_goEditEvent";
	flowLayer.appendChild(edit_event);
	
	var edit_event_map = document.createElement("div");
	edit_event_map.style.float = "left";
	edit_event_map.style.width = "39%";
	edit_event_map.style.height = "95%";
	edit_event_map.style.marginTop = "3%";
	edit_event_map.innerHTML = "map";
	edit_event_map.style.background = "white";
	edit_event_map.style.border = "2px solid white";
	flowLayer.appendChild(edit_event_map);
	
	flowLayer.style.display = "none";
	window.parent.document.body.appendChild(flowLayer);
}