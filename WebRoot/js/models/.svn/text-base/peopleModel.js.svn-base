
/**
 * models -- interactive data domain specific methods
 */
App.Models.People = Backbone.Model.extend({
	// set default values of the properties
	defaults : {
		people_id : '0',
		people_name : '',
		user_id : '',
		user_name : '',
		people_character : '',
		temple_title : '',
		people_summary : '',
		people_influ : '',
		people_detail_url : '',
		education_id : '',
		start_time : '',
		end_time : '',
		birthplace_id : '',
		dynasty_id : '',
		img_path : '',
		birthplace : '',
		people_detail : '',
		place_id : '',
		type_id : '',
		birthday : '',
		job_id : '',
		dynasty_name : '',
		education_name : '',
		job_name : '',
		deathday : '',
		headpic_path : '',
		rid : ''
	},
	
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
		
		var peopleItem;
		
		if(this.get("people_id") != 0){
			peopleItem = {'people.people_id':this.get('people_id')};
			$.post(this.url('fetch'), peopleItem, function(data) {
				self.set(data.people);
				options.success();
				
			},'json');
		}else{
			if(this.get("people_name") != null && this.get("people_name") != ""){
				peopleItem = {'people.people_name':this.get('people_name')};
				$.post(this.url('fetch'), peopleItem, function(data) {
					self.set(data.people);
					options.success();
					
				},'json');
			}
		}
		
	},
    
    /**
     * 保存数据到后台
     */
	save: function () {
    	var data = {};
    	for (var item in this.attributes) {
			var key = '.'+item;
			data[key] = this.attributes[item];
		}  
    	 
    	var people = {
    			"people.people_name": data[".people_name"],
    			"people.dynasty_id": data[".dynasty_id"],
				"people.people_influ": data[".people_influ"], 
				"people.people_summary": data[".people_summary"],
				"people.people_detail": data[".people_detail"],
				"people.birthplace": data[".birthplace"],
				"people.user_name": data[".user_name"],
				"people.people_character": data[".people_character"],
				"people.temple_title": data[".temple_title"],
				"people.birthday": data[".birthday"],
				"people.deathday": data[".deathday"],
				"people.education_id": data[".education_id"],
				"people.job_id": data[".job_id"],
				"people.headpic_path": data[".headpic_path"]
			};
    	
		$.post(this.url("save"), people, function(data) {
			if(data.message == "success"){
				alert("add people success");
			}else{
				alert("sorry,add people error");
			} 
		},'json');
	}
	
});
