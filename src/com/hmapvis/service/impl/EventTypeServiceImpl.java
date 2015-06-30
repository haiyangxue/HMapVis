package com.hmapvis.service.impl;

import org.springframework.stereotype.Service;

import com.hmapvis.bean.EventType;
import com.hmapvis.service.EventTypeService;

@Service("eventtypeService")
public class EventTypeServiceImpl extends BaseServiceImpl<EventType,Integer> implements EventTypeService {
	
}
