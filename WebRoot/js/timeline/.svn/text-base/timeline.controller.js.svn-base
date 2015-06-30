function bubble_sort (a1, a2, n){
	// n为数组a的元素个数
	var i,j,temp1,temp2;
	for(j=0;j<n-1;j++)
		for(i=0;i<n-1-j;i++){
			if(a1[i]>=a1[i+1]){
				// 数组元素大小按升序排列
				temp1=a1[i];
				temp2=a2[i];
				a1[i]=a1[i+1];
				a2[i]=a2[i+1];
				a1[i+1]=temp1;
				a2[i+1]=temp2;
			}
		}
}
//为获取文字的长度设置的函数
String.prototype.getStringLength = function() { 
	var ruler = $("#ruler"); 
	ruler.text(this); 
	return ruler[0].offsetWidth; 
};

var STTimeline = window.STTimeline || {
	mode : "publish",
	version : "0.1.0"
};

(function($,HMapVis) {

	STTimeline.controller = function(widget) {

		this._widget = widget;
		this._options = widget.options;
		this._stdata = widget.options.stdata;
		
		// html dom element
		this._container = widget.element;

		this._content = widget._content;
		this._footer = widget._footer;
		this._dataArea = widget._dataArea;
		this._timeScale = widget._timeScale;
		this._guidesLeft = widget._guidesLeft;
		this._guidesRight = widget._guidesRight;

		// center
		this._center = 0;
		this._height = 0;
		this._width = 0;

		// zoom
		this._zoomLevel = widget.options.zoomlevel;
		this._minzoomlevel = 1;
		this._maxzoomlevel = 37;
		this._zoomtree = null; // init this by _initZoomTree method

		// 每一个时间刻度最开始的宽度，没有子刻度的时候
		this._itemWidth = 150;

		// scroll
		this._scrollStartX = 0;
		this._moveMonths = 0;
		this._movePixel = 0;
		
		this._scaleLeftX = 0;
		this._scaleRightX = 0;

		// time
		this._startTime = new HMapVis.BCDate(widget.options.startTime);
		this._endTime = new HMapVis.BCDate(widget.options.endTime);
		this._focusTime = new HMapVis.BCDate(widget.options.focusTime);
		this._focus_year = -900;
		      
		// event collections
		this._timeline_event_models = new App.Collections.Events();
	};

	STTimeline.controller.prototype = {

		initialize : function() {

			this._center = Math.round(this._container.width() / 2);
			this._height = this._container.height();
			this._width = this._container.width();

			this._zoomtree = this._getZoomTree();
			
			this._focus_year=this._getNowFocus().year;

			var self = this;
			this._content.draggable({
				axis : 'x',
				cursor : 'w-resize',
				refreshPositions : true,
				// 开始拖动
				start : function(event, ui) {
					self._scrollStartX = event.pageX;
				},
				// 拖动过程
				drag : function(event, ui) {
				},
				// 拖动结束
				stop : function(event, ui) {
					var movePixel = event.pageX - self._scrollStartX;
					var num=1;
					// 如果移动的像素超过一个itemWidth，就要进行重新刷新
					self.changePosByDrag(movePixel);
					if(self._focus_year!=self._getNowFocus().year){
						self._focus_year=self._getNowFocus().year;
						self._redraw(self, num);
					}
					self._draw();
				}
			})
			// 面板的鼠标滑轮滚动功能，必须使用jquery mousewheel
			.on('mousewheel', function(event) {
				if (event.deltaY == 0){
					return;
				}
				if (event.deltaY > 0) {
					self._zoomLevel++;
					var levelArray=new Array(29,25,22,20,17,14,11,6,3,2,1);
					var index=jQuery.inArray(self._zoomLevel, levelArray);
					var num=2;
					if(index>=0)
						self._redraw(self, num);
					self._draw();
					event.preventDefault(); // 防止默认事件的发生
				} else {
					self._zoomLevel--;
					var levelArray=new Array(29,28,24,21,19,16,13,10,5,2,1);
					var index=jQuery.inArray(self._zoomLevel, levelArray);
					var num=2;
					if(index>=0)
						self._redraw(self, num);
					self._draw();
					event.preventDefault(); // 防止默认事件的发生
				}
			});

			this._draw();
		},

		/**
		 * 
		 */
		_draw : function() {
			this._guidesLeft.hide();
			this._guidesLeft.find('div').hide();
            this._guidesRight.hide();
            this._guidesRight.find('div').hide(); 
			this._drawTimeScale();
			this._drawDataItems();
		},
		
		draw : function() {
			this._draw();
		},
		
		_redraw : function(self, num){
					self._timeline_event_models.models=[];
					self._timeline_event_models.fetch({
					zoomlevel : self._zoomLevel,
					focus_year : Math.round(self._focus_year).toString(),
					success : function() {
						// 获得数据后的操作
						self._stdata = self._timeline_event_models;
						self._draw();
						if(num==2){
							event.preventDefault(); // 防止默认事件的发生
						}
					}
				});
		},
		
		redrawByRange : function(starttime, endtime, year_width, label){
			var time_width=endtime-starttime;
			if(10000>time_width>4200){
				this._zoomLevel=2;
			}
			else if(time_width>3200){
				this._zoomLevel=3;
			}
			else if(time_width>2500){
				this._zoomLevel=4;
			}
			else if(time_width>2100){
				this._zoomLevel=5;
			}
			else if(time_width>1800){
				this._zoomLevel=6;
			}
			else if(time_width>1600){
				this._zoomLevel=7;
			}
			else if(time_width>1400){
				this._zoomLevel=8;
			}
			else if(time_width>1280){
				this._zoomLevel=9;
			}
			else if(time_width>640){
				this._zoomLevel=10;
			}
			else if(time_width>420){
				this._zoomLevel=11;
			}
			else if(time_width>320){
				this._zoomLevel=12;
			}
			else if(time_width>250){
				this._zoomLevel=13;
			}
			else if(time_width>210){
				this._zoomLevel=14;
			}
			else if(time_width>180){
				this._zoomLevel=15;
			}
			else if(time_width>160){
				this._zoomLevel=15;
			}
			else if(time_width>140){
				this._zoomLevel=17;
			}
			else if(time_width>128){
				this._zoomLevel=18;
			}
			else if(time_width>64){
				this._zoomLevel=19;
			}
			else if(time_width>42){
				this._zoomLevel=20;
			}
			else if(time_width>32){
				this._zoomLevel=21;
			}
			else if(time_width>25){
				this._zoomLevel=22;
			}
			else if(time_width>21){
				this._zoomLevel=23;
			}
			else if(time_width>18){
				this._zoomLevel=24;
			}
			else if(time_width>16){
				this._zoomLevel=25;
			}
			else if(time_width>14){
				this._zoomLevel=26;
			}
			else if(time_width>11){
				this._zoomLevel=27;
			}
			else if(time_width<=11&&time_width>=0){
				this._zoomLevel=28;
			}
			var level=this._zoomLevel;
			
			var s=this._focus_year;
			var e=Math.round((starttime+endtime)/2);
			var w=(e-s)*12;
			var move_width=this._getPixelFromMonths(w);
			var year_WidthPixel=this._getPixelFromMonths(year_width);
			this._focus_year=(starttime+endtime)/2;
			var position_left=$('#timeline-content').position().left;
			if(label=="drag"){
				$('#timeline-content').css("left", position_left - year_WidthPixel*level*1.6);
				this.changePosByDrag(0-year_WidthPixel*level*1.6);
			}
			else{
				$('#timeline-content').css("left", position_left-move_width);
				this.changePosByDrag(0-move_width);
			}

			var self=this;
			this._timeline_event_models.models=[];
			this._stdata=[]; 
			
			this._timeline_event_models.fetch({
				zoomlevel : this._zoomLevel,
				focus_year : Math.round(this._focus_year).toString(),
				success : function() {
					// 获得数据后的操作
					self._stdata = self._timeline_event_models;
					self.draw();
				}
			});
		},
		
		_drawDataItems : function(){
			this._dataArea.empty();
			
			var self = this;
			
			var rowBoundaries = new Array(10);
			var datas = new Array();
			var Rank_Id_RowNum = new Array(
					{'rank':0, 'id':-1, 'row_num':-1},
					{'rank':0, 'id':-1, 'row_num':-1},
					{'rank':0, 'id':-1, 'row_num':-1},
					{'rank':0, 'id':-1, 'row_num':-1},
					{'rank':0, 'id':-1, 'row_num':-1},
					{'rank':0, 'id':-1, 'row_num':-1},
					{'rank':0, 'id':-1, 'row_num':-1},
					{'rank':0, 'id':-1, 'row_num':-1},
					{'rank':0, 'id':-1, 'row_num':-1},
					{'rank':0, 'id':-1, 'row_num':-1}
				);
			
			var data_left = new Array();
			this._stdata.each(function(data){
				if(data.get('end_time')-data.get('start_time')>=0){
						datas[datas.length]=data;
						var start = new HMapVis.BCDate(data.get('start_date'));
						var end = new HMapVis.BCDate(data.get('end_date'));
		                var leftAndWidth = self._getLeftAndWidth(start, end);
						data_left[data_left.length]=leftAndWidth.left;
					}
			});
			bubble_sort(data_left, datas, datas.length);
			
			for (var i=0; i<datas.length; i++){
				(function(i){
					var item = $('<div class="timeline-stdata-item" id="timeline_event'+datas[i].get('event_id')+'" onclick="showMapEvent('+datas[i].get('event_id')+')"></div>').appendTo(self._dataArea);
					var icon = $('<div class="timeline-stdata-icon"></div>').appendTo(item);
					var spanner = $('<div class="timeline-stdata-spanner"></div>').appendTo(item);
					var title = $('<div class="timeline-stdata-title" id=name'+datas[i].get('event_id')+'>'+datas[i].get('event_name')+'</div>').appendTo(item);
					
					var ruler=$('<div id=ruler style="visibility: hidden; white-space: nowrap; font-size: 24px;"></div>').appendTo(self._dataArea);
					var stringlength=datas[i].get('event_name').getStringLength();
					ruler.remove();
					title.css("width", stringlength);
				
				
					var startTime = new HMapVis.BCDate(datas[i].get('start_date'));
					var endTime = new HMapVis.BCDate(datas[i].get('end_date'));
					
	                var leftAndWidth = self._getLeftAndWidth(startTime, endTime);

	                spanner.css({
	                	'width' : leftAndWidth.width,
	                	'border' : '1px solid red',
					});
	                	// 当鼠标放在时间上时展示事件虚线
	                $('#'+'timeline_event'+datas[i].get('event_id')).on('mouseenter', function(event) {
							// show the time guides of the event item
							self._guidesLeft
						    .css({
						        'left': leftAndWidth.left,
						    });
						
							var labelLeft = self._guidesLeft.find('div');
							labelLeft
							.css({
								'top': this.offsetTop + 14,
							})
							.text(startTime.getFullYear()
									+ '/' + (startTime.getMonth() + 1)
									+ '/' + startTime.getDate()
						    )
						    .show();
						
							// time point event
							if(!(startTime.getFullYear() == endTime.getFullYear() && startTime.getMonth() == endTime.getMonth())){
								self._guidesRight
								.css({
									'left': leftAndWidth.left + leftAndWidth.width,
								});
								var labelRight = self._guidesRight.find('div');
								labelRight
								.css({
									'top': this.offsetTop - 16,
								})
								.text(endTime.getFullYear()
										+ '/' + (endTime.getMonth() + 1)
										+ '/' + endTime.getDate()
								)
								.show();
							}
						   	
						    self._guidesLeft.show();
						    self._guidesRight.show();
					   	})
					   	.on('mouseleave', function(event) {
					   		self._guidesLeft.hide();
					   		self._guidesLeft.find('div').hide();
					   		self._guidesRight.hide();
					   		self._guidesRight.find('div').hide();
					   	});
				
	                var toTop = 0;
	                
	            	for(var j=0; j<10; j++){
	            		
	        			if(rowBoundaries[j]<leftAndWidth.left || rowBoundaries[j]==undefined){
	            			toTop = 15*j+30;
	                        item.css({
	                        	'left' : leftAndWidth.left,
	                        	'top' : toTop
	                        });
	                        if(stringlength<leftAndWidth.width){
	                        	rowBoundaries[j] = leftAndWidth.left+leftAndWidth.width;
	                        }
	                        else{
	                        	rowBoundaries[j] = leftAndWidth.left+stringlength;
	                        }
	                        Rank_Id_RowNum[j].rank=datas[i].get('rank');
	                        Rank_Id_RowNum[j].id=datas[i].get('event_id');
	                        Rank_Id_RowNum[j].row_num=j;
	                        break;
	            		}
	            		else if(j==9){
	            			var data_Rank=new Array(10);
	            			
	            			// 仅用来将每行的最后一个事件按照rank排序
	            			for(var k=0; k<10; k++){
	            				data_Rank[k]=Rank_Id_RowNum[k].rank;
	            			}
	            			bubble_sort(data_Rank, Rank_Id_RowNum, Rank_Id_RowNum.length);
	
	        				if(datas[i].get('rank') > Rank_Id_RowNum[0].rank){
	        					$('<div class="timeline-stdata-item" id="timeline_event'+Rank_Id_RowNum[0].id+'" onclick="showMapEvent('+Rank_Id_RowNum[0].id+')"></div>').remove();
	
	        	                toTop = 15*Rank_Id_RowNum[0].row_num+30;
	                            item.css({
	                            	'left' : leftAndWidth.left,
	                            	'top' : toTop
	                            });
	                            if(stringlength<leftAndWidth.width){
	                            	rowBoundaries[Rank_Id_RowNum[0].row_num] = leftAndWidth.left+leftAndWidth.width;
	                            }
	                            else{
	                            	rowBoundaries[Rank_Id_RowNum[0].row_num] = leftAndWidth.left+stringlength;
	                            }
	                            Rank_Id_RowNum[0].rank=datas[i].get('rank');
	                            Rank_Id_RowNum[0].id=datas[i].get('event_id');
	                            
	        	                break;
	            			}
	        				else{
	        					item.remove();
	        					break;
	        				}
	            		}
	            	}
				})(i);
			}
		},
		
		/**
		 * 得到左边的位置和时间的跨度
		 */
		_getLeftAndWidth:function(startTime,endTime){
			var levelpro = this._zoomtree[this._zoomLevel];
			
			var startYear=0;
			startYear = startTime.getFullYear();
			var endYear=0;
			endYear = endTime.getFullYear();
            var startMonth = startTime.getMonth();
            var endMonth = endTime.getMonth();

            var width = 0;
            var deltaMonths = 0;
            if(endYear >= startYear)
            	deltaMonths = (endYear - startYear)*12 + (endMonth - startMonth);
            else
            	deltaMonths = (startYear - endYear)*12 + (endMonth - startMonth);
            width = deltaMonths * levelpro.subWidth;
			if (levelpro.type == 'thousand') {
				width = width / (100*12);
			} else if (levelpro.type == 'hundred') {
				width = width / (10*12);
			} else if (levelpro.type == 'ten') {
				width = width / 12;
			} 
			//            
			// if(width < 10)
			// width = 10;
						
            return { 'left': this._getLeftToFocus(startTime), 'width': width };
		},
		
		_getLeftToFocus:function(startTime){
			
			var levelpro = this._zoomtree[this._zoomLevel];
			
			var startYear = startTime.getFullYear();
            var startMonth = startTime.getMonth();
            
            var focusYear = this._getNowFocus().year;
            var focusMonth = this._getNowFocus().month;
            
            var left = 0;
            
            var deltaMonths = (focusYear - startYear)*12 + (focusMonth - startMonth);
            
            left = deltaMonths * levelpro.subWidth;
            
			if (levelpro.type == 'thousand') {
				left = left / (100*12);
			} else if (levelpro.type == 'hundred') {
				left = left / (10*12);
			} else if (levelpro.type == 'ten') {
				left = left / 12;
			}

			return this._center - left;
		},
		
		
		/**
		 * draw time scale
		 */
		_drawTimeScale : function() {
			if (this._zoomLevel < this._minzoomlevel) {
				this._zoomLevel = this._minzoomlevel;
				return;
			} else if (this._zoomLevel > this._maxzoomlevel) {
				this._zoomLevel = this._maxzoomlevel;
				return;
			}

			this._timeScale.empty();

			var itemLeft = 0;
			var levelpro = this._zoomtree[this._zoomLevel];

			var itemShowNum = Math.round(this._width * 2 / levelpro.itemWidth / 2);

			if (levelpro.type == 'thousand') {
				var year = parseInt(this._getNowFocus().year / 1000);
				var month = (this._getNowFocus().year%1000 + this._getNowFocus().month / 12)/100;

				var startYear = year - itemShowNum;
				var endYear = year + itemShowNum;

				itemLeft = this._center - month* levelpro.subWidth - itemShowNum
				* levelpro.itemWidth;;

				for ( var i = startYear; i <= endYear; i++) {
					this._addTimeItem(i + "000", itemLeft, levelpro);
					itemLeft += levelpro.itemWidth;
				}
			} else if (levelpro.type == 'hundred') {
				
				var year = parseInt(this._getNowFocus().year / 100);
				var month = (this._getNowFocus().year%100 + this._getNowFocus().month / 12)/10;

				var startYear = year - itemShowNum;
				var endYear = year + itemShowNum;

				itemLeft = this._center - month* levelpro.subWidth - itemShowNum * levelpro.itemWidth;

				for ( var i = startYear; i <= endYear; i++) {
					this._addTimeItem(i + "00", itemLeft, levelpro);
					itemLeft += levelpro.itemWidth;
				}
				
			} else if (levelpro.type == 'ten') {
				var year = parseInt(this._getNowFocus().year / 10);
				var month = this._getNowFocus().year%10 + this._getNowFocus().month / 12;

				var startYear = year - itemShowNum;
				var endYear = year + itemShowNum;

				itemLeft = this._center - month* levelpro.subWidth - itemShowNum
				* levelpro.itemWidth;;

				for ( var i = startYear; i <= endYear; i++) {
					this._addTimeItem(i + "0", itemLeft, levelpro);
					itemLeft += levelpro.itemWidth;
				}

			} else if (levelpro.type == 'year') {
				// 采用从中间到两边的刷新策略

				var year = this._getNowFocus().year;
				var month = this._getNowFocus().month;
				
				var startYear = year - itemShowNum;
				var endYear = year + itemShowNum;

				itemLeft = this._center - month
						* levelpro.subWidth - itemShowNum
						* levelpro.itemWidth;
				
				for ( var i = startYear; i <= endYear; i++) {
					this._addTimeItem(i + "", itemLeft, levelpro);
					itemLeft += levelpro.itemWidth;
				}
				
			} else if (levelpro.type == 'month') { // time scale item is month

				var year = this._getNowFocus().year;
				var month = this._getNowFocus().month;
				
				itemShowNum = itemShowNum*2;
				
				itemLeft = this._center - month*levelpro.itemWidth;
				
				for ( var i = 0; i <= itemShowNum + month; i++) {
					this._addTimeItem((i%12 +1)+ "m " + (year + parseInt(i/12)), itemLeft, levelpro);
					itemLeft += levelpro.itemWidth;
				}
				itemLeft = this._center - (month+1)*levelpro.itemWidth;
				for ( var i = -1; i >= -itemShowNum+month; i--) {
					this._addTimeItem((i%12 + 12 +1)+ "m " + (year + parseInt(i/12)-1), itemLeft, levelpro);
					itemLeft -= levelpro.itemWidth;
				}
			}
		},
		/**
		 * add one timescale item by position and label
		 * 
		 * @param label
		 * @param itemLeft
		 * @param levelpro
		 */
		_addTimeItem : function(label, itemLeft, levelpro) {

			var timeScale_item = $(
					'<div class="timescale-item">'
							+ '<div class="timescale-item-body">'
							+ '<div class="timescale-item-leftline"></div>'
							 + '</div>' + '</div>').appendTo(
					this._timeScale);
			timeScale_item.css("left", itemLeft);
			timeScale_item.css("width", levelpro.itemWidth);

			// 下面也要进行重新设置
			$(".timescale-item-body").css("top", this._height-90);

			var subWidth = levelpro.subWidth;
			var subShow = this._getSubShow(label, levelpro);

			var sub_labels_arr = [];
			for ( var i = 0; i < subShow.length; i++) {
				if(i == 0){
					sub_labels_arr
							.push('<div class="timescale-item-sub-label" style="left:'
									+ (subWidth * i)
									+ 'px;width:'
									+ subWidth
									+ 'px; height:30px; top:14px;"><br/>' + subShow[i] + '</div>');
				}else{
					sub_labels_arr
					.push('<div class="timescale-item-sub-label" style="left:'
							+ (subWidth * i)
							+ 'px;width:'
							+ subWidth
							+ 'px;">' + subShow[i] + '</div>');
				}
			}
			var sub_labels = sub_labels_arr.join("");
			timeScale_item
					.append('<div class="timescale-item-sublabel-group" style="width:'
							+ levelpro.itemWidth
							+ 'px;" >'
							+ sub_labels
							+ '</div>');
			timeScale_item.append('<div class="timescale-item-label">' + label + '</div>');

			$(".timescale-item-sublabel-group").css("top", this._height-90+16);
		},

		/**
		 * get the context of sub item
		 * 
		 * @param label
		 * @param levelpro
		 * @returns {Array}
		 */
		_getSubShow : function(label, levelpro) {
			var subShow = [];
			for ( var i = 0; i < 12; i++) {
				subShow.push("");
			}
			if (levelpro.subStatus == "none" || levelpro.subStatus == "only")
				return subShow;

			if (levelpro.type == 'thousand') {
				subShow = [];
				var thouyear = parseInt(label.substring(0, label.length - 3));
				for ( var i = 0; i < 10; i++) {
					// subShow.push("" + thouyear + "" + i + "00");
					subShow.push(thouyear*1000 + i*100);
				}
			} else if (levelpro.type == 'hundred') {
				subShow = [];
				var hunyear = parseInt(label.substring(0, label.length - 2));
				for ( var i = 0; i < 10; i++) {
					// subShow.push("" + hunyear + "" + i + "0");
					subShow.push(hunyear*100 + i*10);
				}
			} else if (levelpro.type == 'ten') {
				subShow = [];
				var tenyear = parseInt(label.substring(0, label.length));
				for ( var i = 0; i < 10; i++) {
					// subShow.push("" + (parseInt(tenyear) + i));
					subShow.push(tenyear + i);
				}
			} else if (levelpro.type == 'year') {
				subShow = [];
				for ( var i = 0; i < 12; i++) {
					subShow.push("" + (i + 1) + "月");
				}
			}
			return subShow;
		},

		/**
		 * change some attributes when draging the panel
		 * 
		 * @param pixel
		 */
		changePosByDrag : function(pixel) {
			this._moveMonths += this._getMonthsFromPixel(pixel);
			this._movePixel += pixel;
			this._center -= pixel;
		},
		
		/**
		 * 
		 * @returns {___anonymous8714_8740}
		 */
		_getNowFocus : function() {
			var beginFocusYear = this._focusTime.getFullYear();
			var beginFocusMonth = this._focusTime.getMonth();
			
			var changMonth = beginFocusMonth - this._moveMonths;
			
			var year = beginFocusYear;
			var month = beginFocusMonth;
			if(this._moveMonths == 0)
				return {'year':year,'month':month};
			if(changMonth >= 0){
				year = beginFocusYear + parseInt(changMonth/12);
				month = changMonth%12;
			}else{
				year = beginFocusYear + parseInt(changMonth/12) - 1;
				month = 12 + changMonth%12;
			}
			return {'year':year,'month':month};
		},

		/**
		 * transform pixel to month num
		 * 
		 * @param movePixel
		 * @returns {Number}
		 */
		_getMonthsFromPixel : function(movePixel) {
			var levelpro = this._zoomtree[this._zoomLevel];
			var num = movePixel / levelpro.subWidth;
			if (levelpro.type == 'thousand') {
				num = num * 100 * 12;
			} else if (levelpro.type == 'hundred') {
				num = num * 10 * 12;
			} else if (levelpro.type == 'ten') {
				num = num * 12;
			}
			return num;
		},
		
		_getPixelFromMonths : function(num) {
			var levelpro = this._zoomtree[this._zoomLevel];
			var movePixel = num * levelpro.subWidth;
			if (levelpro.type == 'thousand') {
				movePixel = movePixel / 100 / 12;
			} else if (levelpro.type == 'hundred') {
				movePixel = movePixel / 10 / 12;
			} else if (levelpro.type == 'ten') {
				movePixel = movePixel / 12;
			}
			return movePixel;
		},
		
		/**
		 * calculate the min zoom level so that timescale can fill in the
		 * display area
		 * 
		 * @returns
		 */
		_calMinZoomLevel : function() {
			var deltaMonths = (this._endTime.getFullYear() - this._startTime
					.getFullYear())
					* 12
					+ (this._endTime.getMonth() - this._startTime.getMonth())
					+ 1;
			var delataYears = Math.round(deltaMonths / 12);
			if (this._zoomtree == null) {
				alert("error,please first init zoom tree");
				return;
			}
			for ( var i = 1; i < this._zoomtree.length; i++) {
				var levelpro = this._zoomtree[i];
				var itemNums = 0;
				if (levelpro.type == 'thousand') {
					itemNums = delataYears / 1000;
				} else if (levelpro.type == 'hundred') {
					itemNums = delataYears / 100;
				} else if (levelpro.type == 'ten') {
					itemNums = delataYears / 10;
				} else if (levelpro.type == 'year') {
					itemNums = delataYears;
				} else if (levelpro.type == 'month') {
					itemNums = deltaMonths;
				}
				if (itemNums < 1)
					continue;
				if (itemNums * levelpro.itemWidth > this._width)
					return levelpro.level;
			}
			return this._zoomtree.length;
		},

		/**
		 * init ZoomTree
		 * 
		 * @returns {Array}
		 */
		_getZoomTree : function() {
			var timeScaleItemTypes = [ "thousand", "hundred", "ten", "year", "month"];

			var timeScaleItemSubNums = [ 10, 10, 10, 10, 2 ];
			var zoomtree = [ {} ];
			var count = 0;
			for ( var i = 0; i < timeScaleItemTypes.length; i++) {
				for ( var j = 0; j < timeScaleItemSubNums[i] - 1; j++) {
					count++;
					var itemWidth = this._itemWidth * (j + 1);
					var subWidth = itemWidth / timeScaleItemSubNums[i];
					if (i == 3){
						itemWidth = itemWidth * 1.2;
						subWidth = itemWidth / 12;
					}
					if (i == 4){
						subWidth = itemWidth;
					}
					var subStatus = "";
					if (j == 0) {
						subStatus = "none"; // no sub
					} else if (j > 0
							&& j < Math.round(timeScaleItemSubNums[i] / 2)) {
						subStatus = "only"; // sub have only line,no text
					} else if (j >= Math.round(timeScaleItemSubNums[i] / 2)) {
						subStatus = "both"; // sub have both line and text
					}
					var levelpro = {
						'level' : count,
						'type' : timeScaleItemTypes[i],
						'itemWidth' : itemWidth,
						'subStatus' : subStatus,
						'subNum' : timeScaleItemSubNums[i],
						'subWidth' : subWidth
					};
					zoomtree.push(levelpro);
				}
			}
			return zoomtree;
		},
		
		getShowInfo: function() {
			var rate = this._getMonthsFromPixel(this._width)/(400*12);
			return rate;
		},
	};

})(jQuery,HMapVis);

