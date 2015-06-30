package com.hmapvis.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmapvis.bean.PeopleEvent;


@Service("peopleeventService")
@Transactional
public interface PeopleEventService extends BaseService<PeopleEvent, Integer>{

}
