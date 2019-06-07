/**
 * 
 */
package com.shop.web.controller.front.account;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSON;
import com.shop.base.exception.ServiceException;
import com.shop.base.util.Validator;
import com.shop.web.common.Constants;
import com.shop.web.controller.BaseController;
import com.shop.web.service.core.util.LoginUserHolder;
import com.shop.web.service.core.util.MD5;
import com.shop.web.service.po.User;
import com.shop.web.service.service.UserService;

/**
 * @author lenovo-pc
 *
 */
@Controller
@RequestMapping("user")
public class UserController extends BaseController
{
    private static final Logger logger=LoggerFactory.getLogger(UserController.class);
    private static final String toIndex = "redirect:/";//转到门户首页
    private static final String toLogin = "/user/login";//转到登陆界面,forword方式 地址不变
    
    @Autowired
    private UserService userService;
    
    /**
     * 转到登陆页面
     * @return
     */
    @RequestMapping("/toLogin")
    public String toLogin() {
    	logger.debug("toLogin...");
    	return toLogin;
    }
    
    /**
     * 转到注册页面
     * @return
     */
    @RequestMapping("/toRegister")
    public String toRegister() {
    	logger.debug("toRegister...");
    	return "/user/register";
    }
    
    /**
     * 转到首页
     * @return
     */
    @RequestMapping("/toIndex")
    public String toIndex() {
    	logger.debug("toIndex...");
    	return toIndex;
    }
    
    /**
     * 用户登陆
     * @return ajax:haslogin,error,success
     */
    @RequestMapping("/doLogin")
    public void doLogin(HttpServletRequest request, HttpServletResponse response) {
        logger.debug("doLogin...begin...");
        Map<String,String> returnMap = new HashMap<String, String>();
        try {
        	//用户已经登陆
			if (LoginUserHolder.getLoginAccount() != null) {
				throw new ServiceException("haslogin", "用户已经登陆");
			}
			
			String loginName=request.getParameter("loginName");
			String password=request.getParameter("password");
			//检验登陆名和密码,判断用户输入的是邮箱，手机号还是用户名
			User user = checkLoginNameAndPassword(loginName, password);
			
			if(user==null){
				throw new ServiceException("error", "登陆名或者密码有误");
			}
			
			returnMap.put(Constants.LOGIN_AJAX_CODE, "success");
			ajaxResponse(response, JSON.toJSONString(returnMap));
			//记住用户登陆信息
			remUserLoginInfo(user);
			
		} catch (ServiceException e) {
			//处理业务异常
			logger.debug(e.getMessage());
			returnMap.put(Constants.LOGIN_AJAX_CODE, e.getErrorCode());
			returnMap.put(Constants.LOGIN_AJAX_MSG, e.getMessage());
			ajaxResponse(response, JSON.toJSONString(returnMap));
		} catch (Exception e) {
			logger.error("网络异常",e);
		}
        logger.debug("doLogin...end...");
    }

    /**
     * 检验登陆名和密码
     * @param loginName
     * @param password
     * @return user
     */
	private User checkLoginNameAndPassword(String loginName, String password) {
		if(StringUtils.isEmpty(loginName)){
			throw new ServiceException("error", "请输入登陆名");
		}
		if(StringUtils.isEmpty(password)){
			throw new ServiceException("error", "请输入密码");
		}
		User user=null;
		password=MD5.md5(password);
		if(Validator.isMobile(loginName)){
			user=userService.selectOneByPhone(loginName, password);
		}else if(Validator.isEmail(loginName)){
			user=userService.selectOneByEmail(loginName, password);
		}else{
			user=userService.selectOneByUserName(loginName, password);
		}
		return user;
	}

    /**
     * 更新用户登陆信息
     * @param user
     * @throws UnsupportedEncodingException
     */
	private void remUserLoginInfo(User user) throws UnsupportedEncodingException {
//		user.setLoginType(LoginTypeEnum.system);//登陆方式
//		RequestHolder.getSession().setAttribute(FrontContainer.USER_INFO, user);
//		String id=user.getId();
//		String lastLoginIp=AddressUtils.getIp(RequestHolder.getRequest());
//		user.clear();
//		user.setId(id);
//		user.setLastLoginTime("yes");
//		user.setLastLoginIp(lastLoginIp);
//		String address = AddressUtils.getAddresses("ip=" + lastLoginIp, "utf-8");
//		user.setLastLoginArea(address);
//		userService.update(user);
	}

    /**
     * 记住用户名
     * @param request
     * @param response
     * @param loginName
     * @throws UnsupportedEncodingException 
     */
	private void remUserMethod(HttpServletRequest request, HttpServletResponse response, String loginName) throws UnsupportedEncodingException{
		String remUser=request.getParameter("remUser");
		if("true".equals(remUser)){
			String cookieLoginName=getCookie(request);
			if(cookieLoginName==""||!cookieLoginName.equals(loginName)){
				Cookie cookie = new Cookie("loginName",URLEncoder.encode(loginName,"utf-8"));
				//设置时间为1年
				cookie.setMaxAge(365*24*3600);   
				cookie.setPath("/");
				//把cookie给浏览器
				response.addCookie(cookie);
			}
		}
	}
    
    //获得cookie
	public String getCookie(HttpServletRequest request) throws UnsupportedEncodingException {
		Cookie cookies[] = request.getCookies();
		for (int i = 0; cookies != null && i < cookies.length; i++) {
			Cookie cookie = cookies[i];
			if (cookie.getName().equals("loginName")) {
				return URLDecoder.decode(cookie.getValue(),"utf-8");
			}
		}
		return "";
	}
}
