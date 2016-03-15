package com.sys.facades;

import java.sql.Date;
import java.util.List;

import com.sys.basic.objects.Company;
import com.sys.basic.objects.Coupon;
import com.sys.basic.objects.Coupon.CouponType;
import com.sys.database.managing.CompanyCouponDAO;
import com.sys.database.managing.CompanyDAO;
import com.sys.database.managing.CouponDAO;
import com.sys.database.managing.CustomerCouponDAO;
import com.sys.database.managing.IdsDAO;
import com.sys.system.operations.CouponSystemException;
/**a facade which describes every company user and the actions it can perform
 * @author Yuval Maayan
 * @version 1.0
 */
public class CompanyFacade extends CouponClientFacade {
	
	/**@param company = the company which is logged in.
	 * @param companyDAO = an object that enables the access to the companies data
	 * @param couponDAO = an object that enables the access to the coupons data*/
	private Company company;
	private CompanyDAO companyDAO = new CompanyDAO();
	private CouponDAO couponDAO = new CouponDAO();

/**a constructor which receives a comapny's name and initiates the "company" attribute according to the name parameter
 * @param name = the company's name 
 * @throws CouponSystemException with a message if a problem occurred in process */
	public CompanyFacade(String name) throws CouponSystemException {
		company = companyDAO.retrieveByName(name);
	}

	/**a method that creates a new coupon in the coupon system
	 * @param coupon = the created coupon
	 * @return true if the creation was successful and false if the coupon already exists 
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public long createCoupon(Coupon coupon) throws CouponSystemException {
		long id = 0;
		if (couponDAO.exists(coupon) == 0) {
			id = couponDAO.create(coupon);
			CompanyCouponDAO.create(IdsDAO.getLastCoupon()-1, company.getId());
		}
		else 
			throw new CouponSystemException("Coupon Name Exists");

		return id;
	}
	
	/**a method that removes a chosen coupon from the coupon system
	 * @param coupon = the removed coupon 
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public void removeCoupon(long id) throws CouponSystemException{
		couponDAO.delete(id);
		CompanyCouponDAO.delete(id);
		CustomerCouponDAO.delete(id);
	}
	
	/**a method that updates a chosen coupon from the coupon system
	 * @param coupon = an object containing the new parameters of the updated coupon.
	 * it is important that it will have the id of the coupon to be updated! 
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public void updateCoupon(Coupon coupon) throws CouponSystemException{
		long exists = couponDAO.exists(coupon);
		if (exists == 0 || exists==coupon.getId()) 
		    couponDAO.update(coupon);
	}
	
	/**a method that retrieves a chosen coupon from the coupon system
	 * @param id = the retrieved coupon's id
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public Coupon getCoupon(long id) throws CouponSystemException{
		return couponDAO.retrieve(id);
	}
	
	/**a method that retrieves all of the coupons company's in the coupon system
	 * @return a list of the company's coupons
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public List<Coupon> getAllCoupons() throws CouponSystemException{
		return CompanyCouponDAO.getCoupons(company.getId());
	}
	
	/**a method that retrieves all of the company's coupons from a certain type in the coupon system
	 * @param type = the coupon type to be retrieved
	 * @return a list of the company's coupons from the selected type
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public List<Coupon> getCouponByType(CouponType type) throws CouponSystemException{
		List<Coupon> list = getAllCoupons();
		for(int i=0;i<list.size();i++){
			if(list.get(i).getType()!=type){
				list.remove(i);
				i--;
			}
		}
		return list;
	}
	
	/**a method that retrieves all of thecompany's  coupons up until a certain price in the coupon system
	 * @param price = the coupon price to be retrieved
	 * @return a list of the company's coupons which up until a certain price 
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public List<Coupon> getCouponByPrice(double price) throws CouponSystemException{
		List<Coupon> list = getAllCoupons();
		for(int i=0;i<list.size();i++){
			if(list.get(i).getPrice()>price){
				list.remove(i);
				i--;
			}
		}
		return list;
	}
	
	/**a method that retrieves all of the company's coupons up until a certain expiration date in the coupon system
	 * @param date = the expiration date to be retrieved
	 * @return a list of the company's coupons which expire up until the selected date
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public List<Coupon> getCouponByExpirationDate(Date date) throws CouponSystemException{
		List<Coupon> list = getAllCoupons();
		for(int i=0;i<list.size();i++){
			Date expDate = new Date(list.get(i).getEndDate());
			if(expDate.toString().compareTo(date.toString())<0){
				list.remove(i);
				i--;
				}
		}
		return list;
	}
	
	public List<Coupon> getCouponsByString(String str){
		List<Coupon> list = getAllCoupons();
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
}
