var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    id_operatore: {type: String, require:true},
    data_ora: {type: Date, require: true},
    messaggio: {type: String, require: true},
});


module.exports = mongoose.model('Contact', schema);