
/**
 * models -- interactive data domain specific methods
 */
App.Models.Education = Backbone.Model.extend({
	// set default values of the properties
	defaults : {
		education_name : '',
		education_id : '0'
		
	},
    url: function(suffix) {
    	return 'action/json/education_'+suffix; // get the data url。
    },
    
    initialize: function() {
    	// 绑定错误的监听，validate会调用此方法，也可以在每个设置前进行绑定
		this.bind('invalid', function(model, error,arg) {
			alert(error);
		});
    },
    
    validate: function(attrs) {
    	if (attrs.education_id <= 0  ) {
    		return 'education id must be greater than 0';
    	}
    },

    fetch: function (options) {
		var self = this;
		$.post(this.url('fetch'), {'education.education_id':this.get('education_id')}, function(data) {
			self.set(data.education);
			options.success();
		},'json');
	},
    
    save: function () {
    	var data = {};
    	for ( var item in this.attributes) {
			var key = 'education.'+item;
			data[key] = this.attributes[item];
		}
    	
		$.post(this.url('save'), data, function(data) {
			
		},'json');
	}
	
});
