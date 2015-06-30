package com.hmapvis.action;

import java.util.AbstractMap.SimpleEntry;
import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;

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
import com.hmapvis.bean.People;
import com.hmapvis.bean.Place;
import com.hmapvis.bean.User;
import com.hmapvis.utils.TimeTrans;
import com.opensymphony.xwork2.ActionContext;

@Controller
@Scope("prototype")
public class UserDataAction extends BaseAction{
	
	private static int page_num = 5; //the num of every page
	private static final long serialVersionUID = 1L;
	public List<Event> events;
	public List<Place> places;
	public List<People> peoples;
	
	private int page_count = 0;
	private int max_page_count = 0;
	public String message;
	public long event_count;  //这个是自己新声明的属性
	public long people_count; 
	public long place_count;
	
	public long getPlace_count() {
		return place_count;
	}
	public void setPlace_count(long place_count) {
		this.place_count = place_count;
	}
	public long getPeople_count(){
		return people_count;
	}
	public void setPeople_count(long people_count) {
		this.people_count = people_count;
	}
	public List<Event> getEvents() {
		return events;
	}
	public List<Place> getPlaces(){
		return places;
	}
    public List<People> getPeoples(){
    	return peoples;
    }
	public int getPage_count() {  
		return page_count;
	}

	public void setPage_count(int page_count) {
		this.page_count = page_count;
	}

	public void setEvents(List<Event> events) {
		this.events = events;
	}
	public void setPlaces(List<Place> places) {
		this.places = places;
	}
    public void setPeoples(List<People> peoples) {
    	this.peoples = peoples;
    }
	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getMax_page_count() {
		return max_page_count;
	}

	public void setMax_page_count(int max_page_count) {
		this.max_page_count = max_page_count;
	}
	
	public long getEvent_count() {
		return event_count;
	}

	public void setEvent_count(long event_count) {
		this.event_count = event_count;
	}
    
	//事件的整合部分
	
