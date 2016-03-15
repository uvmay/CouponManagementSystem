package com.sys.basic.objects;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;
/**an object that describes every customer created in the Coupon System
 * @author Yuval Maayan
 * @version 1.0
 */

@XmlRootElement
public class Customer {
/**
 * @param id = auto generated id
 * @param custName = customer's name
 * @param password = customer's password 
 * @param coupons = a list of the coupons purchased by the customer
 */
	private long id;
	private String custName;
	private String password;
	private List<Coupon> coupons;
/** an empty constructor*/
	public Customer(){};
	
/**a constructor that defines all attributes except id to given values
 * @throws TooLongException */
	public Customer(String custName, String password) throws TooLongException {
        setCustName(custName);
        setPassword(password);
		coupons=new ArrayList<>();
	}
		
/**a constructor that defines all attributes to given values
 * @throws TooLongException */
	public Customer(long id, String custName, String password) throws TooLongException {
		this.id = id;
        setCustName(custName);
        setPassword(password);
		coupons=new ArrayList<>();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCustName() {
		return custName;
	}
/** sets the customer's name. the name can't be longer than 24 characters
 *@throws TooLongException which states the name given is too long */
	public void setCustName(String custName) throws TooLongException {
		if (custName.length() > 24)
			throw new TooLongException("Name Too Long");
		
		this.custName = custName;
	}

	public String getPassword() {
		return password;
	}
/** sets the customer's password. the password can't be longer than 12 characters
 *@throws TooLongException which states the password given is too long */
	public void setPassword(String password) throws TooLongException {
		if (password.length() > 12)
			throw new TooLongException("Password Too Long");

		this.password = password;
	}

	public List<Coupon> getCoupons() {
		return coupons;
	}

	public void setCoupons(List<Coupon> coupons) {
		this.coupons = coupons;
	}

	@Override
	public String toString() {
		return "Customer [id=" + id + ", custName=" + custName + ", password=" + password + "]";
	}
	
	
}
