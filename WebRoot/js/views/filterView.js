/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.Filter = Backbone.View.extend({
	
	classname : 'filter_view',
	tagName: 'div',
	tmpl_url : '',
	
	events: {
		"click #query_submit": "searchPeople",
		"click #query_cancel": "slideBack",
		"change #peopleShowList_2" : "popup"
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
	searchPeople : function() {
		var peoplequ=new App.Collections.Peoplequery();
		peoplequ.fetch({
			success : function() {
				var queryView = new App.Views.QueryResult({collection : peoplequ});
				queryView.trigger('change');
			}
		});
	},
	
	popup : function(){
		var checkedPeople_id;
		var r=document.getElementById("peopleShowList_3").radio;
		if(r!=null){
			var i;
			for(i=0;i<r.length;i++){
	            if(r[i].checked){
	            	checkedPeople_id = r[i].value;            
	            }
			}
		}
		searchPeople(checkedPeople_id);
	},
	
	slideBack : function() {
		$("#leftSideBar").animate({width:0},"slow", function(){
			$("#leftSideBar").css("display","none");
		});
	}
	
});