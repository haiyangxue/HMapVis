
/**
 * models -- interactive data domain specific methods
 */
App.Models.EventRela = Backbone.Model.extend({
	// set default values of the properties
	defaults : {
		ee_id :'1',
		event_id1 : '0',
		event_id2 : '0',
		relation_id : '1',
		event_name : '',
		relation_name:'',
		place_id :'1',
		place_loc :''
	},
    url: function(suffix) {
    	return 'action/json/eventRela_'+suffix; // get the data url。
    },
    
    initialize: function() {
    	// 绑定错误的监听，validate会调用此方法，也可以在每个设置前进行绑定
		this.bind('invalid', function(model, error,arg) {
			alert(error);
		});
    },
    
    validate: function(attrs) {
    	
    },

    fetch: function (options) {
		var self = this;
		$.post(this.url('fetch'), {'eventrela.event_id1':this.get('event_id1')}, function(data) {
			self.set(data.eventrela);
			options.success();
		},'json');
	},
    
    save: function () {
    	var data = {
    			'eventrela.event_id1':  event_relation_json.Event_id,
    			'eventrela.event_id2':  event_relation_json.relatedEvent_id,
    			'eventrela.relation_id':  event_relation_json.relatedEventtype_id,
    	};
//    	for ( var item in this.attributes) {
//			var key = 'job.'+item;
//			data[key] = this.attributes[item];
//		}
    	
		$.post(this.url('save'), data, function(data) {
			if(data.message == "success"){
				event_relation_json.addNewEventFlag=false;
				event_relation_json.Event_id = -1;
				event_relation_json.relatedEvent_id = -1;
				event_relation_json.relatedEventtype_id =-1;
				alert("add event success");
			}else{
				event_relation_json.addNewEventFlag=false;
				event_relation_json.Event_id = -1;
				event_relation_json.relatedEvent_id = -1;
				alert("sorry,add event error");
			} 
		},'json');
	}
	
});
