const jwt = require('jsonwebtoken');


const validarJWT = (req, resp, next) => {

    //leer el token
    const token = req.header('x-token');
    
    //validamos el jwt
    if(!token) {
        return resp.status(404).json({
            ok: false,
            msg: 'No se encontro el token'
        });
    }

    try{

        const { uid } =  jwt.verify(token, process.env.JWT_SECRET);
        //SI TOODO LO HACE BIEN
        req.uid = uid;
        next();

    } catch (error) {
         return resp.status(401).json({
             ok: false,
             msg: 'El token no es valido'
         });
    }

}


module.exports = {
    validarJWT
}