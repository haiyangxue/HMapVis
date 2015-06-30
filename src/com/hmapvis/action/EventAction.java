package com.hmapvis.action;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.hmapvis.bean.Event;
import com.hmapvis.bean.EventType;
import com.hmapvis.bean.Place;
import com.hmapvis.bean.User;
import com.hmapvis.utils.TimeTrans;
public class EventAction extends BaseAction{
	private static final long serialVersionUID = 1L;
	
//	public List<Event> eventlist;
//	public List<Event> eventlistBack;
//	public List<Place> placelist;
//	public List<EventType> typelist;
	//public int event_id;
	public String message;
	
//	public int eventTypeId;
	
	public Event event;
	
//	public int getEvent_id() {
//		return event_id;
//	}
//	public void setEvent_id(int event_id) {
//		this.event_id = event_id;
//	}
	
//	public List<Event> getEventlistBack() {
//		return eventlistBack;
//	}
//	public void setEventlistBack(List<Event> eventlistBack) {
//		this.eventlistBack = eventlistBack;
//	}
//	public List<Place> getPlacelist() {
//		return placelist;
//	}
//	public void setPlacelist(List<Place> placelist) {
//		this.placelist = placelist;
//	}
//	
//	public List<EventType> getTypelist() {
//		return typelist;
//	}
//	
//	public void setTypelist(List<EventType> typelist) {
//		this.typelist = typelist;
//	}
//	
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
//	public int getEventTypeId() {
//		return eventTypeId;
//	}
//	public void setEventTypeId(int eventTypeId) {
//		this.eventTypeId = eventTypeId;
//	}
	
	public Event getEvent() {
		return event;
	}
	public void setEvent(Event event) {
		this.event = event;
	}
	
	
//	public List<Event> getEventlist() {
//		return eventlist;
//	}
//	public void setEventlist(List<Event> eventlist) {
//		this.eventlist = eventlist;
//	}
//	
//	//add event
//	public String addEvent()
//	{	
//		
//		if(!eventService.dataExists("event_name", event.getEvent_name())){
//			eventService.add(event);
//			message = "addevent_success";
//		}else{
//			message = "event_exist";
//		}
//		return "addevent_success";
//	}
//	//update event
//	public String updateEvent()
//	{
//		if(eventService.dataExistsByInt("event_name", event.getEvent_id())){
//			eventService.update(event);
//			message="updateevent_success";
//		}
//		else message = "event_empty";
//		return "updateevent_success";
//	}
	
