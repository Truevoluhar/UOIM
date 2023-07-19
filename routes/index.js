var express = require('express');
var router = express.Router();
var userModel = require('../models/usermodel');
var mongoose = require('mongoose')
var dateparser = require('../public/javascripts/dateparser');

const isAuth = (req, res, next) => {
  if (req.session.loggedUser) {
    next()
  } else {
    return res.redirect('/login')
  }
}

router.get('/', isAuth, function(req, res, next) {
  res.render('landing', { username: req.session.loggedUser });
});

router.post("/prehrana", isAuth, (req, res) => {
  res.redirect("/prehrana");
});

router.get("/prehrana", isAuth, (req, res) => {
  res.render('prehrana');
});

router.post("/newperson", isAuth, (req, res) => {
  res.redirect("/newperson");
})

router.post("/personlist", isAuth, (req, res) => {
  res.redirect("/personlist");
})

router.post("/resetstatus", isAuth, async (req, res) => {
  let users = await userModel.find({});
  users.forEach(async (user) => {
    const update = await userModel.findByIdAndUpdate(user._id, {
      meal: false
    });
  });
  res.redirect("/");
})

router.post("/qrcamera", isAuth, (req, res) => {
  res.redirect("/qrcamera");
})


// ZGODOVINA HRANE //
// ZGODOVINA HRANE //
// ZGODOVINA HRANE //
// ZGODOVINA HRANE //
// ZGODOVINA HRANE //

router.post("/allmealshistory", isAuth, (req, res) => {
  res.redirect("/allmealshistory");
});


router.get("/allmealshistory", isAuth, async (req, res) => {
  let users = await userModel.find({});
  let meals = [];
  users.forEach((user) => {
    let userMeals = user.mealHistory;
    userMeals.forEach((meal) => {
      meals.push(meal);
    })
  });

  const monthNames = ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"];

  const result = monthNames.reduce((acc, curr) => {
    acc[curr] = { month: curr, numOfDates: 0 };
    return acc;
  }, {});

  meals.forEach(dateStr => {
    let date = new Date(dateStr);
    let monthName = monthNames[date.getUTCMonth()];
    result[monthName].numOfDates++;
  });


  let resultArray = Object.values(result);

  console.log(resultArray);
  // const filtriranje = meals.filter(date => date > new Date('2023-07-17T07:00:00Z'));
  res.render("allmealshistory", { months: resultArray });
})



router.post("/allmealshistory/:month", isAuth, async (req, res) => {
  let users = await userModel.find({});
  let userInput = req.params.month;
  const monthNames = ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"];
  let meals = [];
  users.forEach((user) => {
    let userMeals = user.mealHistory;
    userMeals.forEach((meal) => {
      meals.push(meal);
    })
  });
  let userInputMonthIndex = monthNames.indexOf(userInput);
  let filteredDates = meals.filter(dateStr => {
    let date = new Date(dateStr);
    return date.getUTCMonth() === userInputMonthIndex;
  });
  let year = new Date(filteredDates[0]).getUTCFullYear();
  let month = new Date(filteredDates[0]).getUTCMonth();
  let daysInMonth = new Date(year, month + 1, 0).getUTCDate();

  // Initialize all days with a count of 0
  let dailyCount = {};
  for (let day = 1; day <= daysInMonth; day++) {
    dailyCount[day] = { day: day, numOfDates: 0 };
  }

  filteredDates.forEach(dateStr => {
    let date = new Date(dateStr);
    let day = date.getUTCDate();
    dailyCount[day].numOfDates++;
  });

  let mealsByDate = Object.values(dailyCount);
  console.log(Object.values(dailyCount));
  res.render("mealsbymonth", { month: userInput, meals: filteredDates, mealsByDate: mealsByDate });
})

module.exports = router;
