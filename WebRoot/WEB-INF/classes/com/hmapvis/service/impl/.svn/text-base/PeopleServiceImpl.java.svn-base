package com.hmapvis.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.classic.Session;
import org.springframework.stereotype.Service;

import com.hmapvis.bean.People;
import com.hmapvis.service.PeopleService;
import com.hmapvis.utils.TimeTrans;

@Service("peopleService")
public class PeopleServiceImpl extends BaseServiceImpl<People, Integer>
		implements PeopleService {
	public Object variouspeople(String people_name, String people_character,
			String temple_title, String people_summary, String people_influ,
			int education_id, int dynasty_id, String birthplace,
			String people_detail, String birthday, String deathday, int job_id,
			int user_id) {

		Session session = sessionFactory.getCurrentSession();

		// get place id or add a new place into place
		List<Integer> result2;
		String hql2 = "SELECT place_id  FROM Place WHERE place_name='"
				+ birthplace + "'";
		result2 = sessionFactory.getCurrentSession().createQuery(hql2).list();
		int pid, birthplace_id;
		if (result2.size() != 0) {// 如果添加的人物出生地点已经在place表中，就获得原有的place_id作为birthplace_id
			pid = result2.get(0);
			birthplace_id = pid;
		} else {// 如果地点不在表中，则给该地点一个新的place_id，等于place表中最大的place_id+1,并且将该地点加入到place表中
			String hql3 = "SELECT MAX(place_id) FROM Place";
			String sql_insert_place = "insert into place (place_name, now_name, dynasty_id,user_id) values"
					+ "('"
					+ birthplace
					+ "','"
					+ "unknown"
					+ "',"
					+ dynasty_id
					+ "," + user_id + ")";

			Query query_insert_place = (Query) session
					.createSQLQuery(sql_insert_place);
			query_insert_place.executeUpdate();
			birthplace_id = (Integer) sessionFactory.getCurrentSession()
					.createQuery(hql3).uniqueResult();
		}

		// transe String of time into millis
		long birthday_l = TimeTrans.transDateToMillis(birthday);
		long deathday_l = TimeTrans.transDateToMillis(deathday);

		// insert into people table
		String sql = "insert into people (people_name, user_id, dynasty_id, people_influ, people_summary, birthday, "
				+ "deathday ,birthplace_id, birthplace, people_character, temple_title, people_detail, "
				+ "education_id, job_id, place_id, type_id) values " + "('"
				+ people_name
				+ "',"
				+ user_id
				+ ","
				+ dynasty_id
				+ ",'"
				+ people_influ
				+ "','"
				+ people_summary
				+ "','"
				+ birthday_l
				+ "','"
				+ deathday_l
				+ "',"
				+ birthplace_id
				+ ",'"
				+ birthplace
				+ "','"
				+ people_character
				+ "','"
				+ temple_title
				+ "','"
				+ people_detail + "'," + education_id + "," + job_id + ",0,0)";

		Query query = (Query) session.createSQLQuery(sql);

		// update people_count in user
		String hql_get_count = "SELECT people_count FROM User where user_id = "
				+ user_id;
		int count = (Integer) sessionFactory.getCurrentSession()
				.createQuery(hql_get_count).uniqueResult();
		count++;
		String sql_update_user = "UPDATE public.user SET people_count=" + count
				+ " WHERE user_id=" + user_id;
		Query query_update_user = (Query) session
				.createSQLQuery(sql_update_user);
		query_update_user.executeUpdate();

		return query.executeUpdate();
	}
	
//	public List<People> fetchPeopleInRelation(String people_name){
//		String sql1 = "select * from people where people_name = '" + people_name + "'";
//		People corePeople = (People) sessionFactory.getCurrentSession()
//				.createQuery(sql1).uniqueResult();
//		int corePeople_id = corePeople.getPeople_id();
//		
//		
//		return void;
//	}
	
	public List<People> fetchRelatedPeopleList(List<Integer> relatedPeopleId){
		List<People> relatedPeopleList = null;
		try{
			relatedPeopleList = new ArrayList<People>();
			for(int i = 0; i < relatedPeopleId.size(); i++){
				int people_id = relatedPeopleId.get(i);
				System.out.println("people_id " + people_id);
				String sql = "from People o where o.people_id=" + people_id;
				People peopleIndex = (People)sessionFactory.getCurrentSession().createQuery(sql).uniqueResult();
				relatedPeopleList.add(peopleIndex);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return relatedPeopleList;
	}
	
	@Override
	public List<People> peoplequery(String people_name, String start_time,
			String end_time, int dynasty_id, String dynasty_name, int job_id,
			String job_name, int education_id, String education_name) {
		String hql =  "from People o where ";
		if (people_name != null)
			hql=hql+" o.people_name = '"+people_name+"'"+" and";
		if (!(dynasty_id ==70))
			hql=hql+" o.dynasty_id = "+ dynasty_id+" and";
		if (!(job_id ==4))
			hql=hql+" o.job_id = "+job_id+" and";
		if (!(education_id ==3))
			hql=hql+" o.education_id = "+education_id+" and";
		hql=hql.substring(0,hql.length()-4);
		
		List<People> entities = sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).list();
		return entities;
	}
}
