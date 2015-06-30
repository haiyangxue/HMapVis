(function($) {
	
	controller = null;
	
	$.widget(
					'hmapvis.timeline',
					{
						// defaults!
						options : {
							startTime : '-1000/1/1',
							endTime : '-100/1/11',
							focusTime : '-900/1/1',
							zoomlevel : 22,
							stdata : null
						},

						// 初始化调用
						_create : function() {

							// 设置容器属性和圆角
							this.element
									.addClass('timeline-container ui-corner-all');

							this._centerLine = $(
									'<div class="timeline-centerline" style="left:'
											+ this.element.width()/2 + 'px;height:'
											+ this.element.height()/3*2 + 'px;">'+
											'<div class="timeline-indicator"></div>' +
											'</div>')
									.appendTo(this.element);

							this._footer = $(
									'<div id="timeline-footer" class="timeline-footer" style="top:'
											+ (this.element.height()-50) + 'px;"></div>').appendTo(
									this.element);

							// 主要显示的面板
							this._content = $('<div id="timeline-content" class="timeline-content">')
									.appendTo(this.element);

							// 往显示面板上添加显示事件部分和时间比例尺的部分

							// 放事件的地方
							this._dataArea = $(
									'<div class="timeline-item-container">')
									.appendTo(this._content);
							
							//事件点击或放上时往下的显示线，虚线
							this._guidesLeft = $('<div class="timeline-guides"><div></div></div>')
				                .appendTo(this._content);
				            this._guidesRight = $('<div class="timeline-guides"><div></div></div>')
				                .appendTo(this._content);
							
							// 放时间比例尺的地方
							this._timeScale = $(
									'<div class="timeline-timescale">')
									.appendTo(this._content);
						},
						
						_init : function() {
							controller = new STTimeline.controller(this);
							controller.initialize();
						},
					});
})(jQuery);