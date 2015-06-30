/**
 * views -- render HTML/CSS with JS templating
 */

var returnEventPicUrl;
App.Views.AddEvent = Backbone.View.extend({
	
	classname : 'addevent_view',
	tagName: 'div',
	tmpl_url : "",
	
	events: {
		"click #event_submit": "addEvent",
		"click #event_cancel": "slideBack",
		"click #getLocFromMap": "lonLat",
		"click #sureLocFromMap": "sureLonLat",
		"change #dynasty": "dynasty_id_show_place",
		"change #showplace": "another_place",
		"click #upload": "ajaxFileUpload",
		"click #reupload": "ajaxFileUpload",
		"click #queryRe" : "searchEvent",
		"click #related_new_event_submit" : "new_event_submit",
		"click #related_existing_event_submit" : "existing_event_submit",
		"click #open_related_new_event_submit" : "new_choose"
	},
	
	initialize: function(options){
		this.options = options;
		this.bind('change', this.render);
		
		var self = this;
        $.ajax({
            url: this.options.tmpl_url,
            method: 'GET',
            async: false,
            dataType: 'html',
            success: function(data) {
               self.template = data;
            }
        });
		
	},
	render: function(){ // render方法，目标只有两个：填充this.el，返回this以便链式操作。
		var nullJson = {"nj":""};
		$(this.el).html(Mustache.to_html(this.template,nullJson) );
		$("#leftSideBar").html(this.$el);
		display("event_relation"); 	 	
		showAndhide("box1"); 	 	
		showAndhide("box2"); 	 	
		showAndhide("box3"); 	 	
		showAndhide("box4"); 	 	
		if(event_relation_json.addNewEventFlag){ 	 	
			display("event_relation"); 	 	
		}
		return this;
	},
	
	//listeners in the page
	addEvent : function() {
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
		var event_video = $("#event_video").val();
		var pic_url = returnEventPicUrl;
		
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
			event_people : event_people,
			event_video : event_video,
			event_pic : pic_url
		});
		
		event.save();
	},
	
	searchEvent : function(){
		if($("#event_name").val()!=""){
			showAndhide("first_con");
			showAndhide("query_event_relation");
			showAndhide("thrid_content");
			showAndhide("box1");
			addRelatedEvent(0);
			document.getElementById("event_name").value=$("#event_name2").val();
			searchEvents();    
		}
		else{
			alert("请将当前事件信息补充完整");
		}
	},
	
	new_choose: function(){
		showAndhide("box4");
	},
	
	existing_event_submit:function(){
		event_relation_json.relatedEventtype_id=$("#existing_event_select").val();
		saveRelation(event_relation_json.Event_id,event_relation_json.relatedEvent_id,
				 event_relation_json.relatedEventtype_id);
	},
	
    new_event_submit:function(){
    	event_relation_json.relatedEventtype_id = $("#new_event_select").val();
    	slideBar(10,0);
	},
	
	
	lonLat : function() {
		$("#getLocFromMap").hide();
		$("#sureLocFromMap").show();
		$('#map').css("cursor","crosshair");
		map.events.register("click",map,function(e){
			var lonlat = map.getLonLatFromPixel(e.xy).transform(Mercator_Projection,WGS_Projection);
			var event_loc = $("#event_loc");
			event_loc.val(""+lonlat.lon.toFixed(2)+","+lonlat.lat.toFixed(2));
		});
	},
	sureLonLat : function() {
		$("#getLocFromMap").show();
		$("#sureLocFromMap").hide();
		$('#map').css("cursor","auto");
		map.events.remove("click");
	},
	slideBack : function() {
		$("#leftSideBar").animate({width:0},"slow", function(){
			$("#leftSideBar").css("display","none");
		});
	},
	 
	dynasty_id_show_place : function(){
		var dynasty_id = $("#dynasty").val();
		App.data.mainRouter.navigate("dynasty_id_show_place_rout/"+dynasty_id ,  {trigger: true, replace: true});
	} ,
	
	another_place : function(){ 
		if($("#showplace").val()==-1){
			alert("The place you want not exists, you can add it in 'add place', or it will insert as 'unknown'");
		}
	},
	ajaxFileUpload : function() {
		var self=this;
		$("#loading")
		.ajaxStart(function(){
		    $(this).show();
		})//开始上传文件时显示一个loading
		.ajaxComplete(function(){
		    $(this).hide();
		});//文件上传完成将loading隐藏起来
		
		if($("#file").val() == ""){
			alert("请选择文件");
			return;
		}
		$.ajaxFileUpload({
	        url:'action/json/eventfileUpload',//用于文件上传的服务器端请求地址
	        secureuri:false,//一般设置为false
	        fileElementId:'file',//文件上传空间的id属性  <input type="file" id="file" name="file" />
	        dataType: 'json',//返回值类型 一般设置为json
	        success: function (data, status){  //服务器成功响应处理函数
	        	self.loadUserImg(data.message);
	        	returnEventPicUrl = data.message;
	        },
	        error: function (data, status, e){//服务器响应失败处理函数
	            alert(e);
	        }
		});
		
		$("#upload").hide();
		$("#reupload").show();
	},
	loadUserImg : function(imgUrl){

	}
	
});