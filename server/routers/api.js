const express = require('express');
const router = express.Router();
// const dbController = require(./)
const userController = require('../controllers/userController');
const dbController = require('../controllers/dbController')

router.post('/login', userController.login, dbController.connect /* this one doesn't do anything rn */, dbController.getDB, (req, res) => {res.status(200).json(res.locals)});

router.post( '/register', userController.register, /* dbcontroller.userpoolconnect,*/ (req, res) => {res.status(200).json(res.locals)});

router.get('/people', dbController.getDB, (req, res) => {res.status(200).json(res.locals)});

//this is temp for working on front end
router.get('/eboshi', dbController.getDB, (req, res) => {res.status(200).json(res.locals)});
module.exports = router; 