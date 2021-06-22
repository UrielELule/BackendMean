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

    router.put( '/:id', [], actualizarMedico ); 

    router.delete( '/:id', eliminarMedico);

 module.exports = router;