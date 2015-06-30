package com.hmapvis.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmapvis.bean.PeopleRelation;

@Service("peoplerelationService")
@Transactional
public interface PeopleRelationService extends BaseService<PeopleRelation, Integer>{
	public List<List<Integer>> fetchRelatedPeopleId(int coreId);
}
