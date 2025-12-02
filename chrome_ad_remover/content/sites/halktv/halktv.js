class SiteHalktv extends Site {
	
	constructor(){
		super(
			"halktv.com", 
			["membrana_tr_interstitial", "ad_unit", "theads-interstitial", "ima-ad-container", "nts-float-container", "rmp-ad-container", "type-e", "type-w", "banner-masthead"],
			["id", "class"],
			["ins", "dfp-ad", "iframe"]
		);
	}
	
	nodeCallback(node){
		if(nodeAttributeExistsWithIdentity(node, "class", "rmp-ad-container")){
			node.remove();
		}
	}
}
	

 