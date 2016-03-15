package com.sys.facades;

import javax.xml.bind.annotation.XmlRootElement;

/**an enum which describes different types of clients
 * @author Yuval Maayan
 * @version 1.0
 */

@XmlRootElement
public enum ClientType {
ADMIN,COMPANY,CUSTOMER
}
