//getTodo
const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

//busca por todas las colleccioness
const getTodo = async(req, resp = response) => {

    const busqueda = req.params.busqueda;
    const regexp = new RegExp( busqueda, 'i' ); //para hacerlo keysensitive

    const [usuarios, medicos, hospital] = await Promise.all([ //realizamos las busquedas de manera simultanea en todas las colecciones
      
        Usuario.find({ 
            nombre: regexp   
        }),

        Medico.find({
            nombre: regexp 
        }),

        Hospital.find({
            nombre: regexp
        }),

    ]);

    resp.json({
        ok: true,
        msg: 'Busqueda funcional',
        busqueda,
        usuarios,
        medicos,
        hospital
    })

}

//buscador por colleccion especifica
const getDocumentosColeccion = async(req, resp = response) => {
    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp( busqueda, 'i' ); //keysensitive Aa-Zz

    let data = [];

    switch(tabla) {
        
        case 'medicos':
            data = await Medico.find({ nombre: regex})
                               .populate('usuario', 'nombre img')
                               .populate('hospital', 'nombre img');
        break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regex})
                                 .populate('usuario', 'nombre');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex});
        break;

        default:
            return resp.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            }); 
    }

    resp.json({
        ok: true,
        resultados:data
    })


}

module.exports = {
    getTodo,
    getDocumentosColeccion
}
