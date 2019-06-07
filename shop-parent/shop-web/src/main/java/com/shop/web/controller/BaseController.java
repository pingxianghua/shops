package com.shop.web.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 所有controller基类
 * @author lenovo-pc
 *
 */
public abstract class BaseController {
	private static final Logger logger=LoggerFactory.getLogger(BaseController.class);
	/**
     * ajax公用方法
     * @param response
     * @param message
     * @throws IOException
     */
    protected void ajaxResponse(HttpServletResponse response, String message){
		try {
			response.setContentType("application/json;charset=utf-8");
			response.getWriter().write(message);
			response.getWriter().flush();
		} catch (IOException e) {
			logger.error("网络异常",e);
		}
	}
}
