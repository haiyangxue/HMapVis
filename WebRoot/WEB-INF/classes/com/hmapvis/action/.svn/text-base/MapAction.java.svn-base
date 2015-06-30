package com.hmapvis.action;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.hmapvis.bean.Map;
import com.hmapvis.bean.User;
import com.hmapvis.utils.TimeTrans;

public class MapAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	
	public Map map;
	public String start_time_tmp;
	public String end_time_tmp;
	//需要返回地图路径，地图位置，地图创建者，创建时间
	public List<Map> maps;
	public List<User> users;
	public String message;
	 
	public Map getMap() {
		return map;
	}

	public void setMap(Map map) {
		this.map = map;
	}

	public List<Map> getMaps() {
		return maps;
	}

	public void setMaps(List<Map> maps) {
		this.maps = maps;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	public String getStart_time_tmp() {
		return start_time_tmp;
	}

	public void setStart_time_tmp(String start_time_tmp) {
		this.start_time_tmp = start_time_tmp;
	}

	public String getEnd_time_tmp() {
		return end_time_tmp;
	}

	public void setEnd_time_tmp(String end_time_tmp) {
		this.end_time_tmp = end_time_tmp;
	}

	/**
	 * 用户添加地图
	 * @return
	 */
	public String addMap(){
		HttpServletRequest request=ServletActionContext.getRequest();
		HttpSession session = request.getSession();
		int user_id =(Integer)session.getAttribute("user_id");
		Date currentDate = new Date();
		Timestamp createTime = new Timestamp(currentDate.getTime());
		
		
		try{
			map.setUser_id(user_id); 
			map.setStart_time((long)TimeTrans.transDateToMillis(start_time_tmp));
			map.setEnd_time((long)TimeTrans.transDateToMillis(end_time_tmp));
			
			map.setCreate_time(createTime);
			mapService.variousmap(map.getDynasty_id(),map.getTile_path(),map.getCreate_time(),map.getMap_bounds(),map.getMap_name(),map.getUser_id()
					,map.getStart_time(),map.getEnd_time(),map.getRegiontype());
		}catch(Exception e){
			e.printStackTrace();
			message = "addmap_error";
			return "addmap_error";
		}
		message = "addmap_success";
		return "addmap_success";
	}
	
	/**
	 * 按照朝代查找相应的地图和相应的用户
	 * @return
	 */
	public String queryByDynasty(){
		try {
			maps = mapService.findsetByFeildByInt("dynasty_id", map.getDynasty_id());
			users = new ArrayList<User>();
			if(maps != null){
				for (int i = 0; i < maps.size(); i++) {
					User user_tmp = userService.findById(maps.get(i).getUser_id());
					users.add(user_tmp);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return "success";
	}
	
	public String fetch(){
		try{
		
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpSession session = request.getSession();
			String uName = (String) session.getAttribute("user_name");//这个的话是在进行登录的时候已经获取
			User user = userService.findByFeild("user_name", uName);
			map = (Map) mapService.eventmap(map.getDynasty_id());
			if(map != null){
				
				//map.setUser_id(user.getUser_id());//这样的话就是得到了它的用户ID   
				
				
				
				
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	
	public String fetchRecent(){
		try{
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpSession session = request.getSession();
			String uName = (String) session.getAttribute("user_name");//这个的话是在进行登录的时候已经获取
			User user = userService.findByFeild("user_name", uName);
			int s=map.getRegiontype();
			map = (Map) mapService.recentmap(map.getRegiontype());
			if(map != null){
				//map.setUser_id(user.getUser_id());//这样的话就是得到了它的用户ID   
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

}
