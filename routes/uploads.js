/*
    ruta: api/uploads/

*/ 

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { fileUpload, retornoImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(expressFileUpload() );

router.put('/:tipo/:id', validarJWT, fileUpload);

router.get( '/:tipo/:foto', retornoImagen );

module.exports = router;


