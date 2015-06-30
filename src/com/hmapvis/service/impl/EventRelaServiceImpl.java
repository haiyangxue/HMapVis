package com.hmapvis.service.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.classic.Session;
import org.springframework.stereotype.Service;

import com.hmapvis.bean.EventRela;
import com.hmapvis.service.EventRelaService;

@Service("eventrelaService")
public class EventRelaServiceImpl extends BaseServiceImpl<EventRela, Integer>
		implements EventRelaService {

	public List<EventRela> eventrelation(int event_id) {
		
		String hql = "select e from EventRela e where e.event_id1 = "+event_id;
		List<EventRela> list = (List<EventRela>) sessionFactory.getCurrentSession().createQuery(hql).setCacheable(true).list();
		return list;
	}

	public Object saveeventrelation(int event_id1, int event_id2,
			int relation_id) {
		Session session = sessionFactory.getCurrentSession();

		String sql_insert_event_relation = "insert into event_rela (event_id1,event_id2,relation_id) values "
				+ "("
				+ event_id1
				+ ","
				+ event_id2
				+ ","
				+ relation_id + ")";
		Query query_insert_event_relation  = (Query) session
				.createSQLQuery(sql_insert_event_relation);
		return query_insert_event_relation.executeUpdate();
		
	}

}
