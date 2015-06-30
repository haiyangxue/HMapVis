/**
 * collections -- ordered sets of models
 */

App.Collections.Peoplequery = Backbone.Collection.extend({
	model : App.Models.Peoplequery ,
	initialize : function(models, options) {
	},

	url : function(suffix) {
		return 'action/json/peoplequery_' + suffix; // 获得数据的后台地址。
	},

	fetch : function(options) {
		var self = this;
		var success = options.success;
		var prefillSuccess = options.prefillSuccess;

		$.post(this.url('fetch'), {"people.people_name":$("#searchName").val(),"people.job_id":$("#job").val(),
			"people.dynasty_id":$("#dynasty").val(),"people.education_id":$("#education").val(),
			"people.start_time":$("#event_start").val(),"people.end_time":$("#event_end").val(),}, function(data) {
			for ( var i = 0; i < data.peoples.length; i++) {
				self.add(data.peoples[i]);
			}
			if (success)
				success();
		}, "json");
	}

});