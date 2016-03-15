package com.sys.system.operations;

public class CouponSystemException extends RuntimeException {
/**an exception that is thrown whenever there's an exception in the system with a suitable text message 
 * @author Yuval Maayan
 * @version 1.0
 */
	public CouponSystemException(String message) {
		super(message);
	}
 
}
