package com.sys.operations;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.sys.system.operations.CouponSystem;

/**
 * a ServletContextListener that starts the coupon system on server init and
 * shuts the system down before the server is shut down
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 */

public class SystemInitialize implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		CouponSystem.getInstance().shutDown();
	}

	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		CouponSystem.getInstance();
	}

}
