class SiteCumhuriyet extends Site{
	
	constructor(){
		super(
			["cumhuriyet.com"], 
			["cmh-interstitial", "adssticky", "floating-ads", "cum-taboola", "_ima-ad-container", "vjs-poster", "vjs-big-play-button"],
			["id", "class"],
			["ins", "iframe", "cmh-ads", "tagon-div"]
		);
	}
	
	callback(){
		this.resetHTMLNode();
	}
	
	resetHTMLNode(){
		var element = document.getElementsByTagName("html")[0];
		
		if(nodeAttributeExists(element, "style")){
			element.style = "";
		}
		else if(nodeAttributeExists(element, "class")){
			element.className = "";
		}
	}
	
	nodeCallback(node){
		
		if(exists(node) && node instanceof Node){
			
			if(nodeAttributeExistsWithIdentity(node, "class", "_ima-ad-container") && nodeAttributeExistsWithIdentity(node, "class", "video_")){
				node.remove();
			}
			
			if(exists(node.attributes) && exists(node.attributes["class"]) && node.attributes["class"].value === "ads-box"){
				hide(node);
			}
		}
	}
}