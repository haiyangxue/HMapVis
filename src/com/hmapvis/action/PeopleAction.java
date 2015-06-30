package com.hmapvis.action;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.hibernate.mapping.Array;

import com.hmapvis.bean.Dynasty;
import com.hmapvis.bean.Education;
import com.hmapvis.bean.Event;
import com.hmapvis.bean.EventType;
import com.hmapvis.bean.Job;
import com.hmapvis.bean.People;
import com.hmapvis.bean.PeopleEvent;
import com.hmapvis.bean.PeopleRelation;
import com.hmapvis.bean.PeopleType;
import com.hmapvis.bean.Place;
import com.hmapvis.bean.RelationType;
import com.hmapvis.bean.User;
import com.hmapvis.utils.TimeTrans;

public class PeopleAction extends BaseAction{
	private static final long serialVersionUID = 1L;
	
	public List<People> peoplelist;
	public List<PeopleEvent> peopleeventlist;
	public List<Place> placelist;
	public List<PeopleType> peopletypelist;
	public List<PeopleRelation> peoplerelationlist;//
	public List<RelationType> relationtypelist;//
	public List<List<Integer>> relatedPeopleId;
	public List<Integer> rid;
	public List<People> relatedPeople;
	public List<EventType> eventtypelist;
	public List<Event> eventlist;
	
