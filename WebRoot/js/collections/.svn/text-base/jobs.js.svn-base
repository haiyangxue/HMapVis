/**
 * collections -- ordered sets of models
 */

App.Collections.Jobs = Backbone.Collection.extend({
	model : App.Models.Job,
	initialize : function(models, options) {
		
	},
	
	url: function(suffix) {
		return 'action/json/job_'+suffix; // 获得数据的后台地址。
	},
	
	fetch: function (options) {
		var self = this;
		var success = options.success;
		
		$.post(this.url('fetchAllJob'), {}, function(data) {
			for ( var i = 0; i < data.jobs.length; i++) {
				self.add(data.jobs[i]);
			}
			if (success) 
				success();
		},"json");
	}

});