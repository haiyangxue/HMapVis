/**
 * collections -- ordered sets of models
 */

App.Collections.EventTypes = Backbone.Collection.extend({
	model : App.Models.EventType,
	initialize : function(models, options) {
		
	},
	
	url: function(suffix) {
		return 'action/json/eventtype_'+suffix; // 获得数据的后台地址。
	},
	
	fetch: function (options) {
		var self = this;
		var success = options.success;
		
		$.post(this.url('fetchAllType'), {}, function(data) {
			for ( var i = 0; i < data.eventTypes.length; i++) {
				self.add(data.eventTypes[i]);
			}
			if (success) 
				success();
		},"json");
	}

});