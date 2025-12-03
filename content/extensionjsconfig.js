var attachShadow = HTMLElement.prototype.attachShadow

HTMLElement.prototype.attachShadow = function (option){
	console.log("asd");
	option.mode = "open";
							
	var sh = attachShadow.call(this, option);
	
	var _observer = new MutationObserver(removeAds);
	
	sh.cabObserver = _observer;
	
	_observer.observe(sh, {
	  subtree: true,
	  childList: true,
	  attributes: true
	});
	
	//console.info( '%s shadow attached to %s', option.mode, this );
	
	return sh;
};