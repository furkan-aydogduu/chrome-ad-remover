class CABMutationObserver{
	
	static TMutationObserver;
	static observerIdGenerator;
	
	static{
		CABMutationObserver.setBuiltInMutationObserver();
		CABMutationObserver.observerIdGenerator = new CABGenerator();
	}
	
	constructor(callback){
		this.callback = callback;
		this._observer = new CABMutationObserver.TMutationObserver(callback);
		this._observer.cabObserverId = CABMutationObserver.observerIdGenerator.getNewId();
	}
	
	getCABObserverId(){
		if(exists(this._observer)){
			return this._observer.cabObserverId;
		}
		else{
			return undefined;
		}
	}
	
	observe(node, options){
		this._observer.observe(node, options);
	}
	
	disconnect(){
		this._observer.disconnect();
	}
	
	static setBuiltInMutationObserver(){
		CABMutationObserver.TMutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	}
	
}