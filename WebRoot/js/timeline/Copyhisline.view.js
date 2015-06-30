(function($) {
	
	HLineView = Backbone.View.extend({  
        el: $("body"),  
        
        events: {  
        },
        
        initialize: function (data) {  
            //构造函数，实例化一个World集合类，并且以字典方式传入AppView的对象  
        	var svg = d3.select('#timeline-footer').append('svg');
        	
        	function draw(w, h, d, x1, y1){
        	    x1 = x1 || 0;
        	    y1 = y1 || 0;
        	    var x = d3.scale.linear().domain([0, w/d]);
        	    
        	    var hhh = data;
//        	    for ( var i = 0; i < w/d; i++) {
//        	    	hhh.push(Math.random()*50);
//				}
        	    
        	    svg.attr('width', w)
        	        .attr('height', h);
        	 
        	    var nodes = svg.selectAll('line')
        	        .data(hhh);
        	 
        	    //draw y line
        	    nodes.enter()
        	        .append('line')
        	        .attr('x1', function(data,i){return i*d+0.5+x1;})
        	        .attr('y1', h -y1)
        	        .attr('x2', function(data,i){return i*d+0.5+x1;})
        	        .attr('y2', function(data,i){return h - (y1 + data);})
        	        .attr('stroke','#999')
        	        .attr('stroke-width','3px');

        	   // nodes.exit().remove();
        	}
        	draw(1500, 50, 3);
        	
        	var begin = null;
        	var pre = null;
        	var beginleft = 0;
        	function brushstart() {
        		pre = begin = brush.extent();
        		beginleft = $('#timeline-content').position().left;
        	}
        	
    		function brushmove() {
    			var c = brush.extent()[0]-begin[0];
    			$('#timeline-content').css("left",beginleft - 1000*10*c);
    			
    			c= brush.extent()[0] - pre[0];
    			controller.changePosByDrag(-1000*10*c);
    			controller.draw();
    			pre = brush.extent();
    		}
    		
    		function brushend() {
    			//var c = brush.extent()[0]-begin[0];
    			//controller.changePosByDrag(-1000*10*c);
    			//controller.draw();
    		}
    		
        	var x1 = d3.scale.linear()
            .range([0, 1500]);
        	
        	var rate = controller.getShowInfo();
        	
        	var brush = d3.svg.brush()
            .x(x1)
            .extent([.3, 0.3+rate])
            .on("brushstart", brushstart)
            .on("brush", brushmove)
            .on("brushend", brushend);
        	
        	var brushg = svg.append("g")
            .attr("class", "brush")
            .attr('stroke','#fff')
            .attr('fill','#fff')
            .attr('fill-opacity', 0.3)
            .attr('shape-rendering', 'crispEdges')
            .call(brush);
        	
        	
        	var arc = d3.svg.arc()
            .outerRadius(50 / 2)
            .startAngle(0)
            .endAngle(function(d, i) { return i ? -Math.PI : Math.PI; });
        	
        	brushg.selectAll(".resize").append("path")
            	.attr("transform", "translate(0," +  50 / 2 + ")");
            //.attr("d", arc);

        	brushg.selectAll("rect")
            .attr("height", 50);
        	
        } 
        
       
        
    });  
	
	 
})(jQuery);