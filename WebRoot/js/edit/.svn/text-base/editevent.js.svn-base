function submitevent(){
	var event_name = $("#event_name").val();
	var type_id = $("#event_type").val();
	var dynasty_id = $("#dynasty").val();
	var event_loc = $("#event_loc").val();
	var event_start = $("#event_start").val();
	var event_end = $("#event_end").val();
	var event_people = $("#event_people").val();
	var event_infu = $("#event_infu").val();
	var event_summary = ("#event_summary").val();
	var event_detail = $("#event_detail").val();
	
	var event = {"event.event_name":event_name,"event.type_id":type_id,"event.event.dynasty_id":dynasty_id};
	
	$.post('action/json/event_updateEvent', event, function(data) {
		
	},"json");
}
/*
function getLonLat(){
	$("#getLocFromMap").hide();
	$("#sureLocFromMap").show();
	$('#map', window.parent.document).css("cursor","crosshair");
	parent.map.events.register("click",parent.map,function(e){
		var lonlat = parent.map.getLonLatFromPixel(e.xy).transform(parent.Mercator_Projection,parent.WGS_Projection);
		var event_loc = $("#event_loc");
		event_loc.val(""+lonlat.lon.toFixed(2)+","+lonlat.lat.toFixed(2));
	});
}

function sureLonLat(){
	$("#getLocFromMap").show();
	$("#sureLocFromMap").hide();
	$('#map', window.parent.document).css("cursor","auto");
	parent.map.events.remove("click");
}
*/