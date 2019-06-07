<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset=UTF-8"UTF-8">
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="renderer" content="webkit"/>
<title>爱上快购网站登录</title> 
<%@ include file="/common/common.jsp"%>
<link href="${ctx}/resource/css/common_vip.css" type="text/css"
	rel="stylesheet" />
<link href="${ctx}/resource/css/single-function_vip.css" type="text/css"
	rel="stylesheet" />
</head>

<body>
	<div class="g-wrap">
		<div class="g-header" passport_mars_sead_hover>
			<a href="http://www.23kgou.com/" tppabs="http://www.23kgou.com/" class="u-logo"></a>
			<span class="u-promise"></span>
			<div class="u-ad-header J-ads" data-adsid="ADSBAZW9"
				data-tpl="#J-ADSBAZW9-tpl"></div>
			<script id="J-ADSBAZW9-tpl" type="text/html"><img src="{{ img }}" width="445" height="30" alt="{{ name }}"></script>
		</div>
		<div class="g-content J-ads" id="J_background_image" data-adsid="ADSJ867S" data-bg="true" style="background-image:none;">
			<div class="m-single-function" id="J_single_function">
				<div class="u-form-top-tip" id="J_head_tip">您好，请登录</div>
				<div id="J_single_login" class="m-login-panel clearfix">
					<div class="u-form-item">
						<input id="J_login_name" type="text" class="ui-input"
							name="loginName" placeholder="手机号/用户名/邮箱"
							passport_mars_sead_hover passport_mars_sead_input='loginName'>
					</div>
					<p class="u-form-tip"></p>
					<div class="u-form-item">
						<input id="J_login_pwd" type="password" class="ui-input"
							name="password" maxlength="20" placeholder="密码"
							passport_mars_sead_hover passport_mars_sead_input='password'>
						<div
							class="ui-tooltips ui-tooltips-info ui-tooltips-left-arrow u-capslock-tip"
							id="J_capslock_tip">
							<div class="ui-tooltips-arrow">
								<i class="arrow arrow-out">&#9670;</i> <i class="arrow">&#9670;</i>
							</div>
							<div class="ui-tooltips-content f-nowrap">
                                <p>请注意，键盘大写已开启</p>
                            </div>
						</div>
					</div>
					<p class="u-form-tip"></p>
					<div class="u-form-item f-hidden J_verify_code">
                        <input id="J_login_code" type="text" class="ui-input u-captcha" name="captcha"  placeholder="验证码" autocomplete="off">
                        <span id="J_verify_img_wrap" class="u-code-img"></span>
                        <a href="javascript:;" role="button" id="J_change_code" class="u-change-code">换一张</a>
                    </div>
                    <p class="u-form-tip f-hidden J_verify_code"></p>
                    <div class="u-form-submit">
                        <button type="submit" class="ui-btn-large ui-btn-primary ui-btn-loading u-submit-function" id="J_login_submit" passport_mars_sead_hover>
                            <span class="ui-btn-loading-before">登录</span>
                            <span class="ui-btn-loading-after"><i class="ii-loading-gray-16x16"></i><span class="ui-btn-txt">处理中...</span></span>
                        </button>
                    </div>
                    <div class="m-other-function">
                        <span class="f-left"><span class="ui-checkbox"><input type="checkbox" id="J_remember_username" name="remUser" class="ui-checkbox-normal" checked><label for="J_remember_username" class="ui-checkbox-simulation"></label></span><label for="J_remember_username" class="u-checkbox-label">记住用户名</label></span>
                        <span class="u-cannot-login">
                            <a href="${ctx}/user/forget.html" class="forget" target="_blank">忘记密码?</a>
                            |
                            <a href="${ctx}/user/toRegister.html" class="reg">免费注册</a>
                        </span>
                    </div>
				</div>
				<div class="m-third-login" passport_mars_sead_hover>
                    <p class="title">合作网站账号登录：</p>
                    <p class="clearfix">
                       	<a href="javascript:void(0);" tppabs="" target="_blank" title="新浪微博" class="u-third-sina" mars_sead="passport_bottom_weibo_button"></a> 
                       	<a href="javascript:void(0);" tppabs="" target="_blank" title="QQ" class="u-third-qq" mars_sead="passport_bottom_qq_button"></a> 
                       	<a href="javascript:void(0);" tppabs="" target="_blank" title="支付宝" class="u-third-alipay" mars_sead="passport_bottom_alipay_button"></a> 
                       	<a href="javascript:void(0);" tppabs="" target="_blank" title="微信" class="u-third-wechat" mars_sead="passport_bottom_weixin_button"></a> 
                    </p>
                </div>
			</div>
		</div>
		<div class="g-footer">
            <p class="u-copyright">©2016 爱上快购 版权所有 苏ICP备15039054号</p>
        </div>
	</div>
<script type="text/javascript" src="${ctx}/resource/js/jquery-3.1.1.min.js"></script>
<script src="${ctx}/resource/js/jquery.cookie.js"  type="text/javascript"></script>
<script src="${ctx}/user/js/login.js" type="text/javascript"></script>
</body>
</html>
