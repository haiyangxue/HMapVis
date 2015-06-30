/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.EditPeople = Backbone.View.extend({
	
	classname : 'usereditpeople_view',
	tagName: 'div',
	tmpl_url : '',
	
	events: {
		"click #people_submit": "savePeople",
		"click #people_cancel": "slideBack",
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
	savePeople : function() {
		var people_name = $("#people_name").val();
		var birthday = $("#birthday").val();
		var deathday = $("#deathday").val();
		var birthplace = $("#birthplace").val();
		var people_character = $("#people_character").val();
		var temple_title = $("#temple_title").val();
		var people_summary = $("#people_summary").val();
		var people_influ = $("#people_influ").val();
		var people_detail_url = $("#people_detail").val();//按照上面的方法的话就可以得到正确的最终知识
	   
		var user_id = this.model.toJSON().user_id;//这里之前的话是得不到的
		var dynasty_id = $("#dynasty").val();  
		var education_id = $("#education").val();
		var job_id = $("#job").val();
		var people_id = this.model.toJSON().people_id;//这个的就是得到了整个的id;
		
		var people = {"people.people_id":people_id,"people.dynasty_id":dynasty_id,"people.education_id":education_id,"people.job_id":job_id,"people.people_influ":people_influ,"people.people_detail_url": people_detail_url,"people.people_character":people_character,"people.temple_title":temple_title,"people.people_summary":people_summary,"people.people_name":people_name,"people.birthday":birthday,"people.deathday":deathday,"people.birthpalce":birthplace,"people.user_id":user_id};
		
		$.post('action/json/user_updatepeople', people, function(data) { 
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
			router.navigate("userpeopleshow",true);//这样的话就是显示到当前的页面就好
		},"json");

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
		router.navigate("userpeopleshow",true);
	}
	
});