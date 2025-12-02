class Site {
	
	constructor(host, ad_identity_blacklist, ad_element_attribute_checklist, ad_element_blacklist, exclude_list){
		this.host = host;
		this.ad_identity_blacklist = ad_identity_blacklist;
		this.ad_element_attribute_checklist = ad_element_attribute_checklist;
		this.ad_element_blacklist = ad_element_blacklist;
		this.exclude_list = exclude_list;
	}
	
	callback(){}
	
	nodeCallback(node){}
}