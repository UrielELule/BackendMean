const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


//obtener los usuarios
const getUsuarios = async(req, resp) => {

    const usuarios = await Usuario.find({}, 'nombre email role google');

    resp.json({
        ok: true,
        usuarios,
        uid: req.uid
    });
}

//crear usuarios
const crearUsuarios = async (req, resp = response) => {

    const { email, password, nombre } = req.body;

    try {

        //comprobamos que no exista el mismo email
        const existEmail =  await Usuario.findOne({email});

        if(existEmail) {
            return resp.status(400).json({
                ok: false,
                msg: 'Este correo ya existe prueba otro...'
            });
        }

        //usamos el modelo y lo comparamos con el modelo
        const usuario = new Usuario( req.body );

        //encriptamos la password
        //1 creamos un numero aleatorio
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


        //como es una promesa y tiene que esperar (await) y ser async aqui ya grabamos en la db
        await usuario.save();

        //si pasa esas validaciones GENERAMOS EL TOKEN JSON
        const token = await generarJWT( usuario.id ); 

        resp.json({
            ok: true,
            usuario,
            token       
        });

    } catch(error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error Inesperado... Revisa tus logs'
        })
    }
}

const actualizarUsuario = async(req, resp = response) => {
    //TODO validar token y comprobar si es el usuario correcto

    const uid = req.params.id;


    try{

        //buscamos por id el usuario
        const usuarioDB = await Usuario.findById(uid);

        //si no se encuentra el usuario

        if(!usuarioDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'No existe el usuario'
            });
        }

        //si llegamos aqui el usuario si existe 
        //actualizacion

        const { password, google, email, ... campos} = req.body; //quitamos los campos que no se actualizaran o tocaran   

        //choca con el email que tiene la db con la que el usuario ingresa por eso validamos osea esta cambiando el email x otro
        if(usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({email: email});
            //validamos si un dato requerido no se duplique     
            if(existeEmail) {
                return resp.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            } 
        }
        //damos el email a actualizar
        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        resp.json({
            ok: true,
            usuario: usuarioActualizado
        });


    } catch(error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Error innesperado'
        })
    }

}

const borrarUsuario = async(req, resp = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

         //si no se encuentra el usuario
        if(!usuarioDB) {
            return resp.status(404).json({
                ok: false,
                msg: "No existe el usuario indicado"
            });
        }

        await Usuario.findByIdAndDelete(uid);


        resp.json({
            ok: true,
            msg: 'Usuario eliminado correctamente'
        });

    } catch(error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Solicite con el administrador un usuario nuevo'
        })
    }

}


module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}