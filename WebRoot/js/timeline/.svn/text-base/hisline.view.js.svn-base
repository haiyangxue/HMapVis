(function($) {

	HLineView = Backbone.View.extend({
		el : $("body"),

		events : {},

		initialize : function(data) {
			//$("#timeline-footer").html("<svg id='footerSVG' width='100%' height='50px'></svg>");
			var svg = d3.select('#timeline-footer').append('svg');
			svg.attr("id", "footerSVG");
			svg.attr("width", "100%");
			svg.attr("height", "50px");
			
			function draw(h, d, x1, y1){
        	    x1 = x1 || 0;
        	    y1 = y1 || 0;
        	    var hhh = data;
        	    var nodes = svg.selectAll('line')
        	        .data(hhh);
        	 
        	    nodes.enter()
        	        .append('line')
        	        .attr('x1', function(data,i){return i*d+0.5+x1;})
        	        .attr('y1', h -y1)
        	        .attr('x2', function(data,i){return i*d+0.5+x1;})
        	        .attr('y2', function(data,i){return h - (y1 + data);})
        	        .attr('stroke','#999')
        	        .attr('stroke-width','2px');
        	}
			
			draw(50,$("#footerSVG").width()/1000);//事件总数是1000  黑框长度变化
			
			var frameSelector = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			frameSelector.setAttribute('id','frameSelector');
			frameSelector.setAttribute('x','789');
			frameSelector.setAttribute('y','0');
			frameSelector.setAttribute('width','11');
			frameSelector.setAttribute('height','50');
			frameSelector.setAttribute('style','fill:rgba(255, 255, 255, 0.4)');
			frameSelector.addEventListener("mousedown",dragStart);
//			$(document).bind("mouseup",dragEnd);
			//$("#footerSVG").html("<g id='innerG'></g>");
			var g = svg.append('g');
			g.attr("id", "innerG");
			$("#innerG").append(frameSelector);
			
			/*
			 * start the resizer
			 */
			var resizerWidth = 2;
			var resizerL = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			resizerL.setAttribute('id','resizerL');
			resizerL.setAttribute('x',789-resizerWidth);
			resizerL.setAttribute('y','0');
			resizerL.setAttribute('width',resizerWidth);
			resizerL.setAttribute('height','50');
			resizerL.setAttribute('style','fill:white');
			resizerL.addEventListener("mouseover",overWest);
			resizerL.addEventListener("mousedown",stretchWStart);
			$(document).bind("mouseup",stretchWEnd);
			$("#innerG").append(resizerL);
			
			var resizerR = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
			resizerR.setAttribute('id','resizerR');
			resizerR.setAttribute('x','800');
			resizerR.setAttribute('y','0');
			resizerR.setAttribute('width',resizerWidth);
			resizerR.setAttribute('height','50');
			resizerR.setAttribute('style','fill:white');
			resizerR.addEventListener("mouseover",overEast);
			resizerR.addEventListener("mousedown",stretchEStart);
			$(document).bind("mouseup",stretchEEnd);
			$("#innerG").append(resizerR);
			/*
			 * end the announcement of the resizer
			 */
			
			var rectX = 0;
			var rectWidth = 0;
			var mouseStartX = 0;
			var mouseCurrentX = 0;
			var eOriX = 0;
			var wOriX = 0;
			var startyear = 0;
			var endyear = 0;
			var tmpstartyear = 0;  //记录的是上一次的两个年份
			var tmpendyear = 0;
			var state = -1;
			rectX = frameSelector.getAttribute("x");
			rectWidth = frameSelector.getAttribute("width");
		    startyear = Math.ceil(5000*parseInt(rectX)/$("#footerSVG").width())-3000; //这个是最开始的覆盖框的边界条件
			endyear = startyear + Math.ceil(5000*parseInt(rectWidth)/$("#footerSVG").width());
			tmpstartyear = startyear;
			tmpendyear = endyear;
			/*
			 * start drag functions
			 */
			function dragStart(e){//we need x & width of the rect, and the x of the mouse 
				$(this).css("cursor","move");
				rectX = frameSelector.getAttribute("x");
				rectWidth = frameSelector.getAttribute("width");
				mousePaddingX = e.pageX - $(this).offset().left;
				mouseStartX = e.pageX;
 
				
				$(document).bind("mousemove", drag);
				$(document).bind("mouseup",dragEnd); 
			}
			function drag(e){
//				controller._zoomLevel++;
//				controller.draw();
//				var c = e.pageX - mouseStartX;
//				$('#timeline-content').css("left",beginleft - 100*c);
//				var c2 = e.pageX - pre;
//				controller.changePosByDrag(-100*c2);
//    			controller.draw();
//    			
//    			pre = e.pageX;
				
				mouseCurrentX = e.pageX;
				distance = mouseCurrentX - mousePaddingX;
				frameSelector.setAttribute("x", distance);
				resizerL.setAttribute("x", distance-resizerWidth);
				var resizerRDistance = distance + parseInt(rectWidth);
				resizerR.setAttribute("x", resizerRDistance);
				tmpstartyear = startyear; 
				tmpendyear = endyear; 
			}
			function dragEnd(){
				rectX = frameSelector.getAttribute("x");
				rectWidth = frameSelector.getAttribute("width");
				startyear = Math.ceil(5000*parseInt(rectX)/$("#footerSVG").width())-3000;//拖动结束的时候的黑框的长度
				endYear = startyear + Math.ceil(5000*parseInt(rectWidth)/$("#footerSVG").width());

				var time_range = startyear+","+endyear;
				var hisline_heatmap = new App.Routers.HMapVis();
				hisline_heatmap.navigate("hisline_heatmap/"+time_range,true);
				 
				if(((startyear-endyear)==(tmpstartyear-tmpendyear))&&(startyear!=tmpstartyear) && (endyear!=tmpendyear)){
					var year_width=startyear-tmpstartyear;
					controller.redrawByRange(startyear, endyear, year_width, "drag");
				}
				$(this).css("cursor","default");
				$(document).unbind("mousemove", drag);
				$(document).unbind("mouseup", dragEnd); 
			}
			/*
			 * end drag functions
			 */
			
			/*
			 * start stretch east
			 */
			function overEast(){
				$(this).css("cursor","e-resize");
			}
			function stretchEStart(e){
				$(this).css("cursor","e-resize");
				rectX = frameSelector.getAttribute("x");
				rectWidth = frameSelector.getAttribute("width");
				mousePaddingX = e.pageX - $(this).offset().left;
				eOriX = parseInt(rectX) + parseInt(rectWidth);
				
				$(document).bind("mousemove", stretchEast);
			}
			function stretchEast(e){
				$(this).css("cursor","e-resize");
				mouseCurrentX = e.pageX;
				distance = mouseCurrentX - mousePaddingX;
				resizerR.setAttribute("x", distance);
				frameSelector.setAttribute("width", distance-eOriX+parseInt(rectWidth));
				tmpstartyear = startyear;
				tmpendyear = endyear; 
			}
			function stretchEEnd(){
				rectX = frameSelector.getAttribute("x");
				rectWidth = frameSelector.getAttribute("width");
				startyear = Math.ceil(5000*parseInt(rectX)/$("#footerSVG").width())-3000;//拖动结束的时候的黑框的长度
				endyear = startyear + Math.ceil(5000*parseInt(rectWidth)/$("#footerSVG").width());

				var time_range = startyear+","+endyear;
				var hisline_heatmap = new App.Routers.HMapVis();
				hisline_heatmap.navigate("hisline_heatmap/"+time_range,true);
				
				if((startyear-endyear != tmpstartyear-tmpendyear)&&(startyear==tmpstartyear)&&(endyear!=tmpendyear)){
					controller.redrawByRange(startyear, endyear, 0, "stretch");
				}	
				$(this).css("cursor","default");
				$(document).unbind("mousemove", stretchEast);
			}
			/*
			 * end stretch east
			 */
			
			/*
			 * start stretch west
			 */
			function overWest(){
				$(this).css("cursor","w-resize");
			}
			function stretchWStart(e){
				rectX = frameSelector.getAttribute("x");
				rectWidth = frameSelector.getAttribute("width");
				mousePaddingX = e.pageX - $(this).offset().left;
				wOriX = parseInt(rectX) - resizerWidth;
				
				$(document).bind("mousemove", stretchWest);
			}
			function stretchWest(e){
				$(this).css("cursor", "w-resize");
				mouseCurrentX = e.pageX;
				distance = mouseCurrentX - mousePaddingX;
				resizerL.setAttribute("x", distance);
				frameSelector.setAttribute("width", wOriX-distance+parseInt(rectWidth));
				frameSelector.setAttribute("x", distance + resizerWidth);
				tmpstartyear = startyear; 
				tmpendyear = endyear; 
			}
			function stretchWEnd(){
				rectX = frameSelector.getAttribute("x");
				rectWidth = frameSelector.getAttribute("width");
				startyear = Math.ceil(5000*parseInt(rectX)/$("#footerSVG").width())-3000;//拖动结束的时候的黑框的长度
				endyear = startyear + Math.ceil(5000*parseInt(rectWidth)/$("#footerSVG").width());
				if((startyear-endyear != tmpstartyear-tmpendyear)&&(startyear!=tmpstartyear)&&(endyear==tmpendyear)){
					controller.redrawByRange(startyear, endyear, 0, "stretch");
				}	
				$(this).css("cursor","default");
				$(document).unbind("mousemove", stretchWest);
			
				var time_range = startyear+","+endyear;
				var hisline_heatmap = new App.Routers.HMapVis();
				hisline_heatmap.navigate("hisline_heatmap/"+time_range,true);
				
			}
			/*
			 * end stretch west
			 */
		}

	});

})(jQuery);