/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.PlaceList = Backbone.View.extend({
	
	classname : 'placeList_view',
	tagName: 'div',
	tmpl_url : '',
	
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
	render: function(){
		var placeJson= {'showplaces':eval(JSON.stringify(this.collection))};
		$(this.el).html(Mustache.to_html(this.template,placeJson));
		$("#pl").html(this.$el);
		
		return this;
	}
});
