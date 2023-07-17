var express = require('express');
var router = express.Router();
var userModel = require('../models/usermodel');
var mongoose = require('mongoose');
const qrcode = require('qrcode');

router.get("/:id", async (req, res) => {
  let user = await userModel.findById(req.params.id);
  if (user.meal === false) {
    let mealToTrue = await userModel.findByIdAndUpdate(req.params.id, {
      meal: true,
      $push: { mealHistory: new Date() } // push the current date to mealHistory array
    }, { new: true })
    res.render("greenmeal", { user: user });
  } else {
    res.render("redmeal", { user: user });
  }
})

module.exports = router;