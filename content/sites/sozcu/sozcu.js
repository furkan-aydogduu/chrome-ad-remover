class SiteSozcu extends Site{
	
	constructor(){
		super(
			["sozcu.com"], 
			[	
				"ad masthead", "membrana_tr_interstitial", "content-inner-ad", "ad ad-cols", "ima-ad-container", "nts-float-container", "google_ads_iframe", 
				"ad news-card", "adform", "-adbox-", "ad-box", "taboola-feed", "taboola-article-feed", "136-overlay-", "136-container-"
			],
			["id", "class"],
			["iframe", "cmh-ads", "tagon-div", "ins"],
			[
				{	"node" : "iframe",
					"class" : "dailymotion-player"
				}
			]
		);
	}
	
	nodeCallback(node){
		
		if(nodeAttributeExistsWithIdentity(node, "id", "adform_") || nodeAttributeExistsWithIdentity(node, "id", "adform-")){
			node.remove();
		}
		
		if(nodeAttributeExistsWithIdentity(node, "id", "google_ads_iframe")){
			if(nodeAttributeExistsWithIdentity(node.parentNode, "id", "div-sozcu_popup")){
				hide(node.parentNode);
				
				var element = document.getElementById("div-sozcu_popup-overlay");						
				hide(element);
			}
		}
		
		if(nodeAttributeExistsWithIdentity(node, "id", "ad-box")){
			hide(node.parentNode);
		}
	}
}