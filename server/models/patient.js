var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    nome: {type: String, require:true},
    cognome: {type: String, require:true},
    data_nascita: {type: Date, require:true},
    luogo_nascita: {type: String, require:true},
    reparto: {type: String, require:true},
    orario_ricovero: {type: Date, require:true},
    motivo_ricovero: {type: String, require:true},
    orario_dimissioni: {type: Date, require:false},
    cartella_clinica: {type: String, require:true},
});

module.exports = mongoose.model('Patient', schema);