package com.hmapvis.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.hmapvis.bean.EventRela;

@Service("eventrelaService")
@Transactional
public interface EventRelaService extends BaseService<EventRela, Integer> {
	public List<EventRela> eventrelation(int event_id );
	public Object saveeventrelation(int event_id1,int event_id2,int relation_id);
}
