var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var schema = new Schema({
    nome: {type: String, require:true},
    cognome: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    data_nascita: {type: Date, require: true},
    ruolo: {type: String, require: true},
    password: {type: String, require: true},
});

schema.statics.hashPassword = function hashPassword(password) {
    return bcrypt.hashSync(password, 10);
}

schema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

schema.methods.generateJwt = function () {
    return jwt.sign({_id: this._id}, "SECRET#123");
}

module.exports = mongoose.model('User', schema);