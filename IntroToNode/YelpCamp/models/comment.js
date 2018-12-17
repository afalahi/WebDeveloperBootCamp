const db = require('../config/database');

const commentSchema = new db.Schema({
	text: String,
	discussion_id: db.Schema.Types.ObjectId,
	author:{
			type: db.Schema.Types.ObjectId,
			ref: "User"
	},
	created: {
		type: Date,
		default: Date.now
	}
});

module.exports = db.model("Comment", commentSchema);