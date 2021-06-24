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


const actualizarHospital = async(req, resp = response) => {

    const id = req.params.id;
    const uid = req.uid; //lo tenemos por el jwt

    try {

        //verificamos si existe el hospital a actualizar
        const hospital = await Hospital.findById( id );

        //si no existe el hopital
        if( !hospital ) {
            return resp.status(404).json({
                ok: true,
                msg: 'No existe hospital'
            });
        }
        //actualizamos
       // hospital.nombre = req.body.nombre; primera forma

        const cambiosHospital = {
            ...req.body, //extraemos todo lo que manden
            usuario: uid //indicamos que user esta actualizando
        }

        //grabamos en la base de datos
        const hospitalActualizado =  await Hospital.findByIdAndUpdate( id, cambiosHospital, { new : true } )

        resp.json({
            ok: true,
            hospital: hospitalActualizado
        })

    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
  
}

const eliminarHospital = async(req, resp = response) => {

    const id = req.params.id;

    try {
        //verificamos si existe el hospital
        const hospital = await Hospital.findById( id );
        //si no existe retornamos
        if( !hospital ) {
            return resp.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado',
            });
        }

        await Hospital.findByIdAndDelete(id); //borramos 

        resp.json({
            ok: true,
            msg: 'Hospital eliminado'
        });

    } catch(error) {
        console.log(error);

        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

   
}


module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}