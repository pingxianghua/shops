package com.shop.web.service.dao;

import org.apache.ibatis.annotations.Param;

import com.shop.web.service.po.User;

/**
 * @author lenovo-pc
 *
 */
public interface UserDao
{
	/**
	 * 根据邮箱登陆
	 * @param email
	 * @param password
	 * @return
	 */
	public User selectOneByEmail(@Param("email") String email
			,@Param("password") String password);
	/**
	 * 根据手机号登陆
	 * @param mobilePhone
	 * @param password
	 * @return
	 */
	public User selectOneByPhone(@Param("mobilePhone") String mobilePhone
			,@Param("password") String password);
	/**
	 * 根据用户名登陆
	 * @param userName
	 * @param password
	 * @return
	 */
	public User selectOneByUserName(@Param("userName") String userName
			,@Param("password") String password);
	
    public User selectOne(User user);
}
