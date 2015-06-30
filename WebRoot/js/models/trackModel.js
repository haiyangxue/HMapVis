
/**
 * models -- interactive data domain specific methods
 */
App.Models.Track = Backbone.Model.extend({
	// set default values of the properties
	defaults : {
		people : '',
		event_id : '0',
		people_loc : ''

	},
    url: function(suffix) {
    	return 'action/json/track'+suffix; // get the data url。
    },
    
    initialize: function() {
    	// 绑定错误的监听，validate会调用此方法，也可以在每个设置前进行绑定
		this.bind('invalid', function(model, error,arg) {
			alert(error);
		});
    },
    
    validate: function(attrs) {
    	if (attrs.event_id <= 0  ) {
    		return 'dynasty id must be greater than 0';
    	}
    },

    fetch: function (options) {
		var self = this;
		$.post(this.url('fetch'), {'track.people':this.get('people')}, function(data) {
			self.set(data.track);
			options.success();
		},'json');
	},
    
//    save: function () {
//    	var data = {};
//    	for ( var item in this.attributes) {
//			var key = 'dynasty.'+item;
//			data[key] = this.attributes[item];
//		}
//    	
//		$.post(this.url('save'), data, function(data) {
//		},'json');
//	}
	
});
