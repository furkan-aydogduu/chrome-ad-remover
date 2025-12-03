class SiteBloomberht extends Site{
	
	constructor(){
		super(
			["bloomberght.com", "bloomberghtradyo.com", "businessweek.com", "bloomberg.com"],
			["ads-zone", "masthead-top", "adsp.haberturk.com", "adclick.g.", "_ima-ad-container", "ima-ad-container", "_cyhPrestitialAd", "ads-column-container"],
			["id", "class", "href"],
			["ins", "iframe"],
			[
				{
					"node" : "iframe",
					"src" : "w.soundcloud.com"
				}
			]
		);
	}
	
	nodeCallback(node){
		
		if(exists(node) && node instanceof Node){
			if(nodeAttributeExistsWithIdentity(node, "class", "_ima-ad-container") && nodeAttributeExistsWithIdentity(node, "class", "video-")){
				node.remove();
			}
		}
	}
}