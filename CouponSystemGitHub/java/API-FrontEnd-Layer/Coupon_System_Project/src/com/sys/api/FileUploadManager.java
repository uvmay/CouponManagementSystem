package com.sys.api;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;
import com.sys.system.operations.CouponSystemException;

/** a class that manages all of the coupon image uploads.
 * every http request that uploads an image will be sent to: 
 * 'http://localhost:8080/MyProjectName/rest/upload/coupon/image' 
 * @author Yuval Maayan and Lior Lev
 * @version 1.0 
 * */

@Path("/upload/coupon/image")
public class FileUploadManager {

	/**the method that receives the http request that's being sent with the image
	 * @param fileData = the data of the file that's being sent - the coupon image
	 * @param fileDetail = the details describing the file (image) such as the files name
	 * @param req = the http request that has been sent
	 * @return the path to the created coupon image inside the WebContent directory, relative to 'index.html'.
	 *  in this case: 'images/imageName.jpg' */
	@POST
	@Produces({MediaType.TEXT_PLAIN})
	@Consumes({MediaType.MULTIPART_FORM_DATA})
	public String uploadFiles(@FormDataParam("file") InputStream fileData,
			@FormDataParam("file") FormDataContentDisposition fileDetail,
			@Context HttpServletRequest req) throws CouponSystemException {
		//prints the fileData and the fileDetail
		System.out.println("fileData "+fileData+" fileDetail "+fileDetail);
        
		//declares the 'path' variable and assigns it with the images directory name. in this case: '/images'
		String path = "/images";
		
		//makes the path the real path to the actual folder on the server named '/couponPictures' (in this case, the server is this computer)
        path = req.getServletContext().getRealPath(path);
        
        //adds the file name to the path, so that the file would be created with this name at the folder mentioned above
        path+="/" + fileDetail.getFileName();
        path=path.replace('\\', '/');
        System.out.println(path);
        
        //sends the file data and the desired path to be created on the server.
        //read about the function 'writeToDisk' further down the document
		writeToDisk(fileData, path);
		try{
		InputStream stream = new FileInputStream(new File(path));
		
		//writes to an extenral image source
		writeToDisk(stream,"C:/Users/yuval/Desktop/java final project/website/couponPictures/"+fileDetail.getFileName());
		
		} catch(Exception e){
			throw new CouponSystemException("problem finding file to copy");

		}
        
		//returns the relative path from 'index.html' to the client side, so the image could be shown on the web
		String picPath = "images/"+fileDetail.getFileName();
		return picPath;
	}

	/**a method the writes the uploaded image to the destination
	 * @param uploadedInputStream = the file's data - that will be written to the disk
	 * @param uploadedFileLoaction = the location to which the file will be written */
	private void writeToDisk(InputStream uploadedInputStream, String uploadedFileLocation) throws CouponSystemException {

		//creating the OutputStream object 'out', 
		try (OutputStream out = new FileOutputStream(uploadedFileLocation)) {
			int read = 0;
			byte[] bytes = new byte[1024];

			//a loop that copies every byte from the fileData (uploadedInputStream) to the path declared
			while ((read = uploadedInputStream.read(bytes)) != -1) {
				out.write(bytes, 0, read);
			}
		} catch (IOException e) {
			throw new CouponSystemException("problem uploading image");
		}

	}
}
