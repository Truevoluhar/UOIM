var express = require('express');
var router = express.Router();
var userModel = require('../models/usermodel');
var mongoose = require('mongoose');
const qrcode = require('qrcode');

router.get("/", async (req, res) => {
  let users = await userModel.find({});
  res.render("personlist", { users: users });
})

router.get("/getqrcode/:id", async (req, res) => {
  let user = await userModel.findById(req.params.id);
  let qrCodeURL = user.qrlink;
  let qrcodeimage = await qrcode.toDataURL(qrCodeURL);
  res.render("personinfo", { user: user, qrCodeImage: qrcodeimage });
})

router.get("/getpersoncard/:id", async (req, res) => {
  let user = await userModel.findById(req.params.id);
  let qrCodeURL = user.qrlink;
  let qrcodeimage = await qrcode.toDataURL(qrCodeURL);
  res.render("personcard", { user: user, qrCodeImage: qrcodeimage });
});

module.exports = router;