var adRemoverCB = undefined;

window.onload = (event) => {

	adRemoverCB = document.getElementById("ad_remover_cb");
	
	chrome.storage.onChanged.addListener(function(changes, area){

		if(changes != undefined && changes != null){
			if(changes.cabEnabled != undefined && changes.cabEnabled != null){
				if(changes.cabEnabled.newValue == "true"){
					adRemoverCB.checked = "true";
				}
				else{
					adRemoverCB.removeAttribute("checked");
				}
			}
		}
	});
	
	adRemoverCB.addEventListener("change", function(event){
		//alert(event.currentTarget.checked);
	  if (event.currentTarget.checked == true) {
		  chrome.storage.sync.set({ "cabEnabled": "true" });
	  } else {
		  chrome.storage.sync.set({ "cabEnabled": "false" });
	  }
	});
	
	runExtensionPopup();
};



async function runExtensionPopup(){
	var storageResponse = await chrome.storage.sync.get("cabEnabled");

	if(storageResponse.cabEnabled != undefined && storageResponse.cabEnabled != null){
		if(adRemoverCB != undefined && adRemoverCB != null){
			if(storageResponse.cabEnabled == "true"){
				adRemoverCB.checked = "true";
			}
			else{
				adRemoverCB.removeAttribute("checked");
			}
			
		}
	}
}

