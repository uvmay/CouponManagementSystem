package com.sys.basic.objects;

import java.sql.Date;

import javax.xml.bind.annotation.XmlRootElement;
/**an object that describes every coupon created in the Coupon System
 * @author Yuval Maayan
 * @version 1.0
 */

@XmlRootElement
public class Coupon {
/**
 * @param id = self generated id
 * @param title = coupon's title
 * @param startDate = the day the coupon is eligible from
 * @param endDate = the day the coupon expires
 * @param amount = the amount of money the coupon is worth
 * @param type = the type of coupon, is of "CouponType" class
 * @param message = a message the company which created the coupon wants to deliver
 * @param price = the coupon's price
 * @param image = a String representing the source of the coupon's image
 * */
	private long id;
	private String title;
	private long startDate;
	private long endDate;
	private int amount;
	private CouponType type;
	private String message;
	private double price;
	private String image;
	
/**the CouponType enum, the only representative of the coupon types available*/
	@XmlRootElement
	public enum CouponType{
		RESTURANTS,ELECTRICITY,FOOD,HEALTH,SPORTS,CAMPING,TRAVELLING
	}
/**empty constructor*/
	public Coupon(){};
	
/**a constructor that defines all attributes except id to given values
* @throws TooLongException */
   public Coupon(String title, long startDate, long endDate, int amount, CouponType type, String message,
		double price, String image) throws TooLongException {
		super();
        setTitle(title);
        this.startDate = startDate;
		this.endDate = endDate;
		this.amount = amount;
		this.type = type;
        setMessage(message);
        this.price = price;
		setImage(image);
		}
   
/**a constructor that defines all attributes to given values
 * @throws TooLongException */
	public Coupon(long id, String title, long startDate, long endDate, int amount, CouponType type, String message,
			double price, String image) throws TooLongException {
		super();
		this.id = id;
        setTitle(title);
        this.startDate = startDate;
		this.endDate = endDate;
		this.amount = amount;
		this.type = type;
        setMessage(message);
        this.price = price;
		setImage(image);
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}
	
/** sets the coupon's title. the title can't be longer than 24 characters
 *  @throws TooLongException which states the name given is too long */
	public void setTitle(String title) throws TooLongException {
		if(title.length()>24)
			throw new TooLongException("Title Too Long");
		this.title = title;
	}

	public long getStartDate() {
		return startDate;
	}

	public void setStartDate(long startDate) {
		this.startDate = startDate;
	}

	public long getEndDate() {
		return endDate;
	}

	public void setEndDate(long endDate) {
		this.endDate = endDate;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public CouponType getType() {
		return type;
	}

	public void setType(CouponType type) {
		this.type = type;
	}

	public String getMessage() {
		return message;
	}
/** sets the coupon's message. the message can't be longer than 50 characters
 *  @throws TooLongException which states the message given is too long */
	public void setMessage(String message) throws TooLongException {
		if(message.length()>50)
			throw new TooLongException("Message Too Long");
		
		this.message = message;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getImage()  {
		
		return image;
	}
	/** sets the coupon's image source. the image source can't be longer than 40 characters
	 *  @throws TooLongException which states the image source given is too long */
	public void setImage(String image) throws TooLongException {
		if(image.length()>40)
			throw new TooLongException("Image Source Too Long");
		
		this.image = image;
	}

	@Override
	public String toString() {
		return "Coupon [id=" + id + ", title=" + title + ", startDate=" + startDate + ", endDate=" + endDate
				+ ", amount=" + amount + ", type=" + type + ", message=" + message + ", price=" + price + ", image="
				+ image + "]";
	}
	
}
