package com.hmapvis.action;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.HashSet;

import com.hmapvis.bean.Event;
import com.hmapvis.bean.EventType;
import com.hmapvis.bean.PeopleEvent;
import com.hmapvis.bean.Place;
import com.hmapvis.utils.TimeTrans;

public class PeopleTraceAction extends BaseAction{
	private static final long serialVersionUID = 1L;
	//传来peopleIdList，传回已经去重的eventwholeList,以及重复出现过的eventrepeatList，还有每个人物对应事件的eventPeopleList,
	
	List<Integer> peopleidarray;



	HashSet<Event> eventHS;//hashset去重,总的结果存放处
	List<Event> eventwholelist;

	
	HashSet<Event> eventrepeatHS;//重复的事件存放处
	List<Event> eventwholerepeatlist;
	
	List<Place> placewholelist;//每个人经历事件对应地点的存放
	
	List<List<Event>> eventlistP;//每个人经历的事件存放处
	List<List<Place>> placelistP;//每个人经历事件对应地点的存放
	
	
	
	List<EventType> eventtypelist;
	List<PeopleEvent> peopleeventlist;
	
	public List<Place> getPlacewholelist() {
		return placewholelist;
	}

	public void setPlacewholelist(List<Place> placewholelist) {
		this.placewholelist = placewholelist;
	}
	
	public List<List<Event>> getEventlistP() {
		return eventlistP;
	}

	public void setEventlistP(List<List<Event>> eventlistP) {
		this.eventlistP = eventlistP;
	}

	public List<List<Place>> getPlacelistP() {
		return placelistP;
	}

	public void setPlacelistP(List<List<Place>> placelistP) {
		this.placelistP = placelistP;
	}

	public List<Integer> getPeopleidarray() {
		return peopleidarray;
	}

	public void setPeopleidarray(List<Integer> peopleidarray) {
		this.peopleidarray = peopleidarray;
	}

	public HashSet<Event> getEventHS() {
		return eventHS;
	}

	public void setEventHS(HashSet<Event> eventHS) {
		this.eventHS = eventHS;
	}

	public List<Event> getEventwholelist() {
		return eventwholelist;
	}

	public void setEventwholelist(List<Event> eventwholelist) {
		this.eventwholelist = eventwholelist;
	}
	
	

	public HashSet<Event> getEventrepeatHS() {
		return eventrepeatHS;
	}
	
	public void setEventrepeatHS(HashSet<Event> eventrepeatHS) {
		this.eventrepeatHS = eventrepeatHS;
	}

	public List<Event> getEventwholerepeatlist() {
		return eventwholerepeatlist;
	}
	
	public void setEventwholerepeatlist(List<Event> eventwholerepeatlist) {
		this.eventwholerepeatlist = eventwholerepeatlist;
	}



	
	public List<EventType> getEventtypelist() {
		return eventtypelist;
	}

	public void setEventtypelist(List<EventType> eventtypelist) {
		this.eventtypelist = eventtypelist;
	}

	public List<PeopleEvent> getPeopleeventlist() {
		return peopleeventlist;
	}

	public void setPeopleeventlist(List<PeopleEvent> peopleeventlist) {
		this.peopleeventlist = peopleeventlist;
	}

	public String queryEventByPeopleList()//参数为一个int数组，是People的ID
	{
		int pNum=peopleidarray.size();
		
		eventtypelist = eventtypeService.findAll();
		
		eventHS=new HashSet<Event>();
		eventwholelist =new LinkedList<Event>();
	
	    eventrepeatHS=new HashSet<Event>();
		eventwholerepeatlist=new LinkedList<Event>();
		
		placewholelist=new LinkedList<Place>();
	
		
		
		eventlistP=new LinkedList<List<Event>>();
		placelistP=new LinkedList<List<Place>>();
		
		for(int i=0;i<pNum;i++)
		{
			List<Event> eventlisttemp=new LinkedList<Event>();
			List<Place> placelisttemp=new LinkedList<Place>();
			//search the eventlist that i has gone through
			peopleeventlist=peopleeventService.findsetByFeildByInt("people_id",peopleidarray.get(i));
			int eventN=peopleeventlist.size();
			for(int j=0;j<eventN;j++)
			{
				int eventid=peopleeventlist.get(j).getEvent_id();
				Event event=eventService.findByFeildByInt("event_id", eventid);
				Place place=placeService.findByFeildByInt("place_id", event.getPlace_id());
				//problem here
				
				String place_name = place.getPlace_name();
				String now_name = place.getNow_name();
				event.setPlace_name(place_name);
				event.setNow_name(now_name);
				
				EventType eventtype = eventtypeService.findByFeildByInt("type_id", event.getType_id());
				String type_name = eventtype.getType_name();
				event.setType_name(type_name);
				
				event.setStart_date(TimeTrans.transMillisToDate(event.getStart_time()));
				event.setEnd_date(TimeTrans.transMillisToDate(event.getEnd_time()));
				
				eventlisttemp.add(event);
				placelisttemp.add(place);
				
				if(eventHS.contains(event))
				{
					eventrepeatHS.add(event);
				}
				else
				{
					eventHS.add(event);
					eventwholelist.add(event);
					placewholelist.add(place);
				}
				
				
			}
			//hashset 返回的顺序变了，所以不能这么弄,place和event对不上了
			eventlistP.add(eventlisttemp);
			placelistP.add(placelisttemp);
			
		}
		
		eventwholerepeatlist.addAll(eventrepeatHS);//这里会出问题，因为顺序对不上，当需要标注重合点时，得将eventrepeatHS.add(event);这句改掉
		
		if (eventwholelist!=null)
			return "success";
		else
			return "fail";
	
		}
	
}
