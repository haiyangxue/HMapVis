/**
 * views -- render HTML/CSS with JS templating
 */

	var searchplaces;
App.Views.SearchPlace = Backbone.View.extend({
	
	classname : 'searchplace_view',
	tagName: 'div',
	tmpl_url : '',
	
	events: {
		"click #place_search": "searchPlace",
		"click #place_cancel": "slideBack",
		"change #placeShowList_2" : "popup"
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
	searchPlace : function() {
		
		var place_now_name = $("#place_now_name").val();
		var place_past_name = $("#place_past_name").val(); 
		
		searchplaces  = new App.Collections.Places();
		searchplaces.search({
			success : function() {
				if($("#placeShowList_1").css("display")=="none")
					$("#placeShowList_1").show();

				var searchPlaceListView = new App.Views.SearchPlaceList({collection : searchplaces});
				searchPlaceListView.trigger('change');
			},
			place_name:place_past_name,
			now_name:place_now_name
		});
		
//		var place = new App.Models.Place({
//			place_name: place_past_name,
//			now_name: place_now_name,
//		});
//		var searchPlace  = new App.Collections.Places();
//		searchPlace.search(place);//people collection中新增方法，以一个peoplemodel为参数
		
		
	},
//	
//	lonLat : function() {
//		$("#getLocFromMap").hide();
//		$("#sureLocFromMap").show();
//		$('#map').css("cursor","crosshair");
//		map.events.register("click",map,function(e){
//			var lonlat = map.getLonLatFromPixel(e.xy).transform(Mercator_Projection,WGS_Projection);
//			var people_loc = $("#people_loc");
//			people_loc.val(""+lonlat.lon.toFixed(2)+","+lonlat.lat.toFixed(2));
//		});
//	},
//
//	sureLonLat : function() {
//		$("#getLocFromMap").show();
//		$("#sureLocFromMap").hide();
//		$('#map').css("cursor","auto");
//		map.events.remove("click");
//	},
//	
	slideBack : function() {
		$("#leftSideBar").animate({width:0},"slow", function(){
			$("#leftSideBar").css("display","none");
		});
	},
	popup : function(){
		  var checkedPlace_id;
		  var r=document.getElementById("placeShowList_3").radio;
		    if(r!=null){
		        var i;
		        for(i=0;i<r.length;i++){
		            if(r[i].checked){
		            	checkedPlace_id = r[i].value;            
		            }
		        }
		    	}
		    var lon;
		    var lat;
		    var checkmodelindex;
	    	for(var i=0;i<searchplaces.length;i++){
//	    		var places = new App.Models.Place();
//	    		for(var obj in searchplaces["models"]){
//	    		}
	    		if(searchplaces["models"][i].get("place_id")==checkedPlace_id){
	    			checkmodelindex=i;
	    			lon = (searchplaces["models"][i].get("place_loc").split(','))[0];
	    			lat = (searchplaces["models"][i].get("place_loc").split(','))[1];
	    		}
	    		}
//		 user_image_layer =   new parent.OpenLayers.Layer.Image(
//					"test",
//					url_path,
//					image_bounds,
//					new parent.OpenLayers.Size(50,50),
//					{isBaseLayer: false, opacity: 1 } 
//				);
//		 
//			parent.map.addLayer(user_image_layer);
			addPopup(searchplaces["models"][checkmodelindex].attributes.place_id,lon,lat);
			var place = new App.Models.Place();
			place=searchplaces["models"][checkmodelindex];
			var showPlaceView = new App.Views.showMapPlace({model: place});
			showPlaceView.trigger('change');
			popup.show();
			markers.display(true);
	}
});