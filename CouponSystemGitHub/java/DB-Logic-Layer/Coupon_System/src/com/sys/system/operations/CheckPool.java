package com.sys.system.operations;

public class CheckPool {

	public static void main(String[] args) {
ConnectionPool pool = ConnectionPool.getInstance();
		CheckPoolThread t1 = new CheckPoolThread("1");
		CheckPoolThread t2 = new CheckPoolThread("2");
		CheckPoolThread t3 = new CheckPoolThread("3");
		CheckPoolThread t4 = new CheckPoolThread("4");
		CheckPoolThread t5 = new CheckPoolThread("5");
		CheckPoolThread t6 = new CheckPoolThread("6");
		CheckPoolThread t7 = new CheckPoolThread("7");
		CheckPoolThread t8 = new CheckPoolThread("8");
		CheckPoolThread t9 = new CheckPoolThread("9");
		CheckPoolThread t10 = new CheckPoolThread("10");
		CheckPoolThread t11 = new CheckPoolThread("11");
		CheckPoolThread t12 = new CheckPoolThread("12");
		CheckPoolThread t13 = new CheckPoolThread("13");
		CheckPoolThread t14 = new CheckPoolThread("14");
		CheckPoolThread t15 = new CheckPoolThread("15");
		CheckPoolThread t16 = new CheckPoolThread("16");
		CheckPoolThread t17 = new CheckPoolThread("17");
		CheckPoolThread t18 = new CheckPoolThread("18");
		CheckPoolThread t19 = new CheckPoolThread("19");
		
		t1.start();
		t2.start();
		t3.start();
		t4.start();
		t5.start();
		t6.start();
		t7.start();
		t8.start();
		t9.start();
		t10.start();
		t11.start();
		t12.start();
		t13.start();
		t14.start();
		t15.start();
		t16.start();
		t17.start();
		t18.start();
		t19.start();
	}

}
