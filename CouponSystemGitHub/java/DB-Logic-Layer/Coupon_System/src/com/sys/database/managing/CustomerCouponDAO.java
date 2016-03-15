package com.sys.database.managing;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.sys.basic.objects.Coupon;
import com.sys.system.operations.ConnectionPool;
import com.sys.system.operations.CouponSystemException;

/**
 * a static DAO which contains all of the methods concerning the combined
 * database table of the Coupons IDs and the Companies IDs. The table represents
 * which company owns which coupon by their id.
 * 
 * @author Yuval Maayan
 * @version 1.0
 */
public class CustomerCouponDAO {
	/**
	 * @param couponDAO
	 *            = a static DAO object that handles the Coupons database
	 * @param pool
	 *            = an instance of the coupon systme's connection pool
	 */
	private static ConnectionPool pool = ConnectionPool.getInstance();
	private static CouponDAO couponDAO = new CouponDAO();

	/**
	 * @param custID
	 *            = a customer's id. the customer owns the coupon which id is
	 *            coupID
	 * @param coupID
	 *            = a coupon's id. the coupon belongs to the customer which id
	 *            is custID
	 * @return whether the creation was successful or not
	 * @throws CouponSystemException
	 *             with a message if a problem occurred in process
	 */
	public static int create(long coupID, long custID) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			PreparedStatement pstmt = con.prepareStatement("INSERT INTO customersCoupons VALUES(?,?)");
			pstmt.setLong(1, coupID);
			pstmt.setLong(2, custID);
			return pstmt.executeUpdate();
		} catch (Exception e) {
			throw new CouponSystemException("Line Not Created");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**
	 * @param coupID
	 *            = the deleted coupon's id
	 * @return whether the deletion was successful or not
	 * @throws CouponSystemException
	 *             with a message if a problem occurred in process
	 */
	public static int delete(long coupID) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();
			return stmt.executeUpdate("DELETE FROM customersCoupons WHERE couponID=" + coupID);
		} catch (Exception e) {
			throw new CouponSystemException("Line Not Deleted");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**
	 * @param custID
	 *            = a customer's id. the customer owns the coupon which id is
	 *            coupID
	 * @param coupID
	 *            = a coupon's id. the coupon belongs to the customer which id
	 *            is custID
	 * @return whether the update was successful or not
	 * @throws CouponSystemException
	 *             with a message if a problem occurred in process
	 */
	public static int update(long coupID, long custID) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			PreparedStatement pstmt = con.prepareStatement("UPDATE customersCoupons SET customerID=? WHERE couponID=?");
			pstmt.setLong(1, custID);
			pstmt.setLong(2, coupID);
			return pstmt.executeUpdate();
		} catch (Exception e) {
			throw new CouponSystemException("Line Not Updated");
		} finally {
			pool.returnConnection(con);
		}

	}

	/**
	 * @param coupID
	 *            = a coupon's id.
	 * @return the ID of the customer that owns the coupon which id is coupID,
	 *         and -1 if the coupon wasn't found
	 * @throws CouponSystemException
	 *             with a message if a problem occurred in process
	 */
	public static long retrieveCustomer(long coupID) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();

			ResultSet rs = stmt.executeQuery("SELECT * FROM customersCoupons");
			while (rs.next()) {
				if (coupID == rs.getLong(1))
					return rs.getLong(2);
			}
			return -1;
		} catch (Exception e) {
			throw new CouponSystemException("Customer Not Retrieved");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**
	 * @param cusID = a customer's id.
	 * @return a list of the coupons owned by the customer which id is cusID
	 * @throws CouponSystemException
	 *             with a message if a problem occurred in process
	 */
	public static List<Coupon> getCoupons(long cusID) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			List<Coupon> list = new ArrayList<Coupon>();
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM customersCoupons");

			while (rs.next()) {
				if (rs.getLong(2) == cusID) {
					list.add(couponDAO.retrieve(rs.getLong(1)));
				}
			}

			return list;
		} catch (Exception e) {
			throw new CouponSystemException("Coupons Not Retrieved");
		} finally {
			pool.returnConnection(con);
		}

	}

	/**
	 * @param cusID = a customer's id.
	 * @param couponId = a coupon's id
	 * @return if the customer owns the coupon
	 * @throws CouponSystemException
	 *             with a message if a problem occurred in process
	 */
	public static boolean exists(long couponId, long cusId) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM customersCoupons");

			while (rs.next()) {
				if (rs.getLong(2) == cusId && rs.getLong(1) == couponId) {
					return true;
				}
			}
			return false;
		} catch (Exception e) {
			throw new CouponSystemException("problem finding coupon");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**
	 * this method deletes from the joint table every coupon owned by the
	 * customer which id is custID
	 * 
	 * @param compID
	 *            = a companies ID.
	 * @return whether the deletion was successful or not
	 * @throws CouponSystemException
	 *             with a message if a problem occurred in process
	 */
	public static int deleteCustomer(long custID) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();
			return stmt.executeUpdate("DELETE FROM customersCoupons WHERE customerID=" + custID);
		} catch (Exception e) {
			throw new CouponSystemException("Customer Not Deleted");
		} finally {
			pool.returnConnection(con);
		}
	}

}
