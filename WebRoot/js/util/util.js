/*******************************************************************************
 * 去掉一个字符串两端的空格
 */
function trim(szStr){
  // 去掉字符串头部的空格
  while(szStr.length > 0){
    if( szStr.substring(0, 1) != ' '){
      break;
    }else{
      szStr = szStr.substring(1);
    }
  }
  // 去掉字符串尾部的空格
  while(szStr.length > 0){
    if( szStr.substring(szStr.length - 1, szStr.length) != ' '){
      break;
    }else{
      szStr = szStr.substring(0,szStr.length - 1);
    }
  }
  return szStr;
}
/*******************************************************************************
 * 判断一个字符串是否为合法的日期格式：YYYY-MM-DD HH:MM:SS 或 YYYY-MM-DD 或 HH:MM:SS
 */
function isDateStr(ds){
  parts = ds.split(' ');
  switch(parts.length){
    case 2:
      if(isDatePart( parts[0] ) == true && isTimePart( parts[1] )){
        return true;
      }else{
        return false;
      }
    case 1:
      aPart = parts[0];
      if(aPart.indexOf(':') > 0 ){
        return isTimePart(aPart);
      }else{
        return isDatePart(aPart);
      }
    default:
      return false;
  }
}

/*******************************************************************************
 * 判断一个字符串是否为合法的日期格式：YYYY-MM-DD
 */
function isDatePart(dateStr){
  var parts;

  if(dateStr.indexOf("-") > -1){
    parts = dateStr.split('-');
  }else if(dateStr.indexOf("/") > -1){
    parts = dateStr.split('/');
  }else{
    return false;
  }

  if(parts.length < 3){
  // 日期部分不允许缺少年、月、日中的任何一项
    return false;
  }

  for(i = 0 ;i < 3; i ++){
  // 如果构成日期的某个部分不是数字，则返回false
    if(isNaN(parts[i])){
      return false;
    }
  }

  y = parts[0];// 年
  m = parts[1];// 月
  d = parts[2];// 日

  if(y > 3000){
    return false;
  }

  if(m < 1 || m > 12){
    return false;
  }
  
  if(d > 31 || d < 1){
	  return false;
  }
  switch(d){
    case 29:
      if(m == 2){
      // 如果是2月份
        if( (y / 100) * 100 == y && (y / 400) * 400 != y){
          // 如果年份能被100整除但不能被400整除 (即闰年)
        }else{
          return false;
        }
      }
      break;
    case 30:
      if(m == 2){
      // 2月没有30日
        return false;
      }
      break;
    case 31:
      if(m == 2 || m == 4 || m == 6 || m == 9 || m == 11){
      // 2、4、6、9、11月没有31日
        return false;
      }
      break;
    default:
  }

  return true;
}

/*******************************************************************************
 * 判断一个字符串是否为合法的时间格式：HH:MM:SS
 */
function isTimePart(timeStr){
	var parts;
	parts = timeStr.split(':');
	if(parts.length < 2){
		// 日期部分不允许缺少小时、分钟中的任何一项
		return false;
	}

	for(i = 0 ;i < parts.length; i ++){
	// 如果构成时间的某个部分不是数字，则返回false
		if(isNaN(parts[i])){
			return false;
		}
	}

  h = parts[0];// 年
  m = parts[1];// 月

  if( h < 0 || h > 23){
  // 限制小时的范围
    return false;
  }
  if( m < 0 || h > 59){
  // 限制分钟的范围
    return false;
  }

  if(parts.length > 2){
    s = parts[2];// 日

    if( s < 0 || s > 59){
    // 限制秒的范围
      return false;
    }
  }

  return true;
}

var b;
function onTimeStartfocus(id){
	var target = document.getElementById(id);
	if(target.value=='开始时间') {
		target.value='';
	}
	var top = target.offsetTop+35+52;
	var left = target.offsetLeft;
	b = new a(top, left, id);
	// rDrag.init(b.wrapper);
}

function onTimeStartBlur(id){
	var target = document.getElementById(id);
	if (target.value=='') {
		target.value='开始时间';
	}
}

function onTimeEndfocus(id){
	var target = document.getElementById(id);
	if(target.value=='结束时间') {
		target.value='';
	}
	var top = target.offsetTop+35+52;
	var left = target.offsetLeft;
	b = new a(top, left, id);
	// rDrag.init(b.wrapper);
}

function onTimeEndBlur(id){
	var target = document.getElementById(id);
	if (target.value=='') {
		target.value='结束时间';
	}
}

var panelChose = 0;
var panelChoseRight = 0;
function checkPanel(sign){
	if(panelChose == 0 || panelChose == 5){
		return true;
	}else if(panelChose != 0 && panelChose != sign && panelChose == 1){
		return false;
	}else if(panelChose != 0 && panelChose != sign && panelChose == 2){
		return false;
	}else if(panelChose != 0 && panelChose != sign && panelChose == 3){
		return false;
	}else if(panelChose != 0 && panelChose != sign && panelChose == 4){
		return false;
	}
}

/*******************************************************************************
 * 将数据库中的字符串place_loc转成float类型的经度lon和纬度lat
 */
