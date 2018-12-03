const multer = require('multer')
multer({ dest: 'uploads/' })
//MULTER CONFIG
const storage = multer.diskStorage(
	{  
		destination: function (req, file, cb) {
			cb(null, 'uploads/')
		},
		filename: function(req, file, callback) {
			callback(null,Date.now()+'-'+file.originalname);
		}
	}
);
const upload = multer({storage:storage});
module.exports = upload;