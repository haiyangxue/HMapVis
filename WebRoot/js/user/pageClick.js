function editEvent(id){
	parent.document.getElementById("pc").style.display = "block";
	parent.document.getElementById("fl").style.display = "block";
	$.post('action/json/event_querybyid',{"event_id": id},function(data) {
		$(parent.frames["editEventFrame"].document).contents().find("#event_name").val(data.event.event_name);
		var optionList = $(parent.frames["editEventFrame"].document).contents().find("#event_type").get(0).options;
		var typeN = data.event.type_name;
		for(i = 0; i < optionList.length; i++){
			if(optionList[i].innerHTML == typeN){
				optionList.selectedIndex = i;
			}
		}
		var odynastyList = $(parent.frames["editEventFrame"].document).contents().find("#dynasty").get(0).options;
		var dynastyI = data.event.dynasty_id;
		for(i = 0; i < odynastyList.length; i++){
			if(odynastyList[i].value == dynastyI){
				odynastyList.selectedIndex = i;
			}
		}
		$(parent.frames["editEventFrame"].document).contents().find("#event_loc").val(data.event.place_name);
		$(parent.frames["editEventFrame"].document).contents().find("#event_start").val(data.event.start_date);
		$(parent.frames["editEventFrame"].document).contents().find("#event_end").val(data.event.end_date);
		$(parent.frames["editEventFrame"].document).contents().find("#event_people").val(data.event.people);
		$(parent.frames["editEventFrame"].document).contents().find("#event_infu").val(data.event.influ);
		$(parent.frames["editEventFrame"].document).contents().find("#event_summary").val(data.event.summary);
		$(parent.frames["editEventFrame"].document).contents().find("#event_detail").val(data.event.detail_url);
	},"json");
}
function mouseoverUp(){
	document.pre.src="css/images/up2.png";
}
function mouseoutUp(){
	document.pre.src="css/images/up1.png";
}
function mouseoverDown(){
	document.nex.src="css/images/down2.png";
}
function mouseoutDown(){
	document.nex.src="css/images/down1.png";
}
function mouseoverClose(){
	document.closeF.src="css/images/close2.png";
}
function mouseoutClose(){
	document.closeF.src="css/images/close.png";
}