package com.sys.database.managing;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
/**a static DAO which contains all of the methods creating and deleting all of the database tables
 * associated with the coupon system.
 * @author Yuval Maayan
 * @version 1.0
 */
public class TablesUtility {

	public static void createCompanyTable(Connection con) throws SQLException{
		Statement stmt=con.createStatement();
		stmt.execute("CREATE TABLE companys (id BIGINT PRIMARY KEY, compName VARCHAR(24), password VARCHAR(12), email VARCHAR(30))");
		
	}
	
	public static void deleteCompanyTable(Connection con) throws SQLException{
		Statement stmt=con.createStatement();
		stmt.execute("DROP TABLE companys");
		
	}
	
	public static void createCustomerTable(Connection con) throws SQLException{
		Statement stmt=con.createStatement();
		stmt.execute("CREATE TABLE customers (id BIGINT PRIMARY KEY, custName VARCHAR(24), password VARCHAR(12))");
		
	}
	
	public static void deleteCustomerTable(Connection con) throws SQLException{
		Statement stmt=con.createStatement();
		stmt.execute("DROP TABLE customers");
		
	}
	
	public static void createCouponTable(Connection con) throws SQLException{
		Statement stmt=con.createStatement();
		stmt.execute("CREATE TABLE coupons (id BIGINT PRIMARY KEY, title VARCHAR(24), startDate BIGINT, endDate BIGINT, amount INT, type VARCHAR(20), message VARCHAR(50), price DOUBLE, image VARCHAR(40))");
		
	}
	
	public static void deleteCouponTable(Connection con) throws SQLException{
		Statement stmt=con.createStatement();
		stmt.execute("DROP TABLE coupons");
					
		}
		
	public static void createCompanyCouponTable(Connection con) throws SQLException{
		Statement stmt=con.createStatement();
		stmt.execute("CREATE TABLE companysCoupons (couponID BIGINT PRIMARY KEY, companyID BIGINT)");
		
	}
	
	public static void deleteCompanyCouponTable(Connection con) throws SQLException{
		Statement stmt=con.createStatement();
		stmt.execute("DROP TABLE companysCoupons");
					
		}
	
	
	public static void createCustomerCouponTable(Connection con) throws SQLException{
		Statement stmt=con.createStatement();
		stmt.execute("CREATE TABLE customersCoupons (couponID BIGINT, customerID BIGINT)");
		
	}
	
	public static void deleteCustomerCouponTable(Connection con) throws SQLException{
		Statement stmt=con.createStatement();
		stmt.execute("DROP TABLE customersCoupons");
					
		}
	public static void createIdTable(Connection con) throws SQLException{
		Statement stmt=con.createStatement();
		stmt.execute("CREATE TABLE ids (companyID BIGINT, customerID BIGINT, couponID BIGINT)");
		con.createStatement().execute("INSERT INTO ids VALUES(1,1,1)");
		
	}
	
	public static void deleteIdTable(Connection con) throws SQLException{
		Statement stmt=con.createStatement();
		stmt.execute("DROP TABLE ids");
		
	}
}
