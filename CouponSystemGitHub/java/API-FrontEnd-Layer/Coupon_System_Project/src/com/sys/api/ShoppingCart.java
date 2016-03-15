package com.sys.api;

import javax.xml.bind.annotation.XmlRootElement;

/**the object containing the most recent list of items in the customer's shopping cart
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 */

@XmlRootElement
public class ShoppingCart {

/**@param coupons = a list of coupon id's. these id's are of the coupons
 * which are in the shopping cart. */
	private long[] coupons;
	
/**empty constructor */
	public ShoppingCart(){}

	public long[] getCoupons() {
		return coupons;
	}

	public void setCoupons(long[] coupons) {
		this.coupons = coupons;
	}
}
