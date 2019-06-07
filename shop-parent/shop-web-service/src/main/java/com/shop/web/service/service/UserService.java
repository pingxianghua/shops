package com.shop.web.service.service;

import com.shop.web.service.po.User;

public interface UserService {
	
	/**
	 * 根据邮箱登陆
	 * @param email
	 * @param password
	 * @return
	 */
	public User selectOneByEmail(String email,String password);
	/**
	 * 根据手机号登陆
	 * @param mobilePhone
	 * @param password
	 * @return
	 */
	public User selectOneByPhone(String mobilePhone,String password);
	/**
	 * 根据用户名登陆
	 * @param userName
	 * @param password
	 * @return
	 */
	public User selectOneByUserName(String userName,String password);

	/**
     * @param e
     * @return
     */
	User selectOne(User user);
}
