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
/**a static DAO which contains all of the methods concerning the combined database table of the Coupons IDs 
 *  and the Companies IDs. The table represents which company owns which coupon by their id.  
 * @author Yuval Maayan
 * @version 1.0
 */
public class CompanyCouponDAO {
    /**@param couponDAO = a static DAO object that handles the Coupons database 
	   @param pool = an instance of the coupon systme's connection pool */
	private static ConnectionPool pool = ConnectionPool.getInstance();
	private static CouponDAO couponDAO = new CouponDAO();
	
	/**@param compID = a company's id. the company owns the coupon which id is coupID
	 * @param coupID = a coupon's id. the coupon belongs to the company which id is compID
	 * @return whether the creation was successful or not
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public static int create(long coupID, long compID) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			PreparedStatement pstmt = con.prepareStatement("INSERT INTO companysCoupons VALUES(?,?)");
			pstmt.setLong(1, coupID);
			pstmt.setLong(2, compID);
			return pstmt.executeUpdate();
		} catch (Exception e) {
			throw new CouponSystemException("Line Not Created");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**@param coupID = the deleted coupon's id
	 * @return whether the deletion was successful or not
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public static int delete(long coupID) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();
			return stmt.executeUpdate("DELETE FROM companysCoupons WHERE couponID=" + coupID);
		} catch (Exception e) {
			throw new CouponSystemException("Line Not Deleted");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**@param compID = a company's id. the company owns the coupon which id is coupID
	 * @param coupID = a coupon's id. the coupon belongs to the company which id is compID
	 * @return whether the update was successful or not
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public static int update(long coupID, long compID) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			PreparedStatement pstmt = con.prepareStatement("UPDATE companysCoupons SET companyID=? WHERE couponID=?");
			pstmt.setLong(1, compID);
			pstmt.setLong(2, coupID);
			return pstmt.executeUpdate();
		} catch (Exception e) {
			throw new CouponSystemException("Line Not Updated");
		} finally {
			pool.returnConnection(con);
		}

	}

	/**@param coupID = a coupon's id. 
	 * @return the ID of the company that owns the coupon which id is coupID, and -1 if the coupon wasn't found
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public static long retrieveCompany(long coupID) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM companysCoupons");
			while (rs.next()) {
				if (coupID == rs.getLong(1))
					return rs.getLong(2);
			}
			return -1;
		} catch (Exception e) {
			throw new CouponSystemException("Company Not Retrieved");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**@param compID = a company's id. 
	 * @return a list of the coupons owned by the company which id is compID
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public static List<Coupon> getCoupons(long compID) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			List<Coupon> list = new ArrayList<Coupon>();
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM companysCoupons");

			while (rs.next()) {
				if (rs.getLong(2) == compID) {
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

	/**this method deletes from the joint table every coupon owned by the company which id is compID
	 * @param compID = a companies ID. 
	 * @return whether the deletion was successful or not
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public static int deleteCompany(long compID) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();
			return stmt.executeUpdate("DELETE FROM companysCoupons WHERE companyID=" + compID);
		} catch (Exception e) {
			throw new CouponSystemException("Company Not Deleted");
		} finally {
			pool.returnConnection(con);
		}
	}

}
