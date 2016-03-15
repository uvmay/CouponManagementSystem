package com.sys.database.managing;

import java.sql.Connection;
import java.sql.DriverManager;

public class CreateDeleteTables {

	public static void main(String[] args) {

	
		try {
			Class.forName("org.apache.derby.jdbc.ClientDriver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		System.out.println("DATABASE LOADED");
		try(Connection con = DriverManager.getConnection("jdbc:derby://localhost:1527//couponsys")){
//			try{
             
//		    TablesUtility.deleteCompanyTable(con);
//		       TablesUtility.deleteCustomerTable(con);
//	        TablesUtility.deleteCouponTable(con);
//		       TablesUtility.deleteCompanyCouponTable(con);
//		       TablesUtility.deleteCustomerCouponTable(con);
//              TablesUtility.deleteIdTable(con);
//////////       
//       TablesUtility.createCompanyTable(con);
        TablesUtility.createCustomerTable(con);
//      TablesUtility.createCouponTable(con);
//       TablesUtility.createCompanyCouponTable(con);
        TablesUtility.createCustomerCouponTable(con);
//        TablesUtility.createIdTable(con);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}

