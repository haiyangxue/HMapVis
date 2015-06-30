//其实的话就是Event的一个翻版
App.Models.UserEventModel = Backbone.Model.extend({
	// set default values of the properties
	defaults : {
		event_id : '0',//这里的话就是将所有的事件的信息都保存下来  
		type_id : '',
		dynasty_id : '',
		user_id : '',
		place_id : '',
		event_name : '',
		start_time : '',
		end_time : '',
		people : '',
		summary : '',
		influ : '',
		img_path : '',
		detail_url : '',
		start_date : '',
		end_date : '',
		type_name : '',
		place_name : '',
		now_name : ''

	},
	//这里的话就是直接采用的是调用的是事件的方法 这样返回的是一个基本的事件
    url: function(suffix) {
    	return 'action/json/event_'+suffix; // get the data url。
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
    	if (attrs.event_id <= 0  ) {
    		return 'event id must be greater than 0';
    	}
    },
    
    /**
     * 从后台获取数据  
     */
    
    fetch: function (options) {
		var self = this;
		
		//这里的话就是将所有的事件都显示出来 所以的话就是不需要建立整个的事件模型  对的  这里的话就是选择的时候没有什么条件的选择
		$.post(this.url('fetch'), {}, function(data) {
			self.set(data.event);
			options.success();
			
		},'json');
	},
    
    /**
     * 保存数据到后台
     */
    save: function () {
    	var data = {};
    	for ( var item in this.attributes) {
			var key = 'event.'+item;
			data[key] = this.attributes[item];
		}
    	
		$.post(this.url('save'), data, function(data) {
			
		},'json');
	}
	
});
