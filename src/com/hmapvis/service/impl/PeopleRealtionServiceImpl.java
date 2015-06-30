package com.hmapvis.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hmapvis.bean.PeopleRelation;
import com.hmapvis.service.PeopleRelationService;

@Service("peoplerelationService")
public class PeopleRealtionServiceImpl extends
		BaseServiceImpl<PeopleRelation, Integer> implements
		PeopleRelationService {
	public List<List<Integer>> fetchRelatedPeopleId(int coreId) {
		List<List<Integer>> relatedPeopleId = null;
		try {
			String sql = "FROM PeopleRelation o where o.people_id1=" + coreId + " or o.people_id2=" + coreId;
			List<PeopleRelation> peopleInRelations = (List<PeopleRelation>) sessionFactory.getCurrentSession().createQuery(sql).list();
			
			relatedPeopleId = new ArrayList<List<Integer>>();
			List<Integer> core = new ArrayList<Integer>();
			core.add(coreId);
			core.add(0);
			relatedPeopleId.add(core);
			for (int i = 0; i < peopleInRelations.size(); i++) {
				PeopleRelation peoplerelation = peopleInRelations.get(i);
				int relatedId = 0;
				if (peoplerelation.getPeople_id1() == coreId)
					relatedId = peoplerelation.getPeople_id2();
				else
					relatedId = peoplerelation.getPeople_id1();
				List<Integer> relatedIdAndRelationId = new ArrayList<Integer>();
				relatedIdAndRelationId.add(relatedId);
				relatedIdAndRelationId.add(peoplerelation.getRelation_id());
				
				relatedPeopleId.add(relatedIdAndRelationId);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return relatedPeopleId;
	}
}
