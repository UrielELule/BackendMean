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

const actualizarMedico = async(req, resp = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try{

        const medico = await Medico.findById( id );
        
        if( !medico ) {
            return resp.status(404).json({
                ok: true,
                msg: 'No existe medico'
            });
        }

        const cambioMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambioMedico, { new: true} )

        resp.json({
            ok: true,
            medico: medicoActualizado
        })

    } catch(error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const eliminarMedico = async(req, resp = response) => {

    const id = req.params.id;

    try{

        const medico = await Medico.findById(id);

        if( !medico ){
            return resp.status(404).json({
                ok: false,
                msg: 'Medico no encontrado',
            });
        }

        await Medico.findByIdAndDelete(id);

        resp.json({
            ok: true,
            msg: 'Medico Eliminado'
        })

    } catch(error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}