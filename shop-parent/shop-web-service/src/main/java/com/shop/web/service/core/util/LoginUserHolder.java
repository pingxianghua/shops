package com.shop.web.service.core.util;

import javax.servlet.http.HttpSession;

import com.shop.web.service.core.FrontContainer;
import com.shop.web.service.po.User;

/**
 * Created by pingxh
 */
public class LoginUserHolder {
//    public static User getLoginUser(){
//        HttpSession session = RequestHolder.getSession();
//        return session == null ? null : (User)session.getAttribute(ManageContainer.manage_session_user_info);
//    }
    public static User getLoginAccount(){
        HttpSession session = RequestHolder.getSession();
        return session == null ? null : (User)session.getAttribute(FrontContainer.USER_INFO);
    }
}
