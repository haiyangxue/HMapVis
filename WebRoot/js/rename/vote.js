function makeVotes() {
	var selectedIndex = -1;
	var voteform = document.getElementById("voteForm");
	var i = 0;
	var choice;
	var namevote_id;
	for (i = 0; i < voteform.vote.length; i++) {
		if (voteform.vote[i].checked) {
			selectedIndex = i;
			//choice = voteform.vote[i].value;
			namevote_id = voteform.vote[i].value;
			console.log("djaklf;jdk");
			console.log(choice);
			break;
		}
	}
	if (selectedIndex < 0) {
		alert("您没有选择任何项");
	}
	$.post('action/json/namevote_addVote', {
		"namevote_id" : namevote_id
	}, function(data) {
		if (data.message == "voted") {
			alert("sorry, you have casted your vote to this name or one of the names of this building.");
		} else {
			alert("Thank you for your vote.");
		}
		window.parent.document.getElementById("sidebar").style.width = "1%";
		window.parent.document.getElementById("iframe").style.display = "none";
		window.parent.document.getElementById("content").style.width = "99%";
		window.parent.document.getElementById("allmap").style.display = "block";
		console.log(data);
	}, "json");
	/*$.ajax( {
		type : "post",
		url : 'action/json/namevote_addVote',
		async : false,
		data : {"new_name":choice},
		dataType : "json",
		success : function(data) {
			alert("Thank you for your vote.");
			window.parent.document.getElementById("sidebar").style.width = "1%";
			window.parent.document.getElementById("iframe").style.display = "none";
			window.parent.document.getElementById("content").style.width = "99%";
			window.parent.document.getElementById("allmap").style.display = "block";
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			//alert("sorry, you have casted your vote to this name or one of the names of this building.");
			console.log(XMLHttpRequest);
			console.log(textStatus);
			console.log(errorThrown);
			alert(XMLHttpRequest+textStatus);
		}
	});*/	
}
function cancelVote(){	
	window.parent.document.getElementById("sidebar").style.width = "1%";
	window.parent.document.getElementById("iframe").style.display = "none";
	window.parent.document.getElementById("content").style.width = "99%";
	window.parent.document.getElementById("allmap").style.display = "block";
}

function sendbuildingId(id) {
	var sidebar = $("#iframe");
	sidebar.attr("src", "action/jsp/page_goNameVote?building_id=" + id);
	var clientW = window.screen.width;
	var clientH = window.screen.height;
	if(clientW < clientH){
		document.getElementById("sidebar").style.width = "99%";
		document.getElementById("iframe").style.display = "block";
		document.getElementById("content").style.width = "1%";
		document.getElementById("allmap").style.display = "none";
	}else{
		document.getElementById("sidebar").style.width = "20%";
		document.getElementById("iframe").style.display = "block";
		document.getElementById("content").style.width = "80%";
		document.getElementById("allmap").style.display = "block";
	}
}
function addNewName(id) {
	var newName = $("#nn").val();
	
	if(newName.trim() == ""){
		alert("new name is null");
		return;
	}
	
	$.post('action/json/namevote_addNewName', {
		"namevote.building_id" : id,
		"namevote.new_name" : newName
	}, function(data) {
		if (data.message == "success") {
			alert("Thank you for giving this building a new name.");
		} else if (data.message == "exist") {
			alert("Sorry, the name you gave has already exist, but thank you anyway.");
		} else if (data.message == "overflow") {
			alert("Sorry, you have reached the limit. One can only give five names to each building. But thank you anyway.");
		} else {
			alert("Something isn't going right, but thank you anyway.");
		}
		//console.log(data);
	}, "json");
}