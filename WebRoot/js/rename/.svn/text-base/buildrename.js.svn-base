// 看到“EPSG：4326”字符，就是经纬度坐标的描述，看到“EPSG：900931”则是用“米”做单位的x/y坐标的描述(球面墨卡托投影)
var WGS_Projection = new OpenLayers.Projection("EPSG:4326"); // Transform
																// from WGS 1984
var Mercator_Projection = new OpenLayers.Projection("EPSG:3857"); // to
																	// Spherical
																	// Mercator
																	// Projection
var map;
var img_factory;
var marker_factory;
var layer_control;
var mouse_control;
var select_control;

function init() {
	alert("请点击红色部分进行编辑");
	document.onselectstart = new Function("event.returnValue=false"); // 限制鼠标选中

	/** ******下面是在初始化地图******** */

	// 初始化地图的中心
	var init_center = new OpenLayers.LonLat(117.1330225, 36.6669196);
	// 左下，右上，初始化地图的范围大小
	var init_bounds = new OpenLayers.Bounds(117.1330225, 36.6669196, 117.2330225,
			36.7669196);
	var image_bounds = new OpenLayers.Bounds(117.122825, 36.6606196, 117.1467815,
			36.6730496);

	// 底图osm的坐标系统是球面墨卡托投影，需要进行转化
	init_center = init_center.transform(WGS_Projection, Mercator_Projection);
	init_bounds = init_bounds.transform(WGS_Projection, Mercator_Projection);
	image_bounds = image_bounds.transform(WGS_Projection, Mercator_Projection);

	// 初始化地图的zoom
	var init_zoom = 18;

	// 定义地图变量以及相应显示的图层
	//var img_layer;
	
	// 使用指定的文档元素创建地图
	map = new OpenLayers.Map("map", {
		controls: [new OpenLayers.Control.Navigation()]
	// 设置一个空的控制器数组以清除默认控制器
	});
	
	// 创建一个 OpenStreeMap把这个图层添加到map中
	osm_layer = new OpenLayers.Layer.OSM("OSM");

    //var size = new OpenLayers.Size(50,50);  
    //var img_layer = new OpenLayers.Layer.Image('img_layer','images/software1.png',image_bounds,size,{isBaseLayer:false});//创建image类型的图层
    //map.setBaseLayer(osm_layer);
     
	// 选择切换图层的控件，显示的名称是上面图层的第一个参数
	//layer_control = new OpenLayers.Control.LayerSwitcher();
	//mouse_control = new OpenLayers.Control.Navigation();
	//map.addControls(mouse_control);

	// 地图上添加图层map.addLayer是添加一个图层
	map.addLayer(osm_layer);
	//map.addLayer(img_layer);//将图层添加到地图里面
	
	/**
	 * 渲染
	 */
	var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
	renderer = (renderer) ? [ renderer ]
			: OpenLayers.Layer.Vector.prototype.renderers;

	/**
	 * 读取feature，绘制feature对象，显示
	 */
	var vector_layer = new OpenLayers.Layer.Vector("Vector", {
		styleMap : new OpenLayers.StyleMap({
			fillColor : "#df0101",
			fillOpacity : 0.4,
			strokeColor : "#df0101",
			strokeWidth : "${swidth}",
			strokeOpacity : 0.4,
			cursor : "pointer"
		}),
		renderers : renderer
	});
	map.addLayer(vector_layer);
	select_control = new OpenLayers.Control.SelectFeature(vector_layer, {
		hover : false,
		onSelect : onFeatureSelect,
		onUnselect : onFeatureUnselect
	});
	map.addControl(select_control);
	select_control.activate();

	for ( var i = 1; i <= 24; i++) {
		var vector = getVectorById(i);
		vector_layer.addFeatures([ vector ]);
	}

	// 地图设置中心点
	map.setCenter(init_center, init_zoom);

	/** ***** */

}
// Feature 选中事件响应
function onFeatureSelect(feature) {
	/*var userInfo = document.getElementsByTagName("ul")[0].childNodes;	
	
	var un = userInfo[1].innerText;	
	
	if(typeof un == "undefined" ){
		un = userInfo[1].innerHTML.substring(29,31);
	}*/
	
	
	if(login_user_name == "login"){
		
		selectedFeature = feature;
		id = feature.oid;
		popup = new OpenLayers.Popup.FramedCloud(
				"chicken",
				feature.geometry.getBounds().getCenterLonLat(),
				null,
				"<div style='font-size:.8em'>"
						+ "<div style='text-align:center;'>"
						+ "<font family='微软雅黑' color='white'>"
						+ feature.oname
						+ "</font>"
						+ "<input type='text' id='nn' class='txtinput	' style='width:100%;margin-top:5px;' />"
						+ "<input type='button' class='buttoninput' style='width:49%;margin-top:5px;' value='提交' onclick='addNewName("
						+ id
						+ ")' />"
						+ "<input type='button' class='buttoninput' style='width:49%;margin-top:5px;margin-left:2%;' value='投票' onclick='sendbuildingId("
						+ id + ");'/>" + "</div>" + "</div>", null, true,
				onPopupClose);
		feature.popup = popup;
		map.addPopup(popup);
	}else if(login_user_name == "null"){
		window.location.href="action/jsp/page_goStuLogin";
	}
}
// Feature取消选中事件响应
function onFeatureUnselect(feature) {
	map.removePopup(feature.popup);
	feature.popup.destroy();
	feature.popup = null;
}
function onPopupClose(evt) {
	select_control.unselect(selectedFeature);
}