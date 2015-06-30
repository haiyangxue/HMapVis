var typeIDs = new Array();

function checkCheckBox(obj){
	var checked = new Array();
	var c = document.getElementsByName("checkbox");
	for(i=0;i<document.all(obj).length;i++){ 
		if(document.all(obj)[i].checked){
			checked.push(i);
			typeIDs.push(c[i].value);
		}
	}
	for(j=0;j<typeIDs.length;j++){
		$.post('action/json/event_querybytype',{"eventTypeId":typeIDs[j]},function(data) {
		},"json");
	}
}

function searchEvent(){
	var event_name = document.getElementById("searchName").value; //maybe null
	if(event_name == null || event_name == ""){
		event_name = "";
	}
	var event_time = document.getElementById("searchTime").value; //maybe null
	if(event_time == null || event_time == ""){
		event_time = "";
	}
	if(typeIDs[0] == null){
		typeIDs[0] = -1;
	}
	for(j=0;j<typeIDs.length;j++){
		alert(typeIDs[j] + " " + event_name + " " + event_time);
		$.post('action/json/event_searchevent',{"event.type_id":typeIDs[j], "event.event_name":event_name, "event.start_date":event_time},function(data) {
		},"json");
	}
}