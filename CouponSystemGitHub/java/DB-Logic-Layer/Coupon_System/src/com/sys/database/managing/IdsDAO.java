package com.sys.database.managing;

import java.sql.Connection;
import java.sql.ResultSet;

import com.sys.system.operations.ConnectionPool;
import com.sys.system.operations.CouponSystemException;
/**a static DAO which contains all of the methods concerning the database table that holds the most recent ID's
 * for companies, customers and coupons. the table is built from 3 brackets and 3 columns.
 * @author Yuval Maayan
 * @version 1.0
 */
public class IdsDAO {
	
	/**a method that generates a new id for a new company based on the last id that was generated
	 * @param con = a connection to the database
	 * @return the new id, which is +1 from the last generated company id
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public static long generateCompanyID(Connection con) throws CouponSystemException {

		try {
			ResultSet rs = con.createStatement().executeQuery("SELECT companyID FROM ids");
			rs.next();
			long id = rs.getLong(1);
			con.createStatement().execute("UPDATE ids SET companyID=" + (id + 1) + " WHERE companyID=" + id);
			return id;
		} catch (Exception e) {
			throw new CouponSystemException("Problem Generating ID");
		}
	}

	/**a method that generates a new id for a new customer based on the last id that was generated
	 * @param con = a connection to the database
	 * @return the new id, which is +1 from the last generated customer id
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public static long generateCustomerID(Connection con) throws CouponSystemException {

		try {
			ResultSet rs = con.createStatement().executeQuery("SELECT customerID FROM ids");
			rs.next();
			long id = rs.getLong(1);
			con.createStatement().execute("UPDATE ids SET customerID=" + (id + 1) + " WHERE customerID=" + id);
			return id;
		} catch (Exception e) {
			throw new CouponSystemException("Problem Generating ID");
		}
	}

	/**a method that generates a new id for a new coupon based on the last id that was generated
	 * @param con = a connection to the database
	 * @return the new id, which is +1 from the last generated coupon id
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public static long generateCouponID(Connection con) throws CouponSystemException {

		try {
			ResultSet rs = con.createStatement().executeQuery("SELECT couponID FROM ids");
			rs.next();
			long id = rs.getLong(1);
			con.createStatement().execute("UPDATE ids SET couponID=" + (id + 1) + " WHERE couponID=" + id);
			return id;
		} catch (Exception e) {
			throw new CouponSystemException("Problem Generating ID");
		}
	}

	/**@return the last generated coupon id
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public static long getLastCoupon() throws CouponSystemException {
		ConnectionPool pool = ConnectionPool.getInstance();
		Connection con = null;
		try {
			con = pool.getConnection();
			ResultSet rs = con.createStatement().executeQuery("SELECT couponID FROM ids");
			rs.next();
			return rs.getLong(1);

		} catch (Exception e) {
			throw new CouponSystemException("Problem Generating ID");
		} finally {
			pool.returnConnection(con);
		}
	}
}
