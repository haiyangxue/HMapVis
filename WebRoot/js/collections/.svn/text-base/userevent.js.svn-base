/**
 * collections -- ordered sets of models
 */

App.Collections.UserEvent = Backbone.Collection.extend({
	model : App.Models.UserEventModel,
	initialize : function(models, options) {
		
	},
	
	url: function(suffix) {
		return 'action/json/userdata_'+suffix; // 获得数据的后台地址。  //这里的话就是需要的是注意就是这里和Event的区别 我觉得这两个的后台是不一样的
	},
	
	fetch: function (options) {
		
		var self = this;
		var success = options.success;
		//这里的话不需要参数
		$.post(this.url('goUserEventPage'), {}, function(data) {
			for ( var i = 0; i < data.events.length; i++) {
				self.add(data.events[i]);
			}
			
			if (success) 
				success(data.page_count,data.event_count);
			
		},"json");
	},
     show: function (options) {
		
		var self = this;
		var success = options.success;
		//这里的话不需要参数
		$.post(this.url('goUserNowEventPage'), {}, function(data) {
		
			for ( var i = 0; i < data.events.length; i++) {
				self.add(data.events[i]);
			}
			
			if (success) 
				success(data.page_count,data.event_count);
			
		},"json");
	},
	
	next: function (options) {
		var self = this;
		var success = options.success;
		$.post(this.url("goNextEventPage"), {}, function(data) {
			if(data.message == "success"){
			for ( var i = 0; i < data.events.length; i++) {
				self.add(data.events[i]);
			}	
			if (success) 
				success(data.page_count,data.event_count);
		}},"json");
	},
	
	
	prev: function (options) {
		var self = this;
		var success = options.success;
		$.post(this.url("goPrevEventPage"), {}, function(data) {
			if(data.message == "success"){
			for ( var i = 0; i < data.events.length; i++) {
				self.add(data.events[i]);
			}	
			if (success) 
				success(data.page_count,data.event_count);
		}},"json");
	}

});