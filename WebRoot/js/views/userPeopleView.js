/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.UserPeopleView = Backbone.View.extend({
	
	classname : 'UserPeopleView_view',
	tagName: 'div',
	tmpl_url : '',
	
	events: {
         "click #next": "PeopleNextPage",
		 "click #prev": "PeoplePrevPage",
		 "click #tagA": "EditPage",
		 
         "mouseover  #next": "mouseoverDown",//这个的话就是对于鼠标事件的监听  这个的话就是需要的是采用的是ID绑定   记住关键点  是ID绑定！！！
         "mouseout  #next": "mouseoutDown",
         "mouseover  #prev": "mouseoverUp",
         "mouseout  #prev": "mouseoutUp",
	},
	
	initialize: function(options){
		this.options = options;
		this.bind('change', this.render);
		this.model = this.options.model;
		this.collection = this.options.collection;
		var self = this;
        $.ajax({
            url: this.options.tmpl_url,
            method: 'GET',
            async: false,
            dataType: 'html',
            success: function(data) {
               self.template = data;
            }
        });
		
	},
	render: function(){ // render方法，目标只有两个：填充this.el，返回this以便链式操作。
		var peoplesList= {'peoples':eval(JSON.stringify(this.collection))};//这里的话就是调用的是后台list集合 peoples
		$(this.el).html(Mustache.to_html(this.template,peoplesList));  
//	   $("#userPeopleView").html(this.$el); 
		
		$("#rightSideBar").html(this.$el);
		return this;
	},
	
	PeoplePrevPage : function() {
		var userpeoples = new App.Collections.UserPeople();
		var self = this;
		userpeoples.prev({
			success : function(page_count, people_count) {
				self.initialize({collection : userpeoples});
				self.render();
				self.delegateEvents();
//				var max_page_count = Math.ceil(people_count/5);
				$("#current_page").html(page_count);
				$("#total_page").html(Math.ceil(people_count/5));
				$("#prev").show();
				if(page_count == 1){
					$("#prev").hide();
				}
				if(page_count < Math.ceil(people_count/5)){
					$("#next").show();
				}
			}  
		}); 
	},
	
	//listeners in the page
	PeopleNextPage : function() {
		var userpeoples = new App.Collections.UserPeople();
		var self = this;
		userpeoples.next({
			success : function(page_count, people_count) {
				self.initialize({collection : userpeoples});
				self.render();
				self.delegateEvents();
//				var max_page_count = Math.ceil(people_count/5);
				$("#current_page").html(page_count);
				$("#total_page").html(Math.ceil(people_count/5));
				if(page_count > 1){
					$("#prev").show();
				}
				if(page_count == Math.ceil(people_count/5)){
					$("#next").hide();
				}
			}  
		}); 
	},
	
	//判断第一页next按钮是否显示，显示当前页、总页数
	buttonShow : function(page_count, people_count){
//		var max_page_count = Math.ceil(people_count/5);
		$("#current_page").html(page_count);
		$("#total_page").html(Math.ceil(people_count/5));
		if(page_count != 1){
			$("#prev").show();
		}
		if(page_count == Math.ceil(people_count/5)){
			$("#next").hide();
		}
	},


	
	EditPage : function(people) {
	//具体参数是编辑人物事件的sign		
			var parm1="8"; 
			var parm2=$(people.target).attr("people_id");
		
		var myurl="index.jsp"+"?"+"parm1="+parm1+"&parm2="+parm2; 
            
			window.location.assign(myurl); 
	
			
		},
	
	mouseoverDown : function() {
		document.nex.src="css/images/down2.png";
	},
	mouseoutDown : function() {
		document.nex.src="css/images/down1.png";
	},
	
	
	mouseoverUp : function() {
		document.pre.src="css/images/up2.png";
	},
	
	mouseoutUp : function() {
		document.pre.src="css/images/up1.png";
	},
	
});