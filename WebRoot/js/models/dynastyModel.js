
/**
 * models -- interactive data domain specific methods
 */
App.Models.Dynasty = Backbone.Model.extend({
	// set default values of the properties
	defaults : {
		dynasty_name : '',
		dynasty_id : '0',
		start_time : '',
		end_time : ''

	},
    url: function(suffix) {
    	return 'action/json/dynasty_'+suffix; // get the data url。
    },
    
    initialize: function() {
    	// 绑定错误的监听，validate会调用此方法，也可以在每个设置前进行绑定
		this.bind('invalid', function(model, error,arg) {
			alert(error);
		});
    },
    
    validate: function(attrs) {
    	if (attrs.dynasty_id <= 0  ) {
    		return 'dynasty id must be greater than 0';
    	}
    },

    fetch: function (options) {
		var self = this;
		$.post(this.url('fetch'), {'dynasty.dynasty_id':this.get('dynasty_id')}, function(data) {
			self.set(data.dynasty);
			options.success();
		},'json');
	},
    
    save: function () {
    	var data = {};
    	for ( var item in this.attributes) {
			var key = 'dynasty.'+item;
			data[key] = this.attributes[item];
		}
    	
		$.post(this.url('save'), data, function(data) {
			
		},'json');
	}
	
});
