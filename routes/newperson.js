var express = require('express');
var router = express.Router();
var userModel = require('../models/usermodel');
var mongoose = require('mongoose');
const qrcode = require('qrcode');


router.get("/", async (req, res) => {
  res.render("newperson");
})

let saveid = "";
let savedimage;

router.post('/sign', async (req, res) => {
  try {
    let newUser = new userModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      meal: false,
      qrcode: false,
      qrlink: req.body.firstname + req.body.lastname
    });

    let savedUser = await newUser.save();
    saveid = savedUser._id.toString();

    console.log(saveid);

    const qrCodeURL = "https://qrcode.jonpetek.repl.co/checkmeal/" + saveid; // QR code URL

    // Generate the QR code image
    const qrCodeImage = await qrcode.toDataURL(qrCodeURL); // Generates a Data URL for the QR code image
    savedimage = qrCodeImage;
    res.redirect(`/newperson/qrcode/${saveid}`); // Redirect to the newperson/qrcode/:savedid page
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the document.' });
  }
});

router.get("/qrcode/:saveid", async (req, res) => {
  try {
    const saveid = req.params.saveid;
    const qrCodeURL = "https://qrcode.jonpetek.repl.co/checkmeal/" + saveid; // QR code URL

    // Generate the QR code image
    const qrCodeImage = await qrcode.toDataURL(qrCodeURL); // Generates a Data URL for the QR code image
    const user = await userModel.findById(req.params.saveid);
    const update = await userModel.findByIdAndUpdate(req.params.saveid, {
      qrlink: qrCodeURL
    })
    res.render('qrcode', { qrCodeImage, user }); // Render the "qrcode" template with the QR code image data
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while generating the QR code.' });
  }
})

router.post("/qrcode/goback", (req, res) => {
  res.redirect("/");
})

router.post("/qrcode/mealhistory/:id", async (req, res) => {
  let user = await userModel.findById(req.params.id);
  let meals = user.mealHistory;
  res.render("mealhistory", { user: user, meals: meals });
});



module.exports = router;