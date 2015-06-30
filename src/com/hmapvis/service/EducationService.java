package com.hmapvis.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmapvis.bean.Education;


@Service("educationService")
@Transactional
public interface EducationService extends BaseService<Education, Integer>{

}
