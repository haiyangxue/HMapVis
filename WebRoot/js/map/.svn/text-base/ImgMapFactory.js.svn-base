var HMapVis = window.HMapVis = HMapVis || {};
(function(){
	/**
	 * 历史事件的显示标注工厂，制造对应点的marker，并添加点击响应,一个工厂对应一个layer
	 */
	var ImgMapFactory = HMapVis.ImgMapFactory = function(map){
		this._map = map;
		this._layers = [];
	};
	
	ImgMapFactory.prototype.addImgMap = function (usermap,user) {
		
		var image_layer;
		var layer_width = 50;
		var layer_height = 50;
		var layer_name = usermap.map_name + "   by " + user.user_name + "   at " + usermap.create_time;
		var img_url = usermap.tile_path;
		var boundsArr = usermap.map_bounds.split(",",4);
		
		var image_bounds = new OpenLayers.Bounds(boundsArr[0], boundsArr[1], boundsArr[2],boundsArr[3]).transform(WGS_Projection, Mercator_Projection);
		
		image_layer = new OpenLayers.Layer.Image(
			layer_name,
			img_url,
			image_bounds,
			new OpenLayers.Size(layer_width,layer_height),
			{isBaseLayer: false, opacity: .7 } 
		);
	    this._map.addLayer(image_layer);
	    
	    this._layers.push(image_layer);
	}
	
	ImgMapFactory.prototype.changeImgMap = function (usermap,user) {
		var img_url = usermap.tile_path;
		this._layers[0].setUrl(img_url);
	}
	
	ImgMapFactory.prototype.hideAll = function () {
		for ( var i = 0; i < this._layers.length; i++) {
			this._layers[i].setVisibility(false);
		}
	}
	
	ImgMapFactory.prototype.clearAll = function () {
		for ( var i = 0; i < this._layers.length; i++) {
			this._map.removeLayer(this._layers[i]);
			this._layers[i] = null;
		}
		this._layers = [];
	}
	
	ImgMapFactory.prototype.showAll = function () {
		for ( var i = 0; i < this._layers.length; i++) {
			this._layers[i].setVisibility(true);
		}
	}
})();