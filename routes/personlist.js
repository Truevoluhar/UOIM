var express = require('express');
var router = express.Router();
var userModel = require('../models/usermodel');
var mongoose = require('mongoose');
const qrcode = require('qrcode');

const isAuth = (req, res, next) => {
  if (req.session.loggedUser) {
    next()
  } else {
    return res.redirect('/login')
  }
}

router.get("/", isAuth, async (req, res) => {
  let users = await userModel.find({});
  res.render("personlist", { users: users });
})

router.get("/getqrcode/:id", isAuth, async (req, res) => {
  let user = await userModel.findById(req.params.id);
  let qrCodeURL = user.qrlink;
  let qrcodeimage = await qrcode.toDataURL(qrCodeURL);
  res.render("personinfo", { user: user, qrCodeImage: qrcodeimage });
})

router.get("/getpersoncard/:id", isAuth, async (req, res) => {
  let user = await userModel.findById(req.params.id);
  let qrCodeURL = user.qrlink;
  let qrcodeimage = await qrcode.toDataURL(qrCodeURL);
  res.render("personcard", { user: user, qrCodeImage: qrcodeimage });
});


router.post("/search", async (req, res) => {
  try {
    let userInput = req.body.searchinput.toLowerCase();
    console.log(userInput);

    if (userInput.length > 0) {
      let result = await userModel.find({
        $or: [
          { firstname: { $regex: userInput, $options: 'i' } },
          { lastname: { $regex: userInput, $options: 'i' } },
        ],
      });
      
      res.render("personlist", {users: result});
    } else {
      res.redirect("/personlist");
    } 
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;