var validResult={isValid:false,msg:'\u8BF7\u8F93\u5165\u60A8\u7684\u90AE\u7BB1\u8D26\u53F7'};//请输入您的邮箱账号
var letterPattern = /[a-zA-Z]+/;
var numbericPattern = /[0-9]+/;
var specialPattern = /[\(!@#\$%\^&\*\),\._]+/;
var illegalPattern = /[^a-zA-Z0-9\(!@#\$%\^&\*\),\._]+/;
$(function(){

	init();//页面元素初始化
	
	//邮箱账号获得焦点
	emName.focus(function() {
		removeWarning($(this));
		if(!validResult.isValid){
			tipMsg($(this),validResult.msg);
		}
	});
	
	//邮箱账号失去焦点
	emName.blur(function() {
		validResult=validEmName($(this));
		if(!validResult.isValid){
			addWarning($(this));
		}
	});
	
	//密码keyup事件
	emPassword.keyup(function(e) {
		checkStrength(e);
	});
	
	//密码获得焦点
	emPassword.focus(function() {
		var _value=$.trim($(this).val());
		removeWarning($(this));
		var result=validate($(this));
		if(!result.success){
			tipMsg($(this),result.message);
		}
	});
	
	//密码失去焦点
	emPassword.blur(function() {
//		var _value=$.trim($(this).val());
//		result=validate(_value);
		if(!validate($(this)).success){
			addWarning($(this));
		}
	});
	
	//确认密码获得焦点
	emConfirmPassword.focus(function() {
		var _value=$.trim($(this).val());
		removeWarning($(this));
		if(_value==''){
			tipMsg($(this),'\u8BF7\u8F93\u5165\u786E\u8BA4\u5BC6\u7801');//请输入确认密码
		}else if(_value!==emPassword.val()){
			tipMsg($(this),'\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u8bd5');//两次输入的密码不一致，请重试
		}
	});
	
	//确认密码失去焦点
	emConfirmPassword.blur(function() {
		var _value=$.trim($(this).val());
		if(_value=='' || _value!==emPassword.val()){
			addWarning($(this));
		}
	});
	
	//同意协议单选框点击事件
	emAgree.click(function() {
		var $agreeChecked = emAgree.filter(":checked");//验证是否勾选协议
		if ($agreeChecked.length > 0) {
			var $el=emAgree;
			var $parent =$el.parents("."
					+ "ui-form-item-group");
			if($parent.hasClass("z-ui-form-item-warning")){
				$parent.removeClass("z-ui-form-item-warning");
			}
			if($parent.first().hasClass("z-ui-tooltips-in")){
				$parent.first().removeClass("z-ui-tooltips-in");
			}
		}
	});
	
//	//密码框判断大写键盘开启
//	emPassword.keypress(function (event) {
//		var $target = $(event.target),$infoTips = $target
//		.parents(
//				".ui-form-item-group")
//		.find(
//				".validator-tooltips-info");
//	    var e = event || window.event,
//	            kc = e.keyCode || e.which, // 按键的keyCode
//	            isShift = e.shiftKey || (kc == 16 ) || false; // shift键是否按住
//	    if (((kc >= 65 && kc <= 90) && !isShift) || ((kc >= 97 && kc <= 122) && isShift)) {
//	    	$infoTips
//			.find(
//					".validator-msg")
//			.html(
//					"\u952e\u76d8\u5927\u5199\u9501\u5b9a\u5df2\u6253\u5f00\uff0c\u8bf7\u6ce8\u610f\u5927\u5c0f\u5199");
//	if (!$infoTips
//			.hasClass("z-ui-tooltips-in"))
//		$infoTips
//				.addClass("z-ui-tooltips-in")
//	    }
//	    else {
//	    	tipMsg($(this),'\u5BC6\u7801\u75316-20\u4F4D\u5B57\u6BCD,\u6570\u5B57\u548C\u7B26\u53F7\u7EC4\u5408');//密码由6-20位字母,数字和符号组合
//	    }
//	});
	
	
	//注册提交按钮
	emRegBtn.click(function(event){
		event.preventDefault();
		setTimeout(formSubmit(), 100);
	});
	
});

/**
 * 页面元素初始化
 */
function init(){
	this.emForm = $("#reg_email_form");
	this.emName = $("#J_email_name");
	this.emPassword = $("#J_email_pwd");
	this.emConfirmPassword = $("#J_email_confirm_pwd");
	this.emAgree = $("#J_email_agree");
	this.emRegBtn = $("#J_email_reg_button");
}

//验证密码
function validate(obj) {
	var result = {
		success : false,
		strength : "w",
		message : ""
	};
	var pwd=$.trim(obj.val());
	var len = pwd.length;
	if (len < 8) {
		result.message = "\u8bf7\u8f93\u51658-20\u4f4d\u5bc6\u7801";
		return result
	}
	if (len > 20) {
		result.message = "\u8bf7\u8f93\u51658-20\u4f4d\u5bc6\u7801";
		return result
	}
	var category = this
			.calcCharsCategory(pwd);
	if (category <= 1) {
		result.message = "\u5bc6\u7801\u8fc7\u4e8e\u7b80\u5355\uff0c\u6709\u88ab\u76d7\u98ce\u9669\uff0c\u5efa\u8bae\u60a8\u66f4\u6539\u4e3a\u590d\u6742\u5bc6\u7801";
		return result
	}
	if (category === 2)
		if (len >= 8 && len <= 11) {
			result.success = true;
			result.strength = "m"
		} else if (len > 11 && len <= 20) {
			result.success = true;
			result.strength = "s"
		} else {
			result.success = false;
			result.strength = "s"
		}
	else if (len >= 8 && len <= 9) {
		result.success = true;
		result.strength = "m"
	} else if (len > 9 && len <= 20) {
		result.success = true;
		result.strength = "s"
	} else {
		result.success = false;
		result.strength = "s"
	}
	if (this.illegalPattern.test(pwd)) {
		result.success = false;
		result.message = "\u5bc6\u7801\u4e2d\u5305\u542b\u975e\u6cd5\u5b57\u7b26"
	}
	return result
}

//验证密码规则
function calcCharsCategory(pwd) {
	var category = 0;
	if (this.letterPattern.test(pwd))
		category++;
	if (this.numbericPattern.test(pwd))
		category++;
	if (this.specialPattern.test(pwd))
		category++;
	return category
}

/**
 * 校验密码强弱
 * @param e
 */
function checkStrength(e) {
	var $target = $(e.target), $form = $target
			.parents("form"), $indicator = $form
			.find(".strength-indicator");
	result = validate($target);
	$target.parents(".control-group")
			.addClass("mb0");
	$indicator.show();
	$indicator
			.removeClass("login-pwd-w login-pwd-m login-pwd-s");
	$indicator.addClass("login-pwd-"
			+ result.strength)
}

//提示框弹出信息
function tipMsg(obj,msg){
	obj.tip({
		message:msg,  //需要显示的内容
		position:'top left' ,     //提示框显示位置和箭头位置
		hideEvent:'blur',
		top:5
	});
}

//输入框变填充色
function addWarning(obj){
	obj.parents("."
			+ "ui-form-item-group").addClass("z-ui-form-item-warning");
}

//输入框去除填充色
function removeWarning(obj){
	obj.parents("."
			+ "ui-form-item-group").removeClass("z-ui-form-item-warning");
}


/**
 * 表单提交
 */
function formSubmit(){
	var submitBtn = emRegBtn;
	if (submitBtn.hasClass("z-ui-btn-loading"))
		return false;
	if(!validsubmit())
		return false;
	submitBtn.addClass("z-ui-btn-loading");
	
	
	
	$.ajax({
		url : _ctx+"/user/doLogin",//转登陆方法
		type : "post",
		dataType : "json",
		data : {
			loginName : $.trim(jqLoginName.val()),
			password : $.trim(jqLoginPwd.val()),
			remUser : jqRememberName.prop("checked")
		},
		success : function(data) {
			if (data.code == "haslogin"){
				window.location.href = "toIndex";//转首页
			}else if (data.code == "error") {
				$tip.html(data.msg);
				submitBtn.removeClass("z-ui-btn-loading");
			} else if (data.code == "success"){
				window.location.href = "toIndex";//转首页
				saveUserInfo();
			}else {
				submitBtn.removeClass("z-ui-btn-loading");
			}
		}
	})
}

/**
 * 验证邮箱账号
 */
function validEmName(obj){
	var _val = obj.val().replace(
			/\s/g, "");
	var isVaild = "";
	var msg = "";
	obj.val(_val);
	if (_val == "") {
		isVaild = "error";
		msg = "\u8BF7\u8F93\u5165\u60A8\u7684\u90AE\u7BB1\u8D26\u53F7";//请输入您的邮箱账号
	} else if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/
			.test(_val)) {
		isVaild = "error";
		msg = "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u90AE\u7BB1\u8D26\u53F7";//请输入正确的邮箱账号
	}else if(!checkEmNameExistsOrBound()){
		isVaild = "error";
		msg = "\u90AE\u7BB1\u8D26\u53F7\u5DF2\u88AB\u6CE8\u518C\uFF0C\u8BF7\u66F4\u6362";//邮箱账号已被注册，请更换
	}
	validResult.isValid=isVaild == "";
	validResult.msg=msg;
	return validResult;
}

/**
 * 验证确认密码
 */
function validConfirmPwd(obj){
	var _value=obj.val().replace(
			/\s/g, "");
	var result = {
			success : false,
			message : ""
		};
	
	if(_value==''){
		result.message='\u8BF7\u8F93\u5165\u786E\u8BA4\u5BC6\u7801';//请输入确认密码
		return result;
	}else if(_value!==emPassword.val()){
		result.message='\u4e24\u6b21\u8f93\u5165\u7684\u5bc6\u7801\u4e0d\u4e00\u81f4\uff0c\u8bf7\u91cd\u8bd5';//两次输入的密码不一致，请重试
		return result;
	}
	result.success=true;
	return result;
}

//ajax请求查询邮箱账号是否存在
function checkEmNameExistsOrBound(){
	return true
}

/**
 * 提交表单验证
 */
function validsubmit(){
	var result = true;
	var validResult=validEmName(emName);//邮箱
	var validResultPwd=validate(emPassword);//密码
	var validResultConfirmPwd=validConfirmPwd(emConfirmPassword);//确认密码
	if (!validResult.isValid)//验证邮箱账号
		{
			addWarning(emName);
			tipMsg(emName,validResult.msg);
			result = false;
		}
	if (!validResultPwd.success)//验证密码
		{
			addWarning(emPassword);
			tipMsg(emPassword,validResultPwd.message);
			result = false;
		}
	if(!validResultConfirmPwd.success){//验证确认密码
		addWarning(emConfirmPassword);
		tipMsg(emConfirmPassword,validResultConfirmPwd.message);
		result = false;
	}
	var $agreeChecked = emAgree.filter(":checked");//验证是否勾选协议
	if ($agreeChecked.length <= 0) {
		var $el=emAgree;
		var $parent =$el.parents("."
				+ "ui-form-item-group");
		if(!$parent.hasClass("z-ui-form-item-warning")){
			$parent.addClass("z-ui-form-item-warning");
		}
		if(!$parent.first().hasClass("z-ui-tooltips-in")){
			$parent.first().addClass("z-ui-tooltips-in");
		}
		result = false;
	}
	return result
}





