package com.hmapvis.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmapvis.bean.People;

@Service("peopleService")
@Transactional
public interface PeopleService extends BaseService<People, Integer>{
	public Object variouspeople(String people_name, String people_character, 
			String temple_title, String people_summary, String people_influ, 
			 int education_id, int dynasty_id, String birthplace, String people_detail,  
			  String birthday, String deathday, int job_id, int user_id);
//	public List<People> fetchPeopleInRelation(String people_name);
	public List<People> fetchRelatedPeopleList(List<Integer> relatedPeopleId);
	public List<People> peoplequery(String people_name, String birthday, String deathday,
			 int dynasty_id ,String dynasty_name,int job_id, String job_name,
			 int education_id,String education_name);
}
