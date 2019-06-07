<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset=UTF-8"UTF-8">
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=8">
<meta name="renderer" content="webkit"/>
<title>爱上快购网站注册</title> 
<%@ include file="/common/common.jsp"%>
<link href="${ctx}/resource/css/passport_login_vip.css" type="text/css"
	rel="stylesheet" />
<link href="${ctx}/resource/css/floating_vip.css" type="text/css"
	rel="stylesheet" />
<link href="${ctx}/resource/css/vui_vip.css" type="text/css"
	rel="stylesheet" />
<link href="${ctx}/resource/css/passport_login_new_vip.css" type="text/css"
	rel="stylesheet" />
</head>
<body class="regSingle">
<div class="layout">
	<div class="header" passport_mars_sead_hover>
        <a href="http://www.23kgou.com/" class="logo sprite" id="for-cascade-login-link"></a>
        <div class="bannerHeader sprite"></div>
        <div class="u-ad-header J-ads" data-adsid="ADSBAZW9" data-tpl="#J-ADSBAZW9-tpl"></div>
        <script id="J-ADSBAZW9-tpl" type="text/html"><img src="{{ img }}" width="445" height="30" alt="{{ name }}"></script>
    </div>
	<div class="content J-ads clear" data-adsid="ADS9757C" data-bg="true" style="background-image:none;">
		<div class="regForm">
			<input type="hidden" name="vipc" value="c116a2c2c4194cf5a645d6190fcc11fc" />
			<div class="regHeaderTip">
				<span class="fl">
				欢迎注册
				</span>
				<span class="fr f12" passport_mars_sead_hover>已注册可<a href="${ctx}/user/toLogin.html" class="red hvLine" id="J_normal_loginlink">直接登录</a></span>
			</div>
