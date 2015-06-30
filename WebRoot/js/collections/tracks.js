/**
 * collections -- ordered sets of models
 */

App.Collections.Track = Backbone.Collection.extend({
	model : App.Models.Track,
	initialize : function(models, options) {
		this.people = options.people;
	},
	
	url: function(suffix) {
		return 'action/json/track_'+suffix; // 获得数据的后台地址。
	},
	
	fetch: function (options) {
		var self = this;
		var success = options.success;
		var prefillSuccess = options.prefillSuccess;
		
		$.post(this.url('fetchByname'),  {'track.people':this.people}, function(data) {
			for ( var i = 0; i < data.tracks.length; i++) {
				self.add(data.tracks[i]);
			}
			if (success) {
				success();}
		},"json");
	}

});