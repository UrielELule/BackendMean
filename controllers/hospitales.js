const { response } = require('express');
const Hospital = require('../models/hospital');
const { generarJWT } = require('../helpers/jwt');


const getHospitales = async(req, resp = response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre');
    
    resp.json({
        ok: true,
         hospitales
    })
}


const crearHospital = async (req, resp = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
   
    try{

        const hospitalDB = await hospital.save();
    
        resp.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch(error) {
        console.error(error)
        resp.status(500).json({
            ok: false,
            msg: 'Solicite una solucion al admin'
        })
    }
}


const actualizarHospital = (req, resp = response) => {
    resp.json({
        ok: true,
        msg: 'actualizarHospitales'
    })
}

const eliminarHospital = (req, resp = response) => {
    resp.json({
        ok: true,
        msg: 'eliminarHospitales'
    })
}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}