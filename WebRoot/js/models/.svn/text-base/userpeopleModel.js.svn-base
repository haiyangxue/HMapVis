App.Models.UserPeopleModel = Backbone.Model.extend({
	// set default values of the properties
	defaults : {
		people_id : '0',
		people_name : '',
		birthday :  '',
		deathday : '',
		birthplace : '',
		user_id : '',
		type_id : '',
		place_id : '',
		
		//place_loc;
		
		people_character : '',
		temple_title : '',
		education_id : '',
		people_summary : '',
		people_influ : '',
		people_detail :'',
		//下面这两个需要再研究。
		dynasty_id : '',
		job_id : ''

	},
	//这里的话就是直接采用的是调用的是事件的方法 这样返回的是一个基本的事件
    url: function(suffix) {
    	return 'action/json/people_'+suffix; // get the data url。
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
    	if (attrs.people_id <= 0  ) {
    		return 'people id must be greater than 0';
    	}
    },
    
    /**
     * 从后台获取数据  
     */
    
    fetch: function (options) {
		var self = this;
		
		//这里的话就是将所有的事件都显示出来 所以的话就是不需要建立整个的事件模型  对的  这里的话就是选择的时候没有什么条件的选择
		$.post(this.url('fetch'), {}, function(data) {
			self.set(data.people);
			options.success();
			
		},'json');
	},
    
    /**
     * 保存数据到后台
     */
    save: function () {
    	var data = {};
    	for ( var item in this.attributes) {
			var key = 'people.'+item;
			data[key] = this.attributes[item];
		}
    	
		$.post(this.url('save'), data, function(data) {
			
		},'json');
	}
	
});
