OpenLayers.Control.LTZommAnimation=OpenLayers.Class(OpenLayers.Control.Navigation,{
	size:null,
	offset:null,
	uricon:null,
	ulicon:null,
	bricon:null,
	blicon:null,
    // 拖动的滑动效果必须使enableKinetic为true
	dragPanOptions: {enableKinetic: true},
	isCenterMouseWheel:true,
	initialize: function(options) {
        OpenLayers.Control.Navigation.prototype.initialize.apply(this, arguments);
        this.size = new OpenLayers.Size(10,6);
	    this.offset = new OpenLayers.Pixel(-(this.size.w/2), -(this.size.h/2));
		this.uricon = new OpenLayers.Icon("openlayers/img/marker.png",this.size,this.offset);
	    this.ulicon = new OpenLayers.Icon("openlayers/img/marker.png",this.size,this.offset);
		this.bricon = new OpenLayers.Icon("openlayers/img/marker.png",this.size,this.offset);
		this.blicon = new OpenLayers.Icon("openlayers/img/marker.png",this.size,this.offset);
    },
    
    
 
     
   wheelUp: function(evt) {
       
        
        var newZoom = this.map.getZoom();
        
        if (newZoom<this.map.getNumZoomLevels()-1) {                   
	        var markers=new OpenLayers.Layer.Markers("Zoomin",{displayInLayerSwitcher: false});
	        var x=evt.layerX;
	        var y=evt.layerY;
	        
	        
		    //var marker1=new OpenLayers.Marker(map.getLonLatFromPixel(new OpenLayers.Pixel(x+5,y+5)),this.bricon.clone());
		    //var marker2=new OpenLayers.Marker(map.getLonLatFromPixel(new OpenLayers.Pixel(x-5,y+5)),this.blicon.clone());
		    //var marker3=new OpenLayers.Marker(map.getLonLatFromPixel(new OpenLayers.Pixel(x+5,y-5)),this.uricon.clone());
		    //var marker4=new OpenLayers.Marker(map.getLonLatFromPixel(new OpenLayers.Pixel(x-5,y-5)),this.ulicon.clone()); 
		    
	        var WGS_Projection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
	    	var Mercator_Projection = new OpenLayers.Projection("EPSG:3857");
	        
	        var marker1=new OpenLayers.Marker(this.map.getLonLatFromPixel(new OpenLayers.Pixel(x+5,y+5)).transform(WGS_Projection, Mercator_Projection),this.bricon.clone());
		    var marker2=new OpenLayers.Marker(this.map.getLonLatFromPixel(new OpenLayers.Pixel(x-5,y+5)).transform(WGS_Projection, Mercator_Projection),this.blicon.clone());
		    var marker3=new OpenLayers.Marker(this.map.getLonLatFromPixel(new OpenLayers.Pixel(x+5,y-5)).transform(WGS_Projection, Mercator_Projection),this.uricon.clone());
		    var marker4=new OpenLayers.Marker(this.map.getLonLatFromPixel(new OpenLayers.Pixel(x-5,y-5)).transform(WGS_Projection, Mercator_Projection),this.ulicon.clone()); 
	        
		    marker1.map=this.map;
		    marker2.map=this.map;
		    marker3.map=this.map;
		    marker4.map=this.map;
		    markers.addMarker(marker1);
		    markers.addMarker(marker2);
		    markers.addMarker(marker3);
		    markers.addMarker(marker4);
		    this.map.addLayer(markers);
		    var j=0;
		    var t;
		   
		   
		    var movemarker=function(){
		    
		           marker1.moveTo(new OpenLayers.Pixel(x+15*(j+2),y+10*(j+2)));
		           marker2.moveTo(new OpenLayers.Pixel(x-15*(j+2),y+10*(j+2)));
		           marker3.moveTo(new OpenLayers.Pixel(x+15*(j+2),y-10*(j+2)));
		           marker4.moveTo(new OpenLayers.Pixel(x-15*(j+2),y-10*(j+2)));
		           j++;
		      
		            if(j==4){	            
			        map.removeLayer(markers);
			        markers.clearMarkers()
			        markers.destroy();
			        window.clearInterval(t);
			        }
		     
		    }
		    if(document.all){
		    
		       t=window.setInterval(function(){movemarker()}, 150);
		    }else{
		      
		        t=window.setInterval(function(){movemarker()}, 50);
		    }
        }
        this.wheelChange(evt, 1);  
    },

  
    wheelDown: function(evt) {
        
        var newZoom = this.map.getZoom();
      
        if (newZoom>0) {                   
	        var markers=new OpenLayers.Layer.Markers("Zoomout",{displayInLayerSwitcher: false});
	        var x=evt.xy.x;
	        var y=evt.xy.y;
	        
	        
	        var x=evt.layerX;
	        var y=evt.layerY;
	        
	        
		    //var marker1=new OpenLayers.Marker(map.getLonLatFromPixel(new OpenLayers.Pixel(x+12*6,y+10*6)),this.ulicon.clone());
		    //var marker2=new OpenLayers.Marker(map.getLonLatFromPixel(new OpenLayers.Pixel(x-12*6,y+10*6)),this.uricon.clone());
		    //var marker3=new OpenLayers.Marker(map.getLonLatFromPixel(new OpenLayers.Pixel(x+12*6,y-10*6)),this.blicon.clone());
		    //var marker4=new OpenLayers.Marker(map.getLonLatFromPixel(new OpenLayers.Pixel(x-12*6,y-10*6)),this.bricon.clone()); 

		    
	        var WGS_Projection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
	    	var Mercator_Projection = new OpenLayers.Projection("EPSG:3857");
	        
	        var marker1=new OpenLayers.Marker(this.map.getLonLatFromPixel(new OpenLayers.Pixel(x+5,y+5)).transform(WGS_Projection, Mercator_Projection),this.bricon.clone());
		    var marker2=new OpenLayers.Marker(this.map.getLonLatFromPixel(new OpenLayers.Pixel(x-5,y+5)).transform(WGS_Projection, Mercator_Projection),this.blicon.clone());
		    var marker3=new OpenLayers.Marker(this.map.getLonLatFromPixel(new OpenLayers.Pixel(x+5,y-5)).transform(WGS_Projection, Mercator_Projection),this.uricon.clone());
		    var marker4=new OpenLayers.Marker(this.map.getLonLatFromPixel(new OpenLayers.Pixel(x-5,y-5)).transform(WGS_Projection, Mercator_Projection),this.ulicon.clone());
		    
		    marker1.map=this.map;
		    marker2.map=this.map;
		    marker3.map=this.map;
		    marker4.map=this.map;
		    markers.addMarker(marker1);
		    markers.addMarker(marker2);
		    markers.addMarker(marker3);
		    markers.addMarker(marker4);
		    this.map.addLayer(markers);
		    var j=1;
		    var t;
		    
		    that = this;
		    
		    var movemarker=function(){
		     
		           marker1.moveTo(new OpenLayers.Pixel(x+12*5-12*(j),y+10*5-10*(j)));
		           marker2.moveTo(new OpenLayers.Pixel(x-12*5+12*(j),y+10*5-10*(j)));
		           marker3.moveTo(new OpenLayers.Pixel(x+12*5-12*(j),y-10*5+10*(j)));
		           marker4.moveTo(new OpenLayers.Pixel(x-12*5+12*(j),y-10*5+10*(j)));
		           j++;
		     
		           if(j==6){	            
			        that.map.removeLayer(markers);
				        markers.clearMarkers();
				        markers.destroy();
				        window.clearInterval(t);
			        }
		     
		    }
		    if(document.all){
		    	movemarker();
		       t=window.setInterval(function(){movemarker()}, 150);
		    }else{
		        movemarker();
		        t=window.setInterval(function(){movemarker()}, 50);
		    }
	    } 
	    this.wheelChange(evt, -1); 
    },
    wheelChange: function(evt, deltaZ) {
        var currentZoom = this.map.getZoom();
        var newZoom = this.map.getZoom() + Math.round(deltaZ);
        newZoom = Math.max(newZoom, 0);
        newZoom = Math.min(newZoom, this.map.getNumZoomLevels());
        if (newZoom === currentZoom) {
            return;
        }
        var size    = this.map.getSize();
        var deltaX  = size.w/2 - evt.xy.x;
        var deltaY  = evt.xy.y - size.h/2;
        var newRes  = this.map.baseLayer.getResolutionForZoom(newZoom);
        var zoomPoint = this.map.getLonLatFromPixel(evt.xy);
        var newCenter = new OpenLayers.LonLat(
                            zoomPoint.lon + deltaX * newRes,
                            zoomPoint.lat + deltaY * newRes );
        if(this.isCenterMouseWheel)
            this.map.setCenter( newCenter, newZoom );
        else
            this.map.setCenter(this.map.getCenter(),  this.map.getZoom() + Math.round(deltaZ));
        
    }
});