<div id="reg-form-wrapper">
	<div class="ui-tips-big ui-tips1 hidden">
		<i class="vipFont if-sigh">&#xe603;</i>
		<a href="javascript:;" role="button" class="close">&times;</a>
		<p class="info"><i class="vipFont if-sigh">&#xe603;</i><span class="info-msg"></span></p>
	</div>
	<form id="reg_mobile_form" action="" method="post" autocomplete="off" class="register-form hidden">
	    
	    <div class="control-group clearfix">
	        <div class="ui-form-item-group">
	            <input type="text" class="ui-input ipt-phone" id="J_mobile_name" name="loginName" placeholder="请输入手机号码" passport_mars_sead_hover passport_mars_sead_input='mobileRegMobile'/>
	        </div>
	    </div>
	    
	    <div class="control-group clearfix">
	        <div class="ui-form-item-group">
	            <input type="password" class="ui-input" id="J_mobile_pwd" name="password" maxlength="20" placeholder="密码由6-20位字母，数字和符号组合" passport_mars_sead_hover passport_mars_sead_input='mobileRegPw'/>
	        </div>
	    </div>
	    	<div class="pure-control-group">
		        <div class="strength-indicator">
		            <span class="indicator-item section-weak"></span>
		            <span class="indicator-item section-medium"></span>
		            <span class="indicator-item section-strong"></span>
		            <span class="indicator-text text-weak">弱</span>
		            <span class="indicator-text text-medium">中</span>
		            <span class="indicator-text text-strong">强</span>
		        </div>
		    </div>
	    
	    <div class="control-group clearfix">
	        <div class="ui-form-item-group">
	        	<div class="ui-tooltips ui-tooltips-info ui-tooltips-bottom-left-arrow custom-tooltips-info">
                    <div class="ui-tooltips-arrow">
                        <i class="arrow arrow-out">&#9670;</i>
                        <i class="arrow">&#9670;</i>
                    </div>
                    <div class="ui-tooltips-content">
                        <p class="validator-msg"></p>
                    </div>
                </div>
	            <input type="password" class="ui-input confirm-pwd" id="J_mobile_confirm_pwd" name="confirmPassword" maxlength="20" placeholder="请再次输入上面的密码" passport_mars_sead_hover passport_mars_sead_input='mobileRegCPw'/>
	        </div>
	    </div>

	    
	    <div class="control-group clearfix">
	        <div class="ui-form-item-group adjust-success">
	        	<div class="ui-tooltips ui-tooltips-info ui-tooltips-bottom-left-arrow custom-tooltips-info">
                    <div class="ui-tooltips-arrow">
                        <i class="arrow arrow-out">&#9670;</i>
                        <i class="arrow">&#9670;</i>
                    </div>
                    <div class="ui-tooltips-content">
                        <p class="validator-msg"></p>
                    </div>
                </div>
	            <input id="J_mobile_code" type="text" class="ui-input ipt-verify-code" name="pvcode" placeholder="短信验证码" passport_mars_sead_hover passport_mars_sead_input='mobileRegMobileCode'/><a href="javascript:;" role="button" id="J_mobile_verifycode_btn" class="ui-btn-medium ui-btn-disable btn-verify-code" passport_mars_sead_hover>获取验证码</a>
	        </div>
	    </div>
		    <div class="control-group mb30 clearfix">
		        <a href="javascript:;" role="button" id="J_mobile_reg_button" class="ui-btn-large ui-btn-primary ui-btn-loading reg-form-btn form-submit" passport_mars_sead_hover>
		            <span class="ui-btn-loading-before">立即注册</span>
		            <span class="ui-btn-loading-after"><i class="ii-loading-gray-16x16"></i><span class="ui-btn-txt">处理中...</span></span>
		        </a>
		        	<a href="javascript:;" class="entrance-link reg-form-link" id="J_mobile_to_email" passport_mars_sead_hover>通过邮箱注册</a>
		    </div>
		    <div class="control-group clearfix">
		    	<div class="ui-form-item-group">
			        <span class="ui-checkbox mr0">
			            <input type="checkbox" id="J_mobile_agree" name="agree" class="ui-checkbox-normal" checked="checked" value="1"><label for="J_mobile_agree" class="ui-checkbox-simulation"></label>
			        </span>
			        <label for="J_mobile_agree" class="ui-label f-12">我已阅读并接受<a href="" class="red" target="_blank" id="J_mobile_provision">《爱上快购用户注册协议》</a>。</label>
		        </div>
		    </div>
	</form>
	<form id="reg_email_form" action="" method="post" autocomplete="off" class="register-form">
	    
	    <div class="control-group clearfix">
	        <div class="ui-form-item-group">
	            <input type="text" class="ui-input" id="J_email_name" name="loginName" placeholder="请输入邮箱账号" passport_mars_sead_hover passport_mars_sead_input='emailRegEmail'/>
	        </div>
	    </div>

	    <div class="control-group clearfix">
	        <div class="ui-form-item-group">
	            <input type="password" class="ui-input" id="J_email_pwd" name="password" maxlength="20" placeholder="密码由6-20位字母，数字和符号组合" passport_mars_sead_hover passport_mars_sead_input='emailRegPw'/>
	        </div>
	    </div>
	    	<div class="pure-control-group ml85">
		        <div class="strength-indicator">
		            <span class="indicator-item section-weak"></span>
		            <span class="indicator-item section-medium"></span>
		            <span class="indicator-item section-strong"></span>
		            <span class="indicator-text text-weak">弱</span>
		            <span class="indicator-text text-medium">中</span>
		            <span class="indicator-text text-strong">强</span>
		        </div>
		    </div>

	    
	    <div class="control-group clearfix">
	        <div class="ui-form-item-group">
	        	<div class="ui-tooltips ui-tooltips-info ui-tooltips-bottom-left-arrow custom-tooltips-info">
                    <div class="ui-tooltips-arrow">
                        <i class="arrow arrow-out">&#9670;</i>
                        <i class="arrow">&#9670;</i>
                    </div>
                    <div class="ui-tooltips-content">
                        <p class="validator-msg"></p>
                    </div>
                </div>
	            <input type="password" class="ui-input confirm-pwd" id="J_email_confirm_pwd" name="confirmPassword" maxlength="20" placeholder="请再次输入上面的密码" passport_mars_sead_hover passport_mars_sead_input='emailRegCPw'/>
	        </div>
	    </div>
	    
		    <div class="control-group mb30 clearfix">
		        <a href="javascript:;" role="button" id="J_email_reg_button" class="ui-btn-large ui-btn-primary ui-btn-loading reg-form-btn form-submit">
		            <span class="ui-btn-loading-before" passport_mars_sead_hover>立即注册</span>
		            <span class="ui-btn-loading-after"><i class="ii-loading-gray-16x16"></i><span class="ui-btn-txt">处理中...</span></span>
		        </a>
		        <a href="javascript:;" class="entrance-link reg-form-link" id="J_email_to_mobile" passport_mars_sead_hover>手机快速注册(暂不启用)</a>
		    </div>
		    <div class="control-group clearfix">
		    	<div class="ui-form-item-group">
		    		<div class="ui-tooltips ui-tooltips-warning validator-tooltips-warning ui-tooltips-bottom-left-arrow"><div class="ui-tooltips-arrow"><i class="arrow arrow-out">◆</i><i class="arrow">◆</i></div><div class="ui-tooltips-content"><p class="ui-tooltips-msg validator-msg">接受服务条款才能注册</p></div></div>
			        <span class="ui-checkbox mr0">
			            <input type="checkbox" id="J_email_agree" name="agree" class="ui-checkbox-normal" checked="checked" value="1"><label for="J_email_agree" class="ui-checkbox-simulation"></label>
			        </span>
			        <label for="J_email_agree" class="ui-label f-12">我已阅读并接受<a href="" class="red" target="_blank" id="J_email_provision">《爱上快购用户注册协议》</a>。</label>
		        </div>
		    </div>
	</form> 
