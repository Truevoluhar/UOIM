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
  res.render("newperson");
})

let saveid = "";
let savedimage;

router.post('/sign', isAuth, async (req, res) => {
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

    const qrCodeURL = "https://uoim.onrender.com/checkmeal/" + saveid; // QR code URL

    // Generate the QR code image
    const qrCodeImage = await qrcode.toDataURL(qrCodeURL); // Generates a Data URL for the QR code image
    savedimage = qrCodeImage;
    res.redirect(`/newperson/qrcode/${saveid}`); // Redirect to the newperson/qrcode/:savedid page
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the document.' });
  }
});

router.get("/qrcode/:saveid", isAuth, async (req, res) => {
  try {
    const saveid = req.params.saveid;
    const qrCodeURL = "https://uoim.onrender.com/checkmeal/" + saveid; // QR code URL

    // Generate the QR code image
    const qrCodeImage = await qrcode.toDataURL(qrCodeURL); // Generates a Data URL for the QR code image
    const user = await userModel.findById(req.params.saveid);
    const update = await userModel.findByIdAndUpdate(req.params.saveid, {
      qrlink: qrCodeURL
    })
    res.render("personcard", { user: user, qrCodeImage: qrCodeImage });// Render the "qrcode" template with the QR code image data
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while generating the QR code.' });
  }
})

router.post("/qrcode/goback", isAuth, (req, res) => {
  res.redirect("/");
})

router.post("/qrcode/mealhistory/:id", isAuth, async (req, res) => {
  let user = await userModel.findById(req.params.id);
  let meals = user.mealHistory;
  res.render("mealhistory", { user: user, meals: meals, numOfMeals: meals.length });
});


router.get("/note/:id", isAuth, async (req, res) => {
  let user = await userModel.findById(req.params.id);
  res.render("personnote", { user: user });
})

router.post("/note/:id", isAuth, async (req, res) => {
  let note = req.body.note;
  let id = req.params.id;
  let user = await userModel.findById(id);
  if (user) {
    user.note = note;
    await user.save();
    res.redirect(`/personlist/getqrcode/${id}`);
  } else {
    res.redirect(`/personlist/getqrcode/:${id}`);
  }
})


module.exports = router;