	public String message;
	public int peopletypeid;
	public People people;
	public String people_name;
	
	
	public List<People> getPeoplelist() {
		return peoplelist;
	}
	public void setPeoplelist(List<People> peoplelist) {
		this.peoplelist = peoplelist;
	}
	public List<PeopleRelation> getPeoplerelationlist() {
		return peoplerelationlist;
	}
	public void setPeoplerelationlist(List<PeopleRelation> peoplerelationlist) {
		this.peoplerelationlist = peoplerelationlist;
	}
	public List<RelationType> getRelationtypelist() {
		return relationtypelist;
	}
	public void setRelationtypelist(List<RelationType> relationtypelist) {
		this.relationtypelist = relationtypelist;
	}
	public List<PeopleEvent> getPeopleeventlist() {
		return peopleeventlist;
	}
	public void setPeopleeventlist(List<PeopleEvent> peopleeventlist) {
		this.peopleeventlist = peopleeventlist;
	}
	public List<Place> getPlacelist() {
		return placelist;
	}
	public void setPlacelist(List<Place> placelist) {
		this.placelist = placelist;
	}
	public List<PeopleType> getPeopletypelist() {
		return peopletypelist;
	}
	public void setPeopletypelist(List<PeopleType> peopletypelist) {
		this.peopletypelist = peopletypelist;
	}
	public List<EventType> getEventtypelist() {
		return eventtypelist;
	}
	public void setEventtypelist(List<EventType> eventtypelist) {
		this.eventtypelist = eventtypelist;
	}
	public List<Event> getEventlist() {
		return eventlist;
	}
	public void setEventlist(List<Event> eventlist) {
		this.eventlist = eventlist;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public int getPeopletypeid() {
		return peopletypeid;
	}
	public void setPeopletypeid(int peopletypeid) {
		this.peopletypeid = peopletypeid;
	}
	public People getPeople() {
		return people;
	}
	public void setPeople(People people) {
		this.people = people;
	}
	public List<List<Integer>> getRelatedPeopleId() {
		return relatedPeopleId;
	}
	public void setRelatedPeopleId(List<List<Integer>> relatedPeopleId) {
		this.relatedPeopleId = relatedPeopleId;
	}
	public List<Integer> getRid() {
		return rid;
	}
	public void setRid(List<Integer> rid) {
		this.rid = rid;
	}
	public List<People> getRelatedPeople() {
		return relatedPeople;
	}
	public void setRelatedPeople(List<People> relatedPeople) {
		this.relatedPeople = relatedPeople;
	}
	public String getPeople_name() {
		return people_name;
	}
	public void setPeople_name(String people_name) {
		this.people_name = people_name;
	}
	//add people
	public String addPeople(){
		if(!peopleService.dataExists("people_name", people.getPeople_name())){
			peopleService.add(people);
			message = "addpeople_success";
		}else{
			message = "people_exist";
		}
		return "addpeople_success";
	}
	
	public String queryAll()
	{
		peoplelist = peopleService.findAll();
		if (peoplelist!=null){
			message = "success";			
		}else{
			message = "error";
		}
		return "success";
	}
	public String queryByType(){
		peoplelist = peopleService.findsetByFeildByInt("type_id", people.getType_id());
		peopletypelist=peopletypeService.findsetByFeildByInt("type_id", people.getType_id());
		placelist = new LinkedList<Place>();
		//get the eventlist by the eventidlist
		int people_count = peoplelist.size();
		if(peoplelist != null && people_count>0){
			for (int i = 0; i < people_count; i++) {
				 Place place = placeService.findByFeildByInt("place_id", peoplelist.get(i).getPlace_id());
				if(place != null){
					placelist.add(place);
					
				}
			}
		}
		if (peoplelist!=null)
			return "success";
		else
			return "fail";
	
	}
	//query by people Id
	public String queryEventByPeopleId(){//input the people_id, got the events and the corresponding event types he involves 
		
		//got the event id list
		peopleeventlist = peopleeventService.findsetByFeildByInt("people_id", people.getPeople_id());
		eventtypelist = eventtypeService.findAll();
		List<Event> tmplist = new LinkedList<Event>();
		placelist = new LinkedList<Place>();
		//get the eventlist by the eventidlist
		int event_count = peopleeventlist.size();
		if(peopleeventlist != null && event_count>0){
			for (int i = 0; i < event_count; i++) {
				 Event event = eventService.findByFeildByInt("event_id", peopleeventlist.get(i).getEvent_id());
				if(event != null){
					int place_id = event.getPlace_id();
					Place place = placeService.findByFeildByInt("place_id", place_id);
					placelist.add(place);
					String place_name = place.getPlace_name();
					String now_name = place.getNow_name();
					event.setPlace_name(place_name);
					event.setNow_name(now_name);
					
					int type_id = event.getType_id();
					EventType eventtype = eventtypeService.findByFeildByInt("type_id", type_id);
					String type_name = eventtype.getType_name();
					event.setType_name(type_name);
					
					event.setStart_date(TimeTrans.transMillisToDate(event.getStart_time()));
					event.setEnd_date(TimeTrans.transMillisToDate(event.getEnd_time()));
					tmplist.add(event);
				}
			}
			eventlist = tmplist;
		}
		if (eventlist!=null)
			return "success";
		else
			return "fail";
	
		}
		
	/*
	public String queryPeopleByPeopleId()//query by people Id
	{//input the people_id, got the people related to him and the corresponding people types he involves 
		
		//got the peoplerelation list 
		peoplerelationlist = peoplerelationService.findsetByFeildByInt("people_id1", people.getPeople_id());
				
		System.out.println("zzp relation"+peoplerelationlist.size());
		peopletypelist = peopletypeService.findAll();
		placelist = new LinkedList<Place>();
		List<People> tmplistPeople = new LinkedList<People>();
		List<RelationType> tmplistRelation_detail = new LinkedList<RelationType>();
		//get the eventlist by the eventidlist
		int relation_count = peoplerelationlist.size();
		System.out.println(relation_count);
		if(peoplerelationlist != null && relation_count>0){
			for (int i = 0; i < relation_count; i++) {
				RelationType rt=relationtypeService.findByFeildByInt("relation_id", peoplerelationlist.get(i).getRelation_id());
				tmplistRelation_detail.add(rt);
				People people = peopleService.findByFeildByInt("people_id", peoplerelationlist.get(i).getPeople_id2());
				if(people != null){
					int place_id = people.getPlace_id();
					Place place = placeService.findByFeildByInt("place_id", place_id);
					placelist.add(place);
					String place_name = place.getPlace_name();
					String now_name = place.getNow_name();
					
					
					tmplistPeople.add(people);
				}
			}
			peoplelist = tmplistPeople;
			relationtypelist=tmplistRelation_detail;
		}
		if (peoplelist!=null)
			return "success";
		else
			return "fail";
	
		}
	*/
	
	
	
	//添加的部分
	public String fetch(){
		try{
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpSession session = request.getSession();
			String uName = (String) session.getAttribute("user_name");//这个的话是在进行登录的时候已经获取
			User user = userService.findByFeild("user_name", uName);
			if(people.getPeople_name()!=null){
				People peopleTarget = peopleService.findByFeild("people_name", people.getPeople_name());
				if(peopleTarget != null){
					people.setPeople_id(peopleTarget.getPeople_id());
					people.setPeople_name(peopleTarget.getPeople_name());
				}
			}else{
				People peopleTarget = peopleService.findByFeildByInt("people_id", people.getPeople_id());
				if(peopleTarget != null){
					people.setPeople_id(peopleTarget.getPeople_id());
					people.setPeople_name(peopleTarget.getPeople_name());
					people.setUser_id(user.getUser_id());
					people.setDeathday(peopleTarget.getDeathday());
					people.setBirthplace(peopleTarget.getBirthplace());
					people.setPeople_character(peopleTarget.getPeople_character());
					people.setTemple_title(peopleTarget.getTemple_title());
					people.setPeople_summary(peopleTarget.getPeople_summary());
					people.setPeople_influ(peopleTarget.getPeople_influ());
					people.setPeople_detail_url(peopleTarget.getPeople_detail_url());
					people.setDynasty_id(peopleTarget.getDynasty_id());
					people.setEducation_id(peopleTarget.getEducation_id());
					people.setJob_id(peopleTarget.getJob_id());
					
					int dynasty_id = peopleTarget.getDynasty_id();
					Dynasty dynasty = dynastyService.findByFeildByInt("dynasty_id", dynasty_id);
					String dynasty_name = dynasty.getDynasty_name();
					people.setDynasty_name(dynasty_name);
					
					int education_id = peopleTarget.getEducation_id();
					Education education = educationService.findByFeildByInt("education_id", education_id);
					String education_name  = education.getEducation_name();
					people.setEducation_name(education_name);
					
					int job_id = peopleTarget.getJob_id();
					Job job = jobService.findByFeildByInt("job_id", job_id);
					String job_name = job.getJob_name();
					people.setJob_name(job_name);
				}
			}
			
//			if(peopleTarget != null){
				//int people_id = people.getPeople_id();
				//People people = peopleService.findByFeildByInt("people_id", people_id);
//				String people_name = peopleTarget.getPeople_name();
//				String birthday = peopleTarget.getBirthday();
//				String deathday = peopleTarget.getDeathday();
//				String birthplace = peopleTarget.getBirthplace();
//				String people_character = peopleTarget.getPeople_character();
//				String temple_title = peopleTarget.getTemple_title();
//				String people_summary = peopleTarget.getPeople_summary();
//				String people_influ = peopleTarget.getPeople_influ();
//				String people_detail_url = peopleTarget.getPeople_detail_url();
//				
//				people.setUser_id(user.getUser_id());
//				people.setPeople_name(people_name);
//				people.setBirthday(birthday);
//				people.setDeathday(deathday);
//				people.setBirthplace(birthplace);
//				people.setPeople_character(people_character);
//				people.setTemple_title(temple_title);
//				people.setPeople_summary(people_summary);
//				people.setPeople_influ(people_influ);
//				people.setPeople_detail_url(people_detail_url);
//				
//				
//				int dynasty_id = people.getDynasty_id();
//				Dynasty dynasty = dynastyService.findByFeildByInt("dynasty_id", dynasty_id);
//				String dynasty_name = dynasty.getDynasty_name();
//				people.setDynasty_name(dynasty_name);
//				
//				int education_id = people.getEducation_id();
//				Education education = educationService.findByFeildByInt("education_id", education_id);
//				String education_name = education.getEducation_name();
//				people.setEducation_name(education_name);
//				
//				int job_id = people.getJob_id();
//				Job job = jobService.findByFeildByInt("job_id", job_id);
//				String job_name = job.getJob_name();
//				people.setJob_name(job_name);
//				people.setPeople_id(peopleTarget.getPeople_id());
//				people.setPeople_name(peopleTarget.getPeople_name());
//				System.out.println("people id & name:");
//				System.out.println(people.getPeople_id() + " **** " + people.getPeople_name());
//			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	
	/**
	 * add & update
	 * @return
	 */
	public String save(){
		try{
			//存在，只能更新
			if(peopleService.dataExists("people_name", people.getPeople_name())){
				//eventService.update(people);
			}else{//不存在，添加 
				HttpServletRequest request=ServletActionContext.getRequest();
				HttpSession session =request.getSession();
				int uuid = (Integer)session.getAttribute("user_id");
				people.setUser_id(uuid);

				peopleService.variouspeople(people.getPeople_name(), people.getPeople_character(), 
						people.getTemple_title(), people.getPeople_summary(), people.getPeople_influ(), 
						people.getEducation_id(), people.getDynasty_id(), people.getBirthplace(), people.getPeople_detail(),  
						people.getBirthday(), people.getDeathday(), people.getJob_id(), people.getUser_id());
				
				message = "success";
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	
	public String fetchPeopleInRelation(){
		System.out.println(")))))))))))))))))))))))))))");
		System.out.println(people_name);
		People corePeople = peopleService.findByFeild("people_name", people_name);
		int corePeople_id = corePeople.getPeople_id();
		System.out.println(corePeople_id);
		
		relatedPeopleId = peoplerelationService.fetchRelatedPeopleId(corePeople_id);
		List<Integer> rpid = new ArrayList<Integer>();
		rid = new ArrayList<Integer>();
		for(int i = 0; i < relatedPeopleId.size(); i++){
			List<Integer> rpidAndrid = relatedPeopleId.get(i);
			rpid.add(rpidAndrid.get(0));
			rid.add(rpidAndrid.get(1));
		} 
		relatedPeople = peopleService.fetchRelatedPeopleList(rpid);
		
		return "success";
	}
}
