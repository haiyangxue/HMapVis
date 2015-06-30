
/**
 * models -- interactive data domain specific methods
 */
App.Models.Job = Backbone.Model.extend({
	// set default values of the properties
	defaults : {
		job_id : '0',
		job_name : ''
	},
    url: function(suffix) {
    	return 'action/json/job_'+suffix; // get the data url。
    },
    
    initialize: function() {
    	// 绑定错误的监听，validate会调用此方法，也可以在每个设置前进行绑定
		this.bind('invalid', function(model, error,arg) {
			alert(error);
		});
    },
    
    validate: function(attrs) {
    	if (attrs.job_id <= 0  ) {
    		return 'job id must be greater than 0';
    	}
    },

    fetch: function (options) {
		var self = this;
		$.post(this.url('fetch'), {'job.job_id':this.get('job_id')}, function(data) {
			self.set(data.job);
			options.success();
		},'json');
	},
    
    save: function () {
    	var data = {};
    	for ( var item in this.attributes) {
			var key = 'job.'+item;
			data[key] = this.attributes[item];
		}
    	
		$.post(this.url('save'), data, function(data) {
			
		},'json');
	}
	
});
