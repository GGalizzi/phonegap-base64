// window.plugins.Base64

function Base64() {
}


Base64.prototype.encodeFile = function(filePath, sucess, failure) {
	var args = {};
	args.filePath = filePath;
	//handle android using native code because toDataURL is not supported on android version < 3
	if (device.platform == "Android")
		cordova.exec(sucess, failure, "Base64", "encodeFile", [args]);
	else {
		
		function gotFile(f) {
			f.file(function(file) {
				var reader = new FileReader();
				reader.onloadend = function(e) {
					var content = this.result;
					sucess(content);
				};
				
				reader.readAsDataURL(file)
			});
		}

		window.resolveLocalFileSystemURL('file://'+filePath, gotFile, failure);
	}
}

cordova.addConstructor(function()  {
	if(!window.plugins)
	{
		window.plugins = {};
	}
	
   // shim to work in 1.5 and 1.6
   if (!window.Cordova) {
   	window.Cordova = cordova;
   };
   
   window.plugins.Base64 = new Base64();
});
