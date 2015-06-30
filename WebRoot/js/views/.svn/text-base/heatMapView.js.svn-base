/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.HeatMap = Backbone.View.extend({
	
	classname : 'heatmap_view',
	tagName: 'div',
	tmpl_url : 'js/templates/heatMap_template.html',
	
	events: {
		"click #heatMapShow": "heatMapShow",
		"click #close": "close" ,
		"click #heatMapShow_All": "heatMapShow_All"
	},
	
	initialize: function(options){
		this.options = options;
		this.bind('change', this.render);
		
		var self = this;
        $.ajax({
            url: self.tmpl_url,
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
		$("#heatMap").html(this.$el);
		return this;
	},
	
	heatMapShow_All : function(){
		var heatMap = new App.Models.HeatMap({
			
		});
		heatMap.fetchAll({success:function(){
			var max = heatMap.get('max');
			var datas = heatMap.get('data');
			drawHeatMap(max,datas);
		}});
	},
	
	//listeners in the page
	heatMapShow : function() {//将朝代号传到后台获取热度数据
		var heatMap_dynasty_id = $("#dynasty").val();//int
		
		
		$("#heatMap").animate({height:0},"slow", function(){
			$("#heatMap").css("display","none");
		});
	
	},
	

	
	close : function() {
		$("#heatMap").animate({height:0},"slow", function(){
			$("#heatMap").css("display","none");
		});
	}
});

function drawHeatMap(max,datas){
	
	OpenLayers.ProxyHost = '/cgi-bin/proxy.cgi?url='
		document.onselectstart=new Function("event.returnValue=false");  //限制鼠标选中
	
		
		/********下面是在初始化地图*********/
		
		/**************传说中的热度********************/
		var hotDegree1 = 100;
		var hotDegree2 = 50;
		/**************传说中的热度********************/

	
		
		var testData; 
		//热度图
		 testData={
				 max:max,
				 data:datas
		 };
		var transformedTestData = { max: testData.max , data: [] },
			data = testData.data,
			datalen = data.length,
			nudata = [];
 
		// in order to use the OpenLayers Heatmap Layer we have to transform our data into 
		// { max: <max>, data: [{lonlat: <OpenLayers.LonLat>, count: <count>},...]}
		
		while(datalen--){  
		nudata.push({
		    lonlat: new OpenLayers.LonLat(data[datalen].lon, data[datalen].lat),
		    count: data[datalen].count
		});
		}

		transformedTestData.data = nudata;
		//提高图层顺序
	    map.raiseLayer(heatmap,2);
	    
		heatmap.setDataSet(transformedTestData);
		heatmap.updateLayer();
		
		
		//数字层
	
       // vectorLayer.removeAllFeatures();
        
		var positions = new Array(datas.length);
		var counts = new Array(datas.length);  
		var points = new Array(datas.length);  
		for(var i=0;i<datas.length;i++){
			var lonofi = datas[i].lon;
			var latofi = datas[i].lat;
			var countofi = datas[i].count;
			var vector = {
					lon:lonofi,
					lat:latofi
			};
			positions[i]=vector;
			counts[i] = countofi;
//			var WGS_Projection = new OpenLayers.Projection("EPSG:4326");
//			var Mercator_Projection = new OpenLayers.Projection("EPSG:3857"); // to Spherical Mercator Projection
//
//			var loc = new OpenLayers.LonLat(lonofi,latofi).transform(WGS_Projection, Mercator_Projection);
//			   var point = new OpenLayers.Geometry.Point(loc.lon,loc.lat);
//	            var pointFeature = new OpenLayers.Feature.Vector(point);
//	            pointFeature.attributes = {
//	                count:countofi,
//	                favColor: 'black',
//	                align: "cm"
//	            };
//	            points[i] = pointFeature;
		}

		//上面得到数据组positions和counts分别记录坐标和对应count
		

		//判断层级，将靠近的点聚集成一个点，在层级最小的时候才使用pointFeature
		var nowzoom = map.getZoom();//4
		var mark = new Array(datas.length); //记录某个点是否被归类过
		var count_s = new Array(); //记录合并后的count
		var position_s = new Array();//记录合并后对应的position
		
		for(var m = 0; m < datas.length; m++){
			mark[m]=0;
		}
		sortpoint(positions,counts,position_s,count_s,mark,3);
		for(var t = 0; t<position_s.length;t++){
			var loc = new OpenLayers.LonLat(position_s[t].lon,position_s[t].lat).transform(WGS_Projection, Mercator_Projection);
			var point = new OpenLayers.Geometry.Point(loc.lon,loc.lat);
            var pointFeature = new OpenLayers.Feature.Vector(point);
            pointFeature.attributes = {
                count:count_s[t],
                favColor: 'gray',
                align: "cm"
            };
            points[t] = pointFeature;
		}
		
		
		
		func = function(){ //地图缩放的监听  一调用就清空原来的点，重新归类点并显示
			nowzoom = map.getZoom();
			vectorLayer.removeAllFeatures();
			//初始化或清空数组mark 、 count_s 和 position_s
			for(var m = 0; m < datas.length; m++){
				mark[m]=0;
			}
			while(count_s.length!=0){
				count_s.pop();
				position_s.pop();
			}
			while(points.length!=0){
				points.pop();
			}
			if(nowzoom <=4){
				sortpoint(positions,counts,position_s,count_s,mark,5);
			}
			else if(nowzoom==5){
				sortpoint(positions,counts,position_s,count_s,mark,3);
			}else if(nowzoom == 6){
				sortpoint(positions,counts,position_s,count_s,mark,1);
			}else if(nowzoom == 7){
				sortpoint(positions,counts,position_s,count_s,mark,0.5);
			}else if(nowzoom >= 8){
				//这样基本上是每个地点分开
				sortpoint(positions,counts,position_s,count_s,mark,0.0005);
			}
			var WGS_Projection = new OpenLayers.Projection("EPSG:4326");
			var Mercator_Projection = new OpenLayers.Projection("EPSG:3857"); // to Spherical Mercator Projection

			for(var t = 0; t<position_s.length;t++){
				var loc = new OpenLayers.LonLat(position_s[t].lon,position_s[t].lat).transform(WGS_Projection, Mercator_Projection);
				var point = new OpenLayers.Geometry.Point(loc.lon,loc.lat);
	            var pointFeature = new OpenLayers.Feature.Vector(point);
	            pointFeature.attributes = {
	                count:count_s[t],
	                favColor: 'gray',
	                align: "cm"
	            };
	            points[t] = pointFeature;
				}
			vectorLayer.addFeatures(points);
			
			
			
			//点击热度图的鼠标监听，
			//当地图层级在8以上并且点击在独立点四周时出现侧栏显示该点事件列表，
			//点击某个事件在地图上会有popup
	        onMapClick = function(e){
	        	 nowzoom = map.getZoom();
	        	 var xy=map.getLonLatFromPixel(e.xy);
	        		var x = xy.lon;
	        		var y = xy.lat;
	        		var nowcenter = map.getCenter();
	        		//注意x  y 是meter单位
	        		if(nowzoom>=8){
	        		for(var i=0; i<positions.length;i++){//positions数组里的每个数据进行对比
	        			var loc = new OpenLayers.LonLat(positions[i].lon,positions[i].lat).transform(WGS_Projection, Mercator_Projection);
	        			if(x>(loc.lon-10000)&&x<(loc.lon+10000)&&y>(loc.lat-10000)&&y<(loc.lat+10000)){
		    				heatmap_place_loc = positions[i].lon+","+positions[i].lat;//是经纬度
	        				slideBar(11,0);//侧栏
	        			}
	        		}
	         }
	         }
	        
	        
			map.events.register("click",vectorLayer,onMapClick);
	         
	 
          };
	    // on zoomend and moveend we have to move the canvas element and redraw the datapoints with new positions
	    map.events.register("zoomend", this, func);
	    map.events.register("moveend", this, func);
		
		
        // vectorLayer.drawFeature(multiFeature);
        // map.setCenter(new OpenLayers.LonLat(5,5), 4);
	    vectorLayer.removeAllFeatures();
	    //提高图层顺序
	    map.raiseLayer(vectorLayer,3);
//点层加上点集
         vectorLayer.addFeatures(points);
         
}

//根据半径r将相近的点合并
function sortpoint(positions,counts,position_s,count_s,mark,r){
	
	for(var m =0; m<positions.length;m++){
		if(mark[m]==0){
			mark[m]=1;
			count_s.push(counts[m]);
			position_s.push(positions[m]);
			for(var n = 0 ; n<mark.length;n++){
				if((mark[n]==0)&&(positions[n].lon<(positions[m].lon+r))&&(positions[n].lon>(positions[m].lon-r))&&(positions[n].lat<(positions[m].lat+r))&&(positions[n].lat>(positions[m].lat-r))){
					mark[n]=1;
					count_s[count_s.length-1]=count_s[count_s.length-1]+counts[n];
				}
			}
		}
	}
	//得到的position_s 和 count_s将会使用到创建point上
}