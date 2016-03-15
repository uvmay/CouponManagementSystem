package com.sys.operations;

import java.sql.Connection;
import java.sql.DriverManager;

import com.sys.database.managing.TablesUtility;

/**
 * a tool to create and drop all of the database tables
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 */

public class DataBaseInitiate {
	public static void main(String[] args) {

		try {
			Class.forName("org.apache.derby.jdbc.ClientDriver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		System.out.println("DATABASE LOADED");
		try(Connection con = DriverManager.getConnection("jdbc:derby://localhost:1527//couponsys")){
			
             
//		    TablesUtility.deleteCompanyTable(con);
//		    TablesUtility.deleteCustomerTable(con);
//	        TablesUtility.deleteCouponTable(con);
//		    TablesUtility.deleteCompanyCouponTable(con);
//		    TablesUtility.deleteCustomerCouponTable(con);
//          TablesUtility.deleteIdTable(con);
      
            TablesUtility.createCompanyTable(con);
            TablesUtility.createCustomerTable(con);
            TablesUtility.createCouponTable(con);
            TablesUtility.createCompanyCouponTable(con);
            TablesUtility.createCustomerCouponTable(con);
            TablesUtility.createIdTable(con);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
