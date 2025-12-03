class Site {
	
	constructor(hostList, ad_identity_blacklist, ad_element_attribute_checklist, ad_element_blacklist, exclude_list){
		this.hostList = hostList;
		this.ad_identity_blacklist = ad_identity_blacklist;
		this.ad_element_attribute_checklist = ad_element_attribute_checklist;
		this.ad_element_blacklist = ad_element_blacklist;
		this.exclude_list = exclude_list;
	}
	
	callback(){}
	
	nodeCallback(node){}
}