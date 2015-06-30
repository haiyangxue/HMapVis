/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.showMapPlace = Backbone.View.extend({
	
	classname : 'showMapPlace_view',
	tagName: 'div',
	tmpl_url : 'js/templates/showMapPlace_template.html',
	events:{
		"click #showDetail": "showPlaceDetail",
		"click #closePopup": "closePopup"
	},
	
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
		$(this.el).html(Mustache.to_html(this.template,this.model.toJSON()) );
		$("#Popup"+this.model.attributes.place_id+"_GroupDiv").html(this.$el);
		return this;
	},
	
	showPlaceDetail: function(place){
		$.post('action/json/user_fetch', {}, function(data) { 
			if(data.message=="success"){
				for(var obj in $(place.target))
				editMapPlace($(place.target).attr("place"));
			}
			else{
				alert("Please Login");
			}
		},"json");
	},

	
	closePopup: function(pid){
		closeEventPopup($(pid.target).attr("pid"));
	}
});
