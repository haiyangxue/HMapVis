package com.hmapvis.service.impl;

import org.springframework.stereotype.Service;

import com.hmapvis.bean.Building;

import com.hmapvis.service.BuildingService;


@Service("buildingService")
public class BuildingServiceImpl extends BaseServiceImpl<Building,Integer> implements
		BuildingService {

}