</div>
<script type="text/javascript">
		var isThirdLogin = false;
</script>
		</div>
	</div>
<div class="footer">
		<div class="copyright">©2016 爱上快购 版权所有 苏ICP备15039054号</div>
</div></div>
<div id="dialog_tip">
    <div class="ui-window-mask"></div>
    <div class="ui-dialog ui-dialog-task ui-dialog-large" id="j-dialog-medium"> 
        <h2 class="ui-dialog-title">温馨提示</h2> 
        <div class="ui-dialog-inner"> 
            <a href="javascript:;" role="button" class="ui-dialog-close vipFont" id="mailbox_close">&#xe609;</a>
            <div class="ui-dialog-content"> 
                <div class="main_title f-cb">
                    <i class="vipFont if-sigh if-size-32 fl">&#xe603;</i>
                    <label>还差一步就注册成功啦，完成验证，购物更安心</label>
                </div>
                <div class="main_p">
                    验证邮件已发送到您的&nbsp;<span class="bolder mail_account"></span>&nbsp;邮箱，请在24小时内登录邮箱，点击邮件中的链接完成注册。
                </div>
            </div> 
            <div class="ui-dialog-command">
                <div class="main_button f-cb">
                    <a href="javascript:;" role="button" class="ui-btn-medium ui-btn-primary fl login_mailbox" id="J_login_mainbox">立即登录邮箱</a>
                    <label class="fl">没收到？<a href="javascript:;" class="c_blue repeat_send" id="J_repeat_send">重新发送</a></label>
                </div>
                <div class="main_tip">
                    <p class="none success_tip">已发送<span class="c_vip tip_time">120</span><span class="c_vip">s</span>，请注意查收</p>
                    <p class="none ml-10 failure_tip">系统异常，重新发送试试</p>
                </div>
            </div> 
        </div> 
    </div>
</div>
</body>
<script type="text/javascript" src="${ctx}/resource/js/jquery-3.1.1.min.js"></script>
<script src="${ctx}/resource/js/tip.jquery.js"  type="text/javascript"></script>
<script src="${ctx}/user/js/register.js" type="text/javascript"></script>
</html>