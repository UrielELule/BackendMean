const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs'); 
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, resp =  response) => {

    //extraemos el email y password del body de lo que mande el usuario
    const { email, password } = req.body;
    
    try{

        //verificamos que exista y el email este correcto
        const usuarioDB = await Usuario.findOne({ email });
        //si no encuentra el email lo terminamos aqui
        if(!usuarioDB) {
            return resp.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }
        
        //verificar password
        //comparamos lo que manda el usuario y con la bd
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if( !validPassword ) {
            return resp.status(404).json({
                ok: false,
                msg: 'El password no es valida'
            });
        }

        //si pasa esas validaciones GENERAMOS EL TOKEN JSON
        const token = await generarJWT( usuarioDB.id ); 


        resp.json({
            ok: true,
            token
        });

    } catch(error) {
        console.log(error);
        resp.json(500).json({
            ok: false,
            msg: 'Solicite una resolucion con el administrador'
        });
    }

}

const googleSignIn = async( req, resp = response ) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture} = await googleVerify(googleToken);

         //verificar si existe user (email)
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if( !usuarioDB ) {
            //si no existe
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            //existe el usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        //guardad en la bd
            await usuario.save();

    //GENERAMOS JWT
            const token = await generarJWT( usuario.id ); 

        resp.json({
            ok: true,
            token
        });

    } catch (error) {
        resp.status(401).json({
            ok: false,
            msg: 'Error al obtener el token de google',
            googleToken 
        });
    }


    
}

module.exports = {
    login,
    googleSignIn
}

