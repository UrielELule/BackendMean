/**
 MEDICOS
 ruta: 'api/medicos' 
 **/

 const { Router } = require('express');
 const { check } = require('express-validator');
 const { validarCampos } = require('../middlewares/validar-campos');
 const { validarJWT } = require('../middlewares/validar-jwt');

 const { getMedicos, crearMedico, actualizarMedico, eliminarMedico  } = require('../controllers/medico');

 const router = Router();

    router.get( '/', getMedicos );

    router.post( '/', 
                  [
                     validarJWT,
                     check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
                     check('hospital', 'El id de hospital es invalido').isMongoId(),
                     validarCampos
                  ], 
                  crearMedico 
   );

    router.put( 
               '/:id', 
               [
                  validarJWT,
                  check('nombre', 'El nombre el requerido').not().isEmpty(),
                  check('hospital', 'El id del hospital no es valido').isMongoId(),
                  validarCampos
               ], 
               actualizarMedico 
   ); 

    router.delete( 
                  '/:id', 
                  validarJWT,
                  eliminarMedico
   );

 module.exports = router;