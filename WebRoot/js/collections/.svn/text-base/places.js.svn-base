/**
 * collections -- ordered sets of models
 */

App.Collections.Places = Backbone.Collection.extend({
	model : App.Models.Place,
	initialize : function(models, options) {
	},
	
	url: function(suffix) {
		return 'action/json/place_'+suffix; // 获得数据的后台地址。
	},
	
	fetch: function (options) {
		var self = this;
		var success = options.success;
		var prefillSuccess = options.prefillSuccess;
		
		var place = { 
			"place.dynasty_id": options.dynasty_id
		}; 
		
		
		$.post(this.url('fetchAllShowplace'), place, function(data) {
			for ( var i = 0; i < data.showplaces.length; i++) {
				var place = new App.Models.Place({ 
					place_id: data.showplaces[i].place_id,
					place_name: data.showplaces[i].place_name,
				}); 
				self.add(place);//ok
			}
			//加最后一栏“其他”
			var place = new App.Models.Place({ 
				place_id: -1,
				place_name: "其他",
			});
			
			self.add(place);//ok
			if (success) 
				success();
		},"json");
	},
	  
	search : function(options){
		var self = this;
		var success = options.success;
		var prefillSuccess = options.prefillSuccess;
		
		var place = { 
			"place.place_name": options.place_name,
			"place.now_name": options.now_name
			
		}; 
		$.post(this.url('searchPlace'), place, function(data) {
			for ( var i = 0; i < data.searchplaces.length; i++) {
				var places = new App.Models.Place({ 
					place_id: data.searchplaces[i].place_id,
					place_name: data.searchplaces[i].place_name,
					now_name :data.searchplaces[i].now_name,
					start_time:data.searchplaces[i].start_time,
					end_time:data.searchplaces[i].end_time,
					dynasty_id:data.searchplaces[i].dynasty_id,
					dynasty_name:data.searchplaces[i].dynasty_name,
					place_loc:data.searchplaces[i].place_loc
				}); 
				self.add(places);//ok
			}
			if (success) 
				success();
		},"json");
	}
});