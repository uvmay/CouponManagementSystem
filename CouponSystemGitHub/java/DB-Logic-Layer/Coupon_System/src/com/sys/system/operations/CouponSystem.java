package com.sys.system.operations;

import com.sys.facades.ClientType;
import com.sys.facades.CouponClientFacade;
/**the main class which runs the whole coupon system. it is a singleton.
 * @author Yuval Maayan
 * @version 1.0
 */
public class CouponSystem {

	/**@param CouponSystem = the static instance representation of the coupon system. a part of the singleton structure
	 * @param DailyCouponExpirationTask = the thread that runs the daily coupon deleting task
	 * @param pool = the connection pool to the database */
	private static CouponSystem instance = new CouponSystem();
	private DailyCouponExpirationTask task;
	private ConnectionPool pool;

	/**the private constructor which initiates the connection pool and the daily coupon task.
	 * is private as a part of the singleton structure */
	private CouponSystem() {
		pool = ConnectionPool.getInstance();
		//task = new DailyCouponExpirationTask();
		//task.start();

	}

	/**the method which returns the instance of the coupon system. returns the same instance each time
	 * as a part of the singleton structure 
	 * @return an instance of the coupon system*/
	public static CouponSystem getInstance() {
		return instance;
	}

	/**the method which is logs the user into the system
	 * @return the login method from CouponClientFacade */
	public CouponClientFacade login(String name, String password, ClientType type){
		return CouponClientFacade.login(name, password, type);
	}

	/**the method that shuts down the coupon system. it shuts the daily task and closes
	 * the connection pool */
	public void shutDown() {
		//task.stopTask();
		try{
		pool.shutDown();
		} catch (Exception e){
			throw new CouponSystemException("Problem Closing Connection Pool");
		}
	}
}