function changeLonlat(place_loc){
	var arrLonlat = new Array();
	if(place_loc == "NotFound"){
		arrLonlat[0] = 116.403857;
		arrLonlat[1] = 36.915177;
	}
	else{
		var locLength = place_loc.length;
		var d = place_loc.indexOf(",");
		var str1 = place_loc.slice(0, d-1);
		var str2 = place_loc.slice(d+1,locLength-1);
		var lon =parseFloat(str1);
		var lat =parseFloat(str2);
		arrLonlat[0] = lon;
		arrLonlat[1] = lat;
	}
	return arrLonlat;
}

/*******************************************************************************
 * 生成一个根据place_loc定位的popup
 */
function addPopup(event_id, lon, lat){
    var WGS_Projection = new OpenLayers.Projection("EPSG:4326");   // Transform
																	// from WGS
																	// 1984
	var Mercator_Projection = new OpenLayers.Projection("EPSG:3857"); // to
																		// Spherical
																		// Mercator
																		// Projection
	var lonlat = new OpenLayers.LonLat(lon, lat);
	lonlat = lonlat.transform(WGS_Projection, Mercator_Projection);
    
    popup = new OpenLayers.Popup("Popup"+event_id,
            lonlat,
            new OpenLayers.Size(150,150),
            "",true);
    map.addPopup(popup);
    popup.setBorder("solid");
    popup.hide();
    
    markers = new OpenLayers.Layer.Markers( "Markers"+event_id );
	var size = new OpenLayers.Size(22,34);
	var offset = new OpenLayers.Pixel(-(size.w), -size.h);
	var icon = new OpenLayers.Icon('openlayers/img/marker-blue.png',size,offset);
	markers.addMarker(new OpenLayers.Marker(lonlat,icon));
	map.addLayer(markers);
	markers.display(false);
}
function addMarker(event_id, lon, lat){
	var WGS_Projection = new OpenLayers.Projection("EPSG:4326");   // Transform
	var Mercator_Projection = new OpenLayers.Projection("EPSG:3857"); // to		
	var lonlat = new OpenLayers.LonLat(lon, lat);
	lonlat = lonlat.transform(WGS_Projection, Mercator_Projection);
    markers = new OpenLayers.Layer.Markers( "Markers"+event_id );
	var size = new OpenLayers.Size(22,34);
	var offset = new OpenLayers.Pixel(-(size.w), -size.h);
	var icon = new OpenLayers.Icon('openlayers/img/marker-blue.png',size,offset);
	markers.addMarker(new OpenLayers.Marker(lonlat,icon));
	map.addLayer(markers);
	markers.display(false);
	
}
function addPopupPeople(people_id, lon, lat){
    var WGS_Projection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
	var Mercator_Projection = new OpenLayers.Projection("EPSG:3857"); // to Spherical Mercator Projection
	var lonlat = new OpenLayers.LonLat(lon, lat);
	lonlat = lonlat.transform(WGS_Projection, Mercator_Projection);
    
    popup = new OpenLayers.Popup("Popup"+people_id,
            lonlat,
            new OpenLayers.Size(150,250),
            "",true);
    map.addPopup(popup);
    popup.setBorder("solid");
    popup.hide();
    
    markers = new OpenLayers.Layer.Markers( "Markers"+people_id );
	var size = new OpenLayers.Size(22,34);
	var offset = new OpenLayers.Pixel(-(size.w), -size.h);
	var icon = new OpenLayers.Icon('openlayers/img/marker-blue.png',size,offset);
	markers.addMarker(new OpenLayers.Marker(lonlat,icon));
	map.addLayer(markers);
	markers.display(false);
}

function display(id){
	var traget=document.getElementById(id);
	if(traget.style.display=="none"){
	traget.style.display="";
	}else{
	traget.style.display="none";
	}
	}

function getparm1() { 
	var url=location.href; 
	var tmp1=url.split("?")[1];
	if (tmp1!=null) {
		var tmp2=tmp1.split("&")[0]; 
		var tmp3=tmp2.split("=")[1]; 
	
		var tmp4=url.split("?")[1]; 
		var tmp5=tmp4.split("&")[1]; 
		var tmp6=tmp5.split("=")[1]; 
	
		var parm1=tmp3;
		var parm2=tmp6; 
		slideBar(parm1,parm2);
	
	 }else 
		 return 0;
} 

function addPiont( lon, lat){
	 var WGS_Projection = new OpenLayers.Projection("EPSG:4326");   // Transform
																	// from WGS
																	// 1984
		var Mercator_Projection = new OpenLayers.Projection("EPSG:3857"); // to
																			// Spherical
																			// Mercator
																			// Projection
		var lonlat = new OpenLayers.LonLat(lon, lat);
		lonlat = lonlat.transform(WGS_Projection, Mercator_Projection);
	    
	    markers = new OpenLayers.Layer.Markers( "Markers" );
		var size = new OpenLayers.Size(22,34);
		var offset = new OpenLayers.Pixel(-(size.w), -size.h);
		var icon = new OpenLayers.Icon('openlayers/img/marker-blue.png',size,offset);
		markers.addMarker(new OpenLayers.Marker(lonlat,icon));
		map.addLayer(markers);
		markers.display(false);
}

function changeLanguage(){
	$.post('action/json/admin_changelanguage',{},function(data) {					
		if(data.message == "fail"){
			alert("There is no such language!");
		}else{
			window.location.href="/HMapVis_0.2/";
		}
	},"json");
}