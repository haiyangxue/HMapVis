var resizer = $(".resizer");
//控制移动
//resizer.bind("mousedown", function(e) {
//	var mouseStart = {};
//	var bottomEvent = e || event;
//	mouseStart.x = bottomEvent.clientX;
//	mouseStart.y = bottomEvent.clientY;
//	mouseStart.h = $(this).prev().height();
//	
//	var that = $(this).prev();
//	$(document).bind("mousemove", function(e) {
//		var bottomEvent = e || event;
//		var h = bottomEvent.clientY - mouseStart.y + mouseStart.h;
//		if(h<15)
//			h=15;
//		that.css({
//			height:h + "px"
//		});
//	});
//	$(document).bind("mouseup", function() {
//		$(this).unbind("mousemove");
//	});
//});
