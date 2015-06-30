
/**
 * models -- interactive data domain specific methods
 */
App.Models.HeatMap = Backbone.Model.extend({
	// set default values of the properties
	defaults : {
		dynasty_id: '0',
		start_year : '',
		end_year : '',
		max:'0',
		data:[]//{lat:'0',lon:'0',count:'0'}

	},
    url: function(suffix) {
    	return 'action/json/heatmap_'+suffix; // get the data url。
    },
    
    initialize: function() {
    	// 绑定错误的监听，validate会调用此方法，也可以在每个设置前进行绑定
		this.bind('invalid', function(model, error,arg) {
			alert(error);
		});
    },
    
    /**
     * 用来判断传入参数的正确性，传入参数设置第三个为{validate:true}
     * 那么每次设置set时将调用该方法进行校验，校验未通过将不进行后续设置，而直接返回
     * @param attrs
     * @returns {String}
     */
    validate: function(attrs) {
    	if (attrs.place_id <= 0  ) {
    		return 'place id must be greater than 0';
    	}
    },
    
    fetchAll: function(options){
    	var self = this;
    	$.post(this.url('fetchAll'),{},function(data){
    		var col = {
				data:[]
			};
			for(var i =0 ;i<data.datas.length;i++){
				var hm ={ 
					'lon': data.datas[i].heatMapData_lon,
					'lat': data.datas[i].heatMapData_lat,
					'count': data.datas[i].heatMapData_count
				}; 
				col.data.push(hm);
			}
			
			self.set("data",col.data);
			self.set('max',(data.datas).length);

			options.success();
		},'json');
    },
    /**
     * 从后台获取数据
     */
    fetch: function (options) {
		var self = this;
		var data = {
			"data.dynasty_id" : this.get('dynasty_id')
		};
		$.post(this.url('fetch'), data , function(data) {
			var col = {
				data:[]
			};
			for(var i =0 ;i<data.datas.length;i++){
				var hm ={ 
					'lon': data.datas[i].heatMapData_lon,
					'lat': data.datas[i].heatMapData_lat,
					'count': data.datas[i].heatMapData_count
				}; 
				col.data.push(hm);
			}
			
			self.set("data",col.data);
			var counts = new Array((data.datas).length);
			for(var index1=0; index1<(data.datas).length;index1++){
				counts[index1] = data.datas[index1].heatMapData_count;
			}
			//计算counts数组的最大值
			var max = Math.max.apply(Math,counts); 
			self.set('max',max);
			options.success();
		},'json');
	},
	
	fetchByYear: function (options) {
		var self = this;
		var data = {
			"data.start_year" : this.get('start_year'),
			"data.end_year" : this.get('end_year'),
		};
		$.post(this.url('fetchByYear'), data , function(data) {
		 
			var col = {
					data:[]
			};
			for(var i =0 ;i<data.datas.length;i++){
					var hm ={ 
						'lon': data.datas[i].heatMapData_lon,
						'lat': data.datas[i].heatMapData_lat,
						'count': data.datas[i].heatMapData_count
					}; 
					col.data.push(hm);
			}
			
			self.set("data",col.data);
			var counts = new Array((data.datas).length);
			for(var index1=0; index1<(data.datas).length;index1++){
				counts[index1] = data.datas[index1].heatMapData_count;
			}
			//计算counts数组的最大值
			var max = Math.max.apply(Math,counts); 
			self.set('max',max);
			options.success();
		},'json');
	},
	
    
    /**
     * 保存数据到后台
     */
    save: function () {
    	var data = {};
    	for ( var item in this.attributes) {
			var key = 'heatMap.'+item;
			data[key] = this.attributes[item];
		}
    	
		$.post(this.url('save'), data, function(data) {
		 	if(data.message == "success")
		 		alert("add place success");
		 	else
		 		alert("add place failed");
		},'json');
	}
	
});
