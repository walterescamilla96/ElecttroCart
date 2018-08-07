/*module.exports = function () {

    var db = require('../libs/db-connection')();
    var Schema = require('mongoose').Schema;
    const ObjectId = Schema.ObjectId;

    var Producto = Schema({
        ID: ObjectId,
        titulo: String,
        descripcion: String,
        imagen: String,
        autor: String,
        tecnologia: String,
        precio: Number,
        archivo: String,
        existencia: Number,
        vendidos: Number,
    });

    return db.model('producto', Producto);
}
*/

/*var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: String, required: true },
    autor: { type: String, required: true },
    tecnologia: { type: String, required: true },
    precio: { type: Number, required: true },
    archivo: { type: String, required: true },
    existencia: { type: Number, required: true },
    vendidos: { type: Number, required: true }
});

module.exports = mongoose.model('Producto', schema);*/