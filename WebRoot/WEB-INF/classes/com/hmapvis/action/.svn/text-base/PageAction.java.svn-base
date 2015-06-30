package com.hmapvis.action;

import java.util.LinkedList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.hmapvis.bean.Dynasty;
import com.hmapvis.bean.Education;
import com.hmapvis.bean.Event;
import com.hmapvis.bean.EventType;
import com.hmapvis.bean.Job;
import com.hmapvis.bean.NameVote;
import com.hmapvis.bean.People;
import com.hmapvis.bean.PeopleRelation;
import com.hmapvis.bean.PeopleType;
import com.hmapvis.bean.Place;
import com.hmapvis.bean.RelationType;
import com.hmapvis.bean.User;
import com.opensymphony.xwork2.ActionContext;

/**
 * page skip action
 * @author Huayong
 *
 */
@Controller
@Scope("prototype")
public class PageAction extends BaseAction {

	private static final long serialVersionUID = 1;

	public String goAddEvent(){
		List<Dynasty> dynastys = dynastyService.findAll();
		ActionContext.getContext().put("dynastys", dynastys);
		List<EventType> types = eventtypeService.findAll();
		ActionContext.getContext().put("types", types);
		return "go_addevent";
	}
	public String goAddPeople(){
		List<Dynasty> dynastys = dynastyService.findAll();
		ActionContext.getContext().put("dynastys", dynastys);
		
		List<PeopleType> peopletypes = peopletypeService.findAll();
		ActionContext.getContext().put("types", peopletypes);
		
		List<Job> job = jobService.findAll();
		ActionContext.getContext().put("jobs", job);
		
		List<Education> education = educationService.findAll();
		ActionContext.getContext().put("educations", education);
		
		return "go_addpeople";
	}
	
	public String goEditEvent() {
		List<Dynasty> dynastys = dynastyService.findAll();
		ActionContext.getContext().put("dynastys", dynastys);
		List<EventType> types = eventtypeService.findAll();
		ActionContext.getContext().put("types", types);
		return "go_editevent";
	}

	public String goAddPlace() {
		List<Dynasty> dynastys = dynastyService.findAll();
		ActionContext.getContext().put("dynastys", dynastys);
		return "go_addplace";
	}

	public String goAddMap() {
		List<Dynasty> dynastys = dynastyService.findAll();
		ActionContext.getContext().put("dynastys", dynastys);
		return "go_addmap";
	}

	public String goFilter() {
		try {
			List<EventType> types = eventtypeService.findAll();

			int length = types.size() + 1;
			int nums[] = new int[length];
			for (int x = 0; x < length; x++) {
				nums[x] = 0;
			}
			List<Event> events = eventService.findAll();
			for (int i = 0; i < events.size(); i++) {
				Event event = events.get(i);
				for (int j = 1; j <= length; j++) {
					if (event.getType_id() == j) {
						nums[j]++;
						break;
					}
				}
			}
			ActionContext.getContext().put("types", types);
			for (int y = 0; y < length - 1; y++) {
				ActionContext.getContext().put("evenum" + y, nums[y + 1]);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "go_filter";
	}
	
	public String goUserSideBar(){
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		String uName = (String) session.getAttribute("user_name");
		User user2 = userService.findByFeild("user_name", uName);
		ActionContext.getContext().put("targetUser", user2);
		return "go_usersidebar";
	}
	
	public String goUserManager(){
		return "go_usermanager";
	}
	
	public String goBuildRename(){
		return "go_buildrename";
	}
	
	public String goNameVote() {
		try {
			HttpServletRequest request = ServletActionContext.getRequest();
			int building_id = 0;
			if (request.getParameter("building_id") != null)
				building_id = Integer.parseInt(request
						.getParameter("building_id"));
			List<NameVote> namevotes = nameVoteService.findsetByFeildByInt(
					"building_id", building_id);
			ActionContext.getContext().put("names", namevotes);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "go_namevote";
	}
	
	public String goStuLogin(){
		return "go_stulogin";
	}
	
	public String goRegister(){
		return "go_register";
	}
	
	public String goLogin(){
		return "go_login";
	}
	
	//从init_test.jsp拿到数据，再发给relation.jsp  zzp  **************
	public String goRelation(){
		StringBuffer result=new StringBuffer("[");
		HttpServletRequest request = ServletActionContext.getRequest();
		int people_id=Integer.parseInt(request.getParameter("pid"));//finally  got it!!
	
		People host=peopleService.findByFeildByInt("people_id", people_id);

		List<PeopleRelation>peoplerelationlist = peoplerelationService.findsetByFeildByInt("people_id1",people_id);
		//get the eventlist by the eventidlist
		int relation_count = peoplerelationlist.size();
		if(peoplerelationlist != null && relation_count>0){
			for (int i = 0; i < relation_count; i++) {
				RelationType rt=relationtypeService.findByFeildByInt("relation_id", peoplerelationlist.get(i).getRelation_id());
				
				People people = peopleService.findByFeildByInt("people_id", peoplerelationlist.get(i).getPeople_id2());
				String temp="{source: \""+host.getPeople_name()+"\", target: \""+people.getPeople_name()+
						"\", type: \""+	rt.getRelation_detail()+"\"},";
				result.append(temp);
			}
		}
		
		List<PeopleRelation>peoplerelationlist2 = peoplerelationService.findsetByFeildByInt("people_id2",people_id);
		int relation_count2= peoplerelationlist2.size();
		if(peoplerelationlist2 != null && relation_count2>0){
			for (int i = 0; i < relation_count2; i++) {
				RelationType rt=relationtypeService.findByFeildByInt("relation_id", peoplerelationlist2.get(i).getRelation_id());
				People people = peopleService.findByFeildByInt("people_id", peoplerelationlist2.get(i).getPeople_id1());
				String temp="{source: \""+people.getPeople_name()+"\", target: \""+host.getPeople_name()+
						"\", type: \""+	rt.getRelation_detail()+"\"},";
				result.append(temp);
			}
		}
		
		result.append("]");
		ActionContext.getContext().put("result", result.toString());
		return "go_relation";
	}
	/*
	// get user info
	private String getUserInfo() {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		String uName = (String) session.getAttribute("user_name");
		User user2 = userService.findByFeild("user_name", uName);
		ActionContext.getContext().put("targetUser", user2);
		 
		return "success";
	}
	
	//get three zones
	public String getAllThree(){
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		int uid = Integer.parseInt((String) session.getAttribute("user_id"));
		
		this.getUserEvents(uid);
		this.getUserMaps(uid);
		this.getUserPeople(uid);
		
		return "success";
	}
	
	// get the eventList a specific user uploaded
	public String getUserEvents(int uid) {		
		userEvents = eventService.findListByFeildByInt("user_id", uid);

		if (userEvents != null) {
			ActionContext.getContext().put("userEvents", userEvents);
			message = "success";
		} else {
			message = "fail";
		}

		return "success";
	}

	// get the mapList a specific user uploaded
	public String getUserMaps(int uid) {
		userMaps = mapService.findListByFeildByInt("user_id", uid);

		if (userMaps != null) {
			ActionContext.getContext().put("userMaps", userMaps);
			message = "success";
		} else {
			message = "fail";
		}

		return "success";
	}

	// get the peopleList a specific user uploaded
	public String getUserPeople(int uid) {
		userPeople = peopleService.findListByFeildByInt("user_id", uid);

		if (userPeople != null) {
			ActionContext.getContext().put("userPeople", userPeople);
			message = "success";
		} else {
			message = "fail";
		}

		return "success";
	}
	
	*/
}
