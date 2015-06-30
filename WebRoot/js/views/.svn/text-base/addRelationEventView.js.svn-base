/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.AddRelationEvent = Backbone.View.extend({
	
	classname : 'addrelationevent_view',
	tagName: 'div',
	tmpl_url : '',
	
	events: {
		"click #revent_submit": "addEvent",
		"click #revent_cancel": "slideBack",
		"click #rgetLocFromMap": "lonLat",
		"click #rsureLocFromMap": "sureLonLat",
		"change #rdynasty": "dynasty_id_show_place",
		"change #rshowplace": "another_place"
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
		$("#leftSideBar2").html(this.$el);
		return this;
	},
	
	//listeners in the page
	addEvent : function() {
		var event_name = $("#revent_name").val();
		var dynasty_id = $("#dynasty").val(); 
		var event_type = $("#revent_type").val(); //is int
		var influ = $("#revent_influ").val(); 
		var summary = $("#revent_summary").val();
		var detail_url = $("#revent_detail").val(); 
		var place_id = $("#rshowplace").val();//int
		var start_time = $("#revent_start").val();
		var end_time = $("#revent_end").val(); 
		var event_people = $("#revent_people").val(); 
		var user_name =  $("#user_name").html(); 
		
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
			event_people : event_people
		});
		
		event.save();
	},
	lonLat : function() {
		$("#getLocFromMap").hide();
		$("#sureLocFromMap").show();
		$('#map').css("cursor","crosshair");
		map.events.register("click",map,function(e){
			var lonlat = map.getLonLatFromPixel(e.xy).transform(Mercator_Projection,WGS_Projection);
			var event_loc = $("#revent_loc");
			event_loc.val(""+lonlat.lon.toFixed(2)+","+lonlat.lat.toFixed(2));
		});
	},
	sureLonLat : function() {
		$("#rgetLocFromMap").show();
		$("#rsureLocFromMap").hide();
		$('#map').css("cursor","auto");
		map.events.remove("click");
	},
	slideBack : function() {
		$("#leftSideBar2").animate({width:0},"slow", function(){
			$("#leftSideBar2").css("display","none");
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
	}
	
});