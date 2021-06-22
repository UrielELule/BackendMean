const { Schema, model } = require('mongoose');

const MedicoShema = Schema({

    nombre: {
        type: String,
        require: true
    }, 
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,  //RELACION ENTRE ESTE SHEMA CON OTRA REFERENCIA
        ref: 'Usuario',
        require:  true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        require: true
    }
}, {collection: 'medicos'});

MedicoShema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Medico', MedicoShema);