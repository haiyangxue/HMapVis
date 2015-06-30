package com.hmapvis.service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmapvis.bean.Admin;
import com.hmapvis.service.BaseService;

@Service("adminService")
@Transactional
public interface AdminService extends BaseService<Admin, Integer>{
    
}
