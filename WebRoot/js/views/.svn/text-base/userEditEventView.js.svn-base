/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.EditEvent = Backbone.View.extend({
	
	classname : 'usereditevent_view',
	tagName: 'div',
	tmpl_url : '',
	
	events: {
		"click #event_submit": "saveEvent",
		"click #event_cancel": "slideBack",
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
	saveEvent : function() {
		var event_name = $("#event_name").val();
		var place_loc = $("#event_loc").val();//按照上面的方法的话就可以得到正确的最终知识
		var start_date = $("#place_start").val(); 
		var end_date = $("#place_end").val();
		var people = $("#event_people").val(); 
		var influ = $("#event_infu").val();
		var summary = $("#event_summary").val();
		var detail_url = $("#event_detail").val();
		var event_id = this.model.toJSON().event_id;    //这里的话自己就是为了得到ID 这个是不会改变的  这样便于在数据库首先可以搜索到其原始的数据  然后便于修改
		var user_id = this.model.toJSON().user_id;
		var type_id = $("#event_type").val();  //这个方法是可以得到我们选择框的东西的  直接就是映射到的是id
		var dynasty_id = $("#dynasty").val();  
		var place_name = this.model.toJSON().place_name;
		var place_id = this.model.toJSON().place_id;//这个的就是得到了整个的id;
		var now_name = this.model.toJSON().now_name;
		
		var place = {"place.place_id":place_id,"place.place_loc":place_loc,"place.place_name":place_name,"place.now_name":now_name,"place.dynasty_id":dynasty_id};
		
		$.post('action/json/user_updateplace', place, function(data) { 
		},"json");
		
		var event = {"event.event_id":event_id,"event.place_id":place_id,"event.type_id":type_id,"event.dynasty_id":dynasty_id,"event.user_id":user_id,"event.event_name":event_name,"event.place_loc":place_loc,"event.start_date":start_date,"event.end_date":end_date,"event.people":people,"event.influ":influ,"event.summary":summary,"event.detail_url":detail_url};
		
		$.post('action/json/user_editEvent', event, function(data) { 
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
			router.navigate("usereventshow",true);//这样的话就是显示更新的那一页的内容
			
		},"json");
		
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
		var router = new App.Routers.HMapVis();
		
		if($("#rightSideBar").css("display") == "none"){
			$("#rightSideBar").css("display","block");
			$("#rightSideBar").css("width","0px");
			$("#rightSideBar").css("height",$("body").height() - 52 + "px");
			$("#rightSideBar").animate({width:600},"slow");
		}
		router.navigate("usereventshow",true);
	}
	
});