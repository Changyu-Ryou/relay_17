var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

// react -> node -> face api -> node -> react

// react, node 같이 키니깐.

// dns 포워딩