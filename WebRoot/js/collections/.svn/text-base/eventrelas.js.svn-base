/**
 * collections -- ordered sets of models
 */

App.Collections.EventRelas = Backbone.Collection.extend({
	model : App.Models.EventRela,
	initialize : function(models, options) {
		
	},
	
	url: function(suffix) {
		return 'action/json/eventRela_'+suffix; // 获得数据的后台地址。
	},
	
	fetch: function (options) {
		var self = this;
		var success = options.success;
		$.post(this.url('fetchAllevent'), {'eventrela.event_id1':options.event_id1}, function(data) { 
			for ( var i = 0; i < data.eventrelas.length; i++) {
				self.add(data.eventrelas[i]);
			}
			if (success) 
				success();
		},"json");
	}

});