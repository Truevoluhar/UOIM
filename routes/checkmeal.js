var express = require('express');
var router = express.Router();
var userModel = require('../models/usermodel');
var accountModel = require('../models/accountmodel');
var mongoose = require('mongoose');
const qrcode = require('qrcode');

const isAuth = (req, res, next) => {
  if (req.session.loggedUser) {
    next()
  } else {
    return res.redirect('/login')
  }
}

router.get("/:id", isAuth, async (req, res) => {
  let user = await userModel.findById(req.params.id);

  let userID = req.params.id;
  let account = await accountModel.findOne({ username: req.session.loggedUser.username });

  if (account.permissions === "admin" || account.pemissions === "moderator") {
    res.redirect(`/personlist/getqrcode/${userID}`);
  }
  if (account.permissions === "kuhinja")
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