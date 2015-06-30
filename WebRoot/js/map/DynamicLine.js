(function(){
	/**
	 * 历史事件的显示标注工厂，制造对应点的marker，并添加点击响应,一个工厂对应一个layer
	 */
	var DynamicLine = HMapVis.DynamicLine = function() {
		this.initialize();
	};
	
	DynamicLine.prototype = {
			
			vectorLayer : null,
			
			initialize : function() {
			},
			start : function(point1,point2,num,attributes){
				var style = this.getStyle();
		        style.label = attributes.name;
		        style.strokeColor = attributes.color;
		        style.fontColor = attributes.color;
		       
		        var pointarr = HMapVis.Util.getStraightPointArray(point1,point2,num);
		        
		        var line1 = new OpenLayers.Geometry.LineString([pointarr[0],pointarr[0]]);
		        var geometry = new OpenLayers.Geometry.MultiLineString([line1]);
		        var pointFeature = new OpenLayers.Feature.Vector(geometry,attributes,style);
		        //OpenLayers.Feature.Vector.prototype.initialize.apply();
		        this.vectorLayer.addFeatures([pointFeature]);
		        
		        var self = this;
		        var tween = new OpenLayers.Tween(OpenLayers.Easing.Linear.easeIn);//参数为缓动的方式
		    	// 回调对象，支持三个事件start, eachStep 和 done
		    	// 分别代表，开始缓动动画之前，缓动中的每一步，缓动动画结束后
		    	var callbacks = {
	    			start:function(){
	    				
	    			},
		    	    eachStep: function(value) {
		    	    	
		        		var ppoint = pointarr[value.index];
		        		var point = pointarr[value.index+1];
		        		
		        		var newLine = new OpenLayers.Geometry.LineString([ppoint,point]);
		        		pointFeature.geometry.addComponent(newLine);
		        		
		        		self.vectorLayer.drawFeature(pointFeature);
		        		
		    	    },
		    	    done:function(){ 
		    			//var tween1 = new OpenLayers.Tween(OpenLayers.Easing.Linear.easeIn);//重新建了一个tween进行新的动画
		    			//tween1.start( {'x':0,'y':0}, {'x':500,'y':500}, 500,  {callbacks: callbacks});
		    	    }
		    	};
		    	tween.start({'index':0}, {'index':pointarr.length-2}, 
		    			pointarr.length-2, {callbacks: callbacks});//启动缓动动画
			},
			
			drawLine : function(point1,point2,num,attributes,wait) {
				var self =this;
				setTimeout(function(){ 
					self.start(point1,point2,parseInt(num/18),attributes); 
				},wait);
			},
			
			// public
		    setVectorLayer : function(vectorLayer) {
		        this.vectorLayer = vectorLayer;
		    },
		    
		    getStyle : function() {
		        
		        var style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
		       
		        style.strokeWidth = 3;
		        style.fontSize = '15px';
		        style.fontFamily = '楷体_GB2312';
		        style.fontWeight = 'bold';
		        style.labelAlign = 'rm';
		       
		        return style;
		    },
	};
	
})();