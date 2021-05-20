const { Router } =  require('express');
const { getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

//rutas
//obtener usuarios
router.get( '/', validarJWT, getUsuarios); 

//mandamos en un arreglo los middlenwerds validators crear usuario
router.post( 
            '/', 
            [ 
                validarJWT,
                check('nombre', 'Se requiere un nombre').not().isEmpty(),
                check('password', 'Se requiere password').not().isEmpty(),
                check('email', 'El email es necesario').isEmail(),
                validarCampos //siempre el ultimo despues de los checks
            ] 
            ,crearUsuarios
           
);

//actualizar ruta
router.put( '/:id', 
            [
                validarJWT,
                check('nombre', 'Se requiere un nombre').not().isEmpty(),
                check('email', 'El email es necesario').isEmail(),
                check('role', 'El rol es obligatorio').not().isEmpty(),
                validarCampos,
            ],
            actualizarUsuario 
);

//borrar un usuario
router.delete('/:id',
            validarJWT,
            borrarUsuario
);



module.exports = router;