package com.sys.system.operations;

import java.sql.Date;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

import com.sys.basic.objects.Coupon;
import com.sys.database.managing.CompanyCouponDAO;
import com.sys.database.managing.CouponDAO;
import com.sys.database.managing.CustomerCouponDAO;

/**
 * a thread which runs constantly in the background while the coupon system is
 * operating. once a day the thread performs a task which deletes every out of
 * date coupons from the system.
 * 
 * @author Yuval Maayan
 * @version 1.0
 */
public class DailyCouponExpirationTask extends Thread {

	/**
	 * @param quit
	 *            = a boolean attribute. the thread stops when its set to false
	 * @param couponDAO
	 *            = an object that enables the access to the coupons data
	 */
	private boolean quit;
	private CouponDAO couponDAO = new CouponDAO();

	/** a constructor which sets the "quit" attribute to false */
	public DailyCouponExpirationTask() {
		quit = false;
	}

	/**
	 * in order to find out when a day has passed and run the task once a day,
	 * these parameters were defined:
	 * 
	 * @param today
	 *            = todays date
	 * @param g
	 *            = a gregorian calendar which is used to define "tomorrow" as:
	 *            "today"+ one day
	 * @param tomorrow
	 *            = tomorrows date. obtained by adding 1 day to "g", and using
	 *            it in the constructor
	 * @param ranToday
	 *            = equals true if the task was done today and false if not
	 */
	@Override
	public void run() {

		// dates for making it run once a day
		Date today = new Date(System.currentTimeMillis());
		GregorianCalendar g = new GregorianCalendar();
		g.setTimeInMillis(today.getTime());
		g.add(Calendar.DAY_OF_MONTH, 1);
		Date tomorrow = new Date(g.getTimeInMillis());
		boolean ranToday = false;
		// list of all coupons
		List<Coupon> list;

		// main loop, runs until quit is true, checks once a day the expiration
		// date of every coupon
		while (quit == false) {
			// checks if the days switched
			if (today.toString().equals(tomorrow.toString())) {
				today.setTime(tomorrow.getTime());
				g.setTimeInMillis(today.getTime());
				g.set(Calendar.DAY_OF_MONTH, 1);
				tomorrow.setTime(g.getTimeInMillis());
				ranToday = false;
			}
			// daily check
			if (ranToday == false) {
				list = couponDAO.getAll();
				for (int i = 0; i < list.size(); i++) {
					if (new Date(list.get(i).getEndDate()).toString().equals(today.toString())) {

						couponDAO.delete(list.get(i).getId());
						CustomerCouponDAO.delete(list.get(i).getId());
						CompanyCouponDAO.delete(list.get(i).getId());
					}
				}
				ranToday = true;
			}
			try {
				sleep(10000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

	/** a task that stops the thread by setting "quit" to true */
	public void stopTask() {
		quit = true;
	}

}
