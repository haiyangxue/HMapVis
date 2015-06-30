function loadUserImg() {
	var user_map = $("#usermap");
	var all_map = $("#allmap");
	var img = $("#mapimg");
	img.attr("src", "images/whitehouse.jpg");

	// get the attribute values of left anf top of allmap and usermap
	// init the um_posi_left and um_posi_top with the origional position of
	// usermap in case the user only tensile the image
	am_posi_left = all_map.offset().left;
	am_posi_top = all_map.offset().top;
	um_posi_left = user_map.offset().left;
	um_posi_top = user_map.offset().top;

	var scale = $("#scale");
	var right = $("#right");
	var bottom = $("#bottom");
	var mouseStart = {}; // the start position of teh mouse when move
	var mapStart = {};

	translate = $("#translate");
	var posStart = {};

	// mvoe the map
	translate.bind("mousedown", function(e) {
		var mapEvent = e || event;
		posStart.x = mapEvent.clientX;
		posStart.y = mapEvent.clientY;
		posStart.l = user_map.offset().left;
		posStart.t = user_map.offset().top;

		$(document).bind(
				"mousemove",
				function(e) {
					var mapEvent = e || event;
					var l = mapEvent.clientX - posStart.x + posStart.l;
					var t = mapEvent.clientY - posStart.y + posStart.t;

					// change the value of um_posi_left and um_posi_top
					um_posi_left = l;
					um_posi_top = t;
					user_map.css({
						left : l + "px",
						top : t + "px",
					});
				});
		$(document).bind("mouseup", function() {
			$(this).unbind("mousemove");

			// after the drag and tensile, calculate the difference between
			// values of the attributes of usermap and allmap
			diff_left = um_posi_left - am_posi_left;
			diff_top = um_posi_top - am_posi_top;
		});
	});

	// strech to bottom
	bottom.bind("mousedown", function(e) {
		var bottomEvent = e || event;
		mouseStart.x = bottomEvent.clientX;
		mouseStart.y = bottomEvent.clientY;
		mapStart.h = user_map.height();
		mapStart.w = user_map.width();

		$(document).bind("mousemove", function(e) {
			var bottomEvent = e || event;
			var h = bottomEvent.clientY - mouseStart.y + mapStart.h;
			var w = mapStart.w;
			if (h < scale.height())
				h = scale.height();
			user_map.css({
				width : w + "px",
				height : h + "px",
			});
			img.css({
				width : w + "px",
				height : h + "px",
			});
		});
		$(document).bind("mouseup", function() {
			$(this).unbind("mousemove");
		});
	});

	// strech to right
	right.bind("mousedown", function(e) {
		var rightEvent = e || event;
		mouseStart.x = rightEvent.clientX;
		mouseStart.y = rightEvent.clientY;
		mapStart.h = user_map.height();
		mapStart.w = user_map.width();

		$(document).bind("mousemove", function(e) {
			var rightEvent = e || event;
			var h = mapStart.h;
			var w = rightEvent.clientX - mouseStart.x + mapStart.w;
			if (w < scale.width())
				w = scale.width();
			user_map.css({
				width : w + "px",
				height : h + "px",
			});
			img.css({
				width : w + "px",
				height : h + "px",
			});
		});
		$(document).bind("mouseup", function() {
			$(this).unbind("mousemove");
		});
	});
	// strech to bottom right
	scale.bind("mousedown", function(e) {
		var scaleEvent = e || event;
		mouseStart.x = scaleEvent.clientX;
		mouseStart.y = scaleEvent.clientY;
		mapStart.h = user_map.height();
		mapStart.w = user_map.width();

		$(document).bind("mousemove", function(e) {
			var scaleEvent = e || event;
			var h = scaleEvent.clientY - mouseStart.y + mapStart.h;
			var w = scaleEvent.clientX - mouseStart.x + mapStart.w;
			if (w < scale.width())
				w = scale.width();
			if (h < scale.height())
				h = scale.height();
			user_map.css({
				width : w + "px",
				height : h + "px",
			});
			img.css({
				width : w + "px",
				height : h + "px",
			});
		});
		$(document).bind("mouseup", function() {
			$(this).unbind("mousemove");
		});
	});
}
function getLonLat(){
	var offset = new OpenLayers.Pixel(diff_left, diff_top);
	//alert("offset " + offset);
	var lonlat = map.getLonLatFromPixel(offset).transform(Mercator_Projection,WGS_Projection); ;
	alert("lonlat " + lonlat);
}
