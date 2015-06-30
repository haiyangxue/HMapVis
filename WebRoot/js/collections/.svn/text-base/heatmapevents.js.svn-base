/**
 * collections -- ordered sets of models
 */

App.Collections.HeatMapEvents = Backbone.Collection.extend({
	model : App.Models.Event,
	initialize : function(models, options) {
		
	},
	
	url: function(suffix) {
		return 'action/json/heatmapevents_'+suffix; // 获得数据的后台地址。
	},
	
	fetch: function (options) {
		var self = this;
		var success = options.success;
		var heatmapevent={
				'event.place_loc' : options.place_loc
		};
		$.post(this.url('fetchheatmapevents'), heatmapevent, function(data) {
			for ( var i = 0; i < data.eventlist.length; i++) {
				self.add(data.eventlist[i]);
			}
			if (success) 
				success();
			
		},"json");
	}

});