package com.hmapvis.action;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.LinkedList;
import java.util.List;

import com.hmapvis.bean.Event;
import com.hmapvis.bean.EventType;
import com.hmapvis.bean.Place;
import com.hmapvis.utils.TimeTrans;

public class EventsAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	// return event list
	private List<Event> events;
	private List<Event> eventList;

	public List<Event> getEvents() {
		return events;
	}

	public void setEvents(List<Event> events) {
		this.events = events;
	}

	// get param to query the event list
	private String event_name;
	private int dynasty_id;
	private int type_id;
	private int user_id;
	private String start_date;
	private String end_date;
	private int zoomlevel;
	private String[] focus_year;

	public String getEvent_name() {
		return event_name;
	}

	public void setEvent_name(String event_name) {
		this.event_name = event_name;
	}

	public int getDynasty_id() {
		return dynasty_id;
	}

	public void setDynasty_id(int dynasty_id) {
		this.dynasty_id = dynasty_id;
	}

	public int getType_id() {
		return type_id;
	}

	public void setType_id(int type_id) {
		this.type_id = type_id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getStart_date() {
		return start_date;
	}

	public void setStart_date(String start_date) {
		this.start_date = start_date;
	}

	public String getEnd_date() {
		return end_date;
	}

	public void setEnd_date(String end_date) {
		this.end_date = end_date;
	}

	public int getZoomlevel() {
		return zoomlevel;
	}

	public void setZoomlevel(int zoomlevel) {
		this.zoomlevel = zoomlevel;
	}

	public String[] getFocus_year() {
		return focus_year;
	}

	public void setFocus_year(String[] focus_year) {
		this.focus_year = focus_year;
	}

	public String fetchlist() {
		
		try {

		    events = new LinkedList<Event>();             //这里的话需要初始化  不然在下面添加的时候会报空指针    linkedlist相当于就是队列的作用

		    long search_startTime;
		    long search_endTime;
		    long timeWidth=157852800000l;//5;是指全屏时显示的时间宽度
		    int focus_year_length = focus_year.length;
		    long focus_Year=TimeTrans.transDateToMillis(""+focus_year[focus_year_length-1]+"-00-00");//将时间焦点的字符串形式转换整数形式
		    int count_num=0;
		    if((zoomlevel>=1) && (zoomlevel<=37)){
		    	if(zoomlevel>=29){
		    		timeWidth=157852800000l;//5;
		    	}
		    	else if(zoomlevel>=25){
		    		timeWidth=504921600000l;//16;
		    		count_num=10;
		    	}
		    	else if(zoomlevel>=22){
		    		timeWidth=1009843200000l;//32;
		    		count_num=15;
		    	}
		    	else if(zoomlevel>=20){
		    		timeWidth=2019686400000l;//64;
		    		count_num=20;
		    	}
		    	else if(zoomlevel>=17){
		    		timeWidth=5049216000000l;//160;
		    		count_num=25;
		    	}
		    	else if(zoomlevel>=14){
		    		timeWidth=7889443200000l;//250;
		    		count_num=30;
		    	}
		    	else if(zoomlevel>=11){
		    		timeWidth=20196864000000l;//640;
		    		count_num=35;
		    	}
		    	else if(zoomlevel>=6){
		    		timeWidth=56803680000000l;//1800;
		    		count_num=40;
		    	}
		    	else if(zoomlevel>=3){
		    		timeWidth=132541920000000l;//4200;
		    		count_num=45;
		    	}
		    	else if(zoomlevel==2){
		    		timeWidth=201968640000000l;//6400;
		    		count_num=45;
		    	}
		    	else if(zoomlevel==1){
		    		timeWidth=315576000000000l;//10000;
		    		count_num=45;
		    	}
		    }
		    
		    search_startTime=focus_Year-(timeWidth/2);
    		search_endTime=focus_Year+(timeWidth/2);	
    		
			eventList = eventService.findByTimeRange(search_startTime, "start_time", search_endTime, count_num);//在BaseServiceImpl确定了显示的页面
			for (int i = 0; i < eventList.size(); i++) {
				eventList.get(i).setEnd_date(TimeTrans.transMillisToDate(eventList.get(i).getEnd_time()));
				eventList.get(i).setStart_date(TimeTrans.transMillisToDate(eventList.get(i).getStart_time()));

				int place_id = eventList.get(i).getPlace_id();
				Place place = placeService.findByFeildByInt("place_id",place_id);
				String place_name = place.getPlace_name();
				String now_name = place.getNow_name();
				String place_loc = place.getPlace_loc();
				eventList.get(i).setPlace_name(place_name);
				eventList.get(i).setNow_name(now_name);

				int type_id = eventList.get(i).getType_id();
				EventType eventtype = eventtypeService.findByFeildByInt("type_id", type_id);
				String type_name = eventtype.getType_name();
				eventList.get(i).setType_name(type_name);
				events.add(eventList.get(i));
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "success";
	}

//	private void printContent() {
//		System.out.println("event_name:" + event_name + "\tdynasty_id:"
//				+ dynasty_id + "\ttype_id:" + type_id + "\tstart_time:"
//				+ start_date + "\tend_time:" + end_date);
//	}

	private List<Integer> tycount;
	private int maxcount;

	public List<Integer> getTycount() {
		return tycount;
	}

	public void setTycount(List<Integer> tycount) {
		this.tycount = tycount;
	}

	public int getMaxcount() {
		return maxcount;
	}

	public void setMaxcount(int maxcount) {
		this.maxcount = maxcount;
	}

	/**
	 * 十年进行统计
	 */
	public String timecount() {
		tycount = new ArrayList<Integer>();

		try {
			List<Long> result = eventService.count();
			Calendar calendar = new GregorianCalendar();

			int index = 0;
			int num = 0;

			calendar.set(-3000, 0, 1, 0, 0, 0);
			long time = calendar.getTimeInMillis();
			while (result.get(index) < time) {
				index++;
			}

			for (int i = -3000; i < 2000; i = i + 5) {

				calendar = new GregorianCalendar();
				calendar.set(i, 0, 1, 0, 0, 0);
				long begintime = calendar.getTimeInMillis();

				calendar = new GregorianCalendar();
				calendar.set(i + 10, 0, 1, 0, 0, 0);
				long endtime = calendar.getTimeInMillis();

				while (result.get(index) >= begintime
						&& result.get(index) < endtime
						&& result.get(index) != 0 && index < result.size()) {
					num++;
					index++;
				}

				if (maxcount < num)
					maxcount = num;
				tycount.add(num);
				num = 0;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return "success";
	}

	/**
	 * 查询出地点的坐标和每个地点的个数，数据有问题，先解决数据库的数据问题
	 */
}
