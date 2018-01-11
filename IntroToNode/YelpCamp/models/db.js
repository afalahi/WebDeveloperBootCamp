var mongoose = require('mongoose');  
var yelpCampSchema = new mongoose.Schema({  
  campName: String,
  imagePath: String,
  location: String,
  description: String,
  dateAdded: Date
});
mongoose.model('Team', teamSchema);  
mongoose.connect('mongodb://localhost/euro2012');