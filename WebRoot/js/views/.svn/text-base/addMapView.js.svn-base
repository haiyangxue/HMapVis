/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.AddMap = Backbone.View.extend({
	
	classname : 'addmap_view',
	tagName: 'div',
	tmpl_url : '',
	
	events: {
		"click #upload": "ajaxFileUpload",
		"click #reupload": "ajaxFileUpload",
		"click #showMap": "showMap",
		"click #editMap": "editMap",
		"click #map_submit": "addMap",
		"click #map_cancel": "slideBack",
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
	        url:'action/json/fileUpload',//用于文件上传的服务器端请求地址
	        secureuri:false,//一般设置为false
	        fileElementId:'file',//文件上传空间的id属性  <input type="file" id="file" name="file" />
	        dataType: 'json',//返回值类型 一般设置为json
	        success: function (data, status){  //服务器成功响应处理函数
	        	self.loadUserImg(data.message);
	        	returnUrl = data.message;
	        },
	        error: function (data, status, e){//服务器响应失败处理函数
	            alert(e);
	        }
		});
		
		$("#upload").hide();
		$("#reupload").show();
	},

	loadUserImg : function(imgUrl){
		var user_map = $("#usermap");
		user_map.show();
		var all_map = $("#allmap");
		var img = $("#mapimg");
		img.attr("src", imgUrl);
		
		user_map.css({
			height : 100 + "px",
			width : 100 + "px", 
		});
		
		var scale = $("#scale");
		var mouseStart = {};
		var mapStart = {};

		translate = $("#translate");
		var posStart = {};
		
		um_width = user_map.width();
		um_height = user_map.height();
		
		um_bottomLeft_l = user_map.offset().left;
		um_bottomLeft_t = user_map.offset().top + um_height;
		um_topRight_l = user_map.offset().left + um_width;
		um_topRight_t = user_map.offset().top;
		
		am_left = all_map.offset().left;
		am_top = all_map.offset().top;
		
		diff_bottomLeft_l = um_bottomLeft_l - am_left;
		diff_bottomLeft_t = um_bottomLeft_t - am_top;
		diff_topRight_l = um_topRight_l - am_left;
		diff_topRight_t = um_topRight_t - am_top;
		
		// move the map
		translate.bind("mousedown", function(e) {
			var mapEvent = e || event;
			posStart.x = mapEvent.clientX;
			posStart.y = mapEvent.clientY;
			posStart.l = user_map.offset().left;
			posStart.t = user_map.offset().top;
			$(document).bind("mousemove", function(e) {
				var mapEvent = e || event;
				var l = mapEvent.clientX - posStart.x + posStart.l;
				var t = mapEvent.clientY - posStart.y + posStart.t;
				user_map.css({
					left : l + "px",
					top : t + "px", 
				});
			});
			$(document).bind("mouseup", function() {
				um_width = user_map.width();
				um_height = user_map.height();
				
				um_bottomLeft_l = user_map.offset().left;
				um_bottomLeft_t = user_map.offset().top + um_height;
				um_topRight_l = user_map.offset().left + um_width;
				um_topRight_t = user_map.offset().top;
				
				diff_bottomLeft_l = um_bottomLeft_l - am_left;
				diff_bottomLeft_t = um_bottomLeft_t - am_top;
				diff_topRight_l = um_topRight_l - am_left;
				diff_topRight_t = um_topRight_t - am_top;
				
				$(this).unbind("mousemove");
			});
		});

		// stretch to the bottom right corner
		scale.bind("mousedown", function(e) {
			var scaleEvent = e || event;
			mouseStart.x = scaleEvent.clientX;
			mouseStart.y = scaleEvent.clientY;
			mapStart.h = user_map.height();
			mapStart.w = user_map.width();

			$(document).bind("mousemove", function(e) {
				var scaleEvent = e || event;
				var h = scaleEvent.clientY - mouseStart.y + mapStart.h;
				var w = scaleEvent.clientX - mouseStart.x + mapStart.w;
				if(w < scale.width())
					w = scale.width(); 
				if(h < scale.height())
					h = scale.height(); 
				user_map.css({
					width : w + "px",
					height : h + "px", 
				});
				img.css({
					width : w + "px",
					height : h + "px", 
				});
			});
			$(document).bind("mouseup", function() {
				um_width = user_map.width();
				um_height = user_map.height();
				
				um_bottomLeft_l = user_map.offset().left;
				um_bottomLeft_t = user_map.offset().top + um_height;
				um_topRight_l = user_map.offset().left + um_width;
				um_topRight_t = user_map.offset().top;
				
				diff_bottomLeft_l = um_bottomLeft_l - am_left;
				diff_bottomLeft_t = um_bottomLeft_t - am_top;
				diff_topRight_l = um_topRight_l - am_left;
				diff_topRight_t = um_topRight_t - am_top;
				
				$(this).unbind("mousemove");
			});

		});
	},
	/**
	 * 得到用户地图的经纬度
	 */
	getMapBounds : function() {
		var offset_bottomLeft = new OpenLayers.Pixel(diff_bottomLeft_l, diff_bottomLeft_t);
		var offset_topRight = new OpenLayers.Pixel(diff_topRight_l, diff_topRight_t);
		var lonlat_bottomLeft = map.getLonLatFromPixel(offset_bottomLeft); 	 	
		var lonlat_topRight = map.getLonLatFromPixel(offset_topRight); 
		var lonlatStr = ""+lonlat_bottomLeft.lon+","+lonlat_bottomLeft.lat+","+lonlat_topRight.lon+","+lonlat_topRight.lat;
		return lonlatStr;
	},

	/**
	 * show user's picture on the map
	 */
	showMap : function() {
		var self=this;
		if(typeof(returnUrl) == "undefined" || returnUrl == ""){
			alert("请先上传图片");
			return;
		}
		$("#usermap").hide();
		var boundsArr = self.getMapBounds().split(",",4);
		var image_bounds = new OpenLayers.Bounds(boundsArr[0], boundsArr[1], boundsArr[2],boundsArr[3]).transform(WGS_Projection, Mercator_Projection);
		image_layer = new OpenLayers.Layer.Image(
				"test",
				returnUrl,
				image_bounds,
				new OpenLayers.Size(50,50),
				{isBaseLayer: false, opacity: .7 } 
			);
		map.addLayer(image_layer);
		$("#showMap").hide();
		$("#editMap").show();
	},
	
	/**
	 * 重新编辑
	 */
	editMap : function() {
		if(typeof(returnUrl) == "undefined" || returnUrl == ""){
			alert("请先上传图片");
			return;
		}
		
		if(image_layer){
			map.removeLayer(image_layer);
			image_layer = null;
		}
		$("#showMap").show();
		$("#editMap").hide();
		$("#usermap").show();
	},

	/**
	 * upload map
	 */
	addMap : function() {
		if(typeof(returnUrl) == "undefined" || returnUrl == ""){
			alert("请先上传图片");
			return;
		}
		
		var start_time = $("#map_start").val();
		var start_tmp = trim(start_time);
		if(start_tmp.substring(0,1) == "-")
			start_tmp = start_tmp.substring(1,start_tmp.length);
		
		if(!isDateStr(start_tmp) && !isDatePart(start_tmp)){
			alert("开始时间时间格式不正确！");
			return;
		}
		
		var end_time = $("#map_end").val();
		var end_tmp = trim(end_time);
		if(end_tmp.substring(0,1) == "-")
			end_tmp = end_tmp.substring(1,end_tmp.length);
		if(!isDateStr(end_tmp) && !isDatePart(end_tmp)){
			alert("结束时间格式不正确！");
			return;
		}
		
		var map_name = $("#map_name").val();
		if(map_name == ""){
			alert("请填写地图名称！");
			return;
		}
		
		var dynasty_id = $("#dynasty").val();
		var regiontype = $("#mapType").val();
		var map_url = returnUrl;
		var image_bounds = this.getMapBounds();
		var map_info = {"map.map_name":map_name,"map.dynasty_id":dynasty_id,
				"map.tile_path":map_url,"map.map_bounds":image_bounds,
				"start_time_tmp":trim(start_time),"end_time_tmp":trim(end_time),"map.regiontype":regiontype};
		
		$.post('action/json/map_addMap', map_info, function(data) {
			var message = data.message;
			if(message == "addmap_success"){
				alert("add map success");
				/**
				 * 上传成功，回到初始化的状态
				 */
				$("#showMap").show();
				$("#editMap").hide();
				$("#usermap").hide();
				returnUrl = "";
				if(image_layer){
					map.removeLayer(image_layer);
					image_layer = null;
				}
				$("#map_start").val("开始时间");
				$("#map_end").val("结束时间");
				$("#map_name").val("");
				$("#mapType").val("");
			}else{
				alert("sorry,add map error");
			}
		},"json");
	},
	
	slideBack : function() {
		$("#leftSideBar").animate({width:0},"slow", function(){
			$("#leftSideBar").css("display","none");
		});
	}
});