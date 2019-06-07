package com.shop.web.service.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.web.service.dao.UserDao;
import com.shop.web.service.po.User;
import com.shop.web.service.service.UserService;

@Service("userService")
public class UserServiceImpl implements UserService{
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
    private UserDao userDao;
	
	/**
	 * 根据邮箱登陆
	 * @param email
	 * @param password
	 * @return user
	 */
	@Override
	public User selectOneByEmail(String email,String password){
		return userDao.selectOneByEmail(email, password);
	}
	
	/**
	 * 根据手机号登陆
	 * @param mobilePhone
	 * @param password
	 * @return user
	 */
	@Override
	public User selectOneByPhone(String mobilePhone,String password){
		return userDao.selectOneByPhone(mobilePhone, password);
	}
	
	/**
	 * 根据用户名登陆
	 * @param userName
	 * @param password
	 * @return user
	 */
	@Override
	public User selectOneByUserName(String userName,String password){
		return userDao.selectOneByUserName(userName, password);
	}
	
	@Override
	public User selectOne(User user){
		return userDao.selectOne(user);
	}
}
