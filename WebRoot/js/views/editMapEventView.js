/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.editMapEvent = Backbone.View.extend({
	
	classname : 'editMapEvent_view',
	tagName: 'div',
	tmpl_url : '',
	
	events: {
		"click #event_submit": "editEvent",
		"click #event_cancel": "slideBack",
		"click #getLocFromMap": "lonLat",
		"click #sureLocFromMap": "sureLonLat",
		"change #dynasty": "dynasty_id_show_place",
		"change #showplace": "another_place",
		"click #upload": "ajaxFileUpload",
		"click #reupload": "ajaxFileUpload"
	},
	
	initialize: function(options){
		this.options = options;
		this.bind('change', this.render);
		this.model = this.options.model;
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
		$(this.el).html(Mustache.to_html(this.template,this.model.toJSON()) );
		$("#leftSideBar").html(this.$el);
		var src = this.model.get("event_pic");
		var html ='相关图片：<img src="'+src+'"  width="270"  height="170px"/>';
		returnEventPicUrl=src;//为下面的提交作准备：如果没有更改图片则还是原来的路径保存；若更改了图片下面将会改变returnEventPicUrl的值
		$("#ep").html(html);
		var editEventRouter = new App.Routers.HMapVis();
		
		editEventRouter.navigate("eventTypeList_s/"+$("#type_id").html(), true);
		editEventRouter.navigate("dynastyList_s/"+$("#dynasty_id").html(), true);
		
		return this;
	},
	
	//listeners in the page
	editEvent : function() {
		var event_name = $("#event_name").val();
		var dynasty_id = $("#dynasty").val(); 
		var event_type = $("#event_type").val(); //is int
		var influ = $("#event_infu").val(); //infu  right
		var summary = $("#event_summary").val();
		var detail_url = $("#event_detail").val(); 
		var place_id = $("#showplace").val();//int
		var start_time = $("#event_start").val();
		var end_time = $("#event_end").val(); 
		var event_people = $("#event_people").val(); 
		var user_name =  $("#user_name").html(); 
		var event_id = Edit_event_id;
		
		if(event_name=="其他"){
			event_name = "unknown";
		}
		
		var event=new App.Models.Event({
			event_id : event_id,
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
		
		event.edit();
		
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
	    		var html ='相关图片：<img src="'+returnEventPicUrl+'"  width="270"  height="170px"/>';
	    		$("#ep").html(html);
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