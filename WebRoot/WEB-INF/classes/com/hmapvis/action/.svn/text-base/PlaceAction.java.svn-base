package com.hmapvis.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.hmapvis.bean.Dynasty;
import com.hmapvis.bean.Place;
import com.hmapvis.bean.User;
import com.hmapvis.utils.TimeTrans;

public class PlaceAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	private Place place;
	private String message;
	private List<Place> showplaces;
	private String start_time;
	private String end_time;
	private List<Place> searchplaces; 

	public void setPlace(Place place) {
		this.place = place;
	}

	public Place getPlace() {
		return place;
	}

	public String getStart_time() {
		return start_time;
	}

	public String getEnd_time() {
		return end_time;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}

	public void setEnd_time(String end_time) {
		this.end_time = end_time;
	}

	public String getMessage() {
		return message;
	}

	public List<Place> getShowplaces() {
		return showplaces;
	}

	public void setShowplaces(List<Place> showplaces) {
		this.showplaces = showplaces;
	}

	public List<Place> getSearchplaces() {
		return searchplaces;
	}

	public void setSearchplaces(List<Place> searchplaces) {
		this.searchplaces = searchplaces;
	}

	/**
	 * 用户添加历史地点
	 * @return
	 */
	/*public String addPlace() {
		try {
			place.setStart_time(0L);
			place.setEnd_time(0L);
			placeService.add(place);
		} catch (Exception e) {
			e.printStackTrace();
			message = "addplace_error";
			return "addplace_error";
		}
		message = "addplace_success";
		return "addplace_success";
	}
*/
/*	public String fetch(){
		try{
			place = placeService.findByFeildByInt("place_id", place.getPlace_id());
			if(place != null){
				int place_id = place.getPlace_id();
				Place place = placeService.findByFeildByInt("place_id", place_id);
				String place_name = place.getPlace_name();
				String now_name = place.getNow_name();
//				event.setPlace_name(place_name);
//				event.setNow_name(now_name);
				
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
	 public String fetch(){
		try{
			place = placeService.findByFeildByInt("place_id", place.getPlace_id());
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpSession session = request.getSession();
			String uName = (String) session.getAttribute("user_name");//这个的话是在进行登录的时候已经获取
			User user = userService.findByFeild("user_name", uName);
			if(place != null){
				int place_id = place.getPlace_id();
				Place place = placeService.findByFeildByInt("place_id", place_id);
				String place_name = place.getPlace_name();
				String now_name = place.getNow_name();
				place.setPlace_name(place_name);
				place.setNow_name(now_name);
				place.setUser_id(user.getUser_id());
				int dynasty_id = place.getDynasty_id();
				Dynasty dynasty = dynastyService.findByFeildByInt("dynasty_id", dynasty_id);
//				String dynasty_name = dynasty.getDynasty_name();
//				place.setDynasty_name(dynasty_name);
				
				place.setStart_date(TimeTrans.transMillisToDate(place.getStart_time()));
				place.setEnd_date(TimeTrans.transMillisToDate(place.getEnd_time()));
				
				String place_loc=place.getPlace_loc();
				place.setPlace_loc(place_loc);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	public String save(){
		try{
			//存在，只能更新
			if(placeService.dataExists("place_name", place.getPlace_name())){
				placeService.update(place);
			}//不存在，添加
			else{
				HttpServletRequest request=ServletActionContext.getRequest();
				HttpSession session =request.getSession();
				int uid = (Integer)session.getAttribute("user_id");
				placeService.variousplace(place.getDynasty_id(), place.getPlace_name(), place.getNow_name(), place.getPlace_loc(), 0, 0, uid);
				
				message = "success";
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	
	public String fetchAllShowplace(){
		showplaces =  showplaceService.findAllById( "dynasty_id" , place.getDynasty_id());	
		 
		return "success";
	}
	
	public String searchPlace(){
		String hql = "from Place o where";
		if(place.getPlace_name()!=null&&!place.getPlace_name().equals(""))
			hql=hql+" o.place_name = '"+place.getPlace_name()+"'";
		if(place.getPlace_loc()!=null&&!place.getPlace_loc().equals(""))
			hql=hql+" and o.place_loc = '"+place.getPlace_loc()+"'";
		if(place.getNow_name()!=null&&!place.getNow_name().equals(""))
			hql=hql+" and o.now_name = '"+place.getNow_name()+"'";
		
		System.out.println("check the hql======11======"+hql);
		//判断hql是否正确
		if(hql.substring(20, 23).equals("and")){
			String hql1 = hql.substring(0, 20);
			String hql2 = hql.substring(23);
			hql = hql1+hql2;
			
		}
		System.out.println("check the hql======22======"+hql);
		searchplaces=searchplaceService.searchByHql(hql);
		
		//得到朝代名
		for(int i = 0 ;i<searchplaces.size();i++){
			int dynasty_id = searchplaces.get(i).getDynasty_id();
			String dynasty_name = showplaceService.findDynatynameById(dynasty_id);
			searchplaces.get(i).setDynasty_name(dynasty_name);
			System.out.println("dynasty_name is "+searchplaces.get(i).getDynasty_name());
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
				place.setUser_id(uuid);
				System.out.println("edit in event Action"+place.getPlace_name());
				
				placeService.editplace(place.getPlace_id(),place.getPlace_name(),
						place.getNow_name(),place.getPlace_loc(),
						place.getDynasty_id(),place.getUser_id());
				
				message = "success";
		
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
}
