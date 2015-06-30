/**
 * collections -- ordered sets of models
 */

App.Collections.QueryEvents = Backbone.Collection.extend({
	model : App.Models.QueryEvent,
	initialize : function(models, options) {
		
	},
	
	url: function(suffix) {
		return 'action/json/queryevents_'+suffix; // 获得数据的后台地址。
	},
	
	fetch: function (options) {
		
		var self = this;
		var success = options.success;
		var eventName = $("#event_name").val();
		if(eventName==""){ 	 	
			eventName = $("#event_name2").val(); 	 	
		} 
		var eventType = $("#event_type").val();
		var Dynasty = $("#dynasty").val();
		var placeName = $("#showplace").val();
//		var eventStart = $("#event_start").val();
//		var eventEnd = $("#event_end").val();
		var queryevent={
				'event.event_name' : eventName,
				'event.type_id' : eventType,
				'event.dynasty_id' : Dynasty,
				'event.place_id' : placeName,
//				'event.start_time' : this.get('start_time'),
//				'event.end_time' : this.get('end_time')
		};
		//alert(eventType);
		$.post(this.url('fetchEventList'), queryevent, function(data) {
			if(data.eventlist.length==0){				
				showAndhide("box3");
				event_relation_json.queryResultIsZero =true;
			}else{
				event_relation_json.queryResultIsZero =false;
			}
			for ( var i = 0; i < data.eventlist.length; i++) {
				self.add(data.eventlist[i]);
			}
			if (success) 
				success();
			
		},"json");
	}

});