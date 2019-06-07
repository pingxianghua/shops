package com.shop.base.exception;

public class ServiceException extends RuntimeException {

	private static final long serialVersionUID = 1034124188209085557L;
	
	private String errorCode;

	public ServiceException(String errorCode, String message) {
		super(message);
		this.errorCode = errorCode;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}
}
