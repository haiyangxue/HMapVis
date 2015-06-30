package com.hmapvis.service;

import java.sql.Timestamp;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmapvis.bean.Map;

@Service("mapService")
@Transactional
public interface MapService extends BaseService<Map, Integer> {
	public Object variousmap(int dynasty_id, String tile_path, Timestamp create_time,
			String map_bounds, String map_name, int user_id, long start_time,
			long end_time, int regiontype);
	public Object recentmap(int regiontype );
	public Object eventmap(int dynastyid );
}