	public void EventPage(int user_id,int page){
		try{
			List<String> wheres = new ArrayList<String>();
			List<Object> whereParams = new ArrayList<Object>();
			if(user_id > 0){ //指定查询条件 这里我们通过user_id 来得到所有的事件
				wheres.add("o.user_id=?");
				whereParams.add(user_id);
			}
			
			//order by
			List<Entry<String, String>> orders = new ArrayList<Entry<String, String>>();
			
			orders.add(new SimpleEntry("o.event_id", "asc"));//按照升序
			events =  eventService.findByPage(page, page_num, wheres, whereParams,orders).getRecords();
			for(int i = 0; i < events.size(); i++){
				int place_id = events.get(i).getPlace_id();
		        Place place = placeService.findByFeildByInt("place_id", place_id);//这里的就是进行了搜索
				String place_name = place.getPlace_name();
				String now_name = place.getNow_name();
				events.get(i).setPlace_name(place_name);
				events.get(i).setNow_name(now_name);
				
				int type_id = events.get(i).getType_id();
				EventType eventtype = eventtypeService.findByFeildByInt("type_id", type_id);
				String type_name = eventtype.getType_name();
				events.get(i).setType_name(type_name);
				
				events.get(i).setStart_date(TimeTrans.transMillisToDate(events.get(i).getStart_time()));
				events.get(i).setEnd_date(TimeTrans.transMillisToDate(events.get(i).getEnd_time()));
			}
			message = "success";
			event_count = eventService.getCountByInt("user_id", user_id);//这里的话就是得到了最终的这个用户的事件的数目;
			
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}
	
    //用户事件翻页部分
	public String goUserEventPage() {
		try {
			
			HttpServletRequest request=ServletActionContext.getRequest();
			HttpSession session = request.getSession();
			String uName = (String) session.getAttribute("user_name");//这个的话就在进行登录的时候已经获取
			User user = userService.findByFeild("user_name", uName);
		    int  user_id = user.getUser_id();//这个声明的作用是为了实现最后按照ID来搜索事件总数
			//int user_id = 1;  这样避免了就是点击事件只是取到的是id为1的所有事件
			int page = 1;
			page_count = page;
			session.setAttribute("user_eventpage", page);
			/**
			 * store event type, place name, now name, start date and end date
			 */
			EventPage(user_id,page);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "go_usereventpage";
	}
	
	
	//新添加的部分  这个功能是为了当编辑事件之后显示的是该事件所在的界面
	public String goUserNowEventPage() {
		try {
			
			HttpServletRequest request=ServletActionContext.getRequest();
			HttpSession session = request.getSession();
			String uName = (String) session.getAttribute("user_name");//这个的话就在进行登录的时候已经获取
			User user = userService.findByFeild("user_name", uName);
			 int  user_id = user.getUser_id();
			//int user_id = 1;  这样避免了就是点击事件只是取到的是id为1的所有事件
			int page = 0;
			if(session.getAttribute("user_eventpage") != null)
				page = (Integer)session.getAttribute("user_eventpage");
			page_count = page;
			session.setAttribute("user_eventpage", page);
			/**
			 * store event type, place name, now name, start date and end date
			 */
			
			EventPage(user_id,page);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "go_usernoweventpage";
	}
	
	

	public String goNextEventPage() {
		try {
			HttpServletRequest request=ServletActionContext.getRequest();
			HttpSession session =request.getSession();
			String uName = (String) session.getAttribute("user_name");//这个的话是在进行登录的时候已经获取
			User user = userService.findByFeild("user_name", uName);
			int  user_id = user.getUser_id();
			int page = 0;
			if(session.getAttribute("user_eventpage") != null)
				page = (Integer)session.getAttribute("user_eventpage");
			page++;
			session.setAttribute("user_eventpage", page);
			page_count = page;
			
			int totalEventNum = eventService.findAll().size();
			max_page_count = (int)Math.ceil(totalEventNum/page_num);
			
			EventPage(user_id,page);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "go_nexteventpage";
	}
	
	public String goPrevEventPage() {
		try {
			HttpServletRequest request=ServletActionContext.getRequest();
			HttpSession session =request.getSession();
			String uName = (String) session.getAttribute("user_name");//这个的话是不是在进行登录的时候已经获取
			User user = userService.findByFeild("user_name", uName);
			int  user_id = user.getUser_id();
			int page = 0;
			if(session.getAttribute("user_eventpage") != null)
				page = (Integer)session.getAttribute("user_eventpage");
			page--;
			page_count = page;
			session.setAttribute("user_eventpage", page);
			EventPage(user_id,page);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "go_preveventpage";
	}
	
	
	
	//地点goUserPlacePage
	
	    //整合部分
	    public void PlacePage(int user_id,int page)
	    {
	    	
	    	try{
	    		
	    		List<String> wheres = new ArrayList<String>();
				List<Object> whereParams = new ArrayList<Object>();
				if(user_id > 0){ 
					wheres.add("o.user_id=?");
					whereParams.add(user_id);
				}
				
				//order by
				List<Entry<String, String>> orders = new ArrayList<Entry<String, String>>();
				
				orders.add(new SimpleEntry("o.place_id", "asc"));
				
				places =  placeService.findByPage(page, page_num, wheres, whereParams,orders).getRecords();
				for(int i = 0; i < places.size(); i++){
					int place_id = places.get(i).getPlace_id();
					Place place = placeService.findByFeildByInt("place_id", place_id);
					String place_name = place.getPlace_name();
					String now_name = place.getNow_name();
					places.get(i).setPlace_name(place_name);
					places.get(i).setNow_name(now_name);
					
					String place_loc = place.getPlace_loc();
					places.get(i).setPlace_loc(place_loc);
					int dynasty_id = places.get(i).getDynasty_id();
					Dynasty dynasty = dynastyService.findByFeildByInt("dynasty_id", dynasty_id);
//					String dynasty_name = dynasty.getDynasty_name();
//					places.get(i).setDynasty_name(dynasty_name);
					
					places.get(i).setStart_date(TimeTrans.transMillisToDate(places.get(i).getStart_time()));
					places.get(i).setEnd_date(TimeTrans.transMillisToDate(places.get(i).getEnd_time()));
				}
				 place_count = placeService.getCountByInt("user_id",user_id);
				 message = "success";
	    		
	    	}
	    	catch (Exception e)
	    	{
	    		e.printStackTrace();
	    	}
	    	
	    }
		public String goUserPlacePage() {
			try {
				
				HttpServletRequest request=ServletActionContext.getRequest();
				HttpSession session = request.getSession();
				String uName = (String) session.getAttribute("user_name");
				User user = userService.findByFeild("user_name", uName);
				int user_id = user.getUser_id();
				int page = 1;
				page_count = page;
				session.setAttribute("user_placepage", page);
				/**
				 * store event type, place name, now name, start date and end date
				 */
				
				PlacePage(user_id,page);
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			return "go_userplacepage";
		} 
		
	//地点goUserNowPlacePage
		public String goUserNowPlacePage() {
				try {
					
					HttpServletRequest request=ServletActionContext.getRequest();
					HttpSession session = request.getSession();
					String uName = (String) session.getAttribute("user_name");//这个的话就在进行登录的时候已经获取
					User user = userService.findByFeild("user_name", uName);
					int user_id = user.getUser_id();
					//int user_id = 1;  这样避免了就是点击事件只是取到的是id为1的所有事件
					int page = 0;
					if(session.getAttribute("user_placepage") != null)
						page = (Integer)session.getAttribute("user_placepage");
					page_count = page;
					session.setAttribute("user_placepage", page);
					/**
					 * store event type, place name, now name, start date and end date
					 */
					PlacePage(user_id,page);
					
				} catch (Exception e) {
					e.printStackTrace();
				}
			
			return "go_usernowplacepage";
		}

		//地点goNextPlacePage
		public String goNextPlacePage() {
			try {
				HttpServletRequest request=ServletActionContext.getRequest();
				HttpSession session =request.getSession();
				String uName = (String) session.getAttribute("user_name");//这个的话是不是在进行登录的时候已经获取
				User user = userService.findByFeild("user_name", uName);
				int user_id = user.getUser_id();
				int page = 0;
				if(session.getAttribute("user_placepage") != null)
					page = (Integer)session.getAttribute("user_placepage");
				page++;
				session.setAttribute("user_placepage", page);
				page_count = page;
				
				PlacePage(user_id,page);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return "go_nextplacepage";
		}

		//goPrevPlacePage()
		public String goPrevPlacePage() {
			try {
				HttpServletRequest request=ServletActionContext.getRequest();
				HttpSession session =request.getSession();
				String uName = (String) session.getAttribute("user_name");//这个的话是不是在进行登录的时候已经获取
				User user = userService.findByFeild("user_name", uName);
				int user_id = user.getUser_id();
				int page = 0;
				if(session.getAttribute("user_placepage") != null)
					page = (Integer)session.getAttribute("user_placepage");
				page--;
				page_count = page;
				session.setAttribute("user_placepage", page);
				PlacePage(user_id,page);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return "go_prevplacepage";
		}
		
		
		//人物goUserPeoplePage
		
		//人物的整合部分
		
		public void PeoplePage(int user_id,int page)
		{
			
			try{
				List<String> wheres = new ArrayList<String>();
				List<Object> whereParams = new ArrayList<Object>();
				if(user_id > 0){ 
					wheres.add("o.user_id=?");
					whereParams.add(user_id);
				}
				
				//order by
				List<Entry<String, String>> orders = new ArrayList<Entry<String, String>>();
				
				orders.add(new SimpleEntry("o.people_id", "asc"));
				
				peoples =  peopleService.findByPage(page, page_num, wheres, whereParams,orders).getRecords();
				for(int i = 0; i < peoples.size(); i++){
					int people_id = peoples.get(i).getPeople_id();
					People people = peopleService.findByFeildByInt("people_id", people_id);
					String people_name = people.getPeople_name();
					String birthday = people.getBirthday();
					String deathday = people.getDeathday();
					String birthplace = people.getBirthplace();
					String people_character = people.getPeople_character();
					String temple_title = people.getTemple_title();
					String people_summary = people.getPeople_summary();
					String people_influ = people.getPeople_influ();
					String people_detail_url = people.getPeople_detail_url();
					
					peoples.get(i).setPeople_name(people_name);
					peoples.get(i).setBirthday(birthday);
					peoples.get(i).setDeathday(deathday);
					peoples.get(i).setBirthplace(birthplace);
					peoples.get(i).setPeople_character(people_character);
					peoples.get(i).setTemple_title(temple_title);
					peoples.get(i).setPeople_summary(people_summary);
					peoples.get(i).setPeople_influ(people_influ);
					peoples.get(i).setPeople_detail_url(people_detail_url);
					
					
					int dynasty_id = peoples.get(i).getDynasty_id();
					Dynasty dynasty = dynastyService.findByFeildByInt("dynasty_id", dynasty_id);
					String dynasty_name = dynasty.getDynasty_name();
					peoples.get(i).setDynasty_name(dynasty_name);
					int education_id = peoples.get(i).getEducation_id();
					Education education = educationService.findByFeildByInt("education_id", education_id);
					String education_name = education.getEducation_name();
					peoples.get(i).setEducation_name(education_name);
					int job_id = peoples.get(i).getJob_id();
					Job job = jobService.findByFeildByInt("job_id", job_id);
					String job_name = job.getJob_name();
					peoples.get(i).setJob_name(job_name);
					
				}
				people_count = peopleService.getCountByInt("user_id",user_id);
				message = "success";
			}
			catch (Exception e)
			{
				e.printStackTrace();
			}
		}
		
		public String goUserPeoplePage() {
			try {
				
				HttpServletRequest request=ServletActionContext.getRequest();
				HttpSession session = request.getSession();
				String uName = (String) session.getAttribute("user_name");//这个的话是不是在进行登录的时候已经获取
				User user = userService.findByFeild("user_name", uName);
				int user_id = user.getUser_id();
				int page = 1;
				page_count = page;
				session.setAttribute("user_peoplepage", page);
				/**
				 * 
				 */
				PeoplePage(user_id,page);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return "go_userpeoplepage";
		}
		
	//人物goUserNowPeoplePage
		public String goUserNowPeoplePage() {
			try {
				
				HttpServletRequest request=ServletActionContext.getRequest();
				HttpSession session = request.getSession();
				String uName = (String) session.getAttribute("user_name");//这个的话就在进行登录的时候已经获取
				User user = userService.findByFeild("user_name", uName);
				int user_id = user.getUser_id();
				//int user_id = 1;  这样避免了就是点击事件只是取到的是id为1的所有事件
				int page = 0;
				if(session.getAttribute("user_peoplepage") != null)
					page = (Integer)session.getAttribute("user_peoplepage");
				page_count = page;
				session.setAttribute("user_peoplepage", page);
				/**
				 * store event type, place name, now name, start date and end date
				 */
				PeoplePage(user_id,page);
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		
		return "go_usernowpeoplepage";
	}

		//人物goNextPeoplePage
		public String goNextPeoplePage() {
			try {
				HttpServletRequest request=ServletActionContext.getRequest();
				HttpSession session =request.getSession();
				String uName = (String) session.getAttribute("user_name");//这个的话是不是在进行登录的时候已经获取
				User user = userService.findByFeild("user_name", uName);
				int user_id = user.getUser_id();
				int page = 0;
				if(session.getAttribute("user_peoplepage") != null)
					page = (Integer)session.getAttribute("user_peoplepage");
				page++;
				session.setAttribute("user_peoplepage", page);
				page_count = page;
				
				PeoplePage(user_id,page);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return "go_nextpeoplepage";
		}

		//goPrevPeoplePage()
		public String goPrevPeoplePage() {
			try {
				HttpServletRequest request=ServletActionContext.getRequest();
				HttpSession session =request.getSession();
				String uName = (String) session.getAttribute("user_name");//这个的话是不是在进行登录的时候已经获取
				User user = userService.findByFeild("user_name", uName);
				int user_id = user.getUser_id();
				int page = 0;
				if(session.getAttribute("user_peoplepage") != null)
					page = (Integer)session.getAttribute("user_peoplepage");
				page--;
				page_count = page;
				session.setAttribute("user_peoplepage", page);    //这里的话就是对的
				
				PeoplePage(user_id,page);
			} catch (Exception e) {
				e.printStackTrace();
			}
			return "go_prevpeoplepage";
		}
	}
	

