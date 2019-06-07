package com.shop.web.service.po;

import java.io.Serializable;

import com.shop.web.service.page.QueryModel;

/**
 * 会员表
 * 
 * @author lenovo-pc
 *
 */
public class User extends QueryModel<User> implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3716749580941150304L;
	private String userId;// 会员资料自增id
	private String aiteId;// 目前未知，可能跟第三方登陆有关
	private String email;// 会员Email
	private String userName;// 用户名
	private String password;// 用户密码
	private String question;// 密码提问
	private String answer;// 密码回答
	private String sex;// 性别 ; 0保密; 1男; 2女
	private String birthday;// 出生日期
	private String userMoney;// 用户现有资金
	private String frozenMoney;// 用户冻结资金
	private String payPoints;// 消费积分
	private String rankPoints;// 会员等级积分
	private String addressId;// 收货信息id,表值表qb_user_address
	private String regTime;// 注册时间
	private String lastLogin;// 最后一次登录时间
	private String lastTime;// 最后一次修改信息时间
	private String lastIp;// 最后一次登录IP
	private String visitCount;// 会员登陆次数
	private String userRank;// 会员等级id,取值qb_user_rank
	private String isSpecial;// 是否特殊
	private String salt;// 会员等级id,取值qb_user_rank
	private String parentId;// 推荐人会员id
	private String flag;// 标识
	private String alias;// 昵称
	private String msn;// msn账号
	private String qq;// Qq账号
	private String officePhone;// 办公电话
	private String homePhone;// 家用电话
	private String mobilePhone;// 移动电话
	private String isValidated;// 是否生效
	private String creditLine;// 最大消费
	private String passwdQuestion;// 
	private String passwdAnswer;// 
	private String mediaUID;// 
	private String mediaID;// 
	private String froms;// pc:电脑,mobile:手机,app:应用
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getAiteId() {
		return aiteId;
	}
	public void setAiteId(String aiteId) {
		this.aiteId = aiteId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getBirthday() {
		return birthday;
	}
	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}
	public String getUserMoney() {
		return userMoney;
	}
	public void setUserMoney(String userMoney) {
		this.userMoney = userMoney;
	}
	public String getFrozenMoney() {
		return frozenMoney;
	}
	public void setFrozenMoney(String frozenMoney) {
		this.frozenMoney = frozenMoney;
	}
	public String getPayPoints() {
		return payPoints;
	}
	public void setPayPoints(String payPoints) {
		this.payPoints = payPoints;
	}
	public String getRankPoints() {
		return rankPoints;
	}
	public void setRankPoints(String rankPoints) {
		this.rankPoints = rankPoints;
	}
	public String getAddressId() {
		return addressId;
	}
	public void setAddressId(String addressId) {
		this.addressId = addressId;
	}
	public String getRegTime() {
		return regTime;
	}
	public void setRegTime(String regTime) {
		this.regTime = regTime;
	}
	public String getLastLogin() {
		return lastLogin;
	}
	public void setLastLogin(String lastLogin) {
		this.lastLogin = lastLogin;
	}
	public String getLastTime() {
		return lastTime;
	}
	public void setLastTime(String lastTime) {
		this.lastTime = lastTime;
	}
	public String getLastIp() {
		return lastIp;
	}
	public void setLastIp(String lastIp) {
		this.lastIp = lastIp;
	}
	public String getVisitCount() {
		return visitCount;
	}
	public void setVisitCount(String visitCount) {
		this.visitCount = visitCount;
	}
	public String getUserRank() {
		return userRank;
	}
	public void setUserRank(String userRank) {
		this.userRank = userRank;
	}
	public String getIsSpecial() {
		return isSpecial;
	}
	public void setIsSpecial(String isSpecial) {
		this.isSpecial = isSpecial;
	}
	public String getSalt() {
		return salt;
	}
	public void setSalt(String salt) {
		this.salt = salt;
	}
	public String getParentId() {
		return parentId;
	}
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getAlias() {
		return alias;
	}
	public void setAlias(String alias) {
		this.alias = alias;
	}
	public String getMsn() {
		return msn;
	}
	public void setMsn(String msn) {
		this.msn = msn;
	}
	public String getQq() {
		return qq;
	}
	public void setQq(String qq) {
		this.qq = qq;
	}
	public String getOfficePhone() {
		return officePhone;
	}
	public void setOfficePhone(String officePhone) {
		this.officePhone = officePhone;
	}
	public String getHomePhone() {
		return homePhone;
	}
	public void setHomePhone(String homePhone) {
		this.homePhone = homePhone;
	}
	public String getMobilePhone() {
		return mobilePhone;
	}
	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}
	public String getIsValidated() {
		return isValidated;
	}
	public void setIsValidated(String isValidated) {
		this.isValidated = isValidated;
	}
	public String getCreditLine() {
		return creditLine;
	}
	public void setCreditLine(String creditLine) {
		this.creditLine = creditLine;
	}
	public String getPasswdQuestion() {
		return passwdQuestion;
	}
	public void setPasswdQuestion(String passwdQuestion) {
		this.passwdQuestion = passwdQuestion;
	}
	public String getPasswdAnswer() {
		return passwdAnswer;
	}
	public void setPasswdAnswer(String passwdAnswer) {
		this.passwdAnswer = passwdAnswer;
	}
	public String getMediaUID() {
		return mediaUID;
	}
	public void setMediaUID(String mediaUID) {
		this.mediaUID = mediaUID;
	}
	public String getMediaID() {
		return mediaID;
	}
	public void setMediaID(String mediaID) {
		this.mediaID = mediaID;
	}
	public String getFroms() {
		return froms;
	}
	public void setFroms(String froms) {
		this.froms = froms;
	}
}
