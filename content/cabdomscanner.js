class CABDOMScanner{

	static scannerIdGenerator;
	
	static{
		CABDOMScanner.scannerIdGenerator = new CABGenerator();
	}
	
	constructor(callback, interval){
		this.cabScannerId = CABDOMScanner.scannerIdGenerator.getNewId();
		this.callback = callback;
		this.interval = interval;
		this.intervalId = undefined;
	}
	
	getCABScannerId(){
		return this.cabScannerId;
	}
	
	scan(node, siteConfig){
		if(exists(node) && exists(siteConfig)){
			this.intervalId = setInterval(this.callback, this.interval, node, siteConfig);
		}
	}
	
	disconnect(){
		if(exists(this.intervalId)){
			clearInterval(this.interval_id);
		}
	}
}