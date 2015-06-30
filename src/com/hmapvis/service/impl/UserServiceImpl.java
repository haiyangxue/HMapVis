package com.hmapvis.service.impl;

import org.hibernate.Query;
import org.springframework.stereotype.Service;

import com.hmapvis.bean.User;
import com.hmapvis.service.UserService;

@Service("userService")
public class UserServiceImpl extends BaseServiceImpl<User,Integer> implements UserService {
	
	public int findNum(){
		int num=0;
		String hql="SELECT MAX(user_id) AS num FROM user";
		num = (Integer) sessionFactory.getCurrentSession().createQuery(hql).uniqueResult();
		return num;
	}
	public User getUserByName(String user_name){
		String hql = "FROM User u WHERE u.user_name=:user_name";
		Query query = sessionFactory.getCurrentSession().createQuery(hql)
						.setParameter("user_name", user_name);
		return (User)query.uniqueResult();
	}
}
