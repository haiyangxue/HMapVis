package com.hmapvis.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmapvis.bean.Event;
import com.hmapvis.service.BaseService;

@Service("eventService")
@Transactional
public interface EventService extends BaseService<Event, Integer>{
	
	public List<Long> count();
	
	public Object variousevent(String event_name, int user_id,int dynasty_id,
			int type_id, String influ,String summary, String detail_url,
			int place_id,  String start_time, String end_time,int rank, 
			String people, String event_video,String event_pic);
	
	public List<Event> findEvents(String feildName1, String feildValue1,
			String feildName2, int feildValue2, String feildName3, int feildValue3,
			String feildName4, int feildValue4);
	
	public Object editevent(String event_name, int user_id,int dynasty_id, 
			int type_id, String influ,String summary, String detail_url,
			int place_id,  String start_time, String end_time,int rank, 
			String people,int event_id, String event_video, String event_pic);
	
	public List<Event> findEventsByLoc(String place_loc);
}
