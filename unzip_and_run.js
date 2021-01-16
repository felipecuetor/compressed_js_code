//Downloads a zip file from zip_path
//It asumes the zip contains a folder named "files" and looks for the "files/execution_order.txt" files
//It unzips the js code files in the order given by "execution_order.txt" and executes them in javascript's global scope.
function loadCompressedCode(zip_path){
	var zipped_files = undefined;

	function executeJSFilesRecursion(code_file_list){
		if(code_file_list.length != 0){
			code_file_path = code_file_list[0];
			remaining_code_file_list = code_file_list.slice(1);
			if(code_file_path.endsWith(".js")){
				getFileFromZip(code_file_path, zipped_files,
					function(js_code){
						eval.call(window,js_code);
						executeJSFilesRecursion(remaining_code_file_list);
					}
				);
			}
		}
	}

	function startLoad(){
		getFileFromZip("files/execution_order.txt", zipped_files,
			function(text){
				var code_file_list = text.split("\n");
				code_file_list.forEach(function(item, index){
					code_file_list[index] = item.replace("\n", "");
					code_file_list[index] = item.replace("\r", "");
				});
				executeJSFilesRecursion(code_file_list);
			}
		);
	}



	function getFileFromZip(file_path, zipped_files, callback){
		JSZip.loadAsync(zipped_files).then(function (zip) {
			return zip.file(file_path).async("string");
		}).then(function (text) {
			callback(text);
		});
	}

	function getZipFromServer(zip_path){
			JSZipUtils.getBinaryContent(zip_path, function(err, data) {
				if(err) {
					throw err;
				}
				zipped_files = data;
				startLoad();
			});
	}
	getZipFromServer(zip_path);
}

loadCompressedCode("/files.zip");
