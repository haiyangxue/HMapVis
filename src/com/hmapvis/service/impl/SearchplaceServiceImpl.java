package com.hmapvis.service.impl;

import org.springframework.stereotype.Service;

import com.hmapvis.bean.Place;
import com.hmapvis.service.SearchplaceService;
import com.hmapvis.service.ShowplaceService;

@Service("searchplaceService")
public class SearchplaceServiceImpl extends BaseServiceImpl<Place, Integer>
		implements SearchplaceService {

}
