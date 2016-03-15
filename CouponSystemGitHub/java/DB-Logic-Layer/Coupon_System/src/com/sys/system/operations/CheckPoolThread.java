package com.sys.system.operations;

import java.sql.Connection;

public class CheckPoolThread extends Thread {
	
	public CheckPoolThread() {
		super();
	}

	public CheckPoolThread(String name) {
		super(name);
	}

	@Override
	public void run() {
		ConnectionPool pool = ConnectionPool.getInstance();
		Connection con;
		try {
			con = pool.getConnection();

			System.out.println("thread " + this.getName() + " got a connection");
			try {
				sleep(4000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			pool.returnConnection(con);
			System.out.println("thread " + this.getName() + " returned a connection");
		} catch (Exception e1) {
			e1.printStackTrace();
		}
	}
}
