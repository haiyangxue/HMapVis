package com.hmapvis.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hmapvis.bean.User;
import com.hmapvis.service.BaseService;

@Service("userService")
@Transactional
public interface UserService extends BaseService<User, Integer>{
	public int findNum();
	public User getUserByName(String user_name);
}

