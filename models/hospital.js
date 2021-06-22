const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    usuario: {  //evitamos que se registre uno sin saber quien lo registro
        require: true,  
        type: Schema.Types.ObjectId, //RELACION ENTRE ESTE SHEMA CON OTRA REFERENCIA
        ref: 'Usuario'
    }

}, {collection: 'hospitales' }); //renombramos a la tabla de la db

HospitalSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Hospital', HospitalSchema);