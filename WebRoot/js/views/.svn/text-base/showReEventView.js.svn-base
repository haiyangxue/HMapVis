/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.showReEvent = Backbone.View.extend({

	classname : 'showReEvent_view',
	tagName : 'div',
	tmpl_url : 'js/templates/ReEvent_template.html',
	events : {

		"click #showDetail" : "showEventDetail",
		"click #closePopup" : "slideBack",
		"click #yinguo" : "yinguo",
		"click #baohan" : "baohan",
		"click #zishijian" : "zishijian",
		"change #relationevent1" : "showEventOnMap1",
		"change #relationevent2" : "showEventOnMap2",
		"change #relationevent3" : "showEventOnMap3"
	},

	initialize : function(options) {
		this.options = options;
		this.bind('change', this.render);
		this.model = this.options.model;
		this.collection = this.options.collection;
		var self = this;
		this.yinguoShow=false;
		this.baohanShow=false;
		this.zishijianShow=false;

		
		$.ajax({
			url : self.tmpl_url,
			method : 'GET',
			async : false,
			dataType : 'html',
			success : function(data) {
				self.template = data;
			}
		});
	},

	render : function() { // render方法，目标只有两个：填充this.el，返回this以便链式操作。
		var eventTypeJson1 = {
			'eventRes1' : eval(JSON.stringify(this.collection.where({
				relation_id : 1
			}))),
			'eventRes2' : eval(JSON.stringify(this.collection.where({
				relation_id : 2
			}))),
			'eventRes3' : eval(JSON.stringify(this.collection.where({
				relation_id : 3
			})))
		};
		$(this.el).html(Mustache.to_html(this.template, eventTypeJson1));

		$("#leftSideBar").html(this.$el);
		$(".result1").toggle(function() {
			$(this).next(".text").animate({
				height : 'toggle',
				opacity : 'toggle'
			}, "1000");
		}, function() {
			$(this).next(".text").animate({
				height : 'toggle',
				opacity : 'toggle'
			}, "1000");
		});
		$(".result2").toggle(function() {
			$(this).next(".text").animate({
				height : 'toggle',
				opacity : 'toggle'
			}, "1000");
		}, function() {
			$(this).next(".text").animate({
				height : 'toggle',
				opacity : 'toggle'
			}, "1000");
		});
		$(".result3").toggle(function() {
			$(this).next(".text").animate({
				height : 'toggle',
				opacity : 'toggle'
			}, "1000");
		}, function() {
			$(this).next(".text").animate({
				height : 'toggle',
				opacity : 'toggle'
			}, "1000");
		});
		return this;
	},

	yinguo : function() {
		this.yinguoShow=!this.yinguoShow;
		if(this.yinguoShow){
		markers.clearMarkers();
		this.collection.each(function(data){
			if(data.get("relation_id")==1){
			var lonlat=data.get("place_loc").split(",");
			addMarker(
					data.get("event_id2"),
					lonlat[0],
					lonlat[1]);
			markers.display(true);	
			}});
		}
		
		$(".result1").toggle(function() {
			$(this).next(".text").animate({
				height : 'toggle',
				opacity : 'toggle'
			}, "1000");
		}, function() {
			$(this).next(".text").animate({
				height : 'toggle',
				opacity : 'toggle'
			}, "1000");
		});
	},

	baohan : function() {
		this.baohanShow=!this.baohanShow;
		if(this.baohanShow){
		markers.clearMarkers();
		this.collection.each(function(data){
			if(data.get("relation_id")==2){
			var lonlat=data.get("place_loc").split(",");
			addMarker(
					data.get("event_id2"),
					lonlat[0],
					lonlat[1]);
			markers.display(true);	
			}});
		}
		$(".result2").toggle(function() {
			$(this).next(".text").animate({
				height : 'toggle',
				opacity : 'toggle'
			}, "1000");
		}, function() {
			$(this).next(".text").animate({
				height : 'toggle',
				opacity : 'toggle'
			}, "1000");
		});
	},

	zishijian : function() {
		this.zishijianShow=!this.zishijianShow;
		if(this.zishijianShow){
		markers.clearMarkers();

		this.collection.each(function(data){
			if(data.get("relation_id")==3){
			var lonlat=data.get("place_loc").split(",");
			addMarker(
					data.get("event_id2"),
					lonlat[0],
					lonlat[1]);
			markers.display(true);	
			}});
		}
		$(".result3").toggle(function() {
			$(this).next(".text").animate({
				height : 'toggle',
				opacity : 'toggle'
			}, "1000");
		}, function() {
			$(this).next(".text").animate({
				height : 'toggle',
				opacity : 'toggle'
			}, "1000");
		});
	},

	showEventOnMap1 : function(){
		var checkedEvent_id;
		var r=document.getElementById("relationevent1").radio;
		if(r!=null){
			if(r.length!=undefined){
				var i;
				for(i=0; i<r.length; i++){
					if(r[i].checked){
						checkedEvent_id = r[i].value;            
					}
				}
			}
			else{
				checkedEvent_id=r.value;
			}
		}

		showMapEvent(checkedEvent_id);
	},
	showEventOnMap2 : function(){
		var checkedEvent_id;
		var r=document.getElementById("relationevent2").radio;
		if(r!=null){
			if(r.length!=undefined){
				var i;
				for(i=0; i<r.length; i++){
					if(r[i].checked){
						checkedEvent_id = r[i].value;            
					}
				}
			}
			else{
				checkedEvent_id=r.value;
			}
		}

		showMapEvent(checkedEvent_id);
	},
	showEventOnMap3 : function(){
		var checkedEvent_id;
		var r=document.getElementById("relationevent3").radio;
		if(r!=null){
			if(r.length!=undefined){
				var i;
				for(i=0; i<r.length; i++){
					if(r[i].checked){
						checkedEvent_id = r[i].value;            
					}
				}
			}
			else{
				checkedEvent_id=r.value;
			}
		}
		showMapEvent(checkedEvent_id);
	},
	slideBack : function() {
		$("#leftSideBar").animate({width:0},"slow", function(){
			$("#leftSideBar").css("display","none");
		});
	}
});
