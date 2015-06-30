/**
 * views -- render HTML/CSS with JS templating
 */

var loc_markers; 	 	
var loc_marker;


App.Views.AddPlace = Backbone.View.extend({
	
	classname : 'addplace_view',
	tagName: 'div',
	tmpl_url : '',
	
	events: {
		"click #getLocFromMap": "lonLat",
		"click #sureLocFromMap": "showLonLat",
		"click #showLocAtMap": "sureLonLat",
		"click #place_submit": "addPlace",
		"click #place_cancel": "slideBack"
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
	addPlace : function() {
		var place_Name = $("#place_name").val();
		var place_Loc = $("#place_loc").val();
		var place_Nowname = $("#place_nowname").val();
		var place_Dynasty = $("#dynasty").val();
		var place_Start = $("#place_start").val();
		var place_End = $("#place_end").val();
		var place=new App.Models.Place({
			place_name : place_Name,
			now_name : place_Nowname,
			start_time: 0,
			end_time: 0,
			dynasty_id : place_Dynasty,
			place_loc : place_Loc
		});
		
		place.save();
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
		if(loc_marker){
			loc_markers.removeMarker(loc_marker);
		}
		$("#getLocFromMap").show();
		$("#sureLocFromMap").hide();
		$('#map').css("cursor","auto");
		map.events.remove("click");
	},
	
	showLonLat : function() {
		var place_loc = $("#place_loc");
		var lonlat = place_loc.val();
		var ll = lonlat.split(",",2);
		var lon = ll[0];
		var lat = ll[1];
		
		if(lonlat == ""){
			alert("不能为空！");
		}else if(isNaN(lon) || isNaN(lat)){
			alert("格式不正确，必须为 longitude,latitude");
		}else{
			loc_markers = new OpenLayers.Layer.Markers( "Markers" );
			var query = new OpenLayers.LonLat(lon, lat).transform(
					new OpenLayers.Projection("EPSG:4326"),
					map.getProjectionObject()
                );
			var size = new OpenLayers.Size(19,27);
	 		var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
			var icon = new OpenLayers.Icon("openlayers/img/marker.png", size, offset);
			loc_marker = new OpenLayers.Marker(query, icon);
			loc_markers.addMarker(loc_marker);
			map.addLayer(loc_markers);
			
			changeCenter(lon,lat);
		}
	},
	
	slideBack : function() {
		$("#leftSideBar").animate({width:0},"slow", function(){
			$("#leftSideBar").css("display","none");
		});
	}
});