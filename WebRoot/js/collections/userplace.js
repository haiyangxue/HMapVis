/**
 * collections -- ordered sets of models
 */

App.Collections.UserPlace = Backbone.Collection.extend({
	model : App.Models.UserPlaceModel,
	initialize : function(models, options) {
		
	},
	
	url: function(suffix) {
		return 'action/json/userdata_'+suffix; // 获得数据的后台地址。  //这里的话就是需要的是注意就是这里和Event的区别 我觉得这两个的后台是不一样的
	},
	
	fetch: function (options) {
		
		var self = this;
		var success = options.success;
		//这里的话不需要参数
		$.post(this.url('goUserPlacePage'), {}, function(data) {
			for ( var i = 0; i < data.places.length; i++) {
				self.add(data.places[i]);
			}
			
			if (success) 
				success(data.page_count,data.place_count);
			
		},"json");
	},
	
	
	 show: function (options) {
			
			var self = this;
			var success = options.success;
			//这里的话不需要参数
			$.post(this.url('goUserNowPlacePage'), {}, function(data) {
			
				for ( var i = 0; i < data.places.length; i++) {
					self.add(data.places[i]);
				}
				
				if (success) 
					success(data.page_count,data.place_count);
				
			},"json");
		},
		
		
		
	next: function (options) {
		var self = this;
		var success = options.success;
		$.post(this.url("goNextPlacePage"), {}, function(data) {
			if(data.message == "success"){
			for ( var i = 0; i < data.places.length; i++) {
				self.add(data.places[i]);
			}	
			if (success) 
				success(data.page_count,data.place_count);
		}},"json");
	},
	
	
	prev: function (options) {
		var self = this;
		var success = options.success;
		$.post(this.url("goPrevPlacePage"), {}, function(data) {
			if(data.message == "success"){
			for ( var i = 0; i < data.places.length; i++) {
				self.add(data.places[i]);
			}	
			if (success) 
				success(data.page_count,data.place_count);
		}},"json");
	}

});