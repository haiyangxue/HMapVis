/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.EventTypeShowList = Backbone.View.extend({
	
	classname : 'eventTypeShowList_view',
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
		var eventTypeJson= {'eventTypes':eval(JSON.stringify(this.collection))};
		$(this.el).html(Mustache.to_html(this.template,eventTypeJson));
		$("#type").html(this.$el);
		
		return this;
	}
});
