/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.ShowEventVideo = Backbone.View.extend({
	
	classname : 'showMapEvent_view',
	tagName: 'div',
	tmpl_url : '',
	
	events: {
		"click #query_cancel": "slideBack"
	},
	
	initialize: function(options){
		this.options = options;
		this.bind('change', this.render);
		this.model = this.options.model;
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
		var nullJson = {"nj":""};
		$(this.el).html(Mustache.to_html(this.template,nullJson) );
		var event_video = this.model.get("event_video");
		$("#leftSideBar").html(this.$el);
		var src = event_video.replace(/@/g, "/");//将原本为避免歧义的/被替换成@的字符替换回来
		 var html = '<EMBED src="' + src + '" width="480" height="400" type="application/x-shockwave-flash">'+'</EMBED>';
		 $("#rl").html(html);
		return this;
	},
	
	//listeners in the page
	searchEvent : function() {
		var eventlist=new App.Collections.QueryEvents();
		eventlist.fetch({
			success : function(){
//				alert("查找成功！");
				var result_list = new App.Views.ResultList({collection : eventlist});
				result_list.trigger('change');
			}
		});
	},
	
	slideBack : function() {
		$("#leftSideBar").animate({width:0},"slow", function(){
			$("#leftSideBar").css("display","none");
		});
	},
	
	dynasty_id_show_place : function(){
		var dynasty_id = $("#dynasty").val();
		App.data.mainRouter.navigate("dynasty_id_show_place_rout/"+dynasty_id ,  {trigger: true, replace: true});
	},
	
	another_place : function(){ 
		if($("#showplace").val()==-1){
			alert("The place you want not exists, you can add it in 'add place', or it will insert as 'unknown'");
		}
	}
});