	//find event by its id
	public String fetch(){
		try{
		//这里添加修改的部分   后面加注释的都是自己加上去的
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpSession session = request.getSession();
			String uName = (String) session.getAttribute("user_name");//这个的话是在进行登录的时候已经获取
			User user = userService.findByFeild("user_name", uName);
			event = eventService.findByFeildByInt("event_id", event.getEvent_id());
			if(event != null){
				int place_id = event.getPlace_id();
				Place place = placeService.findByFeildByInt("place_id", place_id);
				String place_name = place.getPlace_name();
				String now_name = place.getNow_name();
				String place_loc = place.getPlace_loc();
				event.setPlace_name(place_name);
				event.setNow_name(now_name);
				event.setNow_name(now_name);
				event.setPlace_loc(place_loc);
				event.setUser_id(user.getUser_id());//这样的话就是得到了它的用户ID   
				
				int type_id = event.getType_id();
				EventType eventtype = eventtypeService.findByFeildByInt("type_id", type_id);
				String type_name = eventtype.getType_name();
				event.setType_name(type_name);
				
				event.setStart_date(TimeTrans.transMillisToDate(event.getStart_time()));
				event.setEnd_date(TimeTrans.transMillisToDate(event.getEnd_time()));
			}
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
			if(eventService.dataExistsByInt("event_id", event.getEvent_id())){
				eventService.update(event);
			}else{//不存在，添加  
				 
				HttpServletRequest request=ServletActionContext.getRequest();
				HttpSession session =request.getSession();
				int uuid = (Integer)session.getAttribute("user_id");
				event.setUser_id(uuid);
				
				event=(Event)eventService.variousevent(event.getEvent_name(),event.getUser_id(), event.getDynasty_id(),
						event.getType_id(), event.getInflu(),event.getSummary(),event.getDetail_url(), 
						event.getPlace_id(),  event.getStart_time_string(), event.getEnd_time_string(),0,event.getPeople(), event.getEvent_video(),event.getEvent_pic());
				
				message = "success,"+event.getEvent_id();
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	/**
	 * add & update
	 * @return
	 */
	public String edit(){//修改事件，增加到event record  更新event
		try{
				HttpServletRequest request=ServletActionContext.getRequest();
				HttpSession session =request.getSession();
				int uuid = (Integer)session.getAttribute("user_id");
				event.setUser_id(uuid);
				System.out.println("edit in event Action"+event.getInflu());
				
				eventService.editevent(event.getEvent_name(),event.getUser_id(), event.getDynasty_id(),
						event.getType_id(), event.getInflu(),event.getSummary(),event.getDetail_url(), 
						event.getPlace_id(),  event.getStart_time_string(), event.getEnd_time_string(),0,
						event.getPeople(),event.getEvent_id(),event.getEvent_video(),event.getEvent_pic());
				
				message = "success";
		
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	//find event by its name
//	public List<Event> querybyname()
//	{
//		eventlist=eventService.findsetByFeild("event_name", event.getEvent_name());
//		
//		if (eventlist!=null)
//			return eventlist;
//		else
//			return null;
//	}
//	//find event by its dynasty name
//	public String queryByDynasty()
//	{
//		typelist = eventtypeService.findAll();
//		eventlist = eventService.findsetByFeildByInt("dynasty_id", event.getDynasty_id());
//		
//		List<Event> tmplist = new LinkedList<Event>();
//		placelist = new LinkedList<Place>();
//		
//		int event_count = eventlist.size();
//		if(eventlist != null && event_count>0){
//			for (int i = 0; i < event_count; i++) {
//				int placeid = eventlist.get(i).getPlace_id();
//				Place place = null;
//				if(placeid != 0) {//没有地点
//					place = placeService.findById(placeid);
//					if(!place.getPlace_loc().equals("NotFound")){
//						placelist.add(place);
//						
//						eventlist.get(i).setPlace_name(place.getPlace_name());
//						eventlist.get(i).setNow_name(place.getNow_name());
//						
//						tmplist.add(eventlist.get(i));
//						eventlist.get(i).setStart_date(TimeTrans.transMillisToDate(eventlist.get(i).getStart_time()));
//						eventlist.get(i).setEnd_date(TimeTrans.transMillisToDate(eventlist.get(i).getEnd_time()));
//					}else{
//						System.out.println("");
//					}
//				}
//			}
//			eventlist = tmplist;
//		}
//		if (eventlist!=null)
//			return "success";
//		else
//			return "fail";
//	}
//	
//	//find event by its type
//	public String querybytype()
//	{
//		eventlist = eventService.findsetByFeildByInt("type_id", eventTypeId);
//		if (eventlist!=null){
//			return "success";
//		}else{
//			return "fail";
//		}
//	}	
//	//find event by its associated people
//	public String querybypeople(String input)
//	{
//		
//		eventlist = eventService.query_vague("people", input);
//		if(eventlist!=null)
//			return "success";
//		else
//			return "fail";
//	}
//	//find event by its dynasty name and type
//	public String querybydynastyandtype(int dynasty_id,int type_id){
//		eventlist = eventService.findByTwoFeildByInt("dynasty_id", dynasty_id, "type_id", type_id);
//		if(eventlist!=null)
//			return "success";
//		else 
//			return "fail";
//	}
//	
//	//event search
//	public String searchevent(){
//		try{
//			System.out.println(event.getType_id());
//			System.out.println(event.getEvent_name());
//			System.out.println(event.getStart_date());
//			eventlistBack = new ArrayList<Event>();
//			String eventPerhapsDate = "";
//			long eventPerhapsTime = 0;
//			if(!event.getStart_date().equals("") && event.getStart_date() != null){
//				eventPerhapsDate = event.getStart_date();
//				eventPerhapsTime = TimeTrans.transDateToMillis(eventPerhapsDate+":00");
//			}
//			
//			if(event.getEvent_name().equals("") && event.getType_id() != -1){
//				eventlist = eventService.findListByFeildByInt("type_id", event.getType_id());
//			}else if(!event.getEvent_name().equals("") && event.getType_id() == -1){
//				eventlist = eventService.findsetByFeild("event_name", event.getEvent_name());
//			}else if(!event.getEvent_name().equals("") && event.getType_id() != -1){
//				eventlist = eventService.findByTwoFeild("type_id", event.getType_id(), "event_name", event.getEvent_name());
//			}else{
//				if(eventPerhapsTime != 0){
//					eventlist = eventService.findByTime(eventPerhapsTime, "start_time", "end_time");
//				}else{
//					message = "error";
//				}
//			}
//			if(eventlist != null){
//				message = "success";
//				for(int i = 0; i < eventlist.size(); i++){
//					Event eve = eventlist.get(i);
//					long event_start = eve.getStart_time();
//					long event_end = eve.getEnd_time();
//					if(eventPerhapsTime != 0 && eventPerhapsTime > event_start && eventPerhapsTime < event_end){
//						eventlistBack.add(eve);
//					}else if(eventPerhapsTime == 0){
//						eventlistBack.add(eve);
//					}
//				}
//			}else{
//				message = "error";
//			}
//		}catch(Exception e){
//			e.printStackTrace();
//		}
//		
//		return "success";
//	}
}
