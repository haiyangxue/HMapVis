package com.hmapvis.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.classic.Session;
import org.springframework.stereotype.Service;

import com.hmapvis.bean.Event;
import com.hmapvis.service.EventService;
import com.hmapvis.utils.TimeTrans;

@Service("eventService")
public class EventServiceImpl extends BaseServiceImpl<Event, Integer> implements
		EventService {

	public int findNum() {
		int num = 0;
		String hql = "SELECT MAX(event_id) AS num FROM event";
		num = (Integer) sessionFactory.getCurrentSession().createQuery(hql)
				.uniqueResult();
		return num;
	}

	public List<Long> count() {
		List<Long> result;
		String hql = "select start_time from Event o order by o.start_time asc";
		result = sessionFactory.getCurrentSession().createQuery(hql).list();

		// hql="select count(*) from Event o where o.start_time>-83155895341526 and o.start_time<-77349296941515";
		// num = (Long)
		// sessionFactory.getCurrentSession().createQuery(hql).uniqueResult();
		return result;
	}

	public Object variousevent(String event_name, int user_id, int dynasty_id,
			int type_id, String influ, String summary, String detail_url,
			int place_id, String start_time, String end_time, int rank,
			String people, String event_video, String event_pic) {
		Session session = sessionFactory.getCurrentSession();

		// get place name
		String hql_get_place_name = "SELECT place_name FROM Place where place_id = "
				+ place_id;
		String place_name = (String) sessionFactory.getCurrentSession()
				.createQuery(hql_get_place_name).uniqueResult();

		// transe String of time into millis
		long start_time_l = TimeTrans.transDateToMillis(start_time);
		long end_time_l = TimeTrans.transDateToMillis(end_time);

		// insert into event table
		String sql = "insert into event (event_name, user_id, dynasty_id, type_id, people, influ, summary, start_time_string, end_time_string, detail_url,place_id,start_time,end_time,rank,event_video,event_pic) values "
				+ "('"
				+ event_name
				+ "',"
				+ user_id
				+ ","
				+ dynasty_id
				+ ","
				+ type_id
				+ ",'"
				+ "relate"
				+ "','"
				+ influ
				+ "','"
				+ summary
				+ "','"
				+ "relate"
				+ "','"
				+ "relate"
				+ "','"
				+ detail_url
				+ "',"
				+ place_id
				+ ","
				+ start_time_l
				+ ","
				+ end_time_l
				+ ","
				+ rank 
				+ ",'"
				+event_video 
				+"','"
				+event_pic
				+ "')";
		
		Query query = (Query) session.createSQLQuery(sql);

		// check and add people who take apart in this event into people table
		String[] people_list = people.split("、");
		int people_list_length = people_list.length;
		for (int i = 0; i < people_list_length; i++) {
			List<Integer> result4;
			String hql4 = "SELECT people_id FROM People WHERE people_name='"
					+ people_list[i] + "'";
			result4 = sessionFactory.getCurrentSession().createQuery(hql4)
					.list();
			if (result4.size() == 0) {// the people is not in the people table,
										// then add it
				String sql_insert_people = "insert into people (people_name, user_id, education_id, birthplace_id, dynasty_id, place_id, type_id, job_id) values "
						+ "('"
						+ people_list[i]
						+ "',"
						+ user_id
						+ ",1,1,1,1,1,1)";
				Query query_insert_people = (Query) session
						.createSQLQuery(sql_insert_people);
				query_insert_people.executeUpdate();
			}
			// check the people_event table, if there is not this tuple, then
			// add it
			String hql5 = "SELECT people_id FROM  People WHERE people_name='"
					+ people_list[i] + "'";// different from hql4, because it
											// may be added already
			int people_id = (Integer) sessionFactory.getCurrentSession()
					.createQuery(hql5).uniqueResult();

			String hql8 = "SELECT MAX(event_id) AS people_id FROM Event";
			int event_id = (Integer) sessionFactory.getCurrentSession()
					.createQuery(hql8).uniqueResult();
			String sql_insert_people_event = "insert into people_event (people_id, event_id) values "
					+ "(" + people_id + "," + event_id + ")";
			Query query_insert_people_event = (Query) session
					.createSQLQuery(sql_insert_people_event);
			query_insert_people_event.executeUpdate();
		}

		// 更新user表中各种count
		String hql_get_count = "SELECT event_count FROM User where user_id = "
				+ user_id;
		int count = (Integer) sessionFactory.getCurrentSession()
				.createQuery(hql_get_count).uniqueResult();
		count++;
		String sql_update_user = "UPDATE public.user SET event_count=" + count
				+ " WHERE user_id=" + user_id;
		System.out.println("my sql" + sql_update_user);
		Query query_update_user = (Query) session
				.createSQLQuery(sql_update_user);
		query_update_user.executeUpdate();

		query.executeUpdate();
		String hql= "SELECT e FROM Event e where e.user_id = "
				+ user_id+" and e.event_name= '"+event_name+"'";
		Event entity = (Event) sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).uniqueResult();
		return entity;
	}

	public List<Event> findEvents(String feildName1, String feildValue1,
			String feildName2, int feildValue2, String feildName3,
			int feildValue3, String feildName4, int feildValue4) {
		List<Event> entities = null;
		String hql = null;
		if ((feildValue1.equals("此处可以为空"))) {
			if (feildValue2 > 0) {
				hql = "from Event o where o.type_id=" + feildValue2;
			}
			if (feildValue3 > 0) {
				hql = hql + " and o.dynasty_id=" + feildValue3;
			}
			if (feildValue4 > 0) {
				hql = hql + " and o.place_id=" + feildValue4;
			}
		} else {
			hql = "from Event o where o.event_name='" + feildValue1 + "'";
		}
		entities = (List<Event>) sessionFactory.getCurrentSession()
				.createQuery(hql).setCacheable(true).list();
		return entities;
	}

	public Object editevent(String event_name, int user_id, int dynasty_id,
			int type_id, String influ, String summary, String detail_url,
			int place_id, String start_time, String end_time, int rank,
			String people, int event_id, String event_video,String event_pic) {
		Session session = sessionFactory.getCurrentSession();

		// get place name
		String hql_get_place_name = "SELECT place_name FROM Place where place_id = "
				+ place_id;
		String place_name = (String) sessionFactory.getCurrentSession()
				.createQuery(hql_get_place_name).uniqueResult();

		// transe String of time into millis
		long start_time_l = TimeTrans.transDateToMillis(start_time);
		long end_time_l = TimeTrans.transDateToMillis(end_time);

		// get the max version number from event_record
		String hql_max_version = "select max(event_version) as max_v from EventRecord where event_id = "
				+ event_id;
		System.out.println("kkkkk   " + hql_max_version);
		int max_version = (Integer) sessionFactory.getCurrentSession()
				.createQuery(hql_max_version).uniqueResult();
		int now_version = max_version + 1;

		// insert into event_record table
		String sql = "insert into event_record (event_id,event_name, user_id, dynasty_id, type_id, people, influ, summary,  detail_url,place_id,start_time,end_time,rank,event_version,event_video,event_pic) values "
				+ "("
				+ event_id
				+ ",'"
				+ event_name
				+ "',"
				+ user_id
				+ ","
				+ dynasty_id
				+ ","
				+ type_id
				+ ",'"
				+ people
				+ "','"
				+ influ
				+ "','"
				+ summary
				+ "','"
				+ detail_url
				+ "',"
				+ place_id
				+ ","
				+ start_time_l
				+ ","
				+ end_time_l
				+ ","
				+ rank
				+ ","
				+ now_version 
				+ ",'"
				+ event_video
				+ "','"
				+event_pic
				+"')";
		Query query = (Query) session.createSQLQuery(sql);

		// update event table
		Event event = new Event();
		event.setDetail_url(detail_url);
		event.setDynasty_id(dynasty_id);
		event.setEnd_time(end_time_l);
		event.setStart_time(start_time_l);
		event.setEvent_id(event_id);
		event.setEvent_name(event_name);
		event.setInflu(influ);
		event.setPeople(people);
		event.setPlace_id(place_id);
		event.setPlace_name(place_name);
		event.setSummary(summary);
		event.setUser_id(user_id);
		event.setType_id(type_id);
		event.setEvent_video(event_video);
		event.setEvent_pic(event_pic);
		this.update(event);

		// check and add people who take apart in this event into people table
		String[] people_list = people.split("、");
		int people_list_length = people_list.length;
		for (int i = 0; i < people_list_length; i++) {
			List<Integer> result4;
			String hql4 = "SELECT people_id FROM People WHERE people_name='"
					+ people_list[i] + "'";
			result4 = sessionFactory.getCurrentSession().createQuery(hql4)
					.list();
			if (result4.size() == 0) {// the people is not in the people table,
										// then add it
				String sql_insert_people = "insert into people (people_name, user_id, education_id, birthplace_id, dynasty_id, place_id, type_id, job_id) values "
						+ "('"
						+ people_list[i]
						+ "',"
						+ user_id
						+ ",1,1,1,1,1,1)";
				Query query_insert_people = (Query) session
						.createSQLQuery(sql_insert_people);
				query_insert_people.executeUpdate();
			}
			// check the people_event table, if there is not this tuple, then
			// add it
			String hql5 = "SELECT people_id FROM  People WHERE people_name='"
					+ people_list[i] + "'";// different from hql4, because it
											// may be added already
			int people_id = (Integer) sessionFactory.getCurrentSession()
					.createQuery(hql5).uniqueResult();
			// 检查该人物在
			// people_event_record表中是否有对应event_id的元组，没有则增加到people_event_record
			// 和people_record中
			String hql_check_people_event = "select event_id from PeopleEventRecord where people_id = "
					+ people_id;
			List<Integer> result_check_people_event = sessionFactory
					.getCurrentSession().createQuery(hql_check_people_event)
					.list();
			boolean exist = false;
			for (int j = 0; j < result_check_people_event.size(); j++) {
				if (result_check_people_event.get(j) == event_id)
					exist = true;
			}
			if (!exist) {// 如果该人物-事件元组不在people_event表中，则增加
				String sql_insert_people_event = "insert into people_event (people_id, event_id) values "
						+ "(" + people_id + "," + event_id + ")";
				Query query_insert_people_event = (Query) session
						.createSQLQuery(sql_insert_people_event);
				query_insert_people_event.executeUpdate();

				// 为插入到record中 获得pe_id
				String hql_pe_id = "select pe_id from PeopleEvent where people_id = "
						+ people_id + "and event_id=" + event_id;
				int pe_id = (Integer) sessionFactory.getCurrentSession()
						.createQuery(hql_pe_id).uniqueResult();
				System.out.println("pe_id =" + pe_id);

				// 增加到people_event_record中，version和event的version一致 now_version
				String sql_insert_people_event_record = "insert into people_event_record (pe_id,people_id, event_id,per_version) values "
						+ "("
						+ pe_id
						+ ","
						+ people_id
						+ ","
						+ event_id
						+ ","
						+ now_version + ")";
				Query query_insert_people_event_record = (Query) session
						.createSQLQuery(sql_insert_people_event_record);
				query_insert_people_event_record.executeUpdate();
			}

		}

		return query.executeUpdate();

	}
	
	public List<Event> findEventsByLoc(String place_loc){
		List<Event> entities=new ArrayList();
		String hql1 = "SELECT place_id FROM Place WHERE place_loc='"+place_loc+"'";
		List<Integer> place_id = (List<Integer>) sessionFactory.getCurrentSession().createQuery(hql1).setCacheable(true).list();
		
		String hql=null;
		for(int i = 0; i<place_id.size();i++){
			List<Event> en=null;
			hql = "from Event o where o.place_id=" + place_id.get(i);
			en = (List<Event>)sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).list();
			entities.addAll(en);
		}
		return entities;
	}
}
