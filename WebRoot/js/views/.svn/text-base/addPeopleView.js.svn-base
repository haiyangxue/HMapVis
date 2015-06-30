/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.AddPeople = Backbone.View.extend({
	
	classname : 'addpeople_view',
	tagName: 'div',
	tmpl_url : '',
	
	events: {
		"click #people_submit": "addPeople",
		"click #getLocFromMap": "lonLat",
		"click #sureLocFromMap": "sureLonLat",
		"click #upload": "ajaxFileUpload",
		"click #reupload": "ajaxFileUpload", 
		"click #people_cancel": "slideBack"
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
		return this;
	},
	
	//listeners in the page
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
	        url:'action/json/fileUploadpic',//用于文件上传的服务器端请求地址
	        secureuri:false,//一般设置为false
	        fileElementId:'file',//文件上传空间的id属性  <input type="file" id="file" name="file" />
	        dataType: 'json',//返回值类型 一般设置为json
	        success: function (data, status){  //服务器成功响应处理函数
	        
	        	returnUrl = data.message;
	        	alert("success");
	        },
	        error: function (data, status, e){//服务器响应失败处理函数
	            alert(e);
	        }
		});
		
		$("#upload").hide();
		$("#reupload").show();
	},
	
	addPeople : function() {
		var people_name = $("#people_name").val();
		var people_character = $("#people_character").val(); 
		var temple_title = $("#temple_title").val();
		var job_id = $("#job").val(); //int
		var dynasty_id = $("#dynasty").val();//int
		var education_id = $("#education").val(); //int
		var birthplace = $("#people_loc").val();//birth place
		var birthday = $("#startTime").val(); //birth day
		var deathday = $("#endtime").val();//death day
		var people_summary = $("#people_summary").val(); //基本信息
		var people_detail = $("#people_detail").val();//详细介绍
		var people_influ = $("#people_influ").val(); //人物影响
		var event_about = $("#event_id").val();//参与事件
		var user_name =  $("#user_name").html(); 
		var headpic_path=returnUrl; 
		
		var people = new App.Models.People({
			people_name : people_name,
			dynasty_id : dynasty_id,
			people_influ  : people_influ,
			people_summary :  people_summary,
			people_detail : people_detail,
			birthplace  : birthplace, 
			user_name : user_name,
			people_character : people_character,
			temple_title : temple_title,
			birthday : birthday,
			deathday : deathday,
			education_id : education_id,
			job_id : job_id,
			headpic_path : headpic_path 
		});
		
		people.save();
		
	},
	
	lonLat : function() {
		$("#getLocFromMap").hide();
		$("#sureLocFromMap").show();
		$('#map').css("cursor","crosshair");
		map.events.register("click",map,function(e){
			var lonlat = map.getLonLatFromPixel(e.xy).transform(Mercator_Projection,WGS_Projection);
			var people_loc = $("#people_loc");
			people_loc.val(""+lonlat.lon.toFixed(2)+","+lonlat.lat.toFixed(2));
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
	}
});