const db = require('../config/database');

const commentSchema = new db.Schema({
	text: String,
	discussion_id: db.Schema.Types.ObjectId,
	author:{
		id: String,
		name: String
	},
	created: {
		type: Date,
		default: Date.now
	}
});

module.exports = db.model("Comment", commentSchema);