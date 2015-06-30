/**
 * collections -- ordered sets of models
 */

App.Collections.People = Backbone.Collection.extend({
	model : App.Models.People,
	initialize : function(models, options) {

	},

	url : function(suffix) {
		return 'action/json/people_' + suffix; // 获得数据的后台地址。
	},

	fetch : function(options) {
		var self = this;
		var success = options.success;

 		$.post(this.url('fetchPeopleInRelation'), {"people_name" : options.people_name}, function(data) {
			for ( var i = 0; i < data.relatedPeople.length; i++) {
				data.relatedPeople[i].rid = data.rid[i];
				var pp = new App.Models.People(data.relatedPeople[i]);
				self.add(pp);
			} 
			if (success)
				success();
		}, "json");
	}

});