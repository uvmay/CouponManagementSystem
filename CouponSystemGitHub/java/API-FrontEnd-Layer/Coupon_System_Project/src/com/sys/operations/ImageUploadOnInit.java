package com.sys.operations;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.sys.system.operations.CouponSystemException;

/**
 * a ServletContextListener that uploads the images from the external folder to
 * the internal images folder on the server - when the server initiates
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 */

public class ImageUploadOnInit implements ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent event) {

	}

/**the method thats happens on server initialization 
 * @param event = the event that's triggered on server initialization
 * the method copies all of the images from the external image folder
 * to the internal one*/
	@Override
	public void contextInitialized(ServletContextEvent event) {

		String path = "/images";
		// makes the path the real path to the actual folder on the
		// server named '/images' (in this case, the server is this
		// computer)
		path = event.getServletContext().getRealPath(path);
		
		// adds the file name to the path, so that the file would be
		// created with this name at the folder mentioned above
		path += "/";
		path = path.replace('\\', '/');

		//creates an array of the File objects that are inside the folder "couponPictures"
		//ATTENTION! - the path to the folder is only relevant to this computer!
		//--!!!for this method to work you need to update the path to a relevant one!!!---
		File files = new File("C:/Users/yuval/Desktop/java final project/website/couponPictures");
		File[] filesArr = files.listFiles();
		
		//iterates over "filesArr" and copies each file to the internal folder 
		for (int i = 0; i < filesArr.length; i++) {
			//sets the files path using the general folder path and the file's name
			String filePath = path + filesArr[i].getName();
			System.out.println(filePath);
			
			//writes the file to the specified path "filePath"
			writeToPath(filesArr[i], filePath);
		}

	}

/**the method that copies the file from the external images folder to the internal one
 * @param origin = the file located on the external folder
 * @param path = the path on which the new file will be created 
 * @throws a CouponSystemException if an error occurred during the process*/
	private void writeToPath(File origin, String path) {
		//opening a new BufferedInputStream that contains the file "origin"
		//and opening a new BufferedOutputStream that contains the path "path" 
		try (BufferedInputStream in = new BufferedInputStream(new FileInputStream(origin));
				BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(path))) {

			//copies all of the bytes creating the image at "origin" to "path"
			int read = 0;
			byte[] bytes = new byte[1024];

			while ((read = in.read(bytes)) != -1) {
				out.write(bytes, 0, read);
			}
		} catch (Exception e) {
			throw new CouponSystemException("problem uploading coupon images");
		}
	}
}
