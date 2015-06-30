/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.HeatMapEventView = Backbone.View.extend({
	
	classname : 'heatMapEvent_view',
	tagName: 'div',
	tmpl_url : '',
	
	events: {
		"click #query_cancel": "slideBack"
	},
	
	initialize: function(options){
		this.options = options;
		this.bind('change', this.render);
		
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
		$("#leftSideBar").html(this.$el);
		return this;
	},
	
	//listeners in the page
	searchEvent : function() {
		//alert("你点击了“查找”！");
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