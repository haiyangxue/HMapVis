/**
 * views -- render HTML/CSS with JS templating
 */

App.Views.showMapEvent = Backbone.View.extend({

	classname : 'showMapEvent_view',
	tagName : 'div',
	tmpl_url : '',
	events : {
		"click #relevent" : "relevent",
		"click #eventVideo" : "showEventVideo",
		"click #showDetail" : "showEventDetail",
		"click #closePopup" : "closePopup"
	},

	initialize : function(options) {
		this.options = options;
		this.bind('change', this.render);
		this.model = this.options.model;
		this.collection = this.options.collection;

		var self = this;
		$.ajax({
			url : this.options.tmpl_url,
			method : 'GET',
			async : false,
			dataType : 'html',
			success : function(data) {
				self.template = data;
			}
		});
	},
	render : function() {
		$(this.el).html(Mustache.to_html(this.template, this.model.toJSON()));
		$("#Popup" + this.model.attributes.event_id + "_GroupDiv").html(
				this.$el);
		return this;
	},

	relevent : function() {
		if ($("#leftSideBar").css("display") == "none") {
			$("#leftSideBar").css("display", "block");
			$("#leftSideBar").css("width", "0px");
			$("#leftSideBar").css("height", $("body").height() - 52 + "px");
			$("#leftSideBar").animate({
				width : 277
			}, "slow");
		}

		var eventrelation = new App.Collections.EventRelas();
		eventrelation.fetch({
			success : function() {
				var ReEventView = new App.Views.showReEvent({
					collection : eventrelation
				});
				ReEventView.trigger('change');
			},
			event_id1 : this.model.attributes.event_id
		});
	},

	showEventDetail : function(event) {
		$.post('action/json/user_fetch', {}, function(data) {
			if (data.message == "success") {
				editMapEvent($(event.target).attr("event"));
			} else {
				alert("Please Login");
			}
		}, "json");
	},

	closePopup : function(eid) {
		closeEventPopup($(eid.target).attr("eid"));
	},

	showEventVideo : function(eventvideo) {
		if (($(eventvideo.target).attr("eventvideo")) == "") {
			alert("对不起，该事件没有相关视频。");
		} else {
			showEventVideo($(eventvideo.target).attr("eventvideo"));
		}
	}
});
