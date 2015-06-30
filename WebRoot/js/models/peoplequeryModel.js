
/**
 * models -- interactive data domain specific methods
 */
App.Models.Peoplequery = Backbone.Model.extend({
	// set default values of the properties
	defaults : {
		people_id : '0',
		people_name : '其他',
		education_id : '0',
		start_time : '',
		end_time : '',
		dynasty_id : '0',
		job_id : '0',
		dynasty_name : '',
		education_name : '',
		job_name : ''
	},
    url: function(suffix) {
    	return 'action/json/peoplequery_'+suffix; // get the data url。
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
		
		var peopleItem;
		
		if(this.get("people_id") != 0){
			peopleItem = {'people.people_id':this.get('people_id')};
			$.post(this.url('fetchPeople'), peopleItem, function(data) {
				self.set(data.people);
				options.success();
				
			},'json');
		}else{
			if(this.get("people_name") != null && this.get("people_name") != ""){
				peopleItem = {'people.people_name':this.get('people_name')};
				$.post(this.url('fetchPeople'), peopleItem, function(data) {
					self.set(data.people);
					options.success();
					
				},'json');
			}
		}
		
	}
    
   
	
	
});
