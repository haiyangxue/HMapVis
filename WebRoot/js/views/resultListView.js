/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.ResultList = Backbone.View.extend({
	
	classname : 'resultList_view',
	tagName: 'div',
	tmpl_url : '',
	events: {
		"change #show_rl" : "showEventOnMap",
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
		var eventJson= {'eventlist':eval(JSON.stringify(this.collection))};
		$(this.el).html(Mustache.to_html(this.template,eventJson));
		$("#rl").html(this.$el);
		
		return this;
	},
	
	showEventOnMap : function(){
		var checkedEvent_id;
		var r=document.getElementById("eventShowList").radio;
		if(r!=null){
			if(r.length!=undefined){
				var i;
				for(i=0; i<r.length; i++){
					if(r[i].checked){
						checkedEvent_id = r[i].value;            
					}
				}
			}
			else{
				checkedEvent_id=r.value;
			}
		}
		if(event_relation_json.addExistingEventFlag){
			 event_relation_json.relatedEvent_id=checkedEvent_id;
			 showAndhide("box2");
		}
		else{
			showMapEvent(checkedEvent_id);
		}
	}
});
