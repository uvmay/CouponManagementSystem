package com.sys.system.operations;

import java.sql.Date;
import java.util.ArrayList;
import java.util.GregorianCalendar;
import java.util.List;

import com.sys.basic.objects.Company;
import com.sys.basic.objects.Coupon;
import com.sys.basic.objects.Customer;
import com.sys.basic.objects.Coupon.CouponType;
import com.sys.facades.AdminFacade;
import com.sys.facades.ClientType;
import com.sys.facades.CompanyFacade;
import com.sys.facades.CustomerFacade;

public class FinalCheck {

	public static void main(String[] args) {

		//generating the coupon system
		CouponSystem sys = CouponSystem.getInstance();
		System.out.println("created");
		
		try {
			//ADMIN'S CHECK
			System.out.println();
			System.out.println("Admin Check");
			System.out.println("________________________________________________");
			System.out.println();
			
			AdminFacade a1 = (AdminFacade) (sys.login("admin", "1234", ClientType.ADMIN));
			//creating companies
			long compAId = a1.createCompany(new Company("apple", "3333", "ss"));
			long compBId = a1.createCompany(new Company("microsoft", "12345", "ss"));
			
			//creating customers
			long custAId = a1.createCustomer(new Customer("john", "123"));
			long custBId = a1.createCustomer(new Customer("jack", "234"));
            
			//manipulating the companies - remove and update
			a1.removeComapny(compBId);
			a1.updateCompany(new Company(compAId,"apple", "3333", "new email!"));
            
			//manipulating the customers - remove and update
			a1.removeCustomer(custBId);
            a1.updateCustomer(new Customer(custAId,"john", "234"));
			
            //printing all of the companies
            System.out.println();
            System.out.println("All Companies");
            List<Company> list = a1.getAllCompanies();
			for (int i = 0; i < list.size(); i++)
				System.out.println(list.get(i));
			
			//printing all of the customers
			System.out.println();
			System.out.println("All Customers");
			List<Customer> list2 = a1.getAllCustomers();
			for (int i = 0; i < list2.size(); i++)
				System.out.println(list2.get(i));
			
			//checking the get company/customer method
			System.out.println();
            System.out.println("getting a company by id:"+a1.getCompany(compAId));
            System.out.println("getting a customer by id:"+a1.getCustomer(custAId));
            
            //COMPANY'S CHECK
			System.out.println();
            System.out.println("Company Check");
			System.out.println("________________________________________________");
			System.out.println();
            
			CompanyFacade c1 = (CompanyFacade) (sys.login("apple", "3333", ClientType.COMPANY));
			
			//creating the coupons
			Coupon coup = new Coupon("free computer", System.currentTimeMillis(), new GregorianCalendar(2020,25,6).getTimeInMillis(), 100, Coupon.CouponType.CAMPING, "hey there", 50, "s");
			long coupAId = c1.createCoupon(coup);
			coup.setId(coupAId);
			
			Coupon coup2 = new Coupon("free ipad", System.currentTimeMillis(), new GregorianCalendar(2020,25,6).getTimeInMillis(), 100, Coupon.CouponType.ELECTRICITY, "hey there", 50, "s");
			long coupBId = c1.createCoupon(coup2);
			coup2.setId(coupBId);
			
			Coupon coup3 = new Coupon("free CellPhone", System.currentTimeMillis(), new GregorianCalendar(2016,25,6).getTimeInMillis(), 20, Coupon.CouponType.FOOD, "hey there", 30, "s");
			long coupCId = c1.createCoupon(coup3);
			coup3.setId(coupCId);
			
			//printing coupons
			System.out.println("company coupons: ");
			List<Coupon> complist = c1.getAllCoupons();
			for (int i = 0; i < complist.size(); i++)
				System.out.println(complist.get(i));
			
			//removing coupon 2
            c1.removeCoupon(coup2.getId());
            System.out.println();
			System.out.println("get coupon method: "+c1.getCoupon(coupAId));;
			
			//printing coupons by expiration date
			List<Coupon> coupList = new ArrayList<Coupon>();
			coupList=c1.getCouponByExpirationDate(new Date(System.currentTimeMillis()));
			System.out.println();
			System.out.println("list by date");
			for (Coupon c : coupList)
				System.out.println(c);
			coupList=c1.getCouponByPrice(50);
			
			//printing coupons by price
			System.out.println();
			System.out.println("list by price");
			for (Coupon c : coupList)
				System.out.println(c);
			
			//printing coupons by type
			System.out.println();
			System.out.println("list by type");
			coupList=c1.getCouponByType(Coupon.CouponType.CAMPING);
			for (Coupon c : coupList)
				System.out.println(c);
			
			//CUSTOMER'S CHECK
			System.out.println();
			System.out.println("Customer Check");
			System.out.println("__________________________________");
			System.out.println();
			
			CustomerFacade f1 = (CustomerFacade) (sys.login("john", "234", ClientType.CUSTOMER));
			
			//purchasing coupons
			f1.purchaseCoupon(coup);
			f1.purchaseCoupon(coup3);
			
			//printing all of the coupons
			System.out.println("All Coupons");
			List<Coupon> custlist = f1.getAllPurchasedCoupons();
			for (Coupon c : custlist)
			    System.out.println(c);
			
			//printing coupons by price
			System.out.println();
			System.out.println("Coupons By Price");
			custlist=f1.getAllPurchasedCouponsByPrice(50);
			for(Coupon c : custlist)
				System.out.println(c);
			
			//printing coupons by type
			System.out.println();
			System.out.println("Coupons By Type");
			custlist=f1.getAllPurchasedCouponsByType(CouponType.CAMPING);
			for(Coupon c : custlist)
				System.out.println(c);
			
			//shutting down
			sys.shutDown();
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("shutdown");

	}

}
