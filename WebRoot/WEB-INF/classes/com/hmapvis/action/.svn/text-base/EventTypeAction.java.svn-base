package com.hmapvis.action;

import java.util.List;

import com.hmapvis.bean.EventType;
import com.opensymphony.xwork2.ActionContext;

public class EventTypeAction extends BaseAction {
	private static final long serialVersionUID = 1L;
	private List<EventType> eventTypes;
	private EventType eventType;
	
	public List<EventType> getEventTypes() {
		return eventTypes;
	}

	public void setEventTypes(List<EventType> eventTypes) {
		this.eventTypes = eventTypes;
	}

	public EventType getEventtype() {
		return eventType;
	}

	public void setEventtype(EventType eventType) {
		this.eventType = eventType;
	}

	public String fetch(){
		try{
			eventType = eventtypeService.findByFeildByInt("type_id", eventType.getType_id());
			if(eventType != null){
				return "success";
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	
	public String save(){
		try{
			//update
			if(eventtypeService.dataExistsByInt("type_id", eventType.getType_id())){
				eventtypeService.update(eventType);
			}else{//add
				eventtypeService.add(eventType);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	
	public String fetchAllType(){
		eventTypes =  eventtypeService.findAll();

		return "success";
	}
}
