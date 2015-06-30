/**
 * router -- methods for routing URL fragments
 */
var Edit_event_id;
var user_image_layer = null;
App.Routers.HMapVis = Backbone.Router
		.extend({
			routes : {
				"hello" : "hello",// 使用#!/hello驱动路由 //纯测试使用
				"" : "home",
				"event/dynasty=:did/name=:en" : "events",
				"showMapEvent/:eid" : "showMapEvent",
				"editMapEvent/:eid" : "editMapEvent",
				"addEvent" : "addEvent",
				"addPlace" : "addPlace",
				"addMap" : "addMap",
				"addPeople" : "addPeople",
				"filter" : "filter",
				"queryEvent" : "queryEvent",
				"showTrack/:people" : "showTrack",
				"dynastyList" : "dynastyList",
				"dynastyList_s/:did" : "dynastyList_s",
				"eventTypeList" : "eventTypeList",
				"eventTypeList_s/:tid" : "eventTypeList_s",
				"jobList" : "jobList",
				"educationList" : "educationList",
				"etsl" : "etsl",
				"showRelations" : "showRelations",
				"userevent" : "userevent",
				"userpeople" : "userpeople",
				"userplace" : "userplace",
				"usercount" : "usercount",
				"editEvent" : "editEvent",
				"editPlace" : "editPlace",
				"usereventshow" : "usereventshow", // 这个的就是在编辑之后显示当前时间 或者地点
													// 或人物所在的界面
				"userplaceshow" : "userplaceshow",
				"userpeopleshow" : "userpeopleshow",
				"showPeople/:peopleName" : "showPeople",
				"dynasty_id_show_place_rout/:did" : "dynasty_id_show_place_rout",
				"heatMap" : "heatMap",
				"searchPlace" : "searchPlace",
				"editMapPlace/:pid" : "editMapPlace",
				"heatMapEvent/:heatmap_place_loc":"heatMapEvent",
				"showEventVideo/:eventvideo" : "showEventVideo",
				"addRelatedEvent" : "addRelatedEvent",
				"hisline_heatmap/:time_range" : "hisLine_HeatMap"
			},

			home : function() {
				
			},

			initialize : function() {
				this.cached = {
					view : undefined,
					model : undefined,
					collection : undefined
				}
			},

			/**
			 * 路由加载事件，传入相应的查询参数
			 */
			showTrack : function(people) {
				var trackTypes = new App.Collections.Track(null, {
					people : people
				});
				trackTypes.fetch({
					success : function() {
						var trackView = new App.Views.AddTrack({
							collection : trackTypes
						});
						trackView.trigger('change');
					}
				});

			},

			events : function(did, en) {
				helloModel.fetch({
					success : function(model) {
						var helloView = new App.Views.Hello({
							model : model
						});
						helloView.trigger('change');
					}
				});
			},

			addEvent : function() {
				var addEventView = null;
				if(document.getElementById("langBtn").innerText == "english"){
					addEventView = new App.Views.AddEvent({
						tmpl_url : 'js/templates/addEvent_template.html'
					});
				}else{
					addEventView = new App.Views.AddEvent({
						tmpl_url : 'js/templates/english/addEvent_template.html'
					});
				}
				addEventView.trigger('change');
			},

			addRelatedEvent: function() {	 
				var addRelatedEventView = null;
				if(document.getElementById("langBtn").innerText == "english"){
					addRelatedEventView = new App.Views.AddRelationEvent({
						tmpl_url : 'js/templates/addRelationEvent_template.html'
					});
				}else{
					addRelatedEventView = new App.Views.AddRelationEvent({
						tmpl_url : 'js/templates/english/addRelationEvent_template.html'
					});
				}
					 	 	
				addRelatedEventView.trigger('change'); 	 	
			},
			
			addPlace : function() {
				var addPlaceView = null;
				if(document.getElementById("langBtn").innerText == "english"){
					addPlaceView = new App.Views.AddPlace({
						tmpl_url : 'js/templates/addPlace_template.html'
					});
				}else{
					addPlaceView = new App.Views.AddPlace({
						tmpl_url : 'js/templates/english/addPlace_template.html'
					});
				}
	
				addPlaceView.trigger('change');
			},

			addMap : function() {
				var addMapView = null;
				if(document.getElementById("langBtn").innerText == "english"){
					addMapView = new App.Views.AddMap({
						tmpl_url : 'js/templates/addMap_template.html'
					});
				}else{
					addMapView = new App.Views.AddMap({
						tmpl_url : 'js/templates/english/addMap_template.html'
					});
				}

				addMapView.trigger('change');
			},

			addPeople : function() {
				var addPeopleView = null;
				if(document.getElementById("langBtn").innerText == "english"){
					addPeopleView = new App.Views.AddPeople({
						tmpl_url : 'js/templates/addPeople_template.html'
					});
				}else{
					addPeopleView = new App.Views.AddPeople({
						tmpl_url : 'js/templates/english/addPeople_template.html'
					});
				}

				addPeopleView.trigger('change');
			},
			// 这个是新添加的部分
			userevent : function() {
				var userEvent = new App.Collections.UserEvent();
				userEvent.fetch({
					success : function(page_count, event_count) {
						var userEventview = null;
						if(document.getElementById("langBtn").innerText == "english"){
							userEventview = new App.Views.UserEventView({
								collection : userEvent,
								tmpl_url : 'js/templates/UserEvent_template.html'
							});
						}else{
							userEventview = new App.Views.UserEventView({
								collection : userEvent,
								tmpl_url : 'js/templates/english/UserEvent_template.html'
							});
						}
						userEventview.trigger('change');
						userEventview.buttonShow(page_count, event_count);
					}
				});

			},
			usereventshow : function() {
				var userEvent = new App.Collections.UserEvent();
				userEvent.show({
					success : function(page_count, event_count) {
						var userEventview = null;
						if(document.getElementById("langBtn").innerText == "english"){
							userEventview = new App.Views.UserEventView({
								collection : userEvent,
								tmpl_url : 'js/templates/UserEvent_template.html'
							});
						}else{
							userEventview = new App.Views.UserEventView({
								collection : userEvent,
								tmpl_url : 'js/templates/english/UserEvent_template.html'
							});
						}
						userEventview.trigger('change');
						userEventview.buttonShow(page_count, event_count);
					}
				});

			},

			userplace : function() {
				var userPlace = new App.Collections.UserPlace();
				userPlace.fetch({
					success : function(page_count, place_count) {
						var userPalceView = null;
						if(document.getElementById("langBtn").innerText == "english"){
							userPalceView = new App.Views.UserPlaceView({
								collection : userPlace,
								tmpl_url : 'js/templates/UserPlace_template.html'
							});
						}else{
							userPalceView = new App.Views.UserPlaceView({
								collection : userPlace,
								tmpl_url : 'js/templates/english/UserPlace_template.html'
							});
						}
							
						userPalceView.trigger('change');
						userPalceView.buttonShow(page_count, place_count);
					}
				});

			},
			userplaceshow : function() {
				var userPlace = new App.Collections.UserPlace();
				userPlace.show({
					success : function(page_count, place_count) {
						var userPalceView = null;
						if(document.getElementById("langBtn").innerText == "english"){
							userPalceView = new App.Views.UserPlaceView({
								collection : userPlace,
								tmpl_url : 'js/templates/UserPlace_template.html'
							});
						}else{
							userPalceView = new App.Views.UserPlaceView({
								collection : userPlace,
								tmpl_url : 'js/templates/english/UserPlace_template.html'
							});
						}
						userPalceView.trigger('change');
						userPalceView.buttonShow(page_count, place_count);
					}
				});

			},
			userpeople : function() {
				var userPeople = new App.Collections.UserPeople();
				userPeople.fetch({
					success : function(page_count, people_count) {
						var userPeopleview = null;
						if(document.getElementById("langBtn").innerText == "english"){
							userPeopleview = new App.Views.UserPeopleView({
								collection : userPeople,
								tmpl_url : 'js/templates/UserPeople_template.html'
							});
						}else{
							userPeopleview = new App.Views.UserPeopleView({
								collection : userPeople,
								tmpl_url : 'js/templates/english/UserPeople_template.html'
							});
						}
						
						userPeopleview.trigger('change');
						userPeopleview.buttonShow(page_count, people_count);
					}
				});

			},

			userpeopleshow : function() {
				var userPeople = new App.Collections.UserPeople();
				userPeople.show({
					success : function(page_count, people_count) {
						var userPeopleview = null;
						if(document.getElementById("langBtn").innerText == "english"){
							userPeopleview = new App.Views.UserPeopleView({
								collection : userPeople,
								tmpl_url : 'js/templates/UserPeople_template.html'
							});
						}else{
							userPeopleview = new App.Views.UserPeopleView({
								collection : userPeople,
								tmpl_url : 'js/templates/english/UserPeople_template.html'
							});
						}
						UserPeopleView.trigger('change');
						UserPeopleView.buttonShow(page_count, people_count);
					}
				});

			},
			// usercount函数用来加载用户名、上传事件数、人物数、地点数 新添加的部分
			usercount : function() {
				var user = new App.Models.UserModel();
				user.fetch({
					success : function() {
						var userview = null;
						if(document.getElementById("langBtn").innerText == "english"){
							userview = new App.Views.User({
								model : user,
								tmpl_url : 'js/templates/user_template.html'
							});
						}else{
							userview = new App.Views.User({
								model : user,
								tmpl_url : 'js/templates/english/user_template.html'
							});
						}
						
						userview.trigger('change');
					}
				});
			},
			// 跳转编辑用户事件的驱动函数 这个是新添加的部分
			editEvent : function() {
				var editEventView = null;
				if(document.getElementById("langBtn").innerText == "english"){
					editEventView = new App.Views.EditEvent({
						tmpl_url : 'js/templates/editEvent_template.html'
					});
				}else{
					editEventView = new App.Views.EditEvent({
						tmpl_url : 'js/templates/english/editEvent_template.html'
					});
				}

				editEventView.trigger('change');
			},
			// 跳转编辑用户地点的驱动函数 这个是新添加的部分
			editPlace : function() {
				var editPlaceView = null;
				if(document.getElementById("langBtn").innerText == "english"){
					editPlaceView = new App.Views.EditPlace({
						tmpl_url : 'js/templates/editPlace_template.html'
					});
				}else{
					editPlaceView = new App.Views.EditPlace({
						tmpl_url : 'js/templates/english/editPlace_template.html'
					});
				}

				editPlaceView.trigger('change');
			},
			// 跳转编辑用户人物的驱动函数 这个是新添加的部分
			eiditPeople : function() {
				var editPeopleView = null;
				if(document.getElementById("langBtn").innerText == "english"){
					editPeopleView = new App.Views.EditPeople({
						tmpl_url : 'js/templates/editPeople_template.html'
					});
				}else{
					editPeopleView = new App.Views.EditPeople({
						tmpl_url : 'js/templates/english/editPeople_template.html'
					});
				}

				editPeopleView.trigger('change');
			},

			eventTypeList : function() {
				var eventTypes = new App.Collections.EventTypes();
				eventTypes.fetch({
					success : function() {
						var eventTypeListView = null;
						if(document.getElementById("langBtn").innerText == "english"){
							eventTypeListView = new App.Views.EventTypeList({
								collection : eventTypes,
								tmpl_url : 'js/templates/eventTypes_template.html'
							});
						}else{
							eventTypeListView = new App.Views.EventTypeList({
								collection : eventTypes,
								tmpl_url : 'js/templates/english/eventTypes_template.html'
							});
						}
						
						eventTypeListView.trigger('change');
					}
				});
			},
			eventTypeList_s : function(tid) {
				var eventTypes = new App.Collections.EventTypes();
				eventTypes.fetch({
					success : function() {
						var eventTypeListView = null;
						if(document.getElementById("langBtn").innerText == "english"){
							eventTypeListView = new App.Views.EventTypeList({
								collection : eventTypes,
								tmpl_url : 'js/templates/eventTypes_template.html'
							});
						}else{
							eventTypeListView = new App.Views.EventTypeList({
								collection : eventTypes,
								tmpl_url : 'js/templates/english/eventTypes_template.html'
							});
						}
						
						eventTypeListView.trigger('change');

						var type = document.getElementById("event_type");

						for ( var i = 0; i < dy.options.length; i++) {
							if (type.options[i].value == tid)
								type.options[i].selected = true;
						}
					}
				});
			},
			dynastyList : function() {
				var dynasties = new App.Collections.Dynasties();
				dynasties.fetch({
					success : function() {
						var dynastyListView = null;
						if(document.getElementById("langBtn").innerText == "english"){
							dynastyListView = new App.Views.DynastyList({
								collection : dynasties,
								tmpl_url : 'js/templates/dynasties_template.html'
							});
						}else{
							dynastyListView = new App.Views.DynastyList({
								collection : dynasties,
								tmpl_url : 'js/templates/english/dynasties_template.html'
							});
						}
						
						dynastyListView.trigger('change');
					}
				});
			},
			dynastyList_s : function(did) {
				var dynasties = new App.Collections.Dynasties();
				dynasties.fetch({
					success : function() {
						var dynastyListView = null;
						if(document.getElementById("langBtn").innerText == "english"){
							dynastyListView = new App.Views.DynastyList({
								collection : dynasties,
								tmpl_url : 'js/templates/dynasties_template.html'
							});
						}else{
							dynastyListView = new App.Views.DynastyList({
								collection : dynasties,
								tmpl_url : 'js/templates/english/dynasties_template.html'
							});
						}
						dynastyListView.trigger('change');
						var dy = document.getElementById("dynasty");

						for ( var i = 0; i < dy.options.length; i++) {
							if (dy.options[i].value == did)
								dy.options[i].selected = true;
						}

					}
				});
			},
			jobList : function() {
				var jobs = new App.Collections.Jobs();
				jobs.fetch({
					success : function() {
						var jobListView = null;
						if(document.getElementById("langBtn").innerText == "english"){
							jobListView = new App.Views.JobList({
								collection : jobs,
								tmpl_url : 'js/templates/jobs_template.html'
							});
						}else{
							jobListView = new App.Views.JobList({
								collection : jobs,
								tmpl_url : 'js/templates/english/jobs_template.html'
							});
						}
						
						jobListView.trigger('change');
					}
				});

			},

			educationList : function() {
				var educations = new App.Collections.Educations();
				educations.fetch({
					success : function() {
						var educationListView = null;
						if(document.getElementById("langBtn").innerText == "english"){
							educationListView = new App.Views.EducationList({
								collection : educations,
								tmpl_url : 'js/templates/educations_template.html'
							});
						}else{
							educationListView = new App.Views.EducationList({
								collection : educations,
								tmpl_url : 'js/templates/english/educations_template.html'
							});
						}
						
						educationListView.trigger('change');
					}
				});

			},

			filter : function() {
				var filterview = null;
				if(document.getElementById("langBtn").innerText == "english"){
					filterview = new App.Views.Filter({
						tmpl_url : 'js/templates/filter_template.html'
					});
				}else{
					filterview = new App.Views.Filter({
						tmpl_url : 'js/templates/english/filter_template.html'
					});
				}
				
				filterview.trigger('change');
			},

			queryEvent : function() {
				var queryEventview = null;
				if(document.getElementById("langBtn").innerText == "english"){
					queryEventview = new App.Views.QueryEvent({
						tmpl_url : 'js/templates/queryEvent_template.html'
					});
				}else{
					queryEventview = new App.Views.QueryEvent({
						tmpl_url : 'js/templates/english/queryEvent_template.html'
					});
				}
				
				queryEventview.trigger('change');
			},

			heatMapEvent : function(heatmap_place_loc){
				var heatMapEventView = null;
				if(document.getElementById("langBtn").innerText == "english"){
					heatMapEventView = new App.Views.HeatMapEventView({
						tmpl_url : 'js/templates/heatMapEvent_template.html'
					});
				}else{
					heatMapEventView = new App.Views.HeatMapEventView({
						tmpl_url : 'js/templates/english/heatMapEvent_template.html'
					});
				}

				heatMapEventView.trigger('change');
				var heatmapevents  = new App.Collections.HeatMapEvents();
				
				heatmapevents.fetch({
					success : function() {
						var resultListView = null;
						if(document.getElementById("langBtn").innerText == "english"){
							resultListView = new App.Views.ResultList({
								collection : heatmapevents,
								tmpl_url : 'js/templates/resultList_template.html'
							});
						}else{
							resultListView = new App.Views.ResultList({
								collection : heatmapevents,
								tmpl_url : 'js/templates/english/resultList_template.html'
							});
						}

						resultListView.trigger('change');
					},
					place_loc:heatmap_place_loc
				});
			},
			
			etsl : function() {
				var eventTypes = new App.Collections.EventTypes();
				eventTypes.fetch({
					success : function() {
						var etslView = null;
						if(document.getElementById("langBtn").innerText == "english"){
							etslView = new App.Views.EventTypeShowList({
								collection : eventTypes,
								tmpl_url : 'js/templates/eventTypesShow_template.html'
							});
						}else{
							etslView = new App.Views.EventTypeShowList({
								collection : eventTypes,
								tmpl_url : 'js/templates/english/eventTypesShow_template.html'
							});
						}
						
						etslView.trigger('change');
					}
				});
			},

			showRelations : function() {
				var relatedPeople = new App.Collections.People();
				relatedPeople.fetch({
					success : function() {
						var relationView = new App.Views.Relation({
							collection : relatedPeople
						});
						relationView.trigger('change');
					},
					people_name : "李白"
				});
			},

			hello : function() {

				var event = new App.Models.Event({
					event_id : 5
				});

				// 如果cache中有需要的数据，就从cache中取出
				// event_id key cache
				// 如果没有就从数据库中取，如下：
				event.fetch({
					success : function() {
						var helloView = new App.Views.Event({
							model : event
						});
						helloView.trigger('change');
					}
				});

			},

			showPeople : function(peopleid) {
				var showPeo = new App.Models.Peoplequery({
					people_id : peopleid
				});
				showPeo.fetch({
					success : function() {
						var lenP = map.popups.length;
						for ( var i = lenP - 1; i >= 0; i--) {
							map.removePopup(map.popups[i]);
							map.removeLayer(markers);
						}
						if (user_image_layer != null) {
							map.removeLayer(user_image_layer);// 删除之前图层
						}

						addPopupPeople(showPeo.attributes.people_id, 120, 40);

						var showPeopleView = null;
						if(document.getElementById("langBtn").innerText == "english"){
							showPeopleView = new App.Views.showPeopleView({
								model : showPeo,
								tmpl_url : 'js/templates/showpeople_template.html'
							});
						}else{
							showPeopleView = new App.Views.showPeopleView({
								model : showPeo,
								tmpl_url : 'js/templates/english/showpeople_template.html'
							});
						}
						
						showPeopleView.trigger('change');
						popup.show();
						markers.display(true);
					}
				})
			},

			showMapEvent : function(eid) {
				var showEvent = new App.Models.Event({
					event_id : eid
				});
				var dynasty_id = 0;
				showEvent
						.fetch({
							success : function() {
								var Lonlat = changeLonlat(showEvent.attributes.place_loc);

								// 获取事件的王朝id;
								dynasty_id = showEvent.attributes.dynasty_id;
								var Mapp = new App.Models.Map({
									dynasty_id : dynasty_id
								});
								var url_path;
								var boundsArr;
								var image_bounds;

								Mapp.fetch({
											success : function() {
												// 获取map路径
												url_path = Mapp.attributes.tile_path;
												if (url_path != "") {
													// 获取地图边界经纬度
													boundsArr = Mapp.attributes.map_bounds.split(",", 4);

													image_bounds = new OpenLayers.Bounds(
															boundsArr[0],
															boundsArr[1],
															boundsArr[2],
															boundsArr[3]);

													if (user_image_layer != null) {
														map.removeLayer(user_image_layer);// 删除之前图层
													}

													user_image_layer = new OpenLayers.Layer.Image(
															"test",
															url_path,
															image_bounds,
															new OpenLayers.Size(
																	50, 50),
															{
																isBaseLayer : false,
																opacity : 1
															});

													map.addLayer(user_image_layer);

													addPopup(showEvent.attributes.event_id,Lonlat[0],Lonlat[1]);
													var showEventView = null;
													if(document.getElementById("langBtn").innerText == "english"){
														showEventView = new App.Views.showMapEvent({
															model : showEvent,
															tmpl_url : 'js/templates/map/showMapEvent_template.html'
														});
													}else{
														showEventView = new App.Views.showMapEvent({
															model : showEvent,
															tmpl_url : 'js/templates/english/showMapEvent_template.html'
														});
													}
													
													showEventView.trigger('change');
													popup.show();
													markers.display(true);
												}
											}
										});

								// 热度图
								var heatMap = new App.Models.HeatMap(
										{
											dynasty_id : showEvent.attributes.dynasty_id
										});
								heatMap.fetch({
									success : function() {
										var max = heatMap.get('max');
										var datas = heatMap.get('data');

										drawHeatMap(max, datas);
									}
								});
							}
						});
			},
			editMapEvent : function(eid) {
				var editEvent = new App.Models.Event({
					event_id : eid
				});
				editEvent.fetch({
					success : function() {
						var editEventView = null;
						if(document.getElementById("langBtn").innerText == "english"){
							editEventView = new App.Views.editMapEvent({
								model : editEvent,
								tmpl_url : 'js/templates/editMapEvent_template.html'
							});
						}else{
							editEventView = new App.Views.editMapEvent({
								model : editEvent,
								tmpl_url : 'js/templates/english/editMapEvent_template.html'
							});
						}
						
						editEventView.trigger('change');
						$('#dynasty').value = editEvent.get('dynasty_id');
						Edit_event_id = editEvent.get('event_id');// 为后台能够用到
					}
				});
			},

			dynasty_id_show_place_rout : function(did) {
				var showplaces = new App.Collections.Places();
				showplaces.fetch({
					success : function() {
						var placeShowListView = null;
						if(document.getElementById("langBtn").innerText == "english"){
							placeShowListView = new App.Views.PlaceList({
								collection : showplaces,
								tmpl_url : 'js/templates/places_template.html'
							});
						}else{
							placeShowListView = new App.Views.PlaceList({
								collection : showplaces,
								tmpl_url : 'js/templates/english/places_template.html'
							});
						}
						
						placeShowListView.trigger('change');
					},
					dynasty_id : did
				});
			},

			searchPlace : function() {
				var searchPlaceView = null;
				if(document.getElementById("langBtn").innerText == "english"){
					searchPlaceView = new App.Views.SearchPlace({
						tmpl_url : 'js/templates/searchPlace_template.html'
					});
				}else{
					searchPlaceView = new App.Views.SearchPlace({
						tmpl_url : 'js/templates/english/searchPlace_template.html'
					});
				}
				searchPlaceView.trigger('change');
			},

			editMapPlace : function(pid) {
				var editPlace = new App.Models.Place({
					place_id : pid
				});
				editPlace.fetch({
					success : function() {
						var editPlaceView = null;
						if(document.getElementById("langBtn").innerText == "english"){
							editPlaceView = new App.Views.editMapPlace({
								model : editPlace,
								tmpl_url : 'js/templates/editMapPlace_template.html'
							});
						}else{
							editPlaceView = new App.Views.editMapPlace({
								model : editPlace,
								tmpl_url : 'js/templates/english/editMapPlace_template.html'
							});
						}
						
						editPlaceView.trigger('change');
					}
				});
			},
			
			showEventVideo : function(eventvideo) {
				var event = new App.Models.Event({
					event_video : eventvideo
				});
				var showEventVideo = null;
				if(document.getElementById("langBtn").innerText == "english"){
					showEventVideo = new App.Views.ShowEventVideo({
						model : event,
						tmpl_url : 'js/templates/showEventVideo_template.html'
					});
				}else{
					showEventVideo = new App.Views.ShowEventVideo({
						model : event,
						tmpl_url : 'js/templates/english/showEventVideo_template.html'
					});
				}
				
				showEventVideo.trigger('change');
			},
			hisLine_HeatMap : function(time_range){ 
				// 热度图
				var heatMap = new App.Models.HeatMap(
					{
						start_year : time_range.split(",")[0],
						end_year : time_range.split(",")[1]
					});
				heatMap.fetchByYear({
					success : function() {
						var max = heatMap.get('max');
						var datas = heatMap.get('data');

						drawHeatMap(max, datas);
					}
				});
			}
		});