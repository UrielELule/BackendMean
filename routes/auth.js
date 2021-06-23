/*
PATH: '/api/login'
*/ 

const { Router } =  require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post( '/', 
              [
                check('email', 'Tu email es obligatorio').isEmail(),
                check('password', 'Tu password es necesaria').not().isEmpty(),
                validarCampos
              ],
              login
);


router.post( '/google', 
              [
                check('token', 'La autenticacion de google fallo').not().isEmpty(),
                validarCampos
              ],
              googleSignIn
);

module.exports = router;