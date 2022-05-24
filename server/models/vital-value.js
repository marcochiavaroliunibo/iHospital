var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    id_operatore: {type: String, require:true},         // Medico o infermiere
    id_paziente: {type: String, require:true},
    press_min: {type: Number, require:true},            // standard: 80
    press_max: {type: Number, require:true},            // standard: 120
    hr: {type: Number, require: true},
    saturazione: {type: Number, require: true},         // standard da 95 a 100
    freq_respriratoria: {type: Number, require: true},
    livello_dolore: {type: Number, require: true},
    orario_visita: {type: Date, require: true}
});

module.exports = mongoose.model('VitalValue', schema);