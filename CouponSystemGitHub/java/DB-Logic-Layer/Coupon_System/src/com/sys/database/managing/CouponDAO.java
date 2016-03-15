package com.sys.database.managing;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.sys.basic.objects.Company;
import com.sys.basic.objects.Coupon;
import com.sys.basic.objects.Coupon.CouponType;
import com.sys.system.operations.ConnectionPool;
import com.sys.system.operations.CouponSystemException;
/**a DAO which contains all of the methods concerning the coupons database 
 * @author Yuval Maayan
 * @version 1.0
 */
public class CouponDAO implements CouponAO {

	/**@param pool = an instance of the coupon systme's connection pool */
	private ConnectionPool pool = ConnectionPool.getInstance();
	
	public CouponDAO(){}
	
	/**creates a new coupon 
	 * @param coupon = the new coupon to be created
	 * @return the coupon's id
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public long create(Coupon coupon) throws CouponSystemException {
		
		Connection con = null;
		try {
			con = pool.getConnection();
			PreparedStatement pstmt = con.prepareStatement("INSERT INTO coupons VALUES(?,?,?,?,?,?,?,?,?)");
			long id = IdsDAO.generateCouponID(con);
			pstmt.setLong(1, id);
			pstmt.setString(2, coupon.getTitle());
			pstmt.setLong(3, coupon.getStartDate());
			pstmt.setLong(4, coupon.getEndDate());
			pstmt.setInt(5, coupon.getAmount());
			pstmt.setString(6, String.valueOf(coupon.getType()));
			pstmt.setString(7, coupon.getMessage());
			pstmt.setDouble(8, coupon.getPrice());
			pstmt.setString(9, coupon.getImage());
			pstmt.executeUpdate();
			return id;
		} catch (Exception e) {
			throw new CouponSystemException("Coupon Not Created");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**deletes a coupon
	 * @param id = the deleted coupon's id
	 * @return whether the deletion was successful or not
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public int delete(long id) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();
			return stmt.executeUpdate("DELETE FROM coupons WHERE id=" + id);
		} catch (Exception e) {
			throw new CouponSystemException("Coupon Not Deleted");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**updates a coupon's data
	 * @param coupon = a coupon which data will replace the updated coupon's data. 
	 *   the paramater's id must be identical to the updated coupon's id
	 * @return whether the update was successful or not
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public int update(Coupon coupon) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			PreparedStatement pstmt = con.prepareStatement(
					"UPDATE coupons SET title=?, startDate=?, endDate=?, amount=?, type=?, message=?, price=?, image=? WHERE id=?");
			pstmt.setLong(9, coupon.getId());
			pstmt.setString(1, coupon.getTitle());
			pstmt.setLong(2, coupon.getStartDate());
			pstmt.setLong(3, coupon.getEndDate());
			pstmt.setInt(4, coupon.getAmount());
			pstmt.setString(5, String.valueOf(coupon.getType()));
			pstmt.setString(6, coupon.getMessage());
			pstmt.setDouble(7, coupon.getPrice());
			pstmt.setString(8, coupon.getImage());
			return pstmt.executeUpdate();
		} catch (Exception e) {
			throw new CouponSystemException("Coupon Not Updated");
		} finally {
			pool.returnConnection(con);
		}

	}

	/**retrieves the chosen coupon's data into a Coupon object
	 * @param id = the retrieved coupon's id
	 * @return a new Coupon object
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public Coupon retrieve(long id) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();

			ResultSet rs = stmt.executeQuery("SELECT * FROM coupons");
			while (rs.next()) {
				if (id == rs.getLong(1)) {
					return new Coupon(rs.getLong("id"), rs.getString("title"), rs.getLong("startDate"), rs.getLong("endDate"), rs.getInt("amount"),
							CouponType.valueOf(rs.getString("type")), rs.getString("message"), rs.getDouble("price"), rs.getString("image"));
				}
			}
			return null;
		} catch (Exception e) {
			throw new CouponSystemException("Coupon Not Retrieved");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**@return a list of Coupon objects with all the coupons data
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public List<Coupon> getAll() throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			List<Coupon> list = new ArrayList<>();
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM coupons");

			while (rs.next()) {
				list.add(new Coupon(rs.getLong("id"), rs.getString("title"), rs.getLong("startDate"), rs.getLong("endDate"), rs.getInt("amount"),
						CouponType.valueOf(rs.getString("type")), rs.getString("message"), rs.getDouble("price"), rs.getString("image")));
			}
			return list;
		} catch (Exception e) {
			throw new CouponSystemException("Coupons Not Retrieved");
		} finally {
			pool.returnConnection(con);
		}
	}

	/**@param type = the wanted type of coupons
	 * @return a list of Coupon objects from the CouponType "type" with all the coupons data
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public List<Coupon> getAllByType(CouponType type) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			List<Coupon> list = new ArrayList<>();
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT * FROM coupons");

			while (rs.next()) {
				if (String.valueOf(type).equals(rs.getString(6)))
					list.add(new Coupon(rs.getLong("id"), rs.getString("title"), rs.getLong("startDate"), rs.getLong("endDate"), rs.getInt("amount"),
							CouponType.valueOf(rs.getString("type")), rs.getString("message"), rs.getDouble("price"), rs.getString("image")));
			}

			return list;
		} catch (Exception e) {
			throw new CouponSystemException("Coupons Not Retrieved");
		} finally {
			pool.returnConnection(con);
		}
	}
	
	/**checks if a certain coupon exists in the data source
	 * @return the id if it exists and 0 if it isn't
	 * @throws CouponSystemException with a message if a problem occurred in process*/
	public long exists(Coupon coup) throws CouponSystemException {
		Connection con = null;
		try {
			con = pool.getConnection();
			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT id,title FROM coupons");
			while (rs.next()) {
				if (coup.getTitle().equals(rs.getString("title")))
					return rs.getLong("id");
			}

			return 0;
		} catch (Exception e) {
			throw new CouponSystemException("Problem Searching");
		} finally {
			pool.returnConnection(con);
		}
	}
	

}

