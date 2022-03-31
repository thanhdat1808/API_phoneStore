//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://localhost:27017/phoneStore';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose;
