/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.editMapPlace = Backbone.View.extend({
	
	classname : 'editMapPlace_view',
	tagName: 'div',
	tmpl_url : '',
	
	events: {
		"click #place_submit": "editPlace",
		"click #place_cancel": "slideBack",
		"click #getLocFromMap": "lonLat",
		"click #sureLocFromMap": "sureLonLat",
		
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
		
		var editEventRouter = new App.Routers.HMapVis();
		//editEventRouter.navigate("eventTypeList", true);
		editEventRouter.navigate("dynastyList_s/"+$("#dynasty_id").html(), true);
		
		return this;
	},
	
	//listeners in the page
	editPlace : function() {
//		var event_name = $("#event_name").val();
//		var dynasty_id = $("#dynasty").val(); 
//		var event = {"event.event_name":event_name,"event.dynasty_id":dynasty_id};
//		
//		$.post('action/place_addevent', event, function(data) {},"json");
		
		var place_name = $("#place_name").val();
		var now_name = $("#now_name").val(); 
		var place_loc = $("#place_loc").val(); 
		var dynasty_id = $("#dynasty_id").val(); 
		var user_name =  $("#user_name").html(); 
		var place_id = this.model.get("place_id");//id不会被编辑 因而不会改变，用原始后台传来的数据。其他则要从用户输入重新获得
		 
		var place=new App.Models.Place({
			place_name : place_name,
			now_name : now_name,
			place_loc : place_loc,
			dynasty_id : dynasty_id,
			user_name : user_name,
			place_id : place_id,
		
		});
		
		place.edit();
		
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
	}
	
});