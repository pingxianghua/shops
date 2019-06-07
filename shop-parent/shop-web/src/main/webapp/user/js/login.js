$(function(){

	init();//页面元素初始化
	
	//按回车键触发事件
	$(document).on("keydown", function(event) {
		if (event.keyCode == 13) {
			jqLoginName.blur();
			jqLoginSubmit.trigger("click");
		}
	});
	
	jqLoginName.blur(function() {
		commonBlur($(this),'\u8BF7\u8F93\u5165\u767B\u9646\u540D');//请输入登陆名
	});
	
	jqLoginPwd.blur(function() {
		commonBlur($(this),'\u8BF7\u8F93\u5165\u5BC6\u7801');//请输入密码
		var $tip=jqCapslockTip;
		$tip.removeClass("z-ui-tooltips-in");//隐藏键盘开启
	});
	
	//密码框判断大写键盘开启
	jqLoginPwd.keypress(function (event) {
		var $tip=jqCapslockTip;
	    var e = event || window.event,
	            kc = e.keyCode || e.which, // 按键的keyCode
	            isShift = e.shiftKey || (kc == 16 ) || false; // shift键是否按住
	    if (((kc >= 65 && kc <= 90) && !isShift) || ((kc >= 97 && kc <= 122) && isShift)) {
	            $tip.addClass("z-ui-tooltips-in");
	    }
	    else {
	            $tip.removeClass("z-ui-tooltips-in");
	    }
	});
	
	//登陆页提交按钮
	jqLoginSubmit.click(function(event){
		event.preventDefault();
		setTimeout(formSubmit(), 100);
	});
	
});

/**
 * 页面元素初始化
 */
function init(){
	this.jqLoginName = $("#J_login_name");
	this.jqLoginPwd = $("#J_login_pwd");
	this.jqLoginSubmit = $("#J_login_submit");
	this.jqCapslockTip = $("#J_capslock_tip");
	this.jqRememberName = $("#J_remember_username");
	this.jqBackgroundImage = $("#J_background_image");
	
	//获取登陆页面的广告,设置登陆页背景图片,暂时不会p图,先用别人的
	loadAdvertImage();
	
	//记住用户名判断
	if ($.cookie("J_remember_username") == "true") {
		jqRememberName.prop("checked", true);
        jqLoginName.val($.cookie("loginName"));
    }
}

function loadAdvertImage(){
	$.ajax({
		url : _ctx+"/advert/imagePath",//转广告接口获取图片路径
		type : "get",
		dataType : "json",
		data : {},
		success : function(data) {
			var imagePath=data.imagePath;
//			var imagePath='https://img.vipstatic.com/upload/flow/2017/03/15/56/14895798793129.jpg';
			jqBackgroundImage.css("background-image",'url("'+imagePath+'")');
		}
	})
}

/**
 * 表单提交
 */
function formSubmit(){
	var submitBtn = jqLoginSubmit;
	var $tip=jqLoginPwd.closest(".u-form-item").next(".u-form-tip");
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
 * 验证登陆名
 */
function validLoginName(obj){
	this.$tip=obj.closest(".u-form-item").next(".u-form-tip");
	var _val = obj.val().replace(
			/\s/g, "");
	var isVaild = "";
	var msg = "";
	obj.val(_val);
	if (_val == "") {
		isVaild = "error";
		msg = "\u8BF7\u8F93\u5165\u767B\u9646\u540D";//请输入登陆名
	} else if (!/^[0-9a-zA-Z@\.\-_]+$/
			.test(_val)) {
		isVaild = "error";
		msg = "\u767B\u9646\u540D\u6709\u8BEF";//登陆名有误
	}
	this.$tip.html(msg);
	return isVaild == "";
}

/**
 * 验证密码
 */
function validpwd(obj){
	this.$tip=obj.closest(".u-form-item").next(".u-form-tip");
	var _val = obj.val().replace(
			/\s/g, "");
	var isVaild = "";
	var msg = "";
	obj.val(_val);
	if (_val == "") {
		isVaild = "error";
		msg = "\u8BF7\u8F93\u5165\u5BC6\u7801";//请输入密码
	}
	this.$tip.html(msg);
	return isVaild == "";
}

/**
 * 提交表单验证
 */
function validsubmit(){
	var result = true;
	if (!validLoginName(jqLoginName))
		result = false;
	if (!validpwd(jqLoginPwd))
		result = false;
	return result
}

/**
 * 登陆页失去焦点,弹出消息,公共方法
 */
function commonBlur(obj,message){
	this.$tip=obj.closest(".u-form-item").next(".u-form-tip");
	obj.removeClass("z-input-error z-input-success");
	var msg='';
	if($.trim(obj.val())==''){
		obj.addClass("z-input-error");
		msg=message;
	}else{
		obj.addClass("z-input-success");
	}
	this.$tip.html(msg);
}

function saveUserInfo() {
    if ((jqRememberName.prop("checked") == true) || (jqRememberName.prop("checked") == "checked")) {
        $.cookie("J_remember_username", "true", { expires: 7 }); // 存储一个带7天期限的 cookie 是否已经选择记录用户名
        $.cookie("loginName", jqLoginName.val(), { expires: 7 }); // 存储一个带7天期限的 cookie
    }
    else {
        $.cookie("J_remember_username", null);        // 删除 cookie
        $.cookie("loginName", null);
    }
}





