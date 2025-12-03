class SiteOnedio extends Site{
	
	constructor(){
		super(
			["onedio.com"], 
			[
			"icerikyanispontop-container", "icerikyanitop-container", "kategoriyanitop","gpt-desktop-icerik", "gpt-desktop-kategori", "google_ads_iframe", "article__oads", 
			"type-e", "type-w", "teads", "mdznads", "philips-popup", "onedio-ps-container", "qnb-zeka-q-mh", "okey", "yuzdeyuzmuzik-main-container", "zergo", "gpt-ad-", 
			"masthead", "slidernativeads", "now-", "now bg", "_ima-ad-container", "sliderNativeAds", "floorcare-main-container"
			],
			
			["id", "class"],
			["iframe", "ins"],
			[
				{
					"node" : "iframe",
					"class" : "video-embed"
				}
			]
		);
	}
	
	nodeCallback(node){
		
		if(nodeAttributeExistsWithIdentity(node, "id", "icerikyanispontop-container")){
			hide(node.parentNode);
		}
		
		else if(nodeAttributeExistsWithIdentity(node, "id", "icerikyanitop-container")){
			hide(node.parentNode);
		}
		
		else if(nodeAttributeExistsWithIdentity(node, "id", "gpt-desktop-kategori")){
			if(exists(node.parentNode)){
				hide(node.parentNode.parentNode);
			}
		}
		
		else if(nodeAttributeExistsWithIdentity(node, "id", "gpt-desktop-icerik")){
			if(exists(node.parentNode)){
				hide(node.parentNode.parentNode);
			}
		}
	}
	
	callback(){
		this.resetBodyNode();
	}
	
	resetBodyNode(){

		var element = document.getElementsByTagName("body")[0];
		
		if(exists(element) && element instanceof Node){
			if(exists(element.attributes) && element.attributes instanceof NamedNodeMap){
				for(let i = 0; i < element.attributes.length; i++){
					var attr = element.attributes[i];
					
					if(attr.name.toLowerCase() === "class" || attr.name.toLowerCase() === "style"){
						element.removeAttribute(attr.name);
					}
				}
			}
		}	
	}
}