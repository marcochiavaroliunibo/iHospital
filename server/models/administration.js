var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    id_prescrizione: {type: String, require:true},
    id_infermiere: {type: String, require: true},
    data_ora: {type: Date, require: true},
    note: {type: String, require: false},
});


module.exports = mongoose.model('Administration', schema);