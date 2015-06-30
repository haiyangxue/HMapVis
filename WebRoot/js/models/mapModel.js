
/**
 * models -- interactive data domain specific methods
 */
App.Models.Map = Backbone.Model.extend({
	// set default values of the properties
	defaults : {
		map_id : '0',
		dynasty_id : '',
		tile_path : '',
		create_time : '',
		map_bounds : '',
		map_name : '',
		user_id : '',
		start_time : '',
		end_time : '',
		regiontype : '1'
	},
    url: function(suffix) {
    	return 'action/json/map_'+suffix; // get the data url。
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
    	if (attrs.map_id <= 0  ) {
    		return 'map id must be greater than 0';
    	}
    },
    
    /**
     * 从后台获取数据
     */
    fetch: function (options) {
		var self = this;
		//这里采用的是通过map的dynasty_id获得map
		$.post(this.url('fetch'), {'map.dynasty_id':this.get('dynasty_id')}, function(data) {
			self.set(data.map);
			options.success();
			
		},'json');
	},
	 /**
     * 从后台获取最新地图
     */
    fetchRecent: function (options) {
		var self = this;
		//这里采用的是通过map的dynasty_id获得map
		$.post(this.url('fetchRecent'), {'map.regiontype':this.get('regiontype')}, function(data) {
			self.set(data.map);
			options.success();
			
		},'json');
	},
    /**
     * 保存数据到后台
     */
    save: function () {
    	var data = {};
    	for ( var item in this.attributes) {
			var key = 'map.'+item;
			data[key] = this.attributes[item];
		}
    	
		$.post(this.url('save'), data, function(data) {
		},'json');
	}
	
});
