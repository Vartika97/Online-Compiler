var express = require('express');
var app = express();
var multer = require('multer');
console.log("done1");
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './images')
	},
        filename: function(req, file, callback) {
		callback(null, file.originalname)
	}
	
})
var image = multer({storage:storage});
app.post('/upload',image.single('file1'), function(req, res) {
console.log("start"+req.file.originalname);
res.send("ok");
console.log(req.file);

});
app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});
