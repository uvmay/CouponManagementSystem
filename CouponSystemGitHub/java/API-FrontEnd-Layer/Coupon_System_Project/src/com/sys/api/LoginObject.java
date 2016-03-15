package com.sys.api;

import javax.xml.bind.annotation.XmlRootElement;

import com.sys.facades.ClientType;

/**the object containing the password, username and user type, thats beeing sent
 * to the server in order to login 
 * @author Yuval Maayan and Lior Lev
 * @version 1.0
 */

@XmlRootElement
public class LoginObject {

/**@param userName = the userName
 * @param password = the password
 * @param type = the user type -  an enum - could be "ADMIN"/"CUSTOMER"/"COMPANY" */
	private String userName;
	private String password;
	private ClientType type;
	
/**an empty constructor */
	public LoginObject(){}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public ClientType getType() {
		return type;
	}

	public void setType(ClientType type) {
		this.type = type;
	}
	
	
}
