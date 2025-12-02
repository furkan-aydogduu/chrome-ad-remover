MutationObserver = CABMutationObserver;

var cabEnabled = false;
var siteContainer = [];
var host = "";
var curSite = undefined;
var _cabObserver = undefined;

runExtension();

async function runExtension(){

	chrome.storage.onChanged.addListener(function(changes, area){
		  if(exists(changes)){
			  if(exists(changes.cabEnabled)){
				  cabEnabled = Boolean(changes.cabEnabled.newValue);
			  }
		  }
	});

	var storageResponse = await chrome.storage.sync.get("cabEnabled");

	if(exists(storageResponse) && exists(storageResponse.cabEnabled)){
		if(storageResponse.cabEnabled === "true"){
			cabEnabled = true;
		}
		else{
			cabEnabled = false;
		}
	}

	if(cabEnabled){
	
		site_main();
		
		host = window.location.host.toLowerCase();
		
		for(let i = 0; i < siteContainer.length; i++){
			if(host.includes(siteContainer[i].host.toLowerCase())){
				curSite = siteContainer[i];
				break;
			}
		}
		
		_cabObserver = new MutationObserver(removeAds);
		
		document.cabObserver = _cabObserver;
		
		_cabObserver.observe(document, {
		  subtree: true,
		  childList: true,
		  attributes: true
		});
	}
}

function removeAds(mutationRecords, observer){
	
	//console.log("cabObserverId:" + observer.cabObserverId);
	
	if(cabEnabled){
		
		if(exists(mutationRecords) && mutationRecords instanceof Array){
			for(let i = 0; i < mutationRecords.length; i++){
				
				let mutationRecord = mutationRecords[i];
				
				if(exists(mutationRecord) && mutationRecord instanceof MutationRecord){
					if(observer.cabObserverId >= 1){
						console.log(observer.cabObserverId);
						console.log(mutationRecord);
					}
					
					if(exists(mutationRecord.removedNodes)){
						if(mutationRecord.removedNodes instanceof NodeList){
							for (let i = 0; i < mutationRecord.removedNodes.length; i++) {
								if(exists(mutationRecord.removedNodes[i])){
									if(!exists(mutationRecord.removedNodes[i].parentNode)){  //11 -> document fragment
										if(exists(mutationRecord.removedNodes[i].cabObserver)){
											console.log("disconnect");
											mutationRecord.removedNodes[i].cabObserver = undefined;
											observer.disconnect();
											return;
										}
									}
								}
							}
						}
					}
					
					var nodesToBeTraversed = [];
					
					if(mutationRecord.type.toLowerCase() === "attributes" /*|| mutationRecord.type.toLowerCase() == "childlist"*/){
						
						nodesToBeTraversed.push(mutationRecord.target);
					}
					
					if(exists(mutationRecord.addedNodes)){
						if(mutationRecord.addedNodes instanceof NodeList){
							for (let i = 0; i < mutationRecord.addedNodes.length; i++) {
								nodesToBeTraversed.push(mutationRecord.addedNodes[i]);
							}
						}
					}
					
					for(let i = 0; i < nodesToBeTraversed.length; i++){
						traverseNodeAndHideAds(nodesToBeTraversed[i], curSite.nodeCallback);
					}
					
					curSite.callback();
					nodesToBeTraversed.length = 0;
				}
			}
		}
	}
	else{
		observer.disconnect();
	}
}


function hideBlacklistedElementsByNode(node){
	var anyClearOperationPerformed = 0;
	
	let blacklist = curSite.ad_element_blacklist;
	
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

function hideBlacklistedElementsByAttributeByNode(node){
	var anyClearOperationPerformed = 0;
	
	let attributeList = curSite.ad_element_attribute_checklist;
	let identityList = curSite.ad_identity_blacklist;
	
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

function isToBeExcluded(node){
	
	let excludeList = curSite.exclude_list;
	
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

function traverseNodeAndHideAds(node, nodeCallback){

	var nodeQueue = [node];
	
	while(nodeQueue.length > 0){
		var curNode = nodeQueue[0];
			
		if(exists(curNode)){
			if(curNode instanceof Node){
				if(exists(curNode.attributes) && exists(curNode.attributes["class"]) && curNode.attributes["class"].value.toLowerCase() === "flex flex-row" && exists(curNode.parentNode) 
					&& exists(curNode.parentNode.attributes) && exists(curNode.parentNode.attributes["class"]) && curNode.parentNode.attributes["class"].value.toLowerCase() === "main bg-white relative"){
						console.log("new flew div:");
						console.log(curNode);
						if(exists(curNode.getRootNode().cabObserver)){
							console.log(curNode.getRootNode().cabObserver.getCABObserverId());
						}
						
					}
				var anyClearOperationPerformed = 0;
				
				if(!isToBeExcluded(curNode)){
					anyClearOperationPerformed = hideBlacklistedElementsByNode(curNode);
				
					if(anyClearOperationPerformed < 1){
						anyClearOperationPerformed = hideBlacklistedElementsByAttributeByNode(curNode);
					}
				}
				
				if(anyClearOperationPerformed < 1){
					
					for(let j = 0; j < curNode.childNodes.length; j++){
						nodeQueue.push(curNode.childNodes.item(j));
					}
					
					if(exists(curNode.shadowRoot) && curNode.shadowRoot instanceof Node){
						
						//console.log(curNode.shadowRoot.cabObserver);
						
						if(!exists(curNode.shadowRoot.cabObserver)){
							var _observer = new MutationObserver(removeAds);
							console.log("newObserver:" + _observer.getCABObserverId());
							console.log(curNode);
							curNode.shadowRoot.cabObserver = _observer;
							
							_observer.observe(curNode.shadowRoot, {
							  subtree: true,
							  childList: true,
							  attributes: true
							});
							
							nodeQueue.push(curNode.shadowRoot);
						}
					}
				}
				
				if(exists(nodeCallback) && typeof nodeCallback === 'function'){
					nodeCallback(curNode);
				}
			}
		}
		
		nodeQueue.splice(0, 1);
	}
}

