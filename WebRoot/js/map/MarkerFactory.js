(function(){
	/**
	 * 历史事件的显示标注工厂，制造对应点的marker，并添加点击响应,一个工厂对应一个layer
	 */
	var MarkerFactory = HMapVis.MarkerFactory = function(map){
		
		var marker_layer;
		marker_layer = new OpenLayers.Layer.Markers( "历史事件" )
		map.addLayer(marker_layer);
		this._marker_layer = marker_layer;
		
		this._map = map;
		
		this._markerinfos = [];
		this._clusters = [];
		this._cluster_count = 0;
		
		that2 = this;
		this._map.events.register("zoomend", this._map, function(){
			that2._redraw();  
		});  
		this._map.events.register("click", this._map, function(){
			that2._closeAllPopup();
		}); 
		
	};
	
	/**
	 * zoom重画，当两个Cluster重合时候，其中的某个Cluster要变小，
	 */
	MarkerFactory.prototype._redraw = function () {
		var nowzoom = this._map.getZoom();
		var size1 = new OpenLayers.Size(10,10);
		var size2 = new OpenLayers.Size(21,25);
		for(var i=0;i<this._clusters.length;i++){
			this._clusters[i].state = 0;
		}
		for(var i=0;i<this._clusters.length;i++){
			
			if(this._clusters[i].state != 0)
				continue;
				
			for(var j=i+1;j<this._clusters.length;j++){
				var center1 = this._clusters[i].getCenter().clone().transform(Mercator_Projection,WGS_Projection);
				var center2 = this._clusters[j].getCenter().clone().transform(Mercator_Projection,WGS_Projection);
				
				if(this._clusters[j].state != 0)
					continue;
				
				//千米
				var distance = OpenLayers.Util.distVincenty(center1,center2);
				
				var sign = distance*1000/this._map.getResolution();
				
				var ff = 20;
				//如果这两个点之间的覆盖，则会把后面的Cluster变小，调节放大缩小
				if(sign > ff) {
					this._clusters[j].show();
					this._clusters[j].state = 0;
				}else {
					this._clusters[j].hide();
					this._clusters[j].state = 2;
				}
			}
		}
	}
	
	MarkerFactory.prototype._makeNewLayer = function(){
		var marker_layer;
		marker_layer = new OpenLayers.Layer.Markers( "历史事件" )
		map.addLayer(marker_layer);
		this._marker_layer = marker_layer;
	}
	
	/**
	 * 根据点的位置，把此marker添加到最近的cluster中
	 * @param markerinfo
	 */
	MarkerFactory.prototype._addToClosestCluster = function(markerinfo){
		var i = 0;
		for ( ; i < this._clusters.length; i++) {
			var cluster_center = this._clusters[i].getCenter().clone().transform(Mercator_Projection,WGS_Projection);
			var marker_center = markerinfo.point.clone().transform(Mercator_Projection,WGS_Projection);
			
			//千米
			var distance = OpenLayers.Util.distVincenty(cluster_center,marker_center);
			if(distance < 10){
				break;
			}
		}
		if(this._clusters.length == 0 || i == this._clusters.length){
	        var cluster = new Cluster(this);
	        this._cluster_count++;
	        cluster.id = this._cluster_count;
	        cluster.addMarkerInfo(markerinfo); 
	        this._clusters.push(cluster);
		}else{
			this._clusters[i].show();
			this._clusters[i].addMarkerInfo(markerinfo);
		}
	}
	
	/**
	 * 传入信息以及位置进行显示内容
	 * @param point
	 * @param content
	 */
	MarkerFactory.prototype.addMarker = function(point,content,type) { 
		//保存起来，聚类显示
		content.type_name = type;
		var markerinfo = {"point":point.clone(),"content":content};
		this._markerinfos.push(markerinfo);
		this._addToClosestCluster(markerinfo);
		this._redraw();
	};
	
	MarkerFactory.prototype._closeAllPopup = function() {
		for(var i=0;i<this._clusters.length;i++)
			this._clusters[i].closepop();
	}
	
	MarkerFactory.prototype._closeOtherPopup = function(cluster) {
		for(var i=0;i<this._clusters.length;i++){
			if(this._clusters[i].id != cluster.id)
				this._clusters[i].closepop();
		}
	}
	
	MarkerFactory.prototype._hideMarkerLayer = function() {
		if(this._marker_layer.getVisibility())
			this._marker_layer.setVisibility(false);
	}
	
	MarkerFactory.prototype._showMarkerLayer = function() {
		if(!this._marker_layer.getVisibility())
			this._marker_layer.setVisibility(true);
	}
	
	MarkerFactory.prototype.hide = function() {
		this._hideMarkerLayer();
	}
	
	MarkerFactory.prototype.show = function() {
		this._showMarkerLayer();
	}
	
	MarkerFactory.prototype.showInfoById  = function(id) {
		this._closeAllPopup();
		for (var i = 0; i < this._clusters.length; i++) {
			var markerinfos = this._clusters[i]._markerinfos;
			for ( var j = 0; j < markerinfos.length; j++) {
				if(markerinfos[j].content.event_id == id){
					this._clusters[i].showMarkerInfo2(i+1,j);
					return;
				}
			}
		}
	}
	
	MarkerFactory.prototype.toggle = function() {
		if(this._marker_layer.getVisibility()) {
			this.hide();
		} else{
			this.show();
		}
	}
	
	MarkerFactory.prototype.clearAll = function() {
		this._closeAllPopup();
		for(var i=0;i<this._clusters.length;i++){
			this._clusters[i].destroy();
		}
		this._markerinfos = [];
		this._clusters = [];
		this._cluster_count = 0;
		
		this._map.removeLayer(this._marker_layer);
		this._marker_layer = null;
		this._makeNewLayer();
	}
	
	
	/**
	 * 用于同一个地点中事件太多，造成拥挤，使用一个Cluster管理一个地点同时显示的多个事件
	 */
	function Cluster(factory){
		this._markerinfos = [];
		this._count = 0; //个数
		this._center = null; //显示的位置
		this._feature = null;
		
		this._content = "";
		this._factory = factory;
		this._markerpop = null;
		this._imgUrl = "";
		//状态，默认是0显示大图，1显示小图，2隐藏
		this.state = 0;
	}
	
	/**
	 * 改变这个地点Cluster的图片的大小
	 */
	Cluster.prototype.changeSize = function(size){
	    this._feature.marker.icon.setSize(size);
	};
	
	/**
	 * 得到中心点的坐标
	 */
	Cluster.prototype.getCenter = function(){
		return this._center;
	};
	
	Cluster.prototype.hide = function(){
		this._feature.marker.display(false);
		this._feature.popup.hide();
	};
	
	Cluster.prototype.show = function(){
		this._feature.marker.display(true);
		this._feature.popup.hide();
	};
	
	Cluster.prototype.closepop = function(){
		this._feature.popup.hide();
		if(this._markerpop)
			this._markerpop.hide();
	};
	
	Cluster.prototype.destroy = function(){
		this.hide();
		
		this._markerinfos = [];
		this._count = 0; //个数
		this._content = "";
		this._imgUrl = "";
		
		//状态，默认是0显示大图，1显示小图，2隐藏
		this.state = 0;
		
		if(this._markerpop != null){
			this._factory._map.removePopup(this._markerpop);
			this._markerpop.destroy();
			this._markerpop = null;
		}
		
		if(this._feature != null){
			if(this._feature.popup != null){
				this._factory._map.removePopup(this._feature.popup);
				this._feature.popup.destroy();
				this._feature.popup = null;
			}
			
			if(this._feature.marker !=null){
				this._factory._marker_layer.removeMarker(this._feature.marker);	
				this._feature.marker.destroy();
				this._feature.marker = null;
			}
			
			this._feature.destroy();
			this._feature = null;
		}
	}
	
	/**
	 * 初始化显示，添加第一个markerinfo
	 */
	Cluster.prototype._initfeature = function(){
		
		//弹出框的类型，点击时候显示的弹出框
		var popclass = OpenLayers.Class(OpenLayers.Popup.Anchored, {
            'autoSize': true,
            'minSize': new OpenLayers.Size(180,100),
            'maxSize': new OpenLayers.Size(180,200)
        });
		
		//设置图标大小
		var size = new OpenLayers.Size(35,35);
	    var offset = new OpenLayers.Pixel(0, 0);
	    var icon = new OpenLayers.Icon(this._imgUrl, size, offset);
	    
	    var feature = null;
	    if(this._imgUrl != null)
	    	feature = new OpenLayers.Feature(this._marker_layer, this._center,{'icon': icon}); 
	    else
	    	feature = new OpenLayers.Feature(this._marker_layer, this._center); 
	    	
	    feature.popupClass = popclass;
	    feature.data.popupContentHTML = this._content;
	   
	    var marker = feature.createMarker();
	    this._factory._marker_layer.addMarker(marker);
	    var popup = feature.createPopup(true);
        this._factory._map.addPopup(popup);
        popup.hide();
        
        var that = this;
	    marker.events.register("click", feature, function (evt) {
    		this.popup.toggle();
    		that._factory._closeOtherPopup(that);
    		if(that._markerpop)
    			that._markerpop.hide();
	    });
	    
	    this._feature = feature;
	}
	
	Cluster.prototype._updatefeature = function(){
		this._feature.popup.setContentHTML(this._content);
	}
	/**
	 * 添加信息
	 * @param markerinfo
	 */
	Cluster.prototype.addMarkerInfo = function(markerinfo){
		
		lastone = this;
		
		var showContent = this._content +
		"<a href='javascript:void(0);' onclick='lastone.showMarkerInfo("+this.id+","+this._count+");'>"+(this.id)+"-"+(this._count+1)+"."+markerinfo.content.event_name+"</a> <br />";
		this._content = showContent;
		
		this._markerinfos.push(markerinfo);
		
		if(this._count == 0){
			this._center = markerinfo.point; //把添加的第一个点当做落脚点
			this._imgUrl = markerinfo.content.imgUrl;
			this._initfeature();
		}else{
			this._updatefeature();
		}
		this._count++;
	}
	
	/**
	 * 显示一个marker的信息
	 */
	Cluster.prototype.showMarkerInfo = function(clusterid,markerid){
		if(clusterid != this.id){
			this._factory._clusters[clusterid-1].showMarkerInfo(clusterid,markerid);
			return;
		}
		
		var content = this._markerinfos[markerid].content;
		
		/**
		 * 时间轴的部分跳转，以及显示
		 */
		tg1.data("timeline").goTo(content.start_date);
		
		var eid = content.event_id;
		var MED = tg1.data("timeline").MED;
		var $ev = $("#"+eid);
		$ev.trigger('click');
		
		var clickContent =
			"<div><h4 stye='margin:0 0 5px 0;padding:0.2em 0'>"+content.event_name+"</h4>" + 
			"<img style='float:right;margin:4px;width:80;height:80;' id='imgDemo' src='"+content.img_path+"' width='139' height='104'/>" + 
			"<span>事件类型："+content.type_name+"</span><br />"+
			"<span>参与人物："+content.people+"</span><br />"+
			"<span>发生地点："+content.place_name+"</span><br />"+
			"<span>具体时间：" + content.start_date + "到" + content.end_date + "</span><br />"+
			"<span>主要影响：" + content.influ + "</span><br />" +
			"<span>简略信息：</span>" +
			"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>" + content.summary + "</p>" + 
			"<a href="+content.detail_url+" target='_blank'>详细信息</a>" +
			"</div>";
		
		var that = this;
		if(this._markerpop == null){
			var popup=new OpenLayers.Popup("popup",this._center,new OpenLayers.Size(600,230),clickContent,true);
			that._factory._map.addPopup(popup);
			this._markerpop = popup;
		}else{
			if(clickContent != null){
				this._markerpop.setContentHTML(clickContent);
				this._markerpop.show();
			}
		}
	}
	
	Cluster.prototype.showMarkerInfo2 = function(clusterid,markerid){
		
		//this._factory._map.setCenter(this._markerinfos[markerid].point);
		
		var content = this._markerinfos[markerid].content;
		
		var clickContent =
			"<div><h4 stye='margin:0 0 5px 0;padding:0.2em 0'>"+content.event_name+"</h4>" + 
			"<img style='float:right;margin:4px;width:80;height:80;' id='imgDemo' src='"+content.img_path+"' width='139' height='104'/>" + 
			"<span>事件类型："+content.type_name+"</span><br />"+
			"<span>参与人物："+content.people+"</span><br />"+
			"<span>具体时间：" + content.start_date + "到" + content.end_date + "</span><br />"+
			"<span>主要影响：" + content.influ + "</span><br />" +
			"<span>简略信息：</span>" +
			"<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>" + content.summary + "</p>" + 
			"<a href="+content.detail_url+" target='_blank'>详细信息</a>" +
			"</div>";
		
		var that = this;
		if(this._markerpop == null){
			var popup=new OpenLayers.Popup("popup",this._center,new OpenLayers.Size(600,230),clickContent,true);
			that._factory._map.addPopup(popup);
			this._markerpop = popup;
		}else{
			if(clickContent != null){
				this._markerpop.setContentHTML(clickContent);
				this._markerpop.show();
			}
		}
	}
})();