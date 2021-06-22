const { response } = require('express');
const Medico = require('../models/medico');
const { generarJWT } = require('../helpers/jwt');

const getMedicos = async(req, resp = response) => {

    const medicos = await Medico.find()
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');

    resp.json({
        ok: true,
        medicos
    })
}

const crearMedico = async(req, resp = response) => {

    const uid = req.uid;
   
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try{

        const medicoDB = await medico.save();

        resp.json({
            ok: true,
            medico: medicoDB
        })


    } catch (error) {
        console.log.error
        resp.status(500).json({
            ok: false,
            msg: 'Solicite una solucion al admin'
        })
    }

}

const actualizarMedico = (req, resp = response) => {
    resp.json({
        ok: true,
        msg: 'actualizarMedico'
    })
}

const eliminarMedico = (req, resp = response) => {
    resp.json({
        ok: true,
        msg: 'eliminarMedico'
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}