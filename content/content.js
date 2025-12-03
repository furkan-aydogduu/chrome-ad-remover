var extensionSettings = {};
var siteContainer = [];
var websiteScanInterval = 500; //ms

runExtension();

async function runExtension(){

	await applyExtensionSettings();
	
	if(extensionSettings.cabEnabled){
	
		site_main();
		
		var curSiteConfig = getCurrentSiteConfig();
		
		if(exists(curSiteConfig)){
			var domScanner = new CABDOMScanner(scanDOM, websiteScanInterval);
			domScanner.scan(document, curSiteConfig);
		}
	}
}

async function applyExtensionSettings(){
	
	chrome.storage.onChanged.addListener(function(changes, area){
		  if(exists(changes)){
			  if(exists(changes.cabEnabled)){
				  extensionSettings.cabEnabled = Boolean(changes.cabEnabled.newValue);
			  }
		  }
	});

	var storageResponse = await chrome.storage.sync.get("cabEnabled");

	if(exists(storageResponse) && exists(storageResponse.cabEnabled)){
		if(storageResponse.cabEnabled === "true"){
			extensionSettings.cabEnabled = true;
		}
		else{
			extensionSettings.cabEnabled = false;
		}
	}
}

function getCurrentSiteConfig(){
	
	var host = window.location.host.toLowerCase();
	
	if(exists(host)){
		if(exists(siteContainer) && siteContainer instanceof Array){
			for(let i = 0; i < siteContainer.length; i++){
				if(exists(siteContainer[i]) && siteContainer[i] instanceof Site){
					if(exists(siteContainer[i].hostList)){
						for(let j = 0; j < siteContainer[i].hostList.length; j++){
							if(host.includes(siteContainer[i].hostList[j].toLowerCase())){
								return siteContainer[i];
							}
						}
					}
				}
			}
		}
	}
	
	return undefined;
}

function scanDOM(node, siteConfig){

	if(extensionSettings.cabEnabled){
		traverseNodeAndHideAds(node, siteConfig);
		siteConfig.callback();
	}
	else{
		this.disconnect();
	}
}

function hideBlacklistedElementsByNode(node, siteConfig){
	var anyClearOperationPerformed = 0;
	
	let blacklist = siteConfig.ad_element_blacklist;
	
	if(exists(blacklist) && blacklist instanceof Array){
		for(let i = 0; i < blacklist.length; i++){
			if(isNodeOf(node, blacklist[i])){
				hide(node);
				anyClearOperationPerformed = 1;
			}
		}
	}
			
	//console
	return anyClearOperationPerformed;
}

function hideBlacklistedElementsByAttributeByNode(node, siteConfig){
	var anyClearOperationPerformed = 0;
	
	let attributeList = siteConfig.ad_element_attribute_checklist;
	let identityList = siteConfig.ad_identity_blacklist;
	
	if(exists(attributeList) && attributeList instanceof Array){
		for(let i = 0; i < attributeList.length; i++){
			if(nodeAttributeExistsWithIdentity(node, attributeList[i], identityList)){
				hide(node);
				anyClearOperationPerformed = 1;	
			}
		}
	}
			
	return anyClearOperationPerformed;
}

function isToBeExcluded(node, siteConfig){
	
	let excludeList = siteConfig.exclude_list;
	
	if(exists(excludeList) && excludeList instanceof Array){
		
		for(let i = 0; i < excludeList.length; i++){
			
			let excludeInfo = excludeList[i];
			
			if(exists(excludeInfo) && excludeInfo instanceof Object){
				
				var shouldBeExcluded = true;
				
				for(const prop in excludeInfo){
				
					if(exists(prop)){
						
						let propVal = excludeInfo[prop];
						
						if(prop.toLowerCase() === "node"){
							if(!isNodeOf(node, propVal)){
								shouldBeExcluded =  false;
								break;
							}
						}
						else if(!nodeAttributeExistsWithIdentity(node, prop, propVal)){
							shouldBeExcluded =  false;
							break;
						}
					}
				}
				
				if(shouldBeExcluded){
					return true;
				}
			}
		}
	}
	
	return false;
}

function traverseNodeAndHideAds(node, siteConfig){

	var nodeQueue = [node];
	
	while(nodeQueue.length > 0){
		
		var curNode = nodeQueue[0];
			
		if(exists(curNode)){
			if(curNode instanceof Node){
				
				var anyClearOperationPerformed = 0;
				
				if(!isToBeExcluded(curNode, siteConfig)){
					anyClearOperationPerformed = hideBlacklistedElementsByNode(curNode, siteConfig);
				
					if(anyClearOperationPerformed < 1){
						anyClearOperationPerformed = hideBlacklistedElementsByAttributeByNode(curNode, siteConfig);
					}
				}
				
				if(anyClearOperationPerformed < 1){
					
					for(let j = 0; j < curNode.childNodes.length; j++){
						nodeQueue.push(curNode.childNodes.item(j));
					}
					
					if(curNode instanceof HTMLElement){
						if(exists(chrome.runtime) && exists(chrome.runtime.id)){
							var shadowRootOfTheNode = chrome.dom.openOrClosedShadowRoot(curNode);
						
							if(exists(shadowRootOfTheNode) && shadowRootOfTheNode instanceof Node){
								nodeQueue.push(shadowRootOfTheNode);
							}
						}						
					}
				}
				
				if(exists(siteConfig.nodeCallback) && typeof siteConfig.nodeCallback === 'function'){
					siteConfig.nodeCallback(curNode);
				}
			}
		}
		
		nodeQueue.splice(0, 1);
	}
}

