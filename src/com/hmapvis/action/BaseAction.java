package com.hmapvis.action;

import javax.annotation.Resource;

import com.hmapvis.service.AdminService;
import com.hmapvis.service.BuildingService;
import com.hmapvis.service.DynastyService;
import com.hmapvis.service.EducationService;
import com.hmapvis.service.EventRelaService;
import com.hmapvis.service.EventService;
import com.hmapvis.service.EventTypeService;
import com.hmapvis.service.HeatMapService;
import com.hmapvis.service.JobService;
import com.hmapvis.service.MapService;
import com.hmapvis.service.NameVoteService;
import com.hmapvis.service.PeopleEventService;
import com.hmapvis.service.PeopleJobService;
import com.hmapvis.service.PeopleRelationService;
import com.hmapvis.service.PeopleService;
import com.hmapvis.service.PeopleTypeService;
import com.hmapvis.service.PlaceService;
import com.hmapvis.service.RelationTypeService;
import com.hmapvis.service.SearchplaceService;
import com.hmapvis.service.ShowplaceService;
import com.hmapvis.service.TrackService;
import com.hmapvis.service.UserService;
import com.hmapvis.service.VoteRecordService;
import com.opensymphony.xwork2.ActionSupport;


/**
 * 公共Action类，为其子类提供所有公共数据
 */
public class BaseAction extends ActionSupport{
	
 private static final long serialVersionUID = -420261110426663091L;

 //提供所有的业务Service

 @Resource protected UserService userService;
 @Resource protected AdminService adminService;
 @Resource protected EventService eventService;
 @Resource protected EventTypeService eventtypeService;
 @Resource protected PlaceService placeService;
 @Resource protected DynastyService dynastyService;
 @Resource protected ShowplaceService showplaceService; 
 @Resource protected SearchplaceService searchplaceService;
 @Resource protected MapService mapService;
 @Resource protected NameVoteService nameVoteService;
 @Resource protected BuildingService buildingService;
 @Resource protected VoteRecordService voterecordService;
 @Resource protected TrackService trackService; 
 
 @Resource protected PeopleService peopleService;
 @Resource protected PeopleJobService peoplejobService;
 @Resource protected PeopleTypeService peopletypeService;
 @Resource protected PeopleEventService peopleeventService;
 @Resource protected PeopleRelationService peoplerelationService;
 @Resource protected RelationTypeService relationtypeService;
 @Resource protected JobService jobService;
 @Resource protected EducationService educationService;
 @Resource protected EventRelaService eventrelaService;
 @Resource protected HeatMapService  heatmapService;//
 //提供通用的分页变量
	protected int pageCurrent = 1;
	
	//--------getters and setters--------------------------
	
	public int getPageCurrent() {
		return pageCurrent;
	}
	public void setPageCurrent(int pageCurrent) {
		this.pageCurrent = pageCurrent;
	}
}
