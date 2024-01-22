const express = require('express');
const router = express.Router();
// const dbController = require(./)
const userController = require('../controllers/userController');
const dbController = require('../controllers/dbController');
const monitorController = require('../controllers/monitorController');

router.post('/login', userController.login, dbController.connect, (req, res) => {res.status(200).json(res.locals)});

router.post('/register', userController.register, /* dbcontroller.userpoolconnect,*/ (req, res) => {res.status(200).json(res.locals)});

router.get('/people', dbController.connectionTest, (req, res) => {res.status(200).json(res.locals)});

router.get('/monitor', monitorController.queryAll, (req, res) => {res.status(200).json(res.locals)});

router.get('/volume', monitorController.volume, (req, res) => {res.status(200).json(res.locals)});

router.get('/fresh', monitorController.fresh, (req, res) => {res.status(200).json(res.locals)});

router.get('/custom', monitorController.custom, (req, res) => {res.status(200).json(res.locals)});

router.get('/null', monitorController.null, (req, res) => {res.status(200).json(res.locals)});

router.get('/stats', monitorController.stats, (req, res) => {res.status(200).json(res.locals)});

module.exports = router; 