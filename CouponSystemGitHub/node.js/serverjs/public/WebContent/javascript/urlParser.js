/**extracts a parameter called "error" out of a given URL
 * @return the value of the "error" parameter as a String */
function urlErrorParser(url){
	var errorStart = url.indexOf('=');
	if(errorStart==-1)
		return "";
	
	var error = url.substr(errorStart+1,url.length-1);
	while(error.indexOf("%20")!=-1)
	   error = error.replace("%20"," ");
	return error;
}