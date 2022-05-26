var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  //  id_operatore: {type: String, require:true},
  //  id_paziente: {type: String, require:true},
    testo: {type: String, require:true},
  //  data_ora: {type: Date, require:true},
});

module.exports = mongoose.model('Message', schema);