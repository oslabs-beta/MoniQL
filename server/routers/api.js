const express = require('express');
const router = express.Router();
// const dbController = require(./)
const userController = require('../controllers/userController');
const dbController = require('../controllers/dbController');
const monitorController = require('../controllers/monitorController');

router.post('/login', userController.login, dbController.connect /* this one doesn't do anything rn */, dbController.getDB, (req, res) => {res.status(200).json(res.locals)});

router.post('/register', userController.register, /* dbcontroller.userpoolconnect,*/ (req, res) => {res.status(200).json(res.locals)});

router.post('/people', dbController.getDB, (req, res) => {res.status(200).json(res.locals)});

router.post('/monitor', monitorController.queryAll, (req, res) => {res.status(200).json(res.locals)});

router.post('/volume', monitorController.volume, (req, res) => {res.status(200).json(res.locals)});

router.post('/fresh', monitorController.fresh, (req, res) => {res.status(200).json(res.locals)});

router.post('/range', monitorController.range, (req, res) => {res.status(200).json(res.locals)});

router.post('/null', monitorController.null, (req, res) => {res.status(200).json(res.locals)});

router.post('/stats', monitorController.stats, (req, res) => {res.status(200).json(res.locals)});

//this is temp for working on front end
router.get('/eboshi', dbController.getDB, (req, res) => {res.status(200).json(res.locals)});
module.exports = router; 