package com.hmapvis.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmapvis.bean.Place;

@Service("placeService")
@Transactional
public interface PlaceService extends BaseService<Place, Integer>{
	public Object variousplace(int dynasty_id, String place_name, String now_name, String place_loc, long start_time, long end_time, int user_id);
	public Object editplace(int place_id, String place_name, String now_name, String place_loc,int dynasty_id,int user_id);
}
