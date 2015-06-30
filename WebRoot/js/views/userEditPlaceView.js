/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.EditPlace = Backbone.View.extend({
	
	classname : 'usereditplace_view',
	tagName: 'div',
	tmpl_url : '',
	
	events: {
		"click #place_submit": "savePlace",
		"click #place_cancel": "slideBack",
		"click #getLocFromMap": "lonLat",
		"click #sureLocFromMap": "sureLonLat"
	},
	
	initialize: function(options){
		this.options = options;
		this.model = this.options.model;
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
		$(this.el).html(Mustache.to_html(this.template,this.model.toJSON()) );
		$("#leftSideBar").html(this.$el);
		return this;
	},
	
	//listeners in the page
	savePlace : function() {
		var place_name = $("#place_name").val();
		var place_loc = $("#place_loc").val();//按照上面的方法的话就可以得到正确的最终知识
	    var user_id = this.model.toJSON().user_id;//这里之前的话是得不到的
		var dynasty_id = $("#dynasty").val();  
		
		var place_id = this.model.toJSON().place_id;//这个的就是得到了整个的id;
		var now_name =  $("#place_nowname").val();
		var place = {"place.place_id":place_id,"place.place_loc":place_loc,"place.place_name":place_name,"place.now_name":now_name,"place.dynasty_id":dynasty_id,"place.user_id":user_id};
		
		$.post('action/json/user_updateplace', place, function(data) { 
			$("#leftSideBar").animate({width:0},"slow", function(){
				$("#leftSideBar").css("display","none");
			});
			var router = new App.Routers.HMapVis();
 			if($("#rightSideBar").css("display") == "none"){
				$("#rightSideBar").css("display","block");
				$("#rightSideBar").css("width","0px");
				$("#rightSideBar").css("height",$("body").height() - 52 + "px");
				$("#rightSideBar").animate({width:600},"slow");
			}
			router.navigate("userplaceshow",true);//这样的话就是显示到当前的页面就好
		},"json");
		
//		$("#leftSideBar").animate({width:0},"slow", function(){
//			$("#leftSideBar").css("display","none");
//		});
//		
//		var router = new App.Routers.HMapVis();
//		
//		if($("#rightSideBar").css("display") == "none"){
//			$("#rightSideBar").css("display","block");
//			$("#rightSideBar").css("width","0px");
//			$("#rightSideBar").css("height",$("body").height() - 52 + "px");
//			$("#rightSideBar").animate({width:1000},"slow");
//		}
//		router.navigate("userplace",true);
	},
	lonLat : function() {
		$("#getLocFromMap").hide();
		$("#sureLocFromMap").show();
		$('#map').css("cursor","crosshair");
		map.events.register("click",map,function(e){
			var lonlat = map.getLonLatFromPixel(e.xy).transform(Mercator_Projection,WGS_Projection);
			var place_loc = $("#place_loc");
			place_loc.val(""+lonlat.lon.toFixed(2)+","+lonlat.lat.toFixed(2));
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
		var router = new App.Routers.HMapVis();
		
		if($("#rightSideBar").css("display") == "none"){
			$("#rightSideBar").css("display","block");
			$("#rightSideBar").css("width","0px");
			$("#rightSideBar").css("height",$("body").height() - 52 + "px");
			$("#rightSideBar").animate({width:600},"slow");
		}
		router.navigate("userplaceshow",true);
	}
	
});