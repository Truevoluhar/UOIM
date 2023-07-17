var express = require('express');
var router = express.Router();
var userModel = require('../models/usermodel');
var mongoose = require('mongoose')


router.get('/', function(req, res, next) {
  res.render('landing');
});

router.post("/prehrana", (req, res) => {
  res.redirect("/prehrana");
});

router.get("/prehrana", (req, res) => {
  res.render('prehrana');
});

router.post("/newperson", (req, res) => {
  res.redirect("/newperson");
})

router.post("/personlist", (req, res) => {
  res.redirect("/personlist");
})

router.post("/resetstatus", async (req, res) => {
  let users = await userModel.find({});
  users.forEach(async (user) => {
    const update = await userModel.findByIdAndUpdate(user._id, {
      meal: false
    });
  });
  res.redirect("/");
})

router.post("/qrcamera", (req, res) => {
  res.redirect("/qrcamera");
})

module.exports = router;
