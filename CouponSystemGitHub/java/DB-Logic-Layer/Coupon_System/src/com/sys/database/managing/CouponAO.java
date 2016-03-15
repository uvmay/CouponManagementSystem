package com.sys.database.managing;

import java.util.List;

import com.sys.basic.objects.Coupon;
import com.sys.basic.objects.Coupon.CouponType;
import com.sys.system.operations.CouponSystemException;

/**an interface describing the methods every DAO defined for Coupon objects must have 
 * @author Yuval Maayan
 * @version 1.0
 */
public interface CouponAO {
	/**creates a new coupon 
	 * @param coupon = the new coupon to be created
	 * @return the coupon's id
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public long create(Coupon coupon) throws CouponSystemException;
	
	/**deletes a coupon
	 * @param id = the deleted coupon's id
	 * @return whether the deletion was successful or not
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public int delete(long id) throws CouponSystemException;
	
	/**updates a coupon's data
	 * @param coupon = a coupon which data will replace the updated coupon's data. 
	 *   the paramater's id must be identical to the updated coupon's id
	 * @return whether the update was successful or not
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public int update(Coupon coupon) throws CouponSystemException;

	/**retrieves the chosen coupon's data into a Coupon object
	 * @param id = the retrieved coupon's id
	 * @return a new Coupon object
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public Coupon retrieve(long id) throws CouponSystemException;

	/**@return a list of Coupon objects with all the coupons data
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public List<Coupon> getAll() throws CouponSystemException;

	/**@param type = the wanted type of coupons
	 * @return a list of Coupon objects from the CouponType "type" with all the coupons data
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public List<Coupon> getAllByType(CouponType type) throws CouponSystemException;
	
	/**checks if a certain coupon exists in the data source
	 * @return the id if it exists and 0 if it isn't
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public long exists(Coupon coup) throws CouponSystemException;
}
