package com.hmapvis.action;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.hmapvis.bean.Event;
import com.hmapvis.bean.HeatMapData;
import com.hmapvis.bean.Place;
import com.hmapvis.bean.User;
public class HeatMapAction extends BaseAction{
	private static final long serialVersionUID = 1L;
	
	public String message;
	
	public HeatMapData data;
	public List<HeatMapData> datas;

	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public HeatMapData getData() {
		return data;
	}
	public void setData(HeatMapData data) {
		this.data = data;
	}
	public List<HeatMapData> getDatas(){
		return datas;
	}
	public void setDatas(List<HeatMapData> datas){
		this.datas = datas;
	}
	
	public String fetchAll(){//获得所有朝代的合并热度数据
		List<Event> events = heatmapService.getAllEventsData();
		int numofplace = heatmapService.getMaxIdofPlace();

		int count_of_place[] = new int[numofplace+1];
		for(int i = 0 ; i < (numofplace+1);i++){//initialize the array
			count_of_place[i]=0;
		}
		for(int i = 0;i<events.size();i++){
			if(events.get(i).getPlace_id()!=-1){//count the events in the same place
				count_of_place[events.get(i).getPlace_id()]++;
			}
		}
		datas = new ArrayList();
		for(int i = 0;i<numofplace+1;i++){
			if(count_of_place[i]!=0){
				Place p = new Place();
				p = placeService.findByFeildByInt("place_id", i);
				if(!p.getPlace_loc().equals("NotFound")){
					String[] loc=p.getPlace_loc().split(",");
					HeatMapData hmdata = new HeatMapData();
					hmdata.setHeatMapData_lon(loc[0]);
					hmdata.setHeatMapData_lat(loc[1]);
					hmdata.setHeatMapData_count(count_of_place[i]);
				
					datas.add(hmdata);
				}
				else{
					System.out.println("place of "+ i + "`s place_loc is NotFound");
				}
			}
		
		}
		return "success";
	}
	//find event by its id
	public String fetch(){
		try{
		//这里添加修改的部分   后面加注释的都是自己加上去的
			HttpServletRequest request = ServletActionContext.getRequest();
			HttpSession session = request.getSession();
			String uName = (String) session.getAttribute("user_name");//这个的话是在进行登录的时候已经获取
			User user = userService.findByFeild("user_name", uName);
			List<Event> events = heatmapService.getDataByDynastyId(data.getDynasty_id());
			int numofplace = heatmapService.getMaxIdofPlace();

			int count_of_place[] = new int[numofplace+1];
			for(int i = 0 ; i < (numofplace+1);i++){//initialize the array
				count_of_place[i]=0;
			}
			for(int i = 0;i<events.size();i++){
				if(events.get(i).getPlace_id()!=-1){//count the events in the same place
					count_of_place[events.get(i).getPlace_id()]++;
				}
			}
			datas = new ArrayList();
			for(int i = 0;i<numofplace+1;i++){
				if(count_of_place[i]!=0){
					Place p = new Place();
					p = placeService.findByFeildByInt("place_id", i);
					if(!(p.getPlace_loc().equals("NotFound"))){
						String[] loc=p.getPlace_loc().split(",");
						HeatMapData hmdata = new HeatMapData();
						hmdata.setHeatMapData_lon(loc[0]);
						hmdata.setHeatMapData_lat(loc[1]);
						hmdata.setHeatMapData_count(count_of_place[i]);
						
						datas.add(hmdata);
					}
				}
			}
			if(datas != null){
				
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	
	//find event by year range
		public String fetchByYear(){
			try{System.out.println("####### fetch by year  " );
			
			//这里添加修改的部分   后面加注释的都是自己加上去的
				HttpServletRequest request = ServletActionContext.getRequest();
				HttpSession session = request.getSession();
				String uName = (String) session.getAttribute("user_name");//这个的话是在进行登录的时候已经获取
				User user = userService.findByFeild("user_name", uName);
				List<Event> events = heatmapService.getDataByYearRange(data.getStart_year(),data.getEnd_year());
				int numofplace = heatmapService.getMaxIdofPlace();

				int count_of_place[] = new int[numofplace+1];
				for(int i = 0 ; i < (numofplace+1);i++){//initialize the array
					count_of_place[i]=0;
				}
				System.out.println("#######find by year range  "+events.size());
				System.out.println("#######find by year range  "+events.get(0).getPlace_id());
				for(int i = 0;i<events.size();i++){
					if(events.get(i).getPlace_id()!=-1){//count the events in the same place
						count_of_place[events.get(i).getPlace_id()]++;
					}
				}
				datas = new ArrayList();
				for(int i = 0;i<numofplace+1;i++){
					if(count_of_place[i]!=0){
						Place p = new Place();
						p = placeService.findByFeildByInt("place_id", i);
						if(!(p.getPlace_loc().equals("NotFound"))){
							String[] loc=p.getPlace_loc().split(",");
							HeatMapData hmdata = new HeatMapData();
							hmdata.setHeatMapData_lon(loc[0]);
							hmdata.setHeatMapData_lat(loc[1]);
							hmdata.setHeatMapData_count(count_of_place[i]);
							
							datas.add(hmdata);
						}
					}
				}
				if(datas != null){
					
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
//		try{
//			//存在，只能更新
//			if(eventService.dataExistsByInt("event_id", event.getEvent_id())){
//				eventService.update(event);
//			}else{//不存在，添加  
//				 
//				HttpServletRequest request=ServletActionContext.getRequest();
//				HttpSession session =request.getSession();
//				int uuid = (Integer)session.getAttribute("user_id");
//				event.setUser_id(uuid);
//				
//				eventService.variousevent(event.getEvent_name(),event.getUser_id(), event.getDynasty_id(),
//						event.getType_id(), event.getInflu(),event.getSummary(),event.getDetail_url(), 
//						event.getPlace_loc(),  event.getStart_time_string(), event.getEnd_time_string(),0,event.getPeople());
//				
//				message = "success";
//			}
//		}catch(Exception e){
//			e.printStackTrace();
//		}
		return "success";
	}
	

}
