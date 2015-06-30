package com.hmapvis.service.impl;

import org.hibernate.Query;
import org.hibernate.classic.Session;
import org.springframework.stereotype.Service;

import com.hmapvis.bean.Place;
import com.hmapvis.service.PlaceService;

@Service("placeService")
public class PlaceServiceImpl extends BaseServiceImpl<Place,Integer> implements PlaceService{

	@Override
	public Object variousplace(int dynasty_id, String place_name, String now_name, String place_loc, long start_time, long end_time, int user_id) {
		Session session = sessionFactory.getCurrentSession();
		String sql = "insert into place (place_name, now_name, dynasty_id, place_loc, start_time, end_time, user_id) values " +
				"('"+place_name+"', '"+now_name+"', "+dynasty_id+", '"+place_loc+"', "+start_time+", "+end_time+", "+user_id+")";
		Query query = (Query) session.createSQLQuery(sql);
		
		// update place_count in user
		String hql_get_count="SELECT place_count FROM User where user_id = " + user_id;
		int count = (Integer) sessionFactory.getCurrentSession().createQuery(hql_get_count).uniqueResult();
		count++;
		String sql_update_user="UPDATE public.user SET place_count=" + count+ " WHERE user_id=" + user_id;
		System.out.println("my sql" + sql_update_user);
		Query query_update_user = (Query) session.createSQLQuery(sql_update_user);
		query_update_user.executeUpdate();
		
		return query.executeUpdate();
	}

	@Override
	public Object editplace(int place_id, String place_name, String now_name, String place_loc, int dynasty_id, int user_id) {
		// TODO Auto-generated method stub
		Session session = sessionFactory.getCurrentSession();

		//get the max version number from place_record
		String hql_max_version ="select max(place_version) as max_v from PlaceRecord where place_id = "+place_id;
		int max_version = (Integer) sessionFactory.getCurrentSession().createQuery(hql_max_version).uniqueResult();
		int now_version = max_version+1;
		
		//insert into place_record table
		String sql = "insert into place_record (place_id,place_name, now_name,dynasty_id,place_loc,start_time,end_time, user_id,place_version) values " +
				"("+place_id+",'"+place_name+"','"+now_name+"',"+dynasty_id+",'"+place_loc+"',"+0+","+0+","+user_id+","+now_version+")";
		Query query = (Query) session.createSQLQuery(sql);
		
		//update place table
		Place place  = new Place();
		place.setPlace_name(place_name);
		place.setPlace_loc(place_loc);
		place.setNow_name(now_name);
		place.setStart_time(0);
		place.setEnd_time(0);
		place.setDynasty_id(dynasty_id);
		place.setUser_id(user_id);
		place.setPlace_id(place_id);
		
		this.update(place);
		
		return query.executeUpdate();
	}
}
