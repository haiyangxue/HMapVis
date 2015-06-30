package com.hmapvis.action;
import java.util.List;

import javax.persistence.Transient;

import com.hmapvis.bean.EventRela;
public class EventRelaAction extends BaseAction{
	private static final long serialVersionUID = 1L;


	private EventRela eventrela;
	private List<EventRela> eventrelas;
	private String relation_name;
	private String event_name;
	public String message;

	public EventRela getEventrela() {
		return eventrela;
	}

	public void setEventrela(EventRela eventrela) {
		this.eventrela = eventrela;
	}

	public List<EventRela> getEventrelas() {
		return eventrelas;
	}

	public void setEventrelas(List<EventRela> eventrelas) {
		this.eventrelas = eventrelas;
	}
	
	public String getEvent_name() {
		return event_name;
	}
	public void setEvent_name(String event_name) {
		this.event_name = event_name;
	}
	
	
	public String getRelation_name() {
		return relation_name;
	}
	public void setRelation_name(String relation_name) {
		this.relation_name = relation_name;
	}

	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	

	public String fetch(){
//		try{
//			eventrelas = eventrelaService.eventrelation(eventrela.getEvent_id1());
//			if(eventrelas != null){
//				return "success";
//			}
//		}catch(Exception e){
//			e.printStackTrace();
//		}
		return "success";
	}
	
	public String save(){
		try{
			eventrelaService.saveeventrelation(eventrela.getEvent_id1(),eventrela.getEvent_id2(),eventrela.getRelation_id());
			message = "success";
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
		
	
	public String fetchAllevent(){
		try{
			eventrelas = eventrelaService.eventrelation(eventrela.getEvent_id1());
			if(eventrelas != null){
				return "success";
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
}
