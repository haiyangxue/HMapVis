package com.hmapvis.service.impl;

import java.sql.Timestamp;

import org.hibernate.Query;
import org.hibernate.classic.Session;
import org.springframework.stereotype.Service;

import com.hmapvis.bean.Map;
import com.hmapvis.service.MapService;

@Service("mapService")
public class MapServiceImpl extends BaseServiceImpl<Map, Integer> implements
		MapService {
	public Object variousmap(int dynasty_id, String tile_path, Timestamp create_time,
			String map_bounds, String map_name, int user_id, long start_time,
			long end_time, int regiontype 
			) {

		Session session = sessionFactory.getCurrentSession();

		// insert into map table
		String sql = "insert into map (dynasty_id, tile_path, create_time, map_bounds,map_name, user_id, "
				+ "start_time ,end_time, regiontype) values " + "("
				+ dynasty_id
				+ ",'"
				+ tile_path
				+ "','"
				+ create_time
				+ "','"
				+ map_bounds
				+ "','"
				+ map_name
				+ "',"
				+ user_id
				+ ","
				+ start_time
				+ ","
				+ end_time
				+ ","
				+ regiontype
				+")";

		Query query = (Query) session.createSQLQuery(sql);
		// update people_count in user
		String hql_get_count = "SELECT map_count FROM User where user_id = "
				+ user_id;
		int count = (Integer) sessionFactory.getCurrentSession()
				.createQuery(hql_get_count).uniqueResult();
		count++;
		String sql_update_user = "UPDATE public.user SET map_count=" + count
				+ " WHERE user_id=" + user_id;
		System.out.println("my sql" + sql_update_user);
		Query query_update_user = (Query) session
				.createSQLQuery(sql_update_user);
		query_update_user.executeUpdate();

		return query.executeUpdate();
	}

	public Object recentmap(int regiontype) {
		String sql = "select map from Map map where map.map_id = (select max(map_id) from Map m where m.regiontype = "+regiontype+")";
		Map entity = (Map) sessionFactory.getCurrentSession().createQuery(sql).setCacheable(true).uniqueResult();
		return entity;
	}
	
	@Override
	public Object eventmap(int dynastyid) {
		String sql = "select map from Map map where map.map_id = (select max(map_id) from Map m where m.dynasty_id = "+dynastyid+")";
		Map entity = (Map) sessionFactory.getCurrentSession().createQuery(sql).setCacheable(true).uniqueResult();
		return entity;
		
	}
}
