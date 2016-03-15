package com.sys.basic.objects;
/**an exception thrown when a certain attribute is given a longer value than it's maximum length
 * @author Yuval Maayan
 * @version 1.0
 */
public class TooLongException extends Exception {

	public TooLongException(String arg0) {
		super(arg0);
	}
	

}
