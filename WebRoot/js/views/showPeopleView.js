/**
 * views -- render HTML/CSS with JS templating
 */
 
App.Views.showPeopleView = Backbone.View.extend({
	
	classname : 'showPeople_view',
	tagName: 'div',
	tmpl_url : '',
	events:{
		"click #showDetail": "showPeopleDetail",
		"click #closePopup": "closePopup"
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
	render: function(){
		$(this.el).html(Mustache.to_html(this.template,this.model.toJSON()) );
		$("#Popup"+this.model.attributes.people_id+"_GroupDiv").html(this.$el);
		return this;
	},
	
	showPeopleDetail: function(people){
		
	slideBar(8,($(people.target).attr("people")));
			
	},

	
	closePopup: function(pid){
		closePeoplePopup($(pid.target).attr("pid"));
	}
});
