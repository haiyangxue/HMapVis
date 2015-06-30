/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.SearchPlaceList = Backbone.View.extend({
	
	classname : 'searchplaces_view',
	tagName: 'div',
	tmpl_url : 'js/templates/searchplaces_template.html',
	
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
		var dynastyJson= {'searchplaces':eval(JSON.stringify(this.collection))};
		$(this.el).html(Mustache.to_html(this.template,dynastyJson));
		$("#placeShowList_1").html(this.$el);
		return this;
	}
});
