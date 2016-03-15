package com.sys.system.operations;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
/**a connection pool of connections to the database. it is a singleton.
 * @author Yuval Maayan
 * @version 1.0
 */
public class ConnectionPool {
   /**@param MAX_CONNECTIONS = the maximum number of connections connected at once
    * @param map = a map of the connections available. it contains the connections,
    *  and true or false whether the connection is free or not
    * @param url = the url to the database
    * @param instance = the static attribute which contains a Connection Pool and makes the class a singleton  */
	private static final int MAX_CONNECTIONS = 10;
	private Map<Connection, Boolean> map = new HashMap<>();
	private String url;
	private static ConnectionPool instance = null;

	/**a private constructor, a part of the singleton structure.
	 * fills the map with connections and sets their status to true
	 * @throws an SQLExcepton */
	private ConnectionPool() throws Exception {
		Class.forName("org.apache.derby.jdbc.ClientDriver");
		
		url = "jdbc:derby://localhost:1527//couponsys";
		for (int i = 0; i < MAX_CONNECTIONS; i++) {
			map.put(DriverManager.getConnection(url), true);
		}
	}

	/** a static method that returns the "instance" attribute of the ConnectionPool. a part of the singleton structure
	 * @return the connection pool. returns the same connection pool each time
	 * @throws CouponSystemException with a message if a problem occurred in process */
	public static ConnectionPool getInstance() throws CouponSystemException {
		if (instance == null) {
			try {
				instance = new ConnectionPool();
			} catch (Exception e) {
				throw new CouponSystemException("Problem Creating Connection Pool");
			}
		}
		return instance;
	}

	/**the method to get a connection from the connection pool. a recursive method.
	 * if there are no connections available, the thread who summoned this method waits, until
	 * being notified that a connection has been returned. this happens until the thread gets
	 * a connection.
	 * @return a connection if any are available. if not, it waits and when notified it returns the method again
	 *  to try and return a free connection if available
	 *  @throws an Exception */
	public synchronized Connection getConnection() throws Exception {
		for (Connection curr : map.keySet()) {
			if (map.get(curr) == true) {
				map.put(curr, false);
				return curr;
			}
		}
		wait();
		return getConnection();
	}

	/**a method that returns a connection to the connection pool. it notifies all the waiting threads 
	 * when done returning */
	public synchronized void returnConnection(Connection con) {
		if (con != null) {
			map.put(con, true);
			notifyAll();
		}
	}

	/**a method which shuts down every connection in the connection pool.
	 * @throws an SQLException */
	public void shutDown() throws SQLException {
		for (Connection curr : map.keySet()) {
			curr.close();
		}
	}

}
