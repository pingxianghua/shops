package com.shop.web.service.page;

import java.io.Serializable;


/**
 * 后台公共的查询条件层
 * @author pingxh
 *
 */
public class QueryModel<T> extends PagerModel<T> implements Serializable {

	private static final long serialVersionUID = 1L;
	
	/*
	 * 记录创建日期查询条件
	 */
	protected String startDate;// 订单开始时间
	protected String endDate;// 订单结束时间
	
	@Override
	public void clear() {
		super.clear();
		this.startDate = null;
		this.endDate = null;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

}
