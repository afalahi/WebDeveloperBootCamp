const db = require('../config/database');

const commentSchema = new db.Schema({
	text: String,
	author:{
		id: {
			type: db.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	created: {
		type: Date,
		default: Date.now
	}
});
module.exports = db.model("Comment", commentSchema);