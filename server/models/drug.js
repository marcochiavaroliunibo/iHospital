var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    nominativo: {type: String, require:true},
    tipologia: {type: String, require:true},
    codice: {type: String, require:true},
    somministrazione: {type: String, require:true},
    libretto: {type: String, require:true},
});

module.exports = mongoose.model('Drug', schema);