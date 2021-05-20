const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, resp = response, next) => {

    const errores = validationResult(req);
    //comparamos si no esta vacio--- es que hay errores
    if(!errores.isEmpty()){
        return resp.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();

}   

module.exports = {
    validarCampos
}