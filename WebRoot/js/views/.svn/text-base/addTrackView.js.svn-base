/**
 * views -- render HTML/CSS with JS templating
 */
App.Views.AddTrack = Backbone.View.extend({
	initialize: function(options){
		this.options = options;
		this.bind('change', this.render);
		this.model = this.options.model;
		this.collection = this.options.collection;
		this.collection.each(function(data){
			var lonlat=data.get("place_loc").split(",");
			PointsControler.addPoint(lonlat[0], lonlat[1]);
		});
		
	},
	render: function(){},
	
});