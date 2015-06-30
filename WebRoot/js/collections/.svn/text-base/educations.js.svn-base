/**
 * collections -- ordered sets of models
 */

App.Collections.Educations = Backbone.Collection.extend({
	model : App.Models.Education,
	initialize : function(models, options) {
		
	},
	
	url: function(suffix) {
		return 'action/json/education_'+suffix; // 获得数据的后台地址。
	},
	
	fetch: function (options) {
		var self = this;
		var success = options.success;
		
		$.post(this.url('fetchAllEducation'), {}, function(data) {
			for ( var i = 0; i < data.educations.length; i++) {
				self.add(data.educations[i]);
			}
			if (success) 
				success();
		},"json");
	}

});