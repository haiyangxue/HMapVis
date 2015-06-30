
/**
 * models -- interactive data domain specific methods
 */
App.Models.Place = Backbone.Model.extend({
	// set default values of the properties
	defaults : {
		place_id: '0',
		place_name: '',
		now_name: '',
		start_time: '',
		end_time: '',
		dynasty_id: '',
		place_loc: '',
		user_id: '',
		dynasty_name : '',
		start_date : '',
		end_date: ''

	},
    url: function(suffix) {
    	return 'action/json/place_'+suffix; // get the data url。
    },
    
    initialize: function() {
    	// 绑定错误的监听，validate会调用此方法，也可以在每个设置前进行绑定
		this.bind('invalid', function(model, error,arg) {
			alert(error);
		});
    },
    
    /**
     * 用来判断传入参数的正确性，传入参数设置第三个为{validate:true}
     * 那么每次设置set时将调用该方法进行校验，校验未通过将不进行后续设置，而直接返回
     * @param attrs
     * @returns {String}
     */
    validate: function(attrs) {
    	if (attrs.place_id <= 0  ) {
    		return 'place id must be greater than 0';
    	}
    },
    
    /**
     * 从后台获取数据
     */
    fetch: function (options) {
		var self = this;
		
		$.post(this.url('fetch'), {'place.place_id':this.get('place_id')}, function(data) {
			self.set(data.place);
			options.success();
			
		},'json');
	},
    
    /**
     * 保存数据到后台
     */
    save: function () {
    	var data = {};
    	for ( var item in this.attributes) {
			var key = 'place.'+item;
			data[key] = this.attributes[item];
		}
    	
		$.post(this.url('save'), data, function(data) {
		 	if(data.message == "success")
		 		alert("add place success");
		 	else
		 		alert("add place failed");
		},'json');
	},
	
	edit: function () {
    	var data = {};
    	for (var item in this.attributes) {
			var key = '.'+item;
			data[key] = this.attributes[item];
		} 
    	var key2='.' + "place_id";
    	 
    	var place = {//在此处获得
    			"place.place_name": $("#place_name").val(),
    			"place.now_name": $("#now_name").val(),
    			"place.place_loc": $("#place_loc").val(),
    			"place.dynasty_id": $("#dynasty").val(),
				"event.user_name":  $("#user_name").html(),
				"place.place_id": data[key2]
			};
		$.post(this.url("edit"), place, function(data) {
			if(data.message == "success"){
				alert("edit place success");
			}else{
				alert("sorry,edit place error");
			} 
		},'json');
	}
});
