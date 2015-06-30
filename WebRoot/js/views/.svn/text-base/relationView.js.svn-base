/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.Relation = Backbone.View.extend({
	classname : 'relation_view',
	tagName : 'div',
	tmpl_url : 'js/templates/relation_template.html',

	events : {
		"mouseover #pointerLeft" : "mouseOverCursor",
		"mouseout #pointerLeft" : "mouseOutCursor",
		"mouseover #pointerRight" : "mouseOverCursor",
		"mouseout #pointerRight" : "mouseOutCursor",
		"click #pointerLeft" : "shrink",
		"click #pointerRight" : "shrink",
		"mouseover #recover" : "mouseOverRecover",
		"mouseout #recover" : "mouseOutRecover",
		"mouseover #close" : "mouseOverClose",
		"mouseout #close" : "mouseOutClose",
		"click #recover" : "expand",
		"click #close" : "removePanel"
	},

	initialize : function(options) {
		this.options = options;
		this.bind('change', this.render);
		this.model = this.options.model;
		this.collection = this.options.collection;

		var self = this;
		$.ajax({
			url : self.tmpl_url,
			method : 'GET',
			async : false,
			dataType : 'html',
			success : function(data) {
				self.template = data;
			}
		});

	},
	render : function() { // render方法，目标只有两个：填充this.el，返回this以便链式操作。
		var nullJson = {
			"nj" : ""
		};
		
		var relatedPeopleJson= {'nodes':eval(JSON.stringify(this.collection))};
		var str = "abcdefghijklmnopqrstuvwxyz";
		for(i = 0; i < relatedPeopleJson.nodes.length; i ++){
			var persono = relatedPeopleJson.nodes[i];
			var person = new Object();
			var letter = str.substr(i, 1);
			person.name  = persono.people_name;
			person.id = letter;
			person.popid = letter + letter;
			person.circleId = letter + letter + letter;
			person.backId = letter + letter + letter + letter;
			person.txtId = letter + letter + letter + letter + letter;
			person.group = persono.rid;
			person.img_url = "";
			if(persono.rid <= 3)
				person.r = 40;
			else if(persono.rid > 3 && persono.rid <= 6)
				person.r = 30;
			else if(persono.rid > 6 && persono.rid <= 9)
				person.r = 20;
			else
				person.r = 10;
			var relations = new Array();
			if(i != 0)
				relations[0] = "a";
			else{
				for(j = 1; j < relatedPeopleJson.nodes.length; j++){
					var relationLetter = str.substr(j, 1);
					relations[j-1] = relationLetter;
				}
			}
			person.relation = relations;
			relatedPeopleJson.nodes[i]=person;
		}
		relatedPeopleJson.links = new Array();
		for(ii = 0; ii < relatedPeopleJson.nodes.length; ii ++){
			if(ii+1 < relatedPeopleJson.nodes.length)
				relatedPeopleJson.links[ii] = {"source":0,"target":ii+1,"value":1};
		}
		relatedPeopleJson = JSON.stringify(relatedPeopleJson);
		
		$(this.el).html(Mustache.to_html(this.template, nullJson));
		$("body").append(this.$el);

		/*
		 * drag function
		 */
		var $div = $("div#dragWrap");
		var $dragDiv = $("div#dragPart");
		var offset_x = 0, offset_y = 0, mouse_x = 0, mouse_y = 0; 
		$dragDiv.bind("mousedown", function(event) {
			offset_x = $div[0].offsetLeft;// x坐标
			offset_y = $div[0].offsetTop;// y坐标
			mouse_x = event.pageX;
			mouse_y = event.pageY;
			$(document).bind("mousemove", function(ev) {
				var _x = ev.pageX - mouse_x;
				var _y = ev.pageY - mouse_y;

				var now_x = (offset_x + _x) + "px";
				var now_y = (offset_y + _y) + "px";
				$div.css({
					top : now_y,
					left : now_x
				});
			});
		});
		$(document).bind("mouseup", function() {
			offset_x = 0, offset_y = 0, mouse_x = 0, mouse_y = 0;
			$(this).unbind("mousemove");
		});
		$("#dragContent").unbind();
		/*
		 * end drag function
		 */

		/*
		 * insert relation graph
		 */
		var width = 460, height = 460;

		var color = d3.scale.category20();

		var force = d3.layout.force().charge(-120).linkDistance(120).size(
				[ width, height ]);

		var svg = d3.select("#dragContent").append("svg").attr("width", width)
				.attr("height", height).attr("id", "relationGraph");

		/*
		 * var theSvgElement = document.getElementById('relationGraph');
		 * theSvgElement.setAttribute('viewBox', "0 0 " + 460 + " " + 460); var
		 * zoomRate = 1.1; function zoom(zoomType) { var viewBox =
		 * theSvgElement.getAttribute('viewBox'); var viewBoxValues =
		 * viewBox.split(' ');
		 * 
		 * viewBoxValues[2] = parseFloat(viewBoxValues[2]); viewBoxValues[3] =
		 * parseFloat(viewBoxValues[3]);
		 * 
		 * if (zoomType == 'zoomIn') { viewBoxValues[2] /= zoomRate;
		 * viewBoxValues[3] /= zoomRate; } else if (zoomType == 'zoomOut') {
		 * viewBoxValues[2] *= zoomRate; viewBoxValues[3] *= zoomRate; } else
		 * alert("function zoom(zoomType) given invalid zoomType parameter.");
		 * 
		 * theSvgElement.setAttribute('viewBox', viewBoxValues.join(' '));
		 * 
		 * var currentZoomFactor = 460 / viewBoxValues[2]; var newText =
		 * document.createTextNode("Current zoom factor = " +
		 * currentZoomFactor.toFixed(3)); var parentNode =
		 * document.getElementById('currentZoomFactorText');
		 * 
		 * parentNode.replaceChild(newText, parentNode.firstChild); } function
		 * zoomViaMouseWheel(mouseWheelEvent) { if (mouseWheelEvent.wheelDelta >
		 * 0) zoom('zoomIn'); else zoom('zoomOut');
		 * 
		 * mouseWheelEvent.cancelBubble = true; return false; }
		 * window.addEventListener('mousewheel', zoomViaMouseWheel, false);
		 * 
		 */

		
		/*var myjson = 
			'{'+
			  '"nodes":['+
			    '{"name":"Jack", "id":"a", "popid":"aa", "circleId":"aaa", "backId":"aaaa", "txtId":"aaaaa", "group":5, "img_url":"images/headTest/test1.jpg", "r":"40", "relation":["b","c","d","e"]},'+
			    '{"name":"Bob", "id":"b", "popid":"bb", "circleId":"bbb", "backId":"bbbb", "txtId":"bbbbb", "group":5, "img_url":"images/headTest/test2.jpg", "r":"20", "relation":["f"]},'+
			    '{"name":"John", "id":"c", "popid":"cc", "circleId":"ccc", "backId":"cccc", "txtId":"ccccc", "group":5, "img_url":"images/headTest/test3.jpg", "r":"30", "relation":["f", "k"]},'+
			    '{"name":"Marry", "id":"d", "popid":"dd", "circleId":"ddd", "backId":"dddd", "txtId":"ddddd", "group":9, "img_url":"images/headTest/test4.jpg", "r":"20", "relation":["i", "l"]},'+
			    '{"name":"Jack", "id":"e", "popid":"ee", "circleId":"eee", "backId":"eeee", "txtId":"eeeee", "group":4, "img_url":"images/headTest/test5.jpg", "r":"20", "relation":["j", "m"]},'+
			    
			    '{"name":"Bob", "id":"f", "popid":"ff", "circleId":"fff", "backId":"ffff", "txtId":"fffff", "group":3, "img_url":"images/headTest/test1.jpg", "r":"40", "relation":["g", "h", "n", "o", "p"]},'+
			    '{"name":"John", "id":"g", "popid":"gg", "circleId":"ggg", "backId":"gggg", "txtId":"ggggg", "group":11, "img_url":"images/headTest/test2.jpg", "r":"20", "relation":["i", "l", "m"]},'+
			    '{"name":"Marry", "id":"h", "popid":"hh", "circleId":"hhh", "backId":"hhhh", "txtId":"hhhhh", "group":11, "img_url":"images/headTest/test3.jpg", "r":"20", "relation":["f"]},'+
			    '{"name":"Cook", "id":"i", "popid":"ii", "circleId":"iii", "backId":"iiii", "txtId":"iiiii", "group":9, "img_url":"images/headTest/test4.jpg", "r":"10", "relation":["d", "g"]},'+
			    '{"name":"Billy", "id":"j", "popid":"jj", "circleId":"jjj", "backId":"jjjj", "txtId":"jjjjj", "group":4, "img_url":"images/headTest/test5.jpg", "r":"10", "relation":["e"]},'+
			    
			    '{"name":"Kitty", "id":"k", "popid":"kk", "circleId":"kkk", "backId":"kkkk", "txtId":"kkkkk", "group":3, "img_url":"images/headTest/test1.jpg", "r":"10", "relation":["c"]},'+
			    '{"name":"Zed", "id":"l", "popid":"ll", "circleId":"lll", "backId":"llll", "txtId":"lllll", "group":9, "img_url":"images/headTest/test2.jpg", "r":"10", "relation":["d"]},'+
			    '{"name":"Tom", "id":"m", "popid":"mm", "circleId":"mmm", "backId":"mmmm", "txtId":"mmmmm", "group":4, "img_url":"images/headTest/test3.jpg", "r":"10", "relation":["e", "g"]},'+
			    '{"name":"Jerry", "id":"n", "popid":"nn", "circleId":"nnn", "backId":"nnnn", "txtId":"nnnnn", "group":11, "img_url":"images/headTest/test4.jpg", "r":"10", "relation":["f"]},'+
			    '{"name":"Kate", "id":"o", "popid":"oo", "circleId":"ooo", "backId":"oooo", "txtId":"ooooo", "group":11, "img_url":"images/headTest/test5.jpg", "r":"10", "relation":["f"]},'+
			    
			    '{"name":"Camy", "id":"p", "popid":"pp", "circleId":"ppp", "backId":"pppp", "txtId":"ppppp", "group":11, "img_url":"images/headTest/test1.jpg", "r":"10", "relation":["f"]}'+
			  '],'+
			  '"links":['+
			    '{"source":0,"target":1,"value":3},'+
			    '{"source":0,"target":2,"value":24},'+
			    '{"source":0,"target":3,"value":30},'+
			    '{"source":0,"target":4,"value":18},'+
			    '{"source":1,"target":5,"value":3},'+
			    '{"source":2,"target":5,"value":3},'+
			    '{"source":2,"target":10,"value":3},'+
			    '{"source":3,"target":8,"value":3},'+
			    '{"source":3,"target":11,"value":6},'+
			    '{"source":4,"target":9,"value":3},'+
			    '{"source":4,"target":12,"value":3},'+
			    '{"source":5,"target":13,"value":9},'+
			    '{"source":5,"target":14,"value":9},'+
			    '{"source":5,"target":15,"value":15},'+
			    '{"source":5,"target":6,"value":3},'+
			    '{"source":5,"target":7,"value":3},'+
			    '{"source":6,"target":8,"value":3},'+
			    '{"source":6,"target":11,"value":3},'+
			    '{"source":6,"target":12,"value":3}'+
			  ']'+
			'}';	*/
		d3.json("json/miserables.json", function(error, graph) {
		 	graph = JSON.parse( relatedPeopleJson );
			force.nodes(graph.nodes).links(graph.links).start();

			var link = svg.selectAll(".link").data(graph.links).enter().append(
					"line").attr("class", "link").style("stroke-width",
					function(d) {
						return Math.sqrt(d.value);
					});

			var node = svg.selectAll(".node").data(graph.nodes).enter().append(
					"g").attr("class", "node").on("mouseover", mouseoverCircle)
					.on("mouseout", mouseoutCircle).call(force.drag);

			node.append("defs").append("pattern").attr("id", function(d) {
				return d.id;
			}).attr("patternUnits", "objectBoundingBox").attr("width", "10")
					.attr("height", "10").append("image").attr("x", "0").attr(
							"y", "0").attr("width", function(d) {
						return parseInt(d.r) * 2;
					}).attr("height", function(d) {
						return parseInt(d.r) * 2;
					}).attr("xlink:href", function(d) {
						return d.img_url;
					});

			var twoColor = node.append("defs").append("linearGradient").attr(
					"id", "twoColor").attr("x1", "0").attr("x2", "0").attr(
					"y1", "0").attr("y2", "1");
			twoColor.append("stop").attr("offset", "75%").attr("stop-opacity",
					"0.8").attr("stop-color", function(d) {
				return color(d.group);
			});
			twoColor.append("stop").attr("offset", "75%").attr("stop-opacity",
					"0.8").attr("stop-color", "#111");

			node.append("circle").attr("id", function(d) {
				return d.backId;
			})
			// .attr("class", "circle")
			.attr("r", function(d) {
				return d.r;
			})
			// .style("fill", function(d) {
			// return color(d.group);
			// });
			.style("fill", function(d) {
				if (d.r >= 20)
					return "url(#" + d.id + ")";
				else
					return color(d.group);
			});
			node.append("circle").attr("class", "circle").attr("id",
					function(d) {
						return d.circleId;
					}).attr("r", function(d) {
				return d.r;
			}).style("fill", function(d) {
				if (d.r >= 30)
					return "url(#twoColor)";
				else
					return color(d.group);
			}).style("opacity", function(d) {
				// if(d.r != 20){
				return "0.8";
				// }else{
				// return "0";
				// }
			}).on("mouseover", mouseoverCircle).on("mouseout", mouseoutCircle);

			node.append("text").attr("id", function(d) {
				return d.txtId;
			}).attr("class", "txt").style("fill", "white").style("font-size",
					"6px").text(function(d) {
				if (d.r >= 30)
					return d.name.substr(0, 5) + "...";
			});
			// node.append("text")
			// .attr("class", "txtLineThree")
			// .attr("xml:space", "preserve")
			// .style("fill","white")
			// .style("font-size", "6px")
			// .text(function(d){
			// if(d.r >= 30)
			// return " ...";
			// });

			function mouseoverCircle(d) {
				node.selectAll("circle").style("opacity", 0.1);
				node.selectAll(".txt").style("opacity", 0.1);

				node.selectAll("#" + d.circleId).style("opacity", 0.6);
				node.selectAll("#" + d.backId).style("opacity", 0.9);
				node.selectAll("#" + d.txtId).style("opacity", 0.9);
				var l = d.relation.length;
				for (i = 0; i < l; i++) {
					node.selectAll(
							"#" + d.relation[i] + d.relation[i] + d.relation[i]
									+ d.relation[i] + d.relation[i]).style(
							"opacity", 0.9);// text
					node.selectAll(
							"#" + d.relation[i] + d.relation[i] + d.relation[i]
									+ d.relation[i]).style("opacity", 0.9);// back
					// image
					node
							.selectAll(
									"#" + d.relation[i] + d.relation[i]
											+ d.relation[i]).style("opacity",
									0.6);// front circle
				}
				if ($("#" + d.popid).length <= 0) {
					node.append("rect").attr("id", d.popid).attr("class",
							"contentWrap").attr("width", "100px").attr(
							"height", "100px").attr("x", d.x + parseInt(d.r))
							.attr("y", d.y - parseInt(d.r)).attr("rx", 10)
							.attr("ry", 10).style("fill", "white");
					node.append("text").attr("class", "inText").attr("dx",
							d.x + parseInt(d.r) + 5).attr("dy",
							d.y - parseInt(d.r) + 15).style("fill", "#007acd")
							.text(function() {
								return d.name;
							});
				}
			}

			function mouseoutCircle() {
				node.selectAll("circle").style("opacity", 0.8);
				node.selectAll(".txt").style("opacity", 0.8);
				node.selectAll("rect").remove();
				node.selectAll(".inText").remove();
			}

			force.on("tick", function() {
				link.attr("x1", function(d) {
					return d.source.x;
				}).attr("y1", function(d) {
					return d.source.y;
				}).attr("x2", function(d) {
					return d.target.x;
				}).attr("y2", function(d) {
					return d.target.y;
				});

				node.selectAll("circle").attr("cx", function(d) {
					return d.x;
				}).attr("cy", function(d) {
					return d.y;
				});

				node.selectAll(".txt").attr("dx", function(d) {
					return d.x - 15;
				}).attr("dy", function(d) {
					return d.y + parseInt(d.r) / 4 * 3;
				});

				node.selectAll(".txtLineThree").attr("dx", function(d) {
					return d.x - 15;
				}).attr("dy", function(d) {
					return d.y + 10;
				});
			});
		
		
		});
		/*
		 * end graph
		 */

		return this;
	},

	// listeners in the page
	mouseOverCursor : function() {
		$("#pointerLeft").css("font-size", "33px");
		$("#pointerLeft").css("top", "237px");
		$("#pointerRight").css("font-size", "33px");
		$("#pointerRight").css("top", "237px");
	},

	mouseOutCursor : function() {
		$("#pointerLeft").css("font-size", "24px");
		$("#pointerLeft").css("top", "238px");
		$("#pointerRight").css("font-size", "24px");
		$("#pointerRight").css("top", "238px");
	},

	mouseOverRecover : function() {
		$("#recover").css("font-size", "33px");
	},

	mouseOutRecover : function() {
		$("#recover").css("font-size", "24px");
	},

	mouseOverClose : function() {
		$("#close").css("font-size", "33px");
	},

	mouseOutClose : function() {
		$("#close").css("font-size", "24px");
	},

	shrink : function() {
		$("#pointerLeft").css("display", "none");
		$("#pointerRight").css("display", "none");
		$("#relationGraph").css("display", "none");
		$("#dragPart").css("width", "40px");
		$("#dragPart").css("height", "40px");
		$("#dragPart").css("top", "80px");
		$("#dragPart").css("left", "30px");
		$("#dragPart p").css("margin-top", "8px");
		$("#dragPart").css("display", "none");
		$("#dragWrap").animate({
			width : "100px",
			height : "100px",
			opacity : "0.5"
		}, 1000, function() {
			$("#dragContent").css("background", "white");
			$("#recover").css("display", "block");
			$("#close").css("display", "block");
			$("#title").css("display", "block");
			$("#dragPart").css("display", "block");
		});
	},

	expand : function() {
		$("#recover").css("display", "none");
		$("#close").css("display", "none");
		$("#title").css("display", "none");
		$("#dragContent").css("background", "url('images/dragBG.jpg')");
		$("#dragPart").css("width", "100px");
		$("#dragPart").css("height", "100px");
		$("#dragPart").css("top", "0px");
		$("#dragPart").css("left", "200px");
		$("#dragPart p").css("margin-top", "-6px");
		$("#dragPart").css("display", "none");
		$("#dragWrap").animate({
			width : "500px",
			height : "500px",
			opacity : "1"
		}, 1000, function() {
			$("#pointerLeft").css("display", "block");
			$("#pointerRight").css("display", "block");
			$("#relationGraph").css("display", "block");
			$("#dragPart").css("display", "block");
		});
	},

	removePanel : function() {
		$("#dragWrap").remove();
		window.location.href = 'http://localhost:8080/HMapVis_0.2';
	}
});