var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    id_medicina: {type: String, require:true},
    id_paziente: {type: String, require:true},
    data_inizio: {type: Date, require:true},
    durata: {type:Number, require:true},
    dosi_giornaliere: {type:Number, require:true},
    note: {type: String, require: false}
});


module.exports = mongoose.model('Prescription', schema);