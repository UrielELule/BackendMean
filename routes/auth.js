/*
PATH: '/api/login'
*/ 

const { Router } =  require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
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


module.exports = router;