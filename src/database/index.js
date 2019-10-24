const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Users', {useMongoClient: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;