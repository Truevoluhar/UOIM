var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  req.session.destroy(err => {
    if(err) {
      return res.redirect('/');
    }
    res.clearCookie('connect.sid', { path: '/' });
    res.redirect('/login');
  });
});

module.exports = router;