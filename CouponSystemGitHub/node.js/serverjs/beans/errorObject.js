/** 
 * a resource that contains the constructor for the general "Error" object in the system 
 * @author Yuval Maayan
 * @version 1.0
 * */

/**@param code = error status
  *@param message = the error's message 
  *@return an object to be sent when an error has occurd  */
exports.object = function(code, message){
	return {"code":code,"message":message};
};