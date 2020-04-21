// Rutas para crear usuarios

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

// Crear usuarios
//api/usuarios

router.post(
    '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check(
            'password',
            'El password tienen que tener como minimo 6 caracteres',
        ).isLength({ min: 6 }),
    ],
    usuarioController.crearUsuario,
);

module.exports = router;
