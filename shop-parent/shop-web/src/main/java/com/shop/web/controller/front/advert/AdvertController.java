package com.shop.web.controller.front.advert;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.shop.web.controller.BaseController;

/**
 * 广告管理接口层
 * @author lenovo-pc
 *
 */
@Controller
@RequestMapping("advert")
public class AdvertController extends BaseController {
	private static final Logger logger=LoggerFactory.getLogger(AdvertController.class);

	/**
	 * 获取广告图片路径
	 * @return
	 */
	@RequestMapping("/imagePath")
	public void getAdvertImagePath(HttpServletRequest request, HttpServletResponse response){
//		Advert advert_login_page = SystemManager.advertMap.get("advert_login_page");
//		response.setContentType("text/html");
//		if(advert_login_page!=null){
//			Map<String,String> returnMap=new HashMap<String, String>();
//			returnMap.put("imagePath", advert_login_page.getHtml());
//			try {
//				ajaxResponse(response, JSON.toJSONString(returnMap));
//			} catch (IOException e) {
//				logger.error("网络异常",e);
//			}
//		}
		
	}
}
