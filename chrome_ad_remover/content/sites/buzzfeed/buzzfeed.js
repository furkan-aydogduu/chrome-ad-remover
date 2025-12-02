class SiteBuzzfeed extends Site{
	
	constructor(){
		super(
			"buzzfeed.com", 
			[
				"Ad Ad--tb  Ad--loaded", "google_ads_iframe", "ad-animated", "ad__disclosure", "adStickySidebar", "Ad--sidebar", "Ad--bigstory", "ad-placeholder", "ad-sticky-within", 
				"Ad Ad--awareness", "Ad--awareness", "div-gpt-ad-", "Ad--topic", "js-ad-disclosure", "Ad--edit", "Ad--pixel", "Ad--unfilled", "Ad--promo-", "Ad--inline", "ad-inline", "Ad--subbuzz",
				"Ad--loading", "Ad--story-bpage", "ad-feed-story", "_adSpacing_", "ad-content-ready", "Ad--tb", "ad-flexible", "ad-wireframe"
			],
			["id", "class"]
		);
	}
	
	callback(){
		
	}
	
	nodeCallback(node){
		
		if(exists(node)){
			if(isNodeOf(node, "iframe")){
				if(exists(node.parentNode)){
					if(nodeAttributeExistsWithIdentity(node.parentNode, "class", "WatchPlayer__IframeContainer")){
						return;
					}
				}
				else{
					hide(node);
				}
			}
		}
	}
}

 