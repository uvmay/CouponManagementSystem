package com.sys.basic.objects;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;
/**an object that describes every company registered in the Coupon System 
 * @author Yuval Maayan
 * @version 1.0
 */

@XmlRootElement
public class Company {
/**
 * @param id = auto generated id
 * @param compName = company's name
 * @param password = comapny's password
 * @param email = company's email
 * @param coupons = a list of the coupons created by the company
*/
	private long id;
	private String compName;
	private String password;
	private String email;
	private List<Coupon> coupons;
	
/**empty constructor*/
	public Company() {
	}

/**a constructor that defines all attributes except id to given values
 * @throws TooLongException */
	public Company(String compName, String password, String email) throws TooLongException {
		setCompName(compName);
		setPassword(password);
		setEmail(email);
		coupons = new ArrayList<>();
	}
	
/**a constructor that defines all attributes to given values
 * @throws TooLongException */
	public Company(long id, String compName, String password, String email) throws TooLongException {
		this.id = id;
		setCompName(compName);
		setPassword(password);
		setEmail(email);
		coupons = new ArrayList<>();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCompName() {
		return compName;
	}
/** sets the company's name. the name can't be longer than 24 characters
 *@throws TooLongException which states the name given is too long */
	public void setCompName(String compName) throws TooLongException {
		if (compName.length() > 24)
			throw new TooLongException("Name Too Long");

		this.compName = compName;
	}

	public String getPassword() {
		return password;
	}
/** sets the company's password. the password can't be longer than 12 characters
 *@throws TooLongException which states the password given is too long */
	public void setPassword(String password) throws TooLongException {
		if (password.length() > 12)
			throw new TooLongException("Password Too Long");

		
		this.password = password;
	}

	public String getEmail() {
		return email;
	}
/** sets the company's email. the email can't be longer than 30 characters
 *@throws TooLongException which states the the email given is too long*/
	public void setEmail(String email) throws TooLongException {
		if (email.length() > 30)
			throw new TooLongException("Email Too Long");
		
		this.email = email;
	}

	public List<Coupon> getCoupons() {
		return coupons;
	}

	public void setCoupons(List<Coupon> coupons) {
		this.coupons = coupons;
	}

	@Override
	public String toString() {
		return "Company [id=" + id + ", compName=" + compName + ", password=" + password + ", email=" + email + "]";
	}

}
