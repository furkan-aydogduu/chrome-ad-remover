class SiteDonanimhaber extends Site{
	
	constructor(){
		super(
			"donanimhaber.com", 
			[
				"google_ads_iframe", "reklam-masthead", "new-bg-ad", "reklam-kare", "empower-ad", "Reklam", "reklam-fix fixed", "reklam-fix", "virgul-ad imaj", 
				"virgul-ad", "DH-Reklam", "reklam-kutu", "degisiklireklam", "reklamkullanicikapsam", "sagSabitReklam", "sagreklam", "yapisanreklam", "stickyAdRightSide", "div-gpt-ad"
			],
			["id", "class", "partial-name"],
			["iframe"],
			[
				{	"node" : "iframe",
					"class" : "dh-player-responsive"
				},
				{	"node" : "iframe",
					"src" : "youtube.com/"
				}
			]
		);
	}
	
	callback(){
		
	}
	
	nodeCallback(node){
		
	}
}

 