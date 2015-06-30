/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.User = Backbone.View.extend({
	
	classname : 'User_view',
	tagName: 'div',
	tmpl_url : '',
	
	
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
		$(this.el).html(Mustache.to_html(this.template,this.model.toJSON()) );
		$("#userdata").html(this.$el);
		return this;
	},
});