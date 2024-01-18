const express = require('express');
const router = express.Router();
// const dbController = require(./)
const userController = require('../controllers/userController');
const dbController = require('../controllers/dbController')

router.post('/login', userController.login, dbController.connect, (req, res) => {res.status(200).json(res.locals)});

router.post( '/register', userController.register, /* dbcontroller.userpoolconnect,*/ (req, res) => {res.status(200).json(res.locals)});

router.get('/people', dbController.connectionTest, (req, res) => {res.status(200).json(res.locals)});

module.exports = router; 