package com.sys.facades;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import com.sys.basic.objects.Coupon;
import com.sys.basic.objects.Customer;
import com.sys.basic.objects.Coupon.CouponType;
import com.sys.database.managing.CouponDAO;
import com.sys.database.managing.CustomerCouponDAO;
import com.sys.database.managing.CustomerDAO;
import com.sys.system.operations.CouponSystemException;
/**a facade which describes every customer user and the actions it can perform
 * @author Yuval Maayan
 * @version 1.0
 */
public class CustomerFacade extends CouponClientFacade {

	/**@param customer = the customer which is logged in.
	 * @param customerDAO = an object that enables the access to the customers data*/
	private Customer customer;
	private CustomerDAO customerDAO = new CustomerDAO();
	private CouponDAO couponDAO = new CouponDAO();


	/**a constructor which receives a customer's username and initiates the "customer" attribute according to the name parameter
	 * @param name = the customer's username 
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public CustomerFacade(String name) throws CouponSystemException {
		customer = customerDAO.retrieveByName(name);
	}

	/**a method which purchases a coupon, which means it connects a coupon id to a customer id in the joint table
	 * @param coupon = the coupon being purchased 
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public void purchaseCoupon(Coupon coupon) throws CouponSystemException {
		Date expDate = new Date(coupon.getEndDate());
		if(expDate.after(new Date(System.currentTimeMillis()))==true && coupon.getAmount()>0 && CustomerCouponDAO.exists(coupon.getId(), customer.getId())==false){
		 CustomerCouponDAO.create(coupon.getId(), customer.getId());
		 coupon.setAmount(coupon.getAmount()-1);
		 couponDAO.update(coupon);
		}
		else
			throw new CouponSystemException("Coupon Not Purchased");
	}

	/**a method that retrieves all of the coupons purchased by this customer 
	 * @return a list of the customer's coupons
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public List<Coupon> getAllPurchasedCoupons() throws CouponSystemException {
		return CustomerCouponDAO.getCoupons(customer.getId());
	}

	/**a method that retrieves all of the coupons purchased by this customer from a certain type
	 * @param type = the selected CouponType
	 * @return a list of the customer's coupons from the specified type
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public List<Coupon> getAllPurchasedCouponsByType(CouponType type) throws CouponSystemException {
		List<Coupon> list = getAllPurchasedCoupons();
        
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getType() != type){
				list.remove(i);
				i--;
		  }
		}
		return list;
	}
	
	/**a method that retrieves all of the coupons purchased by this customer with a certain price
	 * @param price = the selected price to be retrieved
	 * @return a list of the customer's coupons with the specified price
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public List<Coupon> getAllPurchasedCouponsByPrice(double price) throws CouponSystemException {
		List<Coupon> list = getAllPurchasedCoupons();
        
		for(int i=0;i<list.size();i++){
			if(list.get(i).getPrice()!=price){
				list.remove(i);
				i--;
		   }
		}
		return list;
	}
	
	/**a method that retrieves all of the coupons purchased by this customer with a certain string in the title
	 * @param str = the selected string to be retrieved
	 * @return a list of the customer's coupons with the specified string
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public List<Coupon> getCouponsByString(String str) throws CouponSystemException{
			List<Coupon> list = getAllPurchasedCoupons();
			str = str.toLowerCase();
			
			for(int i=0;i<list.size();i++){
				String title = list.get(i).getTitle().toLowerCase();
				if(title.indexOf(str)==-1){
					list.remove(i);
					i--;
					}
			}
			return list;
	}
	
	/**a method that retrieves all of the coupons in the system
	 * @return a list of all of the coupons in the system
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public List<Coupon> getAllCouponsInSystem() throws CouponSystemException{
		return couponDAO.getAll();
	}

	/**a method that retrieves all of the coupons in the system with the selected price
	 * @param price = the wanted price to be retrieved
	 * @return a list of all of the coupons in the system with the selected price
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public List<Coupon> getCouponsInSystemByPrice(double price) throws CouponSystemException{
		List<Coupon> list = getAllCouponsInSystem();
		for(int i=0;i<list.size();i++){
			if(list.get(i).getPrice()>price){
				list.remove(i);
				i--;
			}
		}
		return list;
	}
	
	/**a method that retrieves all of the coupons in the system from the certain type
	 * @param type = the wanted type to be retrieved
	 * @return a list of all of the coupons in the system with the type selected 
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public List<Coupon> getCouponsInSystemByType(CouponType type) throws CouponSystemException{
		List<Coupon> list = getAllCouponsInSystem();
		for(int i=0;i<list.size();i++){
			if(list.get(i).getType()!=type){
				list.remove(i);
				i--;
			}
		}
		return list;
	}
	
	/**a method that retrieves all of the coupons in the system with the certain string in the title
	 * @param str = the wanted string to be retrieved
	 * @return a list of all of the coupons in the system with the string selected in their title 
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public List<Coupon> getCouponsInSystemByString(String str) throws CouponSystemException{
		List<Coupon> list = getAllCouponsInSystem();
		str = str.toLowerCase();
        for(int i=0;i<list.size();i++){
        	String title = list.get(i).getTitle().toLowerCase();
			if(title.indexOf(str)==-1){
				list.remove(i);
				i--;
				}
		}
		return list;
	}
	
	/**a method that retrieves all of the coupons in the system that matches the id's in the array
	 * @param arr = the wanted ids array
	 * @return a list of all of the coupons in the system that match the id's on the array
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public List<Coupon> getCouponsInSystemByIdArray(long[] arr) throws CouponSystemException{
		List<Coupon> list = getAllCouponsInSystem();
        List<Coupon> matchingList = new ArrayList<Coupon>();
		for(int i=0;i<list.size();i++){	
			for(int j=0;j<arr.length;j++){
				if(arr[j]==list.get(i).getId()){
					matchingList.add(list.get(i));
				    break;	
				}
			}
		}
		return matchingList;
	}
	
}
