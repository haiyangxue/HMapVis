/**
 * collections -- ordered sets of models
 */

App.Collections.Events = Backbone.Collection.extend({
	model : App.Models.Event,
	initialize : function(models, options) {
		
	},
	
	url: function(suffix) {
		return 'action/json/events_'+suffix; // 获得数据的后台地址。
	},
	
	fetch: function (options) {
		
		var self = this;
		var success = options.success;
		var zoomlevel=options.zoomlevel;
		var focus_year=options.focus_year;
		$.post(this.url('fetchlist'), {'zoomlevel':zoomlevel, 'focus_year':focus_year}, function(data) {
			for ( var i = 0; i < data.events.length; i++) {
				self.add(data.events[i]);
			}
			
			if (success) 
				success();
			
		},"json");
	}

});