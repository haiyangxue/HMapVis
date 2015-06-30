/**
 * models -- interactive data domain specific methods
 */
App.Models.Event = Backbone.Model.extend({
	// set default values of the properties
	defaults : {
		event_id : '0',
		type_id : '',
		dynasty_id : '',
		user_id : '',
		place_id : '',
		event_name : '',
		start_time : '',
		end_time : '',
		people : '',
		summary : '',
		influ : '',
		img_path : '',
		detail_url : '',
		start_date : '',
		end_date : '',
		type_name : '',
		place_name : '',
		now_name : '',
		place_loc : '',
		event_video : '',
		fid_cid : '',
		pic_url : ''

	},
	url : function(suffix) {
		return 'action/json/event_' + suffix; // get the data url。
	},

	initialize : function() {
		// 绑定错误的监听，validate会调用此方法，也可以在每个设置前进行绑定
		this.bind('invalid', function(model, error, arg) {
			alert(error);
		});
	},

	/**
	 * 用来判断传入参数的正确性，传入参数设置第三个为{validate:true}
	 * 那么每次设置set时将调用该方法进行校验，校验未通过将不进行后续设置，而直接返回
	 * 
	 * @param attrs
	 * @returns {String}
	 */
	validate : function(attrs) {
		if (attrs.event_id <= 0) {
			return 'event id must be greater than 0';
		}
	},

	/**
	 * 从后台获取数据
	 */
	fetch : function(options) {
		var self = this;
		$.post(this.url('fetch'), {
			'event.event_id' : this.get('event_id')
		}, function(data) {
			self.set(data.event);
			options.success();
		}, 'json');
	},

	/**
	 * 保存数据到后台
	 */
	save : function() {
		var data = {};
		for ( var item in this.attributes) {
			var key = '.' + item;
			data[key] = this.attributes[item];
		}
		var key2 = '.' + "dynasty_id";

		var event = {
			"event.event_name" : data[".event_name"],
			"event.dynasty_id" : data[".dynasty_id"],
			"event.type_id" : data[".type_id"],
			"event.influ" : data[".influ"],
			"event.summary" : data[".summary"],
			"event.detail_url" : data[".detail_url"],
			"event.place_id" : data[".place_id"],
			"event.start_time_string" : data[".start_time"],
			"event.end_time_string" : data[".end_time"],
			"event.user_name" : data[".user_name"],
			"event.people" : data[".event_people"],
			"event.event_video" : data[".event_video"],
			"event.event_pic" : data[".event_pic"],
		// "event.dynasty":data[".place_dynasty"]
		};

		$.post(this.url("save"), event, function(data) {
			try {
				var mess = data.message.split(',');
				if (mess[0] == "success") {
					alert("add event success");
					if (!event_relation_json.addNewEventFlag) {
						event_relation_json.Event_id = mess[1];
						event_relation_json.addNewEventFlag = true;
						event_relation_json.addExistingEventFlag = true;
					} else {
						event_relation_json.relatedEvent_id = mess[1];
						saveRelation(event_relation_json.Event_id,
								event_relation_json.relatedEvent_id,
								event_relation_json.relatedEventtype_id);
					}
				} else {
					alert("sorry,add event error");
				}
			} catch (err) {
				alert("sorry,add event error");
			}
		}, 'json');
	},

	edit : function() {
		var data = {};
		for ( var item in this.attributes) {
			var key = '.' + item;
			data[key] = this.attributes[item];
		}
		var key2 = '.' + "event_id";

		var event = {// 在此处获得
			"event.event_name" : $("#event_name").val(),
			"event.dynasty_id" : $("#dynasty").val(),
			"event.type_id" : $("#event_type").val(),
			"event.influ" : $("#event_infu").val(),
			"event.summary" : $("#event_summary").val(),
			"event.detail_url" : $("#event_detail").val(),
			"event.place_id" : $("#showplace").val(),
			"event.start_time_string" : $("#place_start").val(),
			"event.end_time_string" : $("#place_end").val(),
			"event.user_name" : $("#user_name").html(),
			"event.people" : $("#event_people").val(),
			"event.event_video" : $("#event_video").val(),
			"event.event_pic" : returnEventPicUrl,
			"event.event_id" : data[key2]
		// "event.dynasty":data[".place_dynasty"]
		};
		$.post(this.url("edit"), event, function(data) {
			if (data.message == "success") {
				alert("edit event success");
			} else {
				alert("sorry,edit event error");
			}
		}, 'json');
	}

});
