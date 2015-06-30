var HMapVis = window.HMapVis = HMapVis || {};
(function(){
	/**
	 * 历史事件的显示标注工厂，制造对应点的marker，并添加点击响应,一个工厂对应一个layer
	 */
	var CurveLine = HMapVis.CurveLine = function(map){
		this._map = map;
		
		var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
		renderer = (renderer) ? [ renderer ]
				: OpenLayers.Layer.Vector.prototype.renderers;
		this._vector_layer = new OpenLayers.Layer.Vector("Vector",{
			styleMap : new OpenLayers.StyleMap({
				strokeColor : "gray",
				strokeWidth : "2",
				strokeOpacity : 1,
				cursor : "pointer"
			}),
			renderers : renderer
		});
		
		this._map.addLayer(this._vector_layer);   
		this._marker_layer = new OpenLayers.Layer.Markers("Marker");
		this._map.addLayer(this._marker_layer);
		
		var size = new OpenLayers.Size(16,16);
	    var offset = new OpenLayers.Pixel(-(size.w/2), -(size.h/2));
	    this._icon = new OpenLayers.Icon("images/map/circle.png", size, offset);
	};
	
	CurveLine.prototype.drawCurveLine = function (point1, point2) {
		var point1temp = point1.clone();
		var point2temp = point2.clone();
		
		var pointArr = this._getCurvePoint(point1temp, point2temp);
		var pointUse = [];
		for ( var i = 0; i < pointArr.length; i++) {
			pointArr[i].transform(WGS_Projection, Mercator_Projection);
			pointUse.push(new OpenLayers.Geometry.Point(pointArr[i].lon,pointArr[i].lat));
		}
		
		var curveLine = new OpenLayers.Geometry.LineString(pointUse); 
	    var ff = new OpenLayers.Feature.Vector(curveLine);
	    this._vector_layer.addFeatures([ff]);
	    
	    var dvector = new OpenLayers.Layer.Vector("good");
	    this._map.addLayer(dvector);
		var tt = new OpenLayers.DynamicEffectLineVector(curveLine,{'name':'李白','color':'red'});
	    tt.setVectorLayer(dvector);
	    tt.executeOrder('start');
	   
		var marker1 = new OpenLayers.Marker(point1temp.transform(WGS_Projection, Mercator_Projection),this._icon.clone());
		var marker2 = new OpenLayers.Marker(point2temp.transform(WGS_Projection, Mercator_Projection),this._icon.clone());
		this._marker_layer.addMarker(marker1);  
		this._marker_layer.addMarker(marker2);
	};
	
	CurveLine.prototype.drawMultiCurveLine = function (pointArr) {
		for ( var i = 0; i < pointArr.length-1; i++) {
			this.drawCurveLine(pointArr[i], pointArr[i+1]);
		}
	};
	
	CurveLine.prototype._getCurvePoint = function (z, w) {
	 	var o = function(h) {
            return 1 - 2 * h + h * h;
        };
        var n = function(h) {
            return 2 * h - 2 * h * h;
        };
        var m = function(h) {
            return h * h;
        };
        var curveCoordinates = [];
        var k = 30;
        var x = false;
        var r, y, l, e, A, u, p;
        var s = [];
        var v = 0;
        var q = 0;
        if (typeof(w) == "undefined") {
            if (typeof(curveCoordinates) != "undefined") {
                curveCoordinates = [];
            }
            return curveCoordinates;
        }
        var g = parseFloat(z.lat);
        var f = parseFloat(w.lat);
        var C = parseFloat(z.lon);
        var B = parseFloat(w.lon);
        if (B > C) {
            if (parseFloat(B - C) > 180) {
                if (C < 0) {
                    C = parseFloat(180 + 180 + C);
                }
            }
        }
        if (C > B) {
            if (parseFloat(C - B) > 180) {
                if (B < 0) {
                    B = parseFloat(180 + 180 + B);
                }
            }
        }
        u = 0;
        p = 0;
        if (f == g) {
            r = 0;
            y = C - B;
        } else {
            if (B == C) {
                r = Math.PI / 2;
                y = g - f;
            } else {
                r = Math.atan((f - g) / (B - C));
                y = (f - g) / Math.sin(r);
            }
        }
        if (p == 0) {
            p = (r + (Math.PI / 5));
        }
        l = y / 2;
        A = l * Math.cos(p) + C;
        e = l * Math.sin(p) + g;
        for (v = 0; v < k + 1; v++) {
            curveCoordinates.push(new OpenLayers.LonLat((C * o(q) + A * n(q)) + B * m(q), (g * o(q) + e * n(q) + f * m(q))));
            q = q + (1 / k);
        }
        return curveCoordinates;
	};
	
})();