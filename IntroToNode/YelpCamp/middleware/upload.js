const multer = require('multer');
//MULTER CONFIG
const storage = multer.diskStorage(
	{  
		destination: function (req, file, cb) {
			cb(null, './public/images')
		},
		filename: function(req, file, callback) {
			callback(null,Date.now()+'-'+file.originalname);
		}
	}
);
const upload = multer({storage:storage});
module.exports = upload;