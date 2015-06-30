
/**
 * models -- interactive data domain specific methods
 */
App.Models.QueryEvent = Backbone.Model.extend({
	// set default values of the properties
	defaults : {
		event_name : '',
		type_id : '',
		dynasty_id : '',
		place_id : '',
		start_time : '',
		end_time : ''
	},
    url: function(suffix) {
    	return 'action/json/queryevent_'+suffix; // get the data url。
    },
    
    initialize: function() {
    	// 绑定错误的监听，validate会调用此方法，也可以在每个设置前进行绑定
//		this.bind('invalid', function(model, error,arg) {
//			alert(error);
//		});
    },
    
    /**
     * 用来判断传入参数的正确性，传入参数设置第三个为{validate:true}
     * 那么每次设置set时将调用该方法进行校验，校验未通过将不进行后续设置，而直接返回
     * @param attrs
     * @returns {String}
     */
//    validate: function(attrs) {
//    	if (attrs.event_id <= 0  ) {
//    		return 'event id must be greater than 0';
//    	}
//    },
    
    /**
     * 从后台获取数据
     */
    fetch: function () {
		var self = this;
		var event={
				'event.event_name' : this.get('event_name'),
				'event.type_id' : this.get('type_id'),
				'event.dynasty_id' : this.get('dynasty_id'),
				'event.place_id' : this.get('place_id'),
//				'event.start_time' : this.get('start_time'),
//				'event.end_time' : this.get('end_time')
		};
		
		$.post(this.url('fetch'), event, function(data) {
			self.set(data.event);
		},'json');
	},
    
    /**
     * 保存数据到后台
     */
//	save: function () {
//    	var data = {};
//    	for (var item in this.attributes) {
//			var key = 'event.'+item;
//			data[key] = this.attributes[item];
//		} 
//    	
//		$.post(this.url("save"), data, function(data) {
//			if(data.message == "success"){
//				alert("add event success");
//			}else{
//				alert("sorry,add event error");
//			} 
//		},'json');
//	}
	
});
