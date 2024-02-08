const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const dbController = require('../controllers/dbController');
const monitorController = require('../controllers/monitorController');

//uncomment below to revert to working login
router.post('/login', userController.login, monitorController.connect, (req, res) => {res.status(200).json(res.locals)});

// router.post('/login', userController.login, monitorController.connect, userController.getMonitors, monitorController.scheduleMonitors, (req, res) => {res.status(200).json(res.locals)});

router.post('/register', userController.register, monitorController.connect, userController.getMonitors, monitorController.scheduleMonitors, (req, res) => {res.status(200).json(res.locals)});

router.post('/people', dbController.getDB, (req, res) => {res.status(200).json(res.locals)});

router.post('/monitor', monitorController.queryAll, (req, res) => {res.status(200).json(res.locals)});

router.post('/volume', monitorController.volume, (req, res) => {res.status(200).json(res.locals)});

router.post('/fresh', monitorController.fresh, (req, res) => {res.status(200).json(res.locals)});

router.post('/range', monitorController.range, userController.addAlerts, (req, res) => {res.status(200).json(res.locals)});

router.post('/null', monitorController.null, userController.addAlerts, (req, res) => {res.status(200).json(res.locals)});

router.post('/getMonitors', userController.getMonitors, (req, res) => {res.status(200).json(res.locals.monitors)});

router.post('/monitors', userController.insertMonitor, monitorController.scheduleMonitors, userController.getMonitors, (req, res) => {res.status(200).json(res.locals.monitors)});

router.put('/monitors', userController.updateMonitor, (req, res) => {res.status(200).json(res.locals.monitors)});

router.post('/alerts', userController.getAlerts, (req, res) => {res.status(200).json(res.locals.allAlerts)});

router.put('/alerts', userController.updateAlert, (req, res) => {res.status(200).json('all good')});

router.post('/stats', monitorController.stats, (req, res) => {res.status(200).json(res.locals)});

router.post('/custom', monitorController.custom, userController.addAlerts, (req, res) => {res.status(200).json(res.locals)});

//this is temp for working on front end
router.post('/eboshi', dbController.getDB, (req, res) => {res.status(200).json(res.locals)});
module.exports = router; 