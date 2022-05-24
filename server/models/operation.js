var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    id_paziente: {type: String, require:true},
    titolo: {type: String, require:true},
    data_ora: {type: Date, require:true},
    durata: {type: Number, require:true},
    rischio: {type: String, require:true},
    stato: {type: String, require:true},
    descrizione: {type: String, require:true},
});

module.exports = mongoose.model('Operation', schema);