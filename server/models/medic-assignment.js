var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    id_medico: {type: String, require:true},
    id_paziente: {type: String, require:true},
});


module.exports = mongoose.model('MedicAssignment', schema);