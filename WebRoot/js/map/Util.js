(function(){
	
	var Util = HMapVis.Util = {
			
		pointNum : 30,
		
		/**
		 * 传的必须是标准的经纬度坐标，需要修改，因为当横坐标和纵坐标相同时，弧线会画的不准确
		 * 
		 * @param point1
		 * @param point2
		 * @returns {Array}
		 */
		getCurvePointArray : function (point1, point2,num) {
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
	        
	        var point1X = parseFloat(point1.x);
	        var point1Y = parseFloat(point1.y);
	        var point2X = parseFloat(point2.x);
	        var point2Y = parseFloat(point2.y);
	        //point2X x2 point1X  
	        
	        if (point2X > point1X) {
	            if (parseFloat(point2X - point1X) > 180) {
	                if (point1X < 0) {
	                    point1X = parseFloat(180 + 180 + point1X);
	                }
	            }
	        }
	        if (point1X > point2X) {
	            if (parseFloat(point1X - point2X) > 180) {
	                if (point2X < 0) {
	                    point2X = parseFloat(180 + 180 + point2X);
	                }
	            }
	        }
	        u = 0;
	        p = 0;
	        if (point2Y == point1Y) {
	            r = 0;
	            y = point1X - point2X;
	        } else {
	            if (point2X == point1X) {
	                r = Math.PI / 2;
	                y = point1Y - point2Y;
	            } else {
	                r = Math.atan((point2Y - point1Y) / (point2X - point1X));
	                y = (point2Y - point1Y) / Math.sin(r);
	            }
	        }
	        if (p == 0) {
	            p = (r + (Math.PI / 5));
	        }
	        l = y / 2;
	        A = l * Math.cos(p) + point1X;
	        e = l * Math.sin(p) + point1Y;
//	        A = l * Math.tan(p) + point1X;
//	        e = l  + point1Y;
	        for (v = 0; v < num + 1; v++) {
	        	curveCoordinates.push(new OpenLayers.Geometry.Point((point1X * o(q) + A * n(q)) + point2X * m(q), (point1Y * o(q) + e * n(q) + point2Y * m(q))).transform(WGS_Projection, Mercator_Projection));
	            q = q + (1 / num);
	        }
	        return curveCoordinates;
		},
		/**
		 * 传的必须是标准的经纬度坐标，得到是可以绘制的的坐标
		 * 
		 * @param point1
		 * @param point2
		 * @returns {Array}
		 */
		getStraightPointArray : function (point1, point2,num) {
			var point1X = parseFloat(point1.x);
	        var point1Y = parseFloat(point1.y);
	        var point2X = parseFloat(point2.x);
	        var point2Y = parseFloat(point2.y);
	        
	        var deltaX= (point2X - point1X)/num;
	        var deltaY= (point2Y - point1Y)/num;
	        
	        var straightCoordinates = [];
	        
	        for (i = 0; i < num + 1; i++) {
	        	straightCoordinates.push(new OpenLayers.Geometry.Point(point1X + deltaX*i , point1Y + deltaY*i).transform(WGS_Projection, Mercator_Projection));
	        }
	        return straightCoordinates;
		}
	};

	
	
})();