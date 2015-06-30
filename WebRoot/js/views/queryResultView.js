/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.QueryResult = Backbone.View.extend({
	
	classname : 'queryResult_view',
	tagName: 'div',
	tmpl_url : 'js/templates/queryResult_template.html',
	
	initialize: function(options){
		this.options = options;
		this.bind('change', this.render);
		this.model = this.options.model;
		this.collection = this.options.collection;
		
		var self = this;
        $.ajax({
            url: self.tmpl_url,
            method: 'GET',
            async: false,
            dataType: 'html',
            success: function(data) {
               self.template = data;
            }
        });
	},
	render: function(){
		var eventTypeJson= {'queryresult':eval(JSON.stringify(this.collection))};
		$(this.el).html(Mustache.to_html(this.template,eventTypeJson));
		$("#type").html(this.$el);
		
		return this;
	}
});
