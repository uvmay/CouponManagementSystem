package com.sys.exception.handeling;

import javax.xml.bind.annotation.XmlRootElement;

/**an object that's sent whenever an exception is being intercepted
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 */

@XmlRootElement
public class ErrorObject {
/**@param errorMessage = the error's message, usually set with the intercepted exception's message 
 * @param errorCode = the error code that fits the exception cause*/
	private String errorMessage;
	private int errorCode;

/**an empty constructor */
	public ErrorObject(){}
	
/**a constructor filling all of the attributes
 * @param errorMessage = the error message
 * @param errorCode = the error code */
	public ErrorObject(String errorMessage, int errorCode) {
		this.errorMessage = errorMessage;
		this.errorCode = errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public int getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}
	
	
}
