function exists(object){
	
	if(object === undefined || object === null){
		return false;
	}
	
	return true;
}

function hide(node){
	if(exists(node) && node instanceof Node){
		node.style.setProperty('display', 'none', 'important');
	}
}

function show(node){
	//to-do
}

function nodeAttributeExistsWithIdentity(node, attributeName, identityList){
	if(arguments.length >= 3){
		if(nodeAttributeExists(node, attributeName)){
			for(let i = 2; i < arguments.length; i++){
				let identityList = arguments[i];
				
				if(exists(identityList)){
					if(identityList instanceof Array){
						for(let j = 0; j < identityList.length; j++){
							if(node.attributes[attributeName.toLowerCase()].value.includes(identityList[j])){
								return true;
							}
						}
					}
					else if(typeof identityList === "string"){
						if(node.attributes[attributeName.toLowerCase()].value.includes(identityList)){
							return true;
						}
					}
				}
			}
		}
	}
	
	return false;
}

function nodeAttributeExists(node, attributeName){
	
	if(exists(node) && node instanceof Node){
		if(exists(node.attributes) && node.attributes instanceof NamedNodeMap){
			if(exists(attributeName) && typeof attributeName === "string"){
				for(let i = 0; i < node.attributes.length; i++){
					if(exists(node.attributes[i])){
						if(node.attributes[i].name.toLowerCase() === attributeName.toLowerCase()){
							return true;
						}
					}
				}
			}
		}
	}

	return false;
}

function isNodeOf(node, nodeName){
	if(exists(node) && node instanceof Node){
		if(exists(nodeName)){
			if(node.nodeName.toLowerCase() === nodeName){
				return true;
			}
		}	
	}
	
	return false;
}
