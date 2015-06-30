package com.hmapvis.action;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.hmapvis.bean.Event;
import com.hmapvis.bean.People;
import com.hmapvis.bean.Place;
import com.hmapvis.bean.User;

@Controller
@Scope("prototype")
public class UserAction extends BaseAction{
	private static final long serialVersionUID = 1L;
	public String message;
	public Place getPlace() {
		return place;
	}

	public void setPlace(Place place) {
		this.place = place;
	}


	public User user;
	public Event event;
	public Place place;
	public People people;
	//public List<Event> userEvents;
	//public List<Map> userMaps;
	//public List<People> userPeople;
	
	public People getPeople() {
		return people;
	}

	public void setPeople(People people) {
		this.people = people;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}

	//用户登录
	public String login() {	
		try {
			User user2=userService.findByFeild("user_name", user.getUser_name());
			if(user2 != null){
				String pwd = "";
				for(int i = 0; i < user2.getUser_pass().length(); i++){
					if(!user2.getUser_pass().substring(i, i+1).equals(" ")){
						pwd += user2.getUser_pass().substring(i, i+1);
					}
				}
				if(user.getUser_pass().equals(pwd)){
					message = "success";
				}else{
					message = "fail";
				}
			}else{
				message = "fail";
			}
			
			HttpServletRequest request=ServletActionContext.getRequest();
			HttpSession session =request.getSession();
			session.setAttribute("user_name", user.getUser_name());
			//ActionContext.getContext().put("targetUser", user2);//
			int uid = userService.getUserByName(user.getUser_name()).getUser_id();
			int eventcc = userService.getUserByName(user.getUser_name()).getEvent_count();
			int map_count = userService.getUserByName(user.getUser_name()).getMap_count();
			int people = userService.getUserByName(user.getUser_name()).getPeople_count();
			int place_count = userService.getUserByName(user.getUser_name()).getPlace_count();
		
			session.setAttribute("user_id", uid);
			session.setAttribute("event_count",eventcc);
			session.setAttribute("map_count",map_count);
			session.setAttribute("people_count",people);
			session.setAttribute("place_count",place_count);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return "userLogin";	
	}
	
	public String exit() {
		HttpServletRequest request=ServletActionContext.getRequest();
		HttpSession session =request.getSession();
		session.removeAttribute("user_name");
		session.removeAttribute("user_id");
		message = "success";
		//System.out.println(session.getAttribute("user_name") + "sdfsd");
		return "userExit";	
	}
//用户注册	
	public String register(){
		
		user.setEvent_count(0);
		user.setMap_count(0);
		String receiveName = user.getUser_name();
		String receivePwd = user.getUser_pass();
		
		for(int x = 0; x < receiveName.length(); x++){
			if(receiveName.substring(x, x+1).equals(" ")){
				message = "space";
				return "fail";
			}
		}
		for(int y = 0; y < receivePwd.length(); y++){
			if(receivePwd.substring(y, y+1).equals(" ")){
				message = "space";
				return "fail";
			}
		}
		if(!userService.dataExists("user_name", user.getUser_name())){
			userService.add(user);
			message = "success";
		}else{
			message = "user_exist";
		}
		return "success";
	}
	
	//这个是新添加的方法
	public String fetch(){
		try{
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpSession session = request.getSession();
			String uName = (String) session.getAttribute("user_name");//这个的话是在进行登录的时候已经获取
			user = userService.findByFeild("user_name", uName);
			if(user != null){
				message = "success";
			}
			
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	
	//因为这个添加事件的动作也是在用户自己下面的操作,所以的话就在这个的下面添加动作来执行  分别是更新事件 地点 人物
	//注意这里从前台得到的东西必须和数据库一致
	public String editEvent()
	{
		
		try{
			//存在，只能更新
			if(eventService.dataExistsByInt("event_id", event.getEvent_id())){
				eventService.update(event);
			}//不存在，添加
			else{
				eventService.add(event);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "edit_success";
	}
	//这里的话就是更新place
	public String updateplace()
	{
		
		try{
		    if(placeService.dataExistsByInt("place_id", place.getPlace_id()))
		    {
		    	placeService.update(place);
		    }
			//存在，只能更新
			else{
				placeService.add(place);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	
	public String updatepeople()
	{
		
		try{
		    if(peopleService.dataExistsByInt("people_id", people.getPeople_id()))
		    {
		    	peopleService.update(people);
		    }
			//存在，只能更新
			else{
				peopleService.add(people);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	


}
