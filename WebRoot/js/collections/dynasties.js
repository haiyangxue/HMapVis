/**
 * collections -- ordered sets of models
 */

App.Collections.Dynasties = Backbone.Collection.extend({
	model : App.Models.Dynasty,
	initialize : function(models, options) {

	},

	url : function(suffix) {
		return 'action/json/dynasty_' + suffix; // 获得数据的后台地址。
	},

	fetch : function(options) {
		var self = this;
		var success = options.success;
		var prefillSuccess = options.prefillSuccess;

		$.post(this.url('fetchAllDynasty'), {}, function(data) {
			for ( var i = 0; i < data.dynasties.length; i++) {
				self.add(data.dynasties[i]);
			}
			if(success){
				success();
			}
		}, "json");
	}

});