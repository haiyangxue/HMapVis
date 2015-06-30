var Pencil = {
	createNew : function(color, style, size){	
		var pencil = {};
		pencil.color = color;
		pencil.style = style;
		pencil.size = size;
		pencil.equals = function(pen){
			if(pencil.color == pen.color && pencil.style == pen.style && pencil.size == pen.size){
				return true;
			}else{
				return false;
			}
		};
		return pencil;
	}		
};
var LegendManager = {
	legendItemList : new Array(),
	count : 0,
	creatItem : function(pencil){
		var item = {};
		item.pencil = pencil;
		item.content = "";
		item.id = LegendManager.count;
		LegendManager.count++;
		item.setContent = function(content){
			item.content = content;
		};
		return item;
	},
	addItem : function(item){
		var alreadyIn = false;
		for(var i = 0; i < LegendManager.legendItemList.length; i++){
			if(LegendManager.legendItemList[i].pencil.equals(item.pencil)){
				alreadyIn = true;
			}
		}
		if(!alreadyIn){
			LegendManager.legendItemList.push(item);
		}
	}
};
var DrawLine = {
	map : null,
	lineLayer : new OpenLayers.Layer.Vector("Line"),
	arrowLayer : null,
	isDrawLine:false,
	init : function(map){
		DrawLine.map = map;
		OpenLayers.Renderer.symbol.arrow = [0,2, 1,0, 2,2, 1,0, 0,2];
		var styleMap = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
				{graphicName:"arrow",rotation:"${angle}",strokeColor:"${color}",strokeWidth:"${size}"},
				OpenLayers.Feature.Vector.style["default"]));
		DrawLine.arrowLayer = new OpenLayers.Layer.Vector("direction", {styleMap: styleMap});
		
	},
	draw : function(points, pencil){	
		DrawLine.map.addLayer(DrawLine.lineLayer); 
		DrawLine.map.addLayer(DrawLine.arrowLayer);
		var mystyle = {
				strokeWidth: pencil.size,
                strokeColor: pencil.color,
                strokeDashstyle: pencil.style,
				
		};
		var line = new OpenLayers.Geometry.LineString(points);
		var feature = new OpenLayers.Feature.Vector(line, null, mystyle);
		DrawLine.lineLayer.addFeatures([feature]);
		
		var linePoints = createDirection(line,"end",true,pencil.size,pencil.color);
		DrawLine.arrowLayer.addFeatures(linePoints);
		
		var legendItem = LegendManager.creatItem(pencil);
		LegendManager.addItem(legendItem);
	},
	remove:function(){
		DrawLine.arrowLayer.removeAllFeatures(true);
		DrawLine.lineLayer.removeAllFeatures(true);
	
	}
};
OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
    defaultHandlerOptions: {
        'single': true
    },
    initialize: function(options) {
        this.handlerOptions = OpenLayers.Util.extend(
            {}, this.defaultHandlerOptions
        );
        OpenLayers.Control.prototype.initialize.apply(
            this, arguments
        ); 
        this.handler = new OpenLayers.Handler.Click(
            this, {
                'click': this.onClick
            }, this.handlerOptions
        );
    }, 
    onClick: function(e) {     	   
//        var lonlat = map.getLonLatFromViewPortPx(e.xy);
//		PointsControler.addPoint(lonlat.lon, lonlat.lat);
//		  for(var i = 0; i < LonLats.length; i++){
//				PointsControler.addPoint(LonLats[i].lat, LonLats[i].lon);
//				
//		        }
    }
});
var PointsControler = {
	map : null,
	removePointLock : false,
	markers : null,
	singleClick : new OpenLayers.Control.Click(),
	init : function(map){
		PointsControler.map = map;
		PointsControler.markers = new OpenLayers.Layer.Markers( "Markers" );
		map.addLayer(PointsControler.markers); 
		PointsControler.map.addControl(PointsControler.singleClick);
		PointsControler.singleClick.activate();
	},
	removeAll : function(){
    	var list = PointsControler.markers.markers;  
    	while(list[0] != null){
    		PointsControler.markers.removeMarker(list[0]);
    	}
	},
	addPoint : function(lon, lat){
		if(clickpoint){
		var query = new OpenLayers.LonLat(lon, lat).transform(WGS_Projection, Mercator_Projection);
		var size = new OpenLayers.Size(16,26);
 		var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
		var icon = new OpenLayers.Icon("openlayers/img/marker.png", size, offset);
		var marker = new OpenLayers.Marker(query, icon);
	//	marker.events.register('mousedown', marker, PointsControler.onMakerMouseDown);
		PointsControler.markers.addMarker(marker);
		}
	},
	getPoints : function(){
		   
		var points = new OpenLayers.Geometry.MultiPoint(new Array());
		var list = PointsControler.markers.markers;   
		for(var i = 0; i < list.length; i++){
		
			var marker = list[i];
			var lonlat = marker.lonlat;
			//var point = new OpenLayers.Geometry.Point(LonLats[i].lat, LonLats[i].lon);
			var point = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
			points.addPoint(point);
		}
		return points.components;
	},
	changeToAdd : function(){
		PointsControler.removePointLock = true;
		PointsControler.singleClick.activate();
	},
	changeToRemove : function(){
		PointsControler.removePointLock = false;
		PointsControler.singleClick.deactivate();
	},
	onMakerMouseDown : function(){
		//alert(this.CLASS_NAME);
		if(!PointsControler.removePointLock){
	    	PointsControler.markers.removeMarker(this);
	    }  
	    OpenLayers.Event.stop(evt);
	}
};
