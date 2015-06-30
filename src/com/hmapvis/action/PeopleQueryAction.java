package com.hmapvis.action;

import java.util.List;

import com.hmapvis.bean.People;
import com.hmapvis.bean.EventType;
import com.hmapvis.bean.Place;
import com.hmapvis.utils.TimeTrans;
import com.opensymphony.xwork2.ActionContext;

public class PeopleQueryAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	private People people;
	private List<People> peoples;
	
	public People getPeople() {
		return people;
	}

	public void setPeople(People people) {
		this.people = people;
	}

	public List<People> getPeoples() {
		return peoples;
	}

	public void setPeoples(List<People> peoples) {
		this.peoples = peoples;
	}

	public String fetch(){
		try{
			peoples = peopleService.peoplequery(people.getPeople_name(),people.getStart_time(),people.getEnd_time(),people.getDynasty_id()
					,people.getDynasty_name(),people.getJob_id(),people.getJob_name(),people.getEducation_id(),people.getEducation_name());
			if(peoples != null){
				return "success";
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	
	public String fetchPeople(){
		try{
			people = peopleService.findByFeildByInt("people_id", people.getPeople_id());
			if(people != null){
				return "success";
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	
	
	public String fetchAllPeople(){
		peoples =  peopleService.findAll();

		return "success";
	}
}
