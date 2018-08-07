var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    usuario: {type: String, required:true},
    password: {type: String, required: true}
})

userSchema.methods.encryptPassword = function(password) {
    return bycrypt.hashSync(password, bycrypt.gensaltSinc(5), null);
}

userSchema.methods.validPassword = function(password) {
    return bycrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);