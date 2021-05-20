const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs'); 
const { generarJWT } = require('../helpers/jwt');

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

module.exports = {
    login
}

