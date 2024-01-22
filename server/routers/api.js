const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const dbController = require('../controllers/dbController');
const monitorController = require('../controllers/monitorController');
const { connectToUserDB } = require('../models/db2.js');
let userPool;
let test;

router.post(
  '/login',
  userController.login,
  dbController.connect,
  async (req, res, next) => {
    try {
      console.log(connectToUserDB);
      userPool = await connectToUserDB();
      test = 'success';
      return next();
    } catch (err) {
      console.log('error in user db connect midware: ', err);
      return next(err);
    }
  },
  (req, res) => {
    res.status(200).json(res.locals);
  }
);

console.log('test in api.js: ', test);

router.post(
  '/register',
  userController.register,
  /* dbcontroller.userpoolconnect,*/ (req, res) => {
    res.status(200).json(res.locals);
  }
);

router.get('/people', dbController.getDB, (req, res) => {
  res.status(200).json(res.locals);
});

router.get('/monitor', monitorController.queryAll, (req, res) => {
  res.status(200).json(res.locals);
});

router.get('/volume', monitorController.volume, (req, res) => {
  res.status(200).json(res.locals);
});

router.get('/fresh', monitorController.fresh, (req, res) => {
  res.status(200).json(res.locals);
});

router.get('/custom', monitorController.custom, (req, res) => {
  res.status(200).json(res.locals);
});

router.get('/null', monitorController.null, (req, res) => {
  res.status(200).json(res.locals);
});

router.get('/stats', monitorController.stats, (req, res) => {
  res.status(200).json(res.locals);
});

//this is temp for working on front end
// router.get('/eboshi', dbController.getDB, (req, res) => {res.status(200).json(res.locals)});
module.exports = { router, userPool